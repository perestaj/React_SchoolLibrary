import axios from "axios";

class PublisherApi {
    static getPublishers() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/publishers`);
    }

    static getPublisher(publisherID) {
      return axios.get(`${process.env.REACT_APP_BASE_URL}/publishers/${publisherID}`);
    }

    static updatePublisher(publisher) {  
      return axios.post(`${process.env.REACT_APP_BASE_URL}/publishers`, publisher);
    }

    static deletePublisher(publisherID) {        
        return axios.delete(`${process.env.REACT_APP_BASE_URL}/publishers/${publisherID}`);
      }
}

export default PublisherApi;