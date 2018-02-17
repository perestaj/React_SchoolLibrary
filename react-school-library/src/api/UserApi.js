import AuthorizationService from "../authorization/AuthorizationService";

class UserApi {
    static getRoles() {
        return fetch("http://localhost:4200/api/users/roles", {
            method: "GET"            
        })
        .then(res => res);
    }
    
    static getUsers() {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch("http://localhost:4200/api/users", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + authorizationData.token,
                Accept: "application/json",
                "Content-Type": "application/json"
              }
        })
        .then(res => res);
    }

    static getUser(userID) {
      var authorizationData = AuthorizationService.getAuthorizationData();  
      return fetch(`http://localhost:4200/api/users/${userID}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + authorizationData.token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
      })
      .then(res => res);
    }

    static updateUser(user) {
      var authorizationData = AuthorizationService.getAuthorizationData();
  
      return fetch(`http://localhost:4200/api/users`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authorizationData.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
    }

    static deleteUser(userID) {
        var authorizationData = AuthorizationService.getAuthorizationData();
        
        return fetch(`http://localhost:4200/api/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authorizationData.token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => res);
      }
}

export default UserApi;