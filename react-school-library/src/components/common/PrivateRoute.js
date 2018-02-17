import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isLoggedIn, role, roles } = rest;
    if (isLoggedIn && roles.find(r => r === role)) {
        return (
            <Route {...rest} render={props =>
                <Component {...props} />
            } />
        );
    }

    return (
        <Route {...rest} render={props => <Redirect to={{ pathname: '/login' + props.location.pathname }} />} />
    );
}

function mapStateToProps(state, ownProps) {
    const { isLoggedIn, role } = state.authorizationReducer;

    return {
        role,
        isLoggedIn
    };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));