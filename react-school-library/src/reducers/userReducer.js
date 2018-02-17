import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(
    state= {
        users: initialState.users,
        usersSearchFilter: initialState.usersSearchFilter,
        filteredUsers: initialState.filteredUsers,
        user: initialState.user,
        userEditModel: initialState.userEditMode   
    }, 
    action) {
    switch (action.type) {
        case types.LOAD_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.roles
            }

        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: action.users               
            }
            
        case types.FILTER_USERS:
            return {
                ...state,
                usersSearchFilter: action.usersSearchFilter
            };

        case types.LOAD_FILTERED_USERS_SUCCESS:
            return {
                ...state,
                filteredUsers: action.users
            };

        case types.LOAD_USER_SUCCESS:
            return {
              ...state,
              user: action.user
            };
      
          case types.USER_EDIT_MODE:
            return {
              ...state,
              userEditMode: action.userEditMode
            }; 
      
            case types.CREATE_USER_SUCCESS:
              return {
                ...state,
                user: action.user
              };

        default:
            return state;
    }
};