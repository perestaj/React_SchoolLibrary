import React from "react";
import PropTypes from 'prop-types';

let AuthorSearchFilter = ({filter, handleInputChange, addAuthor}) => {
    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <form>
                <div className="form-group">               
                    <div>
                        <button className="btn btn-primary" onClick={event => addAuthor(event)}>Add</button>
                    </div>                
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                            <label>Full Name:</label>
                            <div>
                                <input type="text" name='fullName' className="form-control" value={filter.fullName || ''} 
                                       onChange={(event) => handleInputChange(event)}></input>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Additional Information:</label>
                            <div>
                                <input type="text" name='additionalInformation' className="form-control" value={filter.additionalInformation || ''} 
                                       onChange={(event) => handleInputChange(event)}></input>
                            </div>
                        </div>
                </div>
            </form>
        </div>
    )
}

AuthorSearchFilter.propTypes = {    
    filter: PropTypes.object,    
    handleInputChange: PropTypes.func,
    addAuthor: PropTypes.func
}

export default AuthorSearchFilter;