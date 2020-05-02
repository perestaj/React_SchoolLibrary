import React from "react";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../common/Fields';

let UserEditForm = ({isAddMode, roles, handleSubmit, cancel, redirectToUsersList, error}) => {
    
    const returnButton = isAddMode ? (<button className="btn btn-secondary" onClick={redirectToUsersList}>Return</button>) :
    (<button className="btn btn-secondary" onClick={cancel}>Cancel</button>);

    return (
        <div>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                {isAddMode ? 'Add User' : 'Edit User'}
            </h1>
            
            <div style={{ width: "800px", margin: "0 auto" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">UserName:</label>
                        <div className="col-sm-9">
                            <Field name="userName" type="text" placeholder="Enter username" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Password:</label>
                        <div className="col-sm-9">
                            <Field name="password" type="password" placeholder="Enter password" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Confirm Password:</label>
                        <div className="col-sm-9">
                            <Field name="passwordConfirm" type="password" placeholder="Confirm password" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">First Name:</label>
                        <div className="col-sm-9">
                            <Field name="firstName" type="text" placeholder="Enter first name" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Last Name:</label>
                        <div className="col-sm-9">
                            <Field name="lastName" type="text" placeholder="Enter last name" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email:</label>
                        <div className="col-sm-9">
                            <Field name="email" type="text" placeholder="Enter email" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address:</label>
                        <div className="col-sm-9">
                            <Field name="address" type="text" placeholder="Enter address" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Role:</label>
                        <div className="col-sm-9">
                            {roles.map(role => (
                                <div className="form-check" key={role.id.toString()}>
                                    <label className="form-check-label">
                                        <Field className="form-check-input" component="input" type="radio" name="role" value={role.id.toString()} />                                    
                                        {role.name}
                                    </label>                                    
                              </div>
                            )
                            )}

                            <Field name="role" component={({ input, type, meta: { touched, error, warning }, ...props })=> (
                               <div>{touched && error && (<div className='text-danger'>{error} </div>)}</div>
                            )} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-offset-3 col-sm-9">
                            <span style={{ marginRight: "20px" }}>
                                <button className="btn btn-primary" type="submit">{isAddMode ? 'Add' : 'Update' }</button>
                            </span>
                            {returnButton}
                        </div>
                    </div>
                    {error && <div className="alert alert-danger" role="alert" style={{marginTop: '20px'}}>{error}</div>} 
                </form>
            </div>
        </div>
    );
};

const validate = values => {
    const errors = {};
  
    if (!values.userName) {
        errors.userName = 'Field required';
    } else if (values.userName.length > 50) {
        errors.userName = 'The field cannot contain more than 50 characters';
    }

    let password = values.password || '';
    let passwordConfirm = values.passwordConfirm || '';

    if ((!values.userID || values.userID === 0) && password.length === 0) {
        errors.password = 'Field required';
    } else if ((password.length > 0 || passwordConfirm.length > 0) && (password !== passwordConfirm)){
        errors.passwordConfirm = 'Passwords must match';
    }

    if (password.length > 128) {
        errors.password = 'The field cannot contain more than 128 characters';
    }

    if (!values.firstName) {
      errors.firstName = 'Field required';
    } else if (values.firstName.length > 50) {
      errors.firstName = 'The field cannot contain more than 50 characters';
    }

    if (!values.lastName) {
        errors.lastName = 'Field required';
    } else if (values.lastName.length > 50) {
        errors.lastName = 'The field cannot contain more than 50 characters';
    }
  
    if (values.email && values.email.length > 0) {
        if (values.email.length > 100) {
            errors.email = 'The field cannot contain more than 100 characters';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
    }
    if (values.address && values.address.length > 200) {
        errors.address = 'The field cannot contain more than 200 characters';
    }
  
    if (!values.role || values.role < 1) {
      errors.role = 'Select role';
    }
  
    return errors;
  }

UserEditForm.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.object),
    handleSubmit: PropTypes.func,    
    isAddMode: PropTypes.bool, 
    cancel: PropTypes.func, 
    redirectToUsersList: PropTypes.func,
    error: PropTypes.string
  }
  
  export default reduxForm({ form: 'userForm', validate })(UserEditForm);