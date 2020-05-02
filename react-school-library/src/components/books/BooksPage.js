import React, { Component } from "react";

import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import * as loanActions from "../../actions/loanActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import BooksSearchFilter from './BookSearchFilter';
import BooksList from './BooksList';

import AccessManager from '../../authorization/AccessManager';

class BooksPage extends Component {
  componentDidMount() {
    this.props.bookActions.loadBooks();
  }

  handleInputChange(event) {
    const filter = { ...this.props.filter };   

    filter[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    this.props.bookActions.filterBooks(filter);
  }

  add(event) {
    event.preventDefault();
    this.props.history.push("/books/0");
  }

  deleteBook(event, bookID) {
    event.preventDefault();

    if (window.confirm("Do you want to delete the book?")) {
      this.props.bookActions.deleteBook(bookID, this.props.history);
    }
  }

  requestBook(event, bookID) {
    event.preventDefault();

    if (window.confirm('Are you sure you want to borrow this book?')) {
      this.props.loanActions.requestBook(bookID, this.props.history);
    }    
  }

  sort(field) {
    const filter = { ...this.props.filter };

    filter.booksSortDesc = field === filter.booksSortField ? !filter.booksSortDesc : false;
    filter.booksSortField = field;

    this.props.bookActions.filterBooks(filter);
  }

  render() {
    const { filter, books, authors, publishers, ajaxCallSuccess, currentUser } = this.props;
    
    if (!ajaxCallSuccess) {
      return <div>Error while loading books</div>;
    } else {
      const showRequestBook = AccessManager.canRequestBook(currentUser);
      const showAddButton = AccessManager.canAddBook(currentUser);
      const showDeleteButton = AccessManager.canDeleteBook(currentUser);

      return (
        <div>
          <h1 className="h3 mb-3 font-weight-normal text-center">Books</h1>
          <BooksSearchFilter showAddButton={showAddButton} filter={filter} authors={authors} publishers={publishers} 
            handleInputChange={(event)=> this.handleInputChange(event)} add={(event) => this.add(event)}
            />

          <BooksList books={books} showDeleteButton={showDeleteButton} showRequestBook={showRequestBook} sortField={filter.booksSortField || ''}
            requestBook={(event, bookID) => this.requestBook(event, bookID)}
            deleteBook={(event, bookID) => this.deleteBook(event, bookID)} sort={(field)=> this.sort(field)} />
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    filter: state.bookReducer.booksSearchFilter,
    books: state.bookReducer.filteredBooks || [],
    currentUser: state.authorizationReducer,    
    authors: state.authorReducer.authors || [],
    publishers: state.publisherReducer.publishers || [],
    ajaxCallSuccess: state.ajaxCallSuccess
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    bookActions: bindActionCreators(bookActions, dispatch),
    loanActions: bindActionCreators(loanActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BooksPage)
);