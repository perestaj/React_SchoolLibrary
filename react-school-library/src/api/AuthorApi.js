import AuthorizationService from "../authorization/AuthorizationService";

class AuthorApi {
    static getAuthors() {
        return fetch("http://localhost:4200/api/authors")
            .then(res => res);
    }

    static getAuthor(authorID) {
      return fetch(`http://localhost:4200/api/authors/${authorID}`).then(res => res);
    }

    static updateAuthor(author) {
      var authorizationData = AuthorizationService.getAuthorizationData();
  
      return fetch(`http://localhost:4200/api/authors`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authorizationData.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
      });
    }

    static deleteAuthor(authorID) {
        var authorizationData = AuthorizationService.getAuthorizationData();
        
        return fetch(`http://localhost:4200/api/authors/${authorID}`, {
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

export default AuthorApi;