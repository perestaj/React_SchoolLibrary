import React from "react";
import PropTypes from 'prop-types';

let PublisherSearchFilter = ({filter, handleInputChange, addPublisher}) => {
    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <form>
                <div className="form-group">               
                    <div>
                        <button className="btn btn-primary" onClick={event => addPublisher(event)}>Add</button>
                    </div>                
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label>Name:</label>
                        <div>
                            <input type="text" name='name' className="form-control" value={filter.name || ''} 
                                    onChange={(event) => handleInputChange(event)}></input>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Address:</label>
                        <div>
                            <input type="text" name='address' className="form-control" value={filter.address || ''} 
                                    onChange={(event) => handleInputChange(event)}></input>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
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

PublisherSearchFilter.propTypes = {    
    filter: PropTypes.object,    
    handleInputChange: PropTypes.func,
    addPublisher: PropTypes.func
}

export default PublisherSearchFilter;