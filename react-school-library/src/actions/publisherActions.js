import * as types from './actionTypes';
import { ajaxCallError } from './ajaxStatusActions';
import PublisherApi from '../api/PublisherApi';
import * as fields from '../common/publisherSortFields';

function loadPublishersSuccess(publishers) {
    return { type: types.LOAD_PUBLISHERS_SUCCESS, publishers };
}

function filterPublishersSuccess(publishersSearchFilter) {
    return { type: types.FILTER_PUBLISHERS, publishersSearchFilter };
}
  
function loadFilteredPublishersSuccess(publishers) {
    return { type: types.LOAD_FILTERED_PUBLISHERS_SUCCESS, publishers };
}

function loadPublisherSuccess(publisher) {
    return { type: types.LOAD_PUBLISHER_SUCCESS, publisher };
}
  
function setPublisherEditModeSuccess(publisherEditMode) {
    return { type: types.PUBLISHER_EDIT_MODE, publisherEditMode };
}
  
function createPublisherSuccess(publisher) {
    return { type: types.CREATE_PUBLISHER_SUCCESS, publisher };
}

export function loadPublishers() {
    return async (dispatch, getState) => {
      try {
        const response = await PublisherApi.getPublishers();
        const publishers = response.data;

        dispatch(loadPublishersSuccess(publishers));
        var publishersSearchFilter = getState().publisherReducer.publishersSearchFilter;
        var filteredPublishers = getFilteredPublishers(publishers, publishersSearchFilter);
        dispatch(loadFilteredPublishersSuccess(filteredPublishers));
      }
      catch(error) {     
        dispatch(ajaxCallError());
      };
    };
}

export function filterPublishers(publishersSearchFilter) {
    return (dispatch, getState) => {
      dispatch(filterPublishersSuccess(publishersSearchFilter));
  
      var publishers = getState().publisherReducer.publishers;
  
      var filteredPublishers = getFilteredPublishers(publishers, publishersSearchFilter);
  
      dispatch(loadFilteredPublishersSuccess(filteredPublishers));
    };
}

export function deletePublisher(publisherID, history) {
    return async (dispatch, getState) => {
      try {
        await PublisherApi.deletePublisher(publisherID);
        loadPublishers()(dispatch, getState);
      }
      catch(error) {
        if (error.response.status === 401) {
          history.push("/login" + (history.location.pathname || ""));
        } else {
          dispatch(ajaxCallError());
        }
      };
    };
  }

  export function createPublisher() {
    return dispatch => {
      dispatch(createPublisherSuccess({}));
    };
  }   

  export function updatePublisher(publisher, history) {
    return async dispatch => {
      try {
        await PublisherApi.updatePublisher(publisher);
        history.push("/administration/publishers");
      }
      catch(error) {
        if (error.response.status === 401) {
          history.push("/login" + (history.location.pathname || ""));
        } else {
          dispatch(ajaxCallError());
        }
      };
    };
  }
  
  export function setPublisherEditMode(isEdit) {
    return dispatch => {
      dispatch(setPublisherEditModeSuccess(isEdit));
    };
  }

  export function loadPublisher(publisherID) {
    return async (dispatch) => {
      try {
        const response = await PublisherApi.getPublisher(publisherID);
        const publisher = response.data;
        dispatch(loadPublisherSuccess(publisher));
      }
      catch(error) {     
        dispatch(ajaxCallError());
      };
    };
  }
  

function getFilteredPublishers(publishers, publishersSearchFilter) {
    if (!publishersSearchFilter) {
        return publishers;
    }

    let filteredPublishers = publishers.filter(publisher => {
        let nameQuery = !publishersSearchFilter.name || publishersSearchFilter.name.length === 0 ||
            publisher.name.toUpperCase().includes(publishersSearchFilter.name.toUpperCase());

        let addressQuery = !publishersSearchFilter.address || publishersSearchFilter.address.length === 0 ||
            publisher.address.toUpperCase().includes(publishersSearchFilter.address.toUpperCase());
        
        let additionalInformationQuery = !publishersSearchFilter.additionalInformation || publishersSearchFilter.additionalInformation.length === 0 ||
            publisher.additionalInformation.toUpperCase().includes(publishersSearchFilter.additionalInformation.toUpperCase());

        return nameQuery && addressQuery && additionalInformationQuery
    });

    if (filteredPublishers) {
        filteredPublishers.sort((first, second)=>{
            let firstField='';
            let secondField='';

            if (publishersSearchFilter.publishersSortField === fields.NAME) {
                firstField = first.name.toUpperCase();
                secondField = second.name.toUpperCase();                    
            }
            else if (publishersSearchFilter.publishersSortField === fields.ADDRESS) {
                firstField = first.address.toUpperCase();
                secondField = second.address.toUpperCase();          
            }   
            else if (publishersSearchFilter.publishersSortField === fields.ADDITIONAL_INFORMATION) {
                firstField = first.additionalInformation.toUpperCase();
                secondField = second.additionalInformation.toUpperCase();          
            }   
            else {
                return 0;
            } 
            
            let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
            if (publishersSearchFilter.publishersSortDesc) {
                comparison = -comparison;
            }

            return comparison;
        });
    }

    return filteredPublishers;
}