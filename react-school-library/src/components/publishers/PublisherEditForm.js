import React from "react";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../common/Fields';

let PublisherEditForm = ({isAddMode, handleSubmit, cancel, redirectToPublishersList}) => {
    
    const returnButton = isAddMode ? (<button className="btn btn-secondary" onClick={redirectToPublishersList}>Return</button>) :
    (<button className="btn btn-secondary" onClick={cancel}>Cancel</button>);

    return (
        <div>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                {isAddMode ? 'Add Publisher' : 'Edit Publisher'}
            </h1>
            
            <div style={{ width: "800px", margin: "0 auto" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Name:</label>
                        <div className="col-sm-9">
                            <Field name="name" type="text" placeholder="Enter name" component={InputField}  />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address:</label>
                        <div className="col-sm-9">
                            <Field name="address" type="text" placeholder="Enter address" component={InputField}  />
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
  
    if (!values.name) {
      errors.name = 'Field required';
    }
  
    if (values.name && values.name.length > 50) {
      errors.name = 'The field cannot contain more than 50 characters';
    }
  
    if (!values.address) {
        errors.address = 'Field required';
      }
    
      if (values.address && values.address.length > 200) {
        errors.address = 'The field cannot contain more than 200 characters';
      }
  
    if (values.additionalInformation && values.additionalInformation.length > 1000) {
      errors.additionalInformation = 'The field cannot contain more than 1000 characters';
    }
  
    return errors;
  }

PublisherEditForm.propTypes = {
    handleSubmit: PropTypes.func,    
    isAddMode: PropTypes.bool, 
    cancel: PropTypes.func, 
    redirectToPublishersList: PropTypes.func
  }
  
  export default reduxForm({ form: 'publisherForm', validate })(PublisherEditForm);