import React, { Component } from 'react';

import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import UserEditForm from './UserEditForm';
import UserDetailsForm from './UserDetailsForm';

import { SubmissionError } from 'redux-form'

class UserDetailsPage extends Component {    

    componentDidMount() {        
        const id = Number(this.props.match.params.id);
    
        if (id === 0) {      
            this.props.actions.createUser({});
            this.props.actions.setUserEditMode(true);     
        } else {
          this.props.actions.loadUser(id, this.props.history);
        }
    }

    componentWillUnmount() {
        this.props.actions.setUserEditMode(false);
    }

    redirectToUsersList() {
        this.props.history.push("/administration/users");
    }

    edit(event) {
        event.preventDefault();
        this.props.actions.setUserEditMode(true);
    }     
    
    async save(values, dispatch) {
        try {               
            await dispatch(userActions.updateUser(values, this.props.history));
        }
        catch(err) {
            if(err instanceof SubmissionError) {
                throw err;
            }
        }
    }
    
    cancel(event) {
        event.preventDefault();
        this.props.actions.setUserEditMode(false);
    }

    render() {
        const { user, roles, userEditMode } = this.props;
        
            if (userEditMode) {
                const isAddMode = Number(this.props.match.params.id) === 0;

                return (
                    <UserEditForm initialValues={user} isAddMode={isAddMode} roles={roles} onSubmit={this.save.bind(this)} cancel={this.cancel.bind(this)} 
                                    redirectToUsersList={this.redirectToUsersList.bind(this)} />
                );
            }

            return (
                <UserDetailsForm user={user} edit={this.edit.bind(this)} redirectToUsersList={this.redirectToUsersList.bind(this)} />
            );
    }
}

function mapStateToProps(state, ownProps) {
  
    let user = state.userReducer.user;
    let userEditMode = state.userReducer.userEditMode || false;  
    let roles = state.userReducer.roles || [];
    
    var ajaxCallSuccess = state.ajaxCallSuccess;
    
    return {            
        user,
        userEditMode,
        roles,
        ajaxCallSuccess      
    };
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      actions: bindActionCreators(userActions, dispatch)
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage)
  );