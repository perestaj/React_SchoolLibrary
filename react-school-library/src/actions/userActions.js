import * as types from './actionTypes';
import { ajaxCallError } from './ajaxStatusActions';
import UserApi from '../api/UserApi';
import * as fields from '../common/userSortFields';

import { SubmissionError } from 'redux-form'

function loadRolesSuccess(roles){
    return { type: types.LOAD_ROLES_SUCCESS, roles };
}

function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_SUCCESS, users };
}

function filterUsersSuccess(usersSearchFilter) {
    return { type: types.FILTER_USERS, usersSearchFilter };
}
  
function loadFilteredUsersSuccess(users) {
    return { type: types.LOAD_FILTERED_USERS_SUCCESS, users };
}

function loadUserSuccess(user) {
    return { type: types.LOAD_USER_SUCCESS, user };
}
  
function setUserEditModeSuccess(userEditMode) {
    return { type: types.USER_EDIT_MODE, userEditMode };
}
  
function createUserSuccess(user) {
    return { type: types.CREATE_USER_SUCCESS, user };
}

export function loadRoles() {
    return (dispatch)=>{
        UserApi.getRoles()
        .then(response => {
            if (response.ok) {
            response.json().then(roles => {            
                dispatch(loadRolesSuccess(roles));
            });
            } else {
            dispatch(ajaxCallError());
            }
        })
        .catch(error => {
            throw error;
        });  
    }
}

export function loadUsers() {
    return (dispatch, getState) => {
        UserApi.getUsers().then(response => {
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch(loadUsersSuccess(result));

                        var usersSearchFilter = getState().userReducer.usersSearchFilter;

                        var filteredUsers = getFilteredUsers(result, usersSearchFilter);

                        dispatch(loadFilteredUsersSuccess(filteredUsers));
                    })
            }           
            else {
                dispatch(ajaxCallError());
            }
        })
            .catch(error => {
                throw (error);
            });
    };
}

export function filterUsers(usersSearchFilter) {
    return (dispatch, getState) => {
      dispatch(filterUsersSuccess(usersSearchFilter));
  
      var users = getState().userReducer.users;
  
      var filteredUsers = getFilteredUsers(users, usersSearchFilter);
  
      dispatch(loadFilteredUsersSuccess(filteredUsers));
    };
}

export function deleteUser(userID, history) {
    return (dispatch, getState) => {
       UserApi.deleteUser(userID)
        .then(response => {
          if (response.ok) {
            loadUsers()(dispatch, getState);
          } else if (response.status === 401) {
            history.push("/login" + (history.location.pathname || ""));
          } else {
            dispatch(ajaxCallError());
          }
        })
        .catch(error => {
          throw error;
        });
    };
  }

  export function createUser() {
    return dispatch => {
      dispatch(createUserSuccess({}));
    };
  }   

  export function updateUser(user, history) {
    return dispatch => {
      return UserApi.updateUser(user)
        .then(response => {            
          if (response.ok) {
            return response.json().then(result=> {
                if (result.success) {
                    history.push("/administration/users");
                } else if (result.userNameTaken) {
                    throw new SubmissionError({            
                        _error: 'Username already taken!'
                      });
                }
                else if (result.emailTaken) {
                    throw new SubmissionError({            
                        _error: 'Email is already taken!'
                      });
                }
                else {
                    dispatch(ajaxCallError());
                }
            });            
          } else if (response.status === 401) {
            history.push("/login" + (history.location.pathname || ""));
          } else {
            dispatch(ajaxCallError());
          }
        })
        .catch(error => {
          throw error;
        });
    };
  }
  
  export function setUserEditMode(isEdit) {
    return dispatch => {
      dispatch(setUserEditModeSuccess(isEdit));
    };
  }

  export function loadUser(userID) {
    return (dispatch, getState) => {
        UserApi.getUser(userID)
        .then(response => {
            if (response.ok) {
            response.json().then(user => {            
                dispatch(loadUserSuccess(user));
            });
            } else {
            dispatch(ajaxCallError());
            }
        })
        .catch(error => {
            throw error;
        });        
              
    };
  }
  

function getFilteredUsers(users, usersSearchFilter) {
    if (!usersSearchFilter) {
        return users;
    }

    let filteredUsers = users.filter(user => {
        let fullNameQuery = !usersSearchFilter.fullName || usersSearchFilter.fullName.length === 0 ||
            user.fullName.toUpperCase().includes(usersSearchFilter.fullName.toUpperCase());
        
        let emailQuery = !usersSearchFilter.email || usersSearchFilter.email.length === 0 ||
            user.email.toUpperCase().includes(usersSearchFilter.email.toUpperCase());

        let addressQuery = !usersSearchFilter.address || usersSearchFilter.address.length === 0 ||
            user.address.toUpperCase().includes(usersSearchFilter.address.toUpperCase());

        let roleQuery = !usersSearchFilter.roles || usersSearchFilter.roles.includes(Number(user.role));

        return fullNameQuery && emailQuery && addressQuery && roleQuery;
    });

    if (filteredUsers) {
        filteredUsers.sort((first, second)=>{
            let firstField='';
            let secondField='';

            if (usersSearchFilter.usersSortField === fields.FULL_NAME) {
                firstField = first.fullName.toUpperCase();
                secondField = second.fullName.toUpperCase();                    
            }
            else if (usersSearchFilter.usersSortField === fields.EMAIL) {
                firstField = first.email.toUpperCase();
                secondField = second.email.toUpperCase();          
            }   
            else if (usersSearchFilter.usersSortField === fields.ADDRESS) {
                firstField = first.address.toUpperCase();
                secondField = second.address.toUpperCase();          
            }   
            else if (usersSearchFilter.usersSortField === fields.ROLE_NAME) {
                firstField = first.roleName.toUpperCase();
                secondField = second.roleName.toUpperCase();          
            }   
            else {
                return 0;
            } 
            
            let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
            if (usersSearchFilter.usersSortDesc) {
                comparison = -comparison;
            }

            return comparison;
        });
    }

    return filteredUsers;
}