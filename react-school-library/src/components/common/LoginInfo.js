import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authorizationActions from '../../actions/authorizationActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class LoginInfo extends Component {
    logoff(e) {
        e.preventDefault();
        
        this.props.actions.logoff(this.props.history, '/home');
    }

    render() {
        const currentUser = this.props.currentUser;
        if (currentUser && currentUser.isLoggedIn) {
            return (
                <div>
                    Welcome <strong>{currentUser.username}</strong>, click <a href="/" style={{cursor: 'pointer'}} onClick={(e) => this.logoff(e)}>here</a> to log off
                </div>
            )
        }
        return (
            <div>
                <NavLink to='/login/home'>Log In</NavLink>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {    
    return {
        currentUser: state.authorizationReducer        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(authorizationActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginInfo));