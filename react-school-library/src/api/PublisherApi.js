import AuthorizationService from "../authorization/AuthorizationService";

class PublisherApi {
    static getPublishers() {
        return fetch("http://localhost:4200/api/publishers")
            .then(res => res);
    }

    static getPublisher(publisherID) {
      return fetch(`http://localhost:4200/api/publishers/${publisherID}`).then(res => res);
    }

    static updatePublisher(publisher) {
      var AuthorizationData = AuthorizationService.getAuthorizationData();
  
      return fetch(`http://localhost:4200/api/publishers`, {
        method: "POST",
        headers: {
        Authorization: "Bearer " + AuthorizationData.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(publisher)
      });
    }

    static deletePublisher(publisherID) {
        var AuthorizationData = AuthorizationService.getAuthorizationData();
        
        return fetch(`http://localhost:4200/api/publishers/${publisherID}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + AuthorizationData.token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => res);
      }
}

export default PublisherApi;