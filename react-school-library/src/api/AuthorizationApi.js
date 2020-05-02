import axios from "axios";

class AuthorizationApi {
    static login(username, password) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/users/token?userName=${username}&password=${password}`);
    }
}

export default AuthorizationApi;
