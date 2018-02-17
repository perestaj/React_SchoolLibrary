import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function bookReducer(
  state = {
    bookStatuses: initialState.bookStatuses,
    booksSearchFilter: initialState.booksSearchFilter,
    filteredBooks: initialState.filteredBooks,
    books: initialState.books,
    book: initialState.book,
    bookEditMode: initialState.bookEditMode
  },
  action
) {
  switch (action.type) {
    case types.LOAD_BOOK_STATUSES_SUCCESS:
      return {
        ...state,
        bookStatuses: action.bookStatuses
      };

    case types.FILTER_BOOKS:
      return Object.assign({}, state, {
        booksSearchFilter: action.booksSearchFilter
      });

    case types.LOAD_FILTERED_BOOKS_SUCCESS:
      return {
        ...state,
        filteredBooks: action.books
      };

    case types.LOAD_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        books: action.books
      });

    case types.LOAD_BOOK_SUCCESS:
      return {
        ...state,
        book: action.book
      };

    case types.BOOK_EDIT_MODE:
      return {
        ...state,
        bookEditMode: action.bookEditMode
      }; 

      case types.CREATE_BOOK_SUCCESS:
        return {
          ...state,
          book: action.book
        };

    default:
      return state;
  }
}
