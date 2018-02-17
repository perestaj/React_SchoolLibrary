import React from "react";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../common/Fields';

let AuthorEditForm = ({isAddMode, handleSubmit, cancel, redirectToAuthorsList}) => {
    
    const returnButton = isAddMode ? (<button className="btn btn-secondary" onClick={redirectToAuthorsList}>Return</button>) :
    (<button className="btn btn-secondary" onClick={cancel}>Cancel</button>);

    return (
        <div>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                {isAddMode ? 'Add Author' : 'Edit Author'}
            </h1>
            
            <div style={{ width: "800px", margin: "0 auto" }}>
                <form onSubmit={handleSubmit}>
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
                        <label className="col-sm-3 col-form-label">Additional Information:</label>
                        <div className="col-sm-9">
                            <Field name="additionalInformation" type="text" placeholder="Enter additionalInformation" component={InputField}  />
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
                </form>
            </div>
        </div>
    );
};

const validate = values => {
    const errors = {};
  
    if (!values.firstName) {
      errors.firstName = 'Field required';
    }
  
    if (values.firstName && values.firstName.length > 50) {
      errors.firstName = 'The field cannot contain more than 50 characters';
    }
  
    if (!values.lastName) {
        errors.lastName = 'Field required';
      }
    
      if (values.lastName && values.lastName.length > 50) {
        errors.lastName = 'The field cannot contain more than 50 characters';
      }
  
    if (values.additionalInformation && values.additionalInformation.length > 1000) {
      errors.additionalInformation = 'The field cannot contain more than 1000 characters';
    }
  
    return errors;
  }

AuthorEditForm.propTypes = {
    handleSubmit: PropTypes.func,    
    isAddMode: PropTypes.bool, 
    cancel: PropTypes.func, 
    redirectToAuthorsList: PropTypes.func
  }
  
  export default reduxForm({ form: 'authorForm', validate })(AuthorEditForm);