import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ajaxStatusReducer(state = initialState.ajaxCallSuccess, action) {
    if (action.type === types.AJAX_CALL_ERROR) {
        return false;
    }

    if (action.type === types.AJAX_CALL_SUCCESS) {
        return true;
    }

    return state;
}