import React from "react";
import PropTypes from 'prop-types';

const UserDetailsForm = ({user, edit, redirectToUsersList}) => {

    return (
        <div>          
          <h1 className="h3 mb-3 font-weight-normal text-center">
            User Details
          </h1>
          <div style={{ width: "800px", margin: "0 auto" }}>
            <form>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">UserName:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{user.userName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">First Name:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{user.firstName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Last Name:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{user.lastName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Email:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{user.email}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Address:</label>
                <div className="col-sm-9">
                    <label className="col-form-label">{user.address}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Date Of Birth::</label>
                <div className="col-sm-9">
                    <label className="col-form-label">{user && user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '' }</label>
                </div>
              </div>             

              <div className="form-group row">
                <div className="col-sm-offset-3 col-sm-9">                
                  <span style={{ marginRight: "20px" }}>
                    <button className="btn btn-primary" onClick={edit}>Edit</button>
                  </span>                
                  <button className="btn btn-secondary" onClick={redirectToUsersList}>Return</button>
                </div>
              </div>
            </form>
          </div>          
        </div>
    )
};

UserDetailsForm.propTypes = {    
    user: PropTypes.object, 
    edit: PropTypes.func, 
    redirectToUsersList: PropTypes.func
  }

export default UserDetailsForm;
