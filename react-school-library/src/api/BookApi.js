import AuthorizationService from "../authorization/AuthorizationService";

class BookApi {
  static getBookStatuses() {
    return fetch("http://localhost:4200/api/books/statuses").then(res => res);
  }

  static getBooks() {
    return fetch("http://localhost:4200/api/books").then(res => res);
  }

  static getBook(bookID) {
    return fetch(`http://localhost:4200/api/books/${bookID}`).then(res => res);
  }

  static updateBook(book) {
    var authorizationData = AuthorizationService.getAuthorizationData();

    return fetch(`http://localhost:4200/api/books`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authorizationData.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });
  }

  static deleteBook(bookID) {
    var authorizationData = AuthorizationService.getAuthorizationData();
    
    return fetch(`http://localhost:4200/api/books/${bookID}`, {
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

export default BookApi;
