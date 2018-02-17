import * as types from './actionTypes';
import { ajaxCallError } from './ajaxStatusActions';
import AuthorApi from '../api/AuthorApi';
import * as fields from '../common/authorSortFields';

function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

function filterAuthorsSuccess(authorsSearchFilter) {
    return { type: types.FILTER_AUTHORS, authorsSearchFilter };
}
  
function loadFilteredAuthorsSuccess(authors) {
    return { type: types.LOAD_FILTERED_AUTHORS_SUCCESS, authors };
}

function loadAuthorSuccess(author) {
    return { type: types.LOAD_AUTHOR_SUCCESS, author };
}
  
function setAuthorEditModeSuccess(authorEditMode) {
    return { type: types.AUTHOR_EDIT_MODE, authorEditMode };
}
  
function createAuthorSuccess(author) {
    return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
    return (dispatch, getState) => {
        AuthorApi.getAuthors().then(response => {
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch(loadAuthorsSuccess(result));

                        var authorsSearchFilter = getState().authorReducer.authorsSearchFilter;

                        var filteredAuthors = getFilteredAuthors(result, authorsSearchFilter);

                        dispatch(loadFilteredAuthorsSuccess(filteredAuthors));
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

export function filterAuthors(authorsSearchFilter) {
    return (dispatch, getState) => {
      dispatch(filterAuthorsSuccess(authorsSearchFilter));
  
      var authors = getState().authorReducer.authors;
  
      var filteredAuthors = getFilteredAuthors(authors, authorsSearchFilter);
  
      dispatch(loadFilteredAuthorsSuccess(filteredAuthors));
    };
}

export function deleteAuthor(authorID, history) {
    return (dispatch, getState) => {
       AuthorApi.deleteAuthor(authorID)
        .then(response => {
          if (response.ok) {
            loadAuthors()(dispatch, getState);
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

  export function createAuthor() {
    return dispatch => {
      dispatch(createAuthorSuccess({}));
    };
  }   

  export function updateAuthor(author, history) {
    return dispatch => {
      AuthorApi.updateAuthor(author)
        .then(response => {
          if (response.ok) {
            history.push("/administration/authors");
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
  
  export function setAuthorEditMode(isEdit) {
    return dispatch => {
      dispatch(setAuthorEditModeSuccess(isEdit));
    };
  }

  export function loadAuthor(authorID) {
    return (dispatch, getState) => {
        AuthorApi.getAuthor(authorID)
        .then(response => {
            if (response.ok) {
            response.json().then(author => {            
                dispatch(loadAuthorSuccess(author));
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
  

function getFilteredAuthors(authors, authorsSearchFilter) {
    if (!authorsSearchFilter) {
        return authors;
    }

    let filteredAuthors = authors.filter(author => {
        let fullNameQuery = !authorsSearchFilter.fullName || authorsSearchFilter.fullName.length === 0 ||
            author.fullName.toUpperCase().includes(authorsSearchFilter.fullName.toUpperCase());
        
        let additionalInformationQuery = !authorsSearchFilter.additionalInformation || authorsSearchFilter.additionalInformation.length === 0 ||
            author.additionalInformation.toUpperCase().includes(authorsSearchFilter.additionalInformation.toUpperCase());

        return fullNameQuery && additionalInformationQuery
    });

    if (filteredAuthors) {
        filteredAuthors.sort((first, second)=>{
            let firstField='';
            let secondField='';

            if (authorsSearchFilter.authorsSortField === fields.FULL_NAME) {
                firstField = first.fullName.toUpperCase();
                secondField = second.fullName.toUpperCase();                    
            }
            else if (authorsSearchFilter.authorsSortField === fields.ADDITIONAL_INFORMATION) {
                firstField = first.additionalInformation.toUpperCase();
                secondField = second.additionalInformation.toUpperCase();          
            }   
            else {
                return 0;
            } 
            
            let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
            if (authorsSearchFilter.authorsSortDesc) {
                comparison = -comparison;
            }

            return comparison;
        });
    }

    return filteredAuthors;
}