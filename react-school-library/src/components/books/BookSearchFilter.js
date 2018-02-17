import React from "react";
import PropTypes from 'prop-types';

function BookSearchFilter ({authors, publishers, filter, showAddButton, handleInputChange, add})  {
    
return (
    <div style={{width: '95%', margin: '0 auto'}}>
        <form>
            {showAddButton &&
            (
                <div className="form-group">               
                    <div>
                        <button className="btn btn-primary" onClick={event => add(event)}>Add</button>
                    </div>                
                </div>
            )}
            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <label>Title:</label>
                    <div>
                        <input type="text" name="title" className="form-control" value={filter.title || ""} onChange={event => handleInputChange(event)} />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label className="control-label">Author(s):</label>
                    <div>
                    <select name="authorID" value={filter.authorID || 0} onChange={event => handleInputChange(event)} className="form-control">
                        <option value='0'>-- ALL --</option>
                        {authors.map(author => (
                        <option key={author.authorID} value={author.authorID}>
                            {author.fullName}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label>Publisher:</label>
                    <div>
                    <select name="publisherID" value={filter.publisherID || 0} onChange={event => handleInputChange(event)} className="form-control">
                        <option value='0'>-- ALL --</option>
                        {publishers.map(publisher => (
                        <option key={publisher.publisherID} value={publisher.publisherID}>{publisher.name}</option>
                        ))}
                    </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input type="checkbox" id="chkOnlyAvailable" className="form-check-input" name="onlyAvailable" checked={filter.onlyAvailable || false}
                    onChange={event => handleInputChange(event)} />

                    <label className="form-check-label" htmlFor="chkOnlyAvailable">Only available</label>
                </div>
            </div>
        </form>
    </div>
);    
}

BookSearchFilter.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object), 
    publishers: PropTypes.arrayOf(PropTypes.object), 
    filter: PropTypes.object, 
    showAddButton: PropTypes.bool, 
    handleInputChange: PropTypes.func, 
    add: PropTypes.func
}

export default BookSearchFilter;