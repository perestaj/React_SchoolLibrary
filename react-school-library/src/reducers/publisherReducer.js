import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function publisherReducer(
    state= {
        publishers: initialState.publishers,
        publishersSearchFilter: initialState.publishersSearchFilter,
        filteredPublishers: initialState.filteredPublishers,
        publisher: initialState.publisher,
        publisherEditModel: initialState.publisherEditMode   
    }, 
    action) {
    switch (action.type) {
        case types.LOAD_PUBLISHERS_SUCCESS:
            return {
                ...state,
                publishers: action.publishers               
            }
            
        case types.FILTER_PUBLISHERS:
            return {
                ...state,
                publishersSearchFilter: action.publishersSearchFilter
            };

        case types.LOAD_FILTERED_PUBLISHERS_SUCCESS:
            return {
                ...state,
                filteredPublishers: action.publishers
            };

        case types.LOAD_PUBLISHER_SUCCESS:
            return {
              ...state,
              publisher: action.publisher
            };
      
          case types.PUBLISHER_EDIT_MODE:
            return {
              ...state,
              publisherEditMode: action.publisherEditMode
            }; 
      
            case types.CREATE_PUBLISHER_SUCCESS:
              return {
                ...state,
                publisher: action.publisher
              };

        default:
            return state;
    }
};