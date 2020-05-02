import React from "react";
import PropTypes from 'prop-types';

const BookDetailsForm = (props) => {
   const {showEditButton, book, edit, redirectToBooksList} = props;
   
    return (
        <div>          
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Book Details
          </h1>
          <div style={{ width: "800px", margin: "0 auto" }}>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Title:</label>
                <div className="col-sm-9">                                   
                  <label className="col-form-label">{book.title}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Author(s):</label>
                <div className="col-sm-9">
                 <label className="col-form-label">{book.authorsList}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Publisher:</label>
                <div className="col-sm-9">
                 <label className="col-form-label">{book.publisherName}</label>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Additional Information:</label>
                <div className="col-sm-9">
                 <label className="col-form-label">{book.additionalInformation}</label>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-offset-3 col-sm-9">
                {showEditButton&&
                  <span style={{ marginRight: "20px" }}>
                    <button className="btn btn-primary" onClick={edit}>Edit</button>
                  </span>
                }
                  <button className="btn btn-secondary" onClick={redirectToBooksList}>Return</button>
                </div>
              </div>
            </form>
          </div>          
        </div>
    )
}

BookDetailsForm.propTypes = {
  showEditButton: PropTypes.bool, 
  book: PropTypes.object, 
  edit: PropTypes.func, 
  redirectToBooksList: PropTypes.func
}

export default BookDetailsForm;