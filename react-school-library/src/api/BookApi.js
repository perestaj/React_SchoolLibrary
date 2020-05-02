import axios from "axios";

class BookApi {
  static getBookStatuses() {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/books/statuses`);
  }

  static getBooks() {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/books`);
  }

  static getBook(bookID) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/books/${bookID}`);
  }

  static updateBook(book) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/books`, book);
  }

  static deleteBook(bookID) {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/books/${bookID}`);
  }
}

export default BookApi;
