
const AUTHORIZATION_DATA_LOCAL_STORAGE_KEY = 'AUTHORIZATION_DATA';

class AuthorizationService {    
    static authenticate(authorizationData) {
        localStorage.setItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY, JSON.stringify(authorizationData));
    }

    static isAuthenticated() {
        const authorizationData = localStorage.getItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);

        return authorizationData && authorizationData.length > 0;
    }

    static logOff(){
        localStorage.removeItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);
    }

    static getAuthorizationData() {
        var data  = localStorage.getItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);
        if (data && data.length > 0) {
            return JSON.parse(data);
        }

        return null;
    }    
}

export default AuthorizationService;