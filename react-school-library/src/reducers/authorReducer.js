import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(
    state= {
        authors: initialState.authors,
        authorsSearchFilter: initialState.authorsSearchFilter,
        filteredAuthors: initialState.filteredAuthors,
        author: initialState.author,
        authorEditModel: initialState.authorEditMode   
    }, 
    action) {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return {
                ...state,
                authors: action.authors               
            }
            
        case types.FILTER_AUTHORS:
            return {
                ...state,
                authorsSearchFilter: action.authorsSearchFilter
            };

        case types.LOAD_FILTERED_AUTHORS_SUCCESS:
            return {
                ...state,
                filteredAuthors: action.authors
            };

        case types.LOAD_AUTHOR_SUCCESS:
            return {
              ...state,
              author: action.author
            };
      
          case types.AUTHOR_EDIT_MODE:
            return {
              ...state,
              authorEditMode: action.authorEditMode
            }; 
      
            case types.CREATE_AUTHOR_SUCCESS:
              return {
                ...state,
                author: action.author
              };

        default:
            return state;
    }
};