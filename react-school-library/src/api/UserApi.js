import axios from "axios";

class UserApi {
    static getRoles() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/users/roles`);
    }
    
    static getUsers() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    }

    static getUser(userID) {
      return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userID}`);
    }

    static updateUser(user) {      
      return axios.post(`${process.env.REACT_APP_BASE_URL}/users`, user);
    }

    static deleteUser(userID) {        
        return axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userID}`);
    }
}

export default UserApi;