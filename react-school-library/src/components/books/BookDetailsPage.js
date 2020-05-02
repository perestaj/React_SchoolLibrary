import React, { Component } from "react";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import BookDetailsForm from './BookDetailsForm';
import BookEditForm from './BookEditForm';

import AccessManager from '../../authorization/AccessManager';

class BookDetailsPage extends Component { 

  componentDidMount() {        
    const id = Number(this.props.match.params.id);

    if (id === 0) {      
        this.props.actions.createBook();
        this.props.actions.setBookEditMode(true);     
    } else {
      this.props.actions.loadBook(id);
    }
  }

  componentWillUnmount() {
    this.props.actions.setBookEditMode(false);
  }
  
  redirectToBooksList() {
    this.props.history.push("/books");
  }

  edit(event) {
    event.preventDefault();
    this.props.actions.setBookEditMode(true);
  }
 
  save(values) {
    const book = {...values};
    book.authorIds = values.authorIds.map(id => +id);
    book.publisherID = +values.publisherID;
    this.props.actions.updateBook(book, this.props.history);
  }

  cancel(event) {
    event.preventDefault();
    this.props.actions.setBookEditMode(false);
  }

  render() {
    const { book, bookEditMode, authors, publishers, currentUser, ajaxCallSuccess } = this.props;
    if (!ajaxCallSuccess) {
      return <div>Error while loading book details</div>;
    } 

    if (bookEditMode && AccessManager.canEditBook(currentUser)) {
      const isAddMode = Number(this.props.match.params.id) === 0;

      return (       
        <BookEditForm authors={authors} publishers={publishers} initialValues={this.props.initialValues} isAddMode={isAddMode}
          cancel={this.cancel.bind(this)} onSubmit={this.save.bind(this)} redirectToBooksList={this.redirectToBooksList.bind(this)} />        
      );
    }
     
    const showEditButton = AccessManager.canEditBook(currentUser);   

      return (
        <BookDetailsForm book={book} showEditButton={showEditButton} 
          edit={this.edit.bind(this)} redirectToBooksList={this.redirectToBooksList.bind(this)} />
      );
    
  }
}

function mapStateToProps(state, ownProps) {
  
  let book = state.bookReducer.book;
  let bookEditMode = state.bookReducer.bookEditMode || false;  
  
  var ajaxCallSuccess = state.ajaxCallSuccess;


  return {    
    initialValues: Object.keys(book).length === 0 ? { authorIds: [] } :  book,
    book,
    bookEditMode,
    ajaxCallSuccess,  
    currentUser: state.authorizationReducer,    
    authors: state.authorReducer.authors || [],
    publishers: state.publisherReducer.publishers || []
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage)
);