import * as types from "./actionTypes";
import { ajaxCallError } from "./ajaxStatusActions";
import AuthorizationApi from "../api/AuthorizationApi";
import AuthorizationService from "../authorization/AuthorizationService";
import AuthorizationData from "../authorization/AuthorizationData";

import { SubmissionError } from 'redux-form'

function loginSuccess(currentUser) {
  return { type: types.LOGIN_SUCCESS, payload: currentUser };
}

function logoffSuccess() {
  return { type: types.LOGOFF_SUCCESS };
}

export function loginFromToken() {
  return dispatch => {
    var data = AuthorizationService.getAuthorizationData();
    if (data && data.token) {
      var expirationDate = Date.parse(data.expiration);
      var currentDate = Date.now();
      if (expirationDate > currentDate) {
        dispatch(loginSuccess({username: data.userName, role: data.role, isLoggedIn: true}));
      } else {
        AuthorizationService.logOff();
        dispatch(logoffSuccess());
      }
    }
  };
}

export function logoff(history, redirectUrl) {
  return dispatch => {
    AuthorizationService.logOff();

    dispatch(logoffSuccess());

    if (redirectUrl && redirectUrl.length > 0) {
      history.push(redirectUrl);
    }
  };
}

export function login(username, password, history, redirectUrl) {
  return dispatch => {
    return AuthorizationApi.login(username, password)
      .then(res => {
        if (res.ok) {
          res.json().then(result => {
            var authorizationData = new AuthorizationData(
              result.token,
              result.expiration,
              result.userName,
              result.role
            );
            AuthorizationService.authenticate(authorizationData);

            dispatch(loginSuccess({username: result.userName, role: result.role, isLoggedIn: true}));

            if (redirectUrl && redirectUrl.length > 0) {
              history.push("/" + redirectUrl);
            }
          });
        } else if (res.status === 400) {          
          throw new SubmissionError({            
            _error: 'Invalid Username or Password!'
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
