import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import ajaxStatusReducer from './ajaxStatusReducer';
import authorizationReducer from './authorizationReducer';
import authorReducer from './authorReducer';
import publisherReducer from './publisherReducer';
import loanReducer from './loanReducer';
import userReducer from './userReducer';
import {reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    ajaxCallSuccess: ajaxStatusReducer,
    authorizationReducer: authorizationReducer,
    bookReducer: bookReducer,
    authorReducer,
    publisherReducer,
    loanReducer,
    userReducer,
    form: formReducer
});

export default rootReducer;