import React from "react";
import PropTypes from 'prop-types';

const AuthorDetailsForm = ({author, edit, redirectToAuthorsList}) => {

    return (
        <div>          
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Author Details
          </h1>
          <div style={{ width: "800px", margin: "0 auto" }}>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">First Name:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{author.firstName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Last Name:</label>
                <div className="col-sm-9">
                    <label className="col-form-label">{author.lastName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Additional Information:</label>
                <div className="col-sm-9">
                <label className="col-form-label">{author.additionalInformation}</label>
                </div>
              </div>             

              <div className="form-group row">
                <div className="col-sm-offset-3 col-sm-9">                
                  <span style={{ marginRight: "20px" }}>
                    <button className="btn btn-primary" onClick={edit}>Edit</button>
                  </span>                
                  <button className="btn btn-secondary" onClick={redirectToAuthorsList}>Return</button>
                </div>
              </div>
            </form>
          </div>          
        </div>
    )
};

AuthorDetailsForm.propTypes = {    
    author: PropTypes.object, 
    edit: PropTypes.func, 
    redirectToAuthorsList: PropTypes.func
  }

export default AuthorDetailsForm;
