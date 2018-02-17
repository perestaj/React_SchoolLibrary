import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorizationReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.payload;
                
        case types.LOGOFF_SUCCESS:
            return {
                isLoggedIn: false,
                username: '',
                role: 0
            };        

        default:
            return state;
    }
}