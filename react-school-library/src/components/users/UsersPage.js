import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as userActions from "../../actions/userActions";

import UsersList from './UsersList';
import UserSearchFilter from './UserSearchFilter';

class UsersPage extends Component {
    componentDidMount(props, context) {
        this.props.userActions.loadUsers();
    }

    add(event) {
        event.preventDefault();
        this.props.history.push("/administration/users/0");
      }

    handleInputChange(event) {
        const filter = { ...this.props.filter, roles: [...this.props.filter.roles] };   
    
        const target = event.target;

        if (target.type === 'checkbox' && target.name === 'role') {
            var role = Number(target.value);
            if (target.checked) {
                if (!filter.roles.includes(role)) {
                    filter.roles.push(role);
                }
            }
            else {
                filter.roles = filter.roles.filter(x => x !== role);
            }
        } else {
            filter[target.name] = target.value;
        }
    
        this.props.userActions.filterUsers(filter);
    }
    

    deleteUser(event, userID){
        event.preventDefault();
        
        if (window.confirm("Do you want to delete the user?")) {
            this.props.userActions.deleteUser(userID, this.props.history);
        }
    }

    sortUsers(field) {
        const filter = { ...this.props.filter };
    
        filter.usersSortDesc = field === filter.usersSortField ? !filter.usersSortDesc : false;
        filter.usersSortField = field;
    
        this.props.userActions.filterUsers(filter);
    }

    render() {
        const { filter, users, roles } = this.props;

        return (
                <div>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Users</h1>
                    <UserSearchFilter filter={filter} roles={roles} add={this.add.bind(this)} handleInputChange={this.handleInputChange.bind(this)} />
                    <UsersList users={users} sortField={filter.usersSortField || ''} 
                                 deleteUser={this.deleteUser.bind(this)} sortUsers={this.sortUsers.bind(this)} />
                </div>
            );        
    }
}

function mapStateToProps(state, ownProps) {
    return {
      filter: state.userReducer.usersSearchFilter,            
      users: state.userReducer.filteredUsers || [],
      roles: state.userReducer.roles || []   
    };
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      userActions: bindActionCreators(userActions, dispatch)      
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UsersPage)
  );