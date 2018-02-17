import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as authorActions from "../../actions/authorActions";

import AuthorsList from './AuthorsList';
import AuthorSearchFilter from './AuthorSearchFilter';

class AuthorsPage extends Component {
    componentDidMount(props, context) {
        this.props.authorActions.loadAuthors();
    }

    handleInputChange(event) {
        const filter = { ...this.props.filter };   
    
        filter[event.target.name] = event.target.value;
    
        this.props.authorActions.filterAuthors(filter);
    }

    addAuthor(event) {
        event.preventDefault();
        this.props.history.push("/administration/authors/0");
      }

    deleteAuthor(event, authorID){
        event.preventDefault();
        
        if (window.confirm("Do you want to delete the author?")) {
            this.props.authorActions.deleteAuthor(authorID, this.props.history);
        }
    }

    sortAuthors(field) {
        const filter = { ...this.props.filter };
    
        filter.authorsSortDesc = field === filter.authorsSortField ? !filter.authorsSortDesc : false;
        filter.authorsSortField = field;
    
        this.props.authorActions.filterAuthors(filter);
    }

    render() {
        const { filter, authors } = this.props;

        return (
                <div>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Authors</h1>
                    <AuthorSearchFilter filter={filter} handleInputChange={this.handleInputChange.bind(this)} addAuthor={this.addAuthor.bind(this)}/>
                    <AuthorsList authors={authors} sortField={filter.authorsSortField || ''} 
                                 deleteAuthor={this.deleteAuthor.bind(this)} sortAuthors={this.sortAuthors.bind(this)} />
                </div>
            );        
    }
}

function mapStateToProps(state, ownProps) {
    return {
      filter: state.authorReducer.authorsSearchFilter,            
      authors: state.authorReducer.filteredAuthors || []      
    };
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      authorActions: bindActionCreators(authorActions, dispatch)      
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AuthorsPage)
  );