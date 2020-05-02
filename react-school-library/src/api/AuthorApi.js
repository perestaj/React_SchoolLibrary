import axios from "axios";

class AuthorApi {
    static getAuthors() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/authors`);
    }

    static getAuthor(authorID) {
      return axios.get(`${process.env.REACT_APP_BASE_URL}/authors/${authorID}`);
    }

    static updateAuthor(author) {  
      return axios.post(`${process.env.REACT_APP_BASE_URL}/authors`, author);
    }

    static deleteAuthor(authorID) {
      return axios.delete(`${process.env.REACT_APP_BASE_URL}/authors/${authorID}`);
    }
}

export default AuthorApi;