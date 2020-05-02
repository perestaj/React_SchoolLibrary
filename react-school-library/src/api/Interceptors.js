import AuthorizationService from "../authorization/AuthorizationService";
import axios from "axios";

export function registerInterceptors() {
    axios.interceptors.request.use(function (config) {
        var authorizationData = AuthorizationService.getAuthorizationData();
        if (authorizationData) {
            config.headers.common.Accept = "application/json";
            config.headers.common["Content-Type"] = "application/json";
            config.headers.common.Authorization = "Bearer " + authorizationData.token;
        }

        return config;
      }, function (error) {
        return Promise.reject(error);
      });
}