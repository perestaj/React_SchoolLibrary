import React from "react";
import PropTypes from 'prop-types';

const PublisherDetailsForm = ({publisher, edit, redirectToPublishersList}) => {

    return (
        <div>          
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Publisher Details
          </h1>
          <div style={{ width: "800px", margin: "0 auto" }}>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{publisher.name}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Address:</label>
                <div className="col-sm-9">
                    <label className="col-form-label">{publisher.address}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Additional Information:</label>
                <div className="col-sm-9">
                <label className="col-form-label">{publisher.additionalInformation}</label>
                </div>
              </div>             

              <div className="form-group row">
                <div className="col-sm-offset-3 col-sm-9">                
                  <span style={{ marginRight: "20px" }}>
                    <button className="btn btn-primary" onClick={edit}>Edit</button>
                  </span>                
                  <button className="btn btn-secondary" onClick={redirectToPublishersList}>Return</button>
                </div>
              </div>
            </form>
          </div>          
        </div>
    )
};

PublisherDetailsForm.propTypes = {    
    publisher: PropTypes.object, 
    edit: PropTypes.func, 
    redirectToPublishersList: PropTypes.func
  }

export default PublisherDetailsForm;
