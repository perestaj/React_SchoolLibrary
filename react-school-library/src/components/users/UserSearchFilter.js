import React from "react";
import PropTypes from 'prop-types';

let UserSearchFilter = ({filter, roles, add, handleInputChange}) => {
    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <div className="form-group">               
                    <div>
                        <button className="btn btn-primary" onClick={event => add(event)}>Add</button>
                    </div>                
                </div>
            <form>                
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label>Full Name:</label>
                        <div>
                            <input type="text" name='fullName' className="form-control" value={filter.fullName || ''} 
                                    onChange={(event) => handleInputChange(event)}></input>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Email:</label>
                        <div>
                            <input type="text" name='email' className="form-control" value={filter.email || ''} 
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
                </div>
                <div className="form-group">                    
                    <div className="form-check">
                        {roles.map(role => (
                            <label key={role.id} style={{marginRight: '10px'}}>
                                <input type="checkbox" key={role.id} name='role' value={role.id} checked={(filter.roles || []).includes(role.id)}
                                    onChange={(event) => handleInputChange(event)} /> {role.name}
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

UserSearchFilter.propTypes = {    
    filter: PropTypes.object,    
    roles: PropTypes.arrayOf(PropTypes.object),
    handleInputChange: PropTypes.func    
}

export default UserSearchFilter;