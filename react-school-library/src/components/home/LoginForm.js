import React from "react";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const LoginForm = ({handleSubmit, error})=>{
    return (
        <div>
            <form className="form-signin" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

                <label htmlFor="username" className="sr-only">Username</label>
                <Field name="username" type="text" placeholder="Enter Username" className="form-control" component="input" />
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <Field name="password" type="password" placeholder="Enter Password" className="form-control" component="input" />
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {error && <div className="alert alert-danger" role="alert" style={{marginTop: '20px'}}>{error}</div>}                
            </form>
            
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default reduxForm({ form: 'loginForm' })(LoginForm);