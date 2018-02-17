import React, { Component } from 'react';

import { connect } from 'react-redux';
import {login} from '../../actions/authorizationActions';

import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';

import { SubmissionError } from 'redux-form'

class LoginPage extends Component {
    async logIn(values, dispatch) {
        try {
            await dispatch(login(values.username, values.password, this.props.history, this.props.match.params.redirectUrl));            
        }
        catch(err) {
            if(err instanceof SubmissionError) {
                throw err;
            }
        }
    }
    
    render() {
        return (
            <LoginForm onSubmit={(values, dispatch) => this.logIn(values, dispatch)} />
        );        
    }
}

function mapStateToProps(state, ownProps) {
    return {}    
}


export default withRouter(connect(mapStateToProps)(LoginPage));