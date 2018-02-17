import * as types from "./actionTypes";
import { ajaxCallError, ajaxCallSuccess } from "./ajaxStatusActions";
import BookApi from "../api/BookApi";
import * as fields from '../common/bookSortFields';

function loadBookStatusesSuccess(bookStatuses) {
  return { type: types.LOAD_BOOK_STATUSES_SUCCESS, bookStatuses };
}

function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

function filterBooksSuccess(booksSearchFilter) {
  return { type: types.FILTER_BOOKS, booksSearchFilter };
}

function loadFilteredBooksSuccess(books) {
  return { type: types.LOAD_FILTERED_BOOKS_SUCCESS, books };
}

function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK_SUCCESS, book };
}

function setBookEditModeSuccess(bookEditMode) {
  return { type: types.BOOK_EDIT_MODE, bookEditMode };
}

function createBookSuccess(book) {
  return { type: types.CREATE_BOOK_SUCCESS, book };
}

export function createBook() {
  return dispatch => {
    dispatch(createBookSuccess({}));
  };
}

export function deleteBook(bookID, history) {
  return (dispatch, getState) => {
    BookApi.deleteBook(bookID)
      .then(response => {
        if (response.ok) {
          loadBooks()(dispatch, getState);
        } else if (response.status === 401) {
          history.push("/login" + (history.location.pathname || ""));
        } else {
          dispatch(ajaxCallError());
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateBook(book, history) {
  return dispatch => {
    BookApi.updateBook(book)
      .then(response => {
        if (response.ok) {
          history.push("/books");
        } else if (response.status === 401) {
          history.push("/login" + (history.location.pathname || ""));
        } else {
          dispatch(ajaxCallError());
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export function setBookEditMode(isEdit) {
  return dispatch => {
    dispatch(setBookEditModeSuccess(isEdit));
  };
}

export function loadBookStatuses() {
  return dispatch => {
    BookApi.getBookStatuses()
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            dispatch(loadBookStatusesSuccess(result));
          });
        } else {
          dispatch(ajaxCallError());
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export function filterBooks(booksSearchFilter) {
  return (dispatch, getState) => {
    dispatch(filterBooksSuccess(booksSearchFilter));

    var books = getState().bookReducer.books;

    var filteredBooks = getFilteredBooks(books, booksSearchFilter);

    dispatch(loadFilteredBooksSuccess(filteredBooks));
  };
}

function getFilteredBooks(books, booksSearchFilter) {
  if (!booksSearchFilter) {
    return books;
  }

  let filteredBooks = books.filter(book => {
      let statusQuery = !booksSearchFilter.onlyAvailable || book.status === 1;
      let titleQuery =
        !booksSearchFilter.title ||
        booksSearchFilter.title.length === 0 ||
        book.title.toUpperCase().includes(booksSearchFilter.title.toUpperCase());
      let publisherQuery =
        !booksSearchFilter.publisherID ||
        Number(booksSearchFilter.publisherID) === 0 ||
        book.publisherID === Number(booksSearchFilter.publisherID);
      let authorQuery =
        !booksSearchFilter.authorID ||
        Number(booksSearchFilter.authorID) === 0 ||
        book.authors
          .map(author => author.authorID)
          .filter(author => author === Number(booksSearchFilter.authorID))
          .length > 0;

      return statusQuery && titleQuery && publisherQuery && authorQuery;
    });

    if (filteredBooks){
      filteredBooks.sort((first, second)=>{               
        let firstField='';
        let secondField='';

        if (booksSearchFilter.booksSortField === fields.TITLE) {
          firstField = first.title.toUpperCase();
          secondField = second.title.toUpperCase();                    
        }
        else if (booksSearchFilter.booksSortField === fields.AUTHORS) {
          firstField = first.authorsList.toUpperCase();
          secondField = second.authorsList.toUpperCase();          
        }
        else if (booksSearchFilter.booksSortField === fields.PUBLISHER) {
          firstField = first.publisherName.toUpperCase();
          secondField = second.publisherName.toUpperCase();          
        }
        else if (booksSearchFilter.booksSortField === fields.RELEASE_DATE) {
          firstField = first.releaseDate;
          secondField = second.releaseDate;          
        }
        else if (booksSearchFilter.booksSortField === fields.STATUS) {
          firstField = first.statusName.toUpperCase();
          secondField = second.statusName.toUpperCase();          
        }
        else {
          return 0;
        }

        let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
        if (booksSearchFilter.booksSortDesc) {
          comparison = -comparison;
        }

        return comparison;
      });
    }

    return filteredBooks;
}

export function loadBooks() {
  return (dispatch, getState) => {
    BookApi.getBooks()
      .then(response => {
        if (response.ok) {
          response.json().then(books => {
            dispatch(loadBooksSuccess(books));

            var booksSearchFilter = getState().bookReducer.booksSearchFilter;

            var filteredBooks = getFilteredBooks(books, booksSearchFilter);

            dispatch(loadFilteredBooksSuccess(filteredBooks));

            dispatch(ajaxCallSuccess());
          });
        } else {
          dispatch(ajaxCallError());
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadBook(bookID) {
  return dispatch => {
    BookApi.getBook(bookID)
      .then(response => {
        if (response.ok) {
          response.json().then(book => {            
            dispatch(loadBookSuccess(book));
          });
        } else {
          dispatch(ajaxCallError());
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
