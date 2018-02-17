import React, { Component } from 'react';

import { connect } from "react-redux";
import * as authorActions from "../../actions/authorActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import AuthorEditForm from './AuthorEditForm';
import AuthorDetailsForm from './AuthorDetailsForm';

class AuthorDetailsPage extends Component {    

    componentDidMount() {        
        const id = Number(this.props.match.params.id);
    
        if (id === 0) {      
            this.props.actions.createAuthor({});
            this.props.actions.setAuthorEditMode(true);     
        } else {
          this.props.actions.loadAuthor(id);
        }
    }

    componentWillUnmount() {
        this.props.actions.setAuthorEditMode(false);
    }

    redirectToAuthorsList() {
        this.props.history.push("/administration/authors");
    }

    edit(event) {
        event.preventDefault();
        this.props.actions.setAuthorEditMode(true);
    }     
    
    save(values) {   
        this.props.actions.updateAuthor(values, this.props.history);
    }
    
    cancel(event) {
        event.preventDefault();
        this.props.actions.setAuthorEditMode(false);
    }

    render() {
        const { author, authorEditMode } = this.props;
        
            if (authorEditMode) {
                const isAddMode = Number(this.props.match.params.id) === 0;

                return (
                    <AuthorEditForm initialValues={author} isAddMode={isAddMode} onSubmit={this.save.bind(this)} cancel={this.cancel.bind(this)} 
                                    redirectToAuthorsList={this.redirectToAuthorsList.bind(this)} />
                );
            }

            return (
                <AuthorDetailsForm author={author} edit={this.edit.bind(this)} redirectToAuthorsList={this.redirectToAuthorsList.bind(this)} />
            );
    }
}

function mapStateToProps(state, ownProps) {
  
    let author = state.authorReducer.author;
    let authorEditMode = state.authorReducer.authorEditMode || false;  
    
    var ajaxCallSuccess = state.ajaxCallSuccess;
    
    return {            
        author,
        authorEditMode,
        ajaxCallSuccess      
    };
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      actions: bindActionCreators(authorActions, dispatch)
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AuthorDetailsPage)
  );