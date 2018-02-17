import React from "react";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { InputField, DatePickerField, SelectField } from '../common/Fields';

let BookEditForm = ({handleSubmit, authors, publishers, isAddMode, cancel, redirectToBooksList}) => {
      
   const returnButton = isAddMode ? (<button className="btn btn-secondary" onClick={redirectToBooksList}>Return</button>) :
    (<button className="btn btn-secondary" onClick={cancel}>Cancel</button>);

    return (
        <div>          
          <h1 className="h3 mb-3 font-weight-normal text-center">
            {isAddMode ? 'Add Book' : 'Edit Book'}
          </h1>
          <div style={{ width: "800px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Title:</label>
                <div className="col-sm-9">                 
                    <Field name="title" type="text" placeholder="Title" component={InputField}  />                 
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Release date:</label>
                <div className="col-sm-9">                 
                    <Field name="releaseDate" component={DatePickerField} />                  
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Author(s):</label>
                <div className="col-sm-9">                 
                    <Field name="authorIds" multiple={true} component={SelectField}>
                      {authors.map(author => <option key={author.authorID} value={author.authorID}>{author.fullName}</option>)}
                    </Field>                                                                            
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Publisher:</label>
                <div className="col-sm-9">                 
                    <Field name="publisherID" component={SelectField}>
                    <option>-- select publisher --</option>
                        {publishers.map(publisher => <option key={publisher.publisherID} value={publisher.publisherID}>{publisher.name}</option>)}
                    </Field>                                       
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Additional Information:</label>
                <div className="col-sm-9">                  
                      <Field name="additionalInformation" component={InputField} type="text" placeholder="Additional Information" className="form-control"/>                          
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
    )
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Field required';
  }

  if (values.title && values.title.length > 100) {
    errors.title = 'The field cannot contain more than 100 characters';
  }

  if (!values.releaseDate) {
    errors.releaseDate = 'Field required';
  }

  if (!values.authorIds || values.authorIds.length === 0) {
    errors.authorIds = 'Select author(s)';
  }

  if (!values.publisherID || isNaN(values.publisherID)){
    errors.publisherID = 'Select a publisher';
  }

  if (values.additionalInformation && values.additionalInformation.length > 1000) {
    errors.additionalInformation = 'The field cannot contain more than 1000 characters';
  }

  return errors;
}

BookEditForm.propTypes = {
  handleSubmit: PropTypes.func, 
  authors: PropTypes.arrayOf(PropTypes.object), 
  publishers: PropTypes.arrayOf(PropTypes.object),
  isAddMode: PropTypes.bool, 
  cancel: PropTypes.func, 
  redirectToBooksList: PropTypes.func
}

export default reduxForm({ form: 'bookForm', enableReinitialize: true, validate })(BookEditForm);