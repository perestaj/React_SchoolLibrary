import React from "react";
import PropTypes from 'prop-types';

const LoanSearchFilter = ({filter, loanBookStatuses, handleInputChange})=>  {
    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <form className="form-horizontal">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label>Title:</label>
                        <div>
                            <input type="text" name='title' className="form-control" value={filter.title || ''} onChange={(event) => handleInputChange(event)}></input>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>User:</label>
                        <div>
                            <input type="text" name='user' className="form-control" value={filter.user || ''} onChange={(event) => handleInputChange(event)}></input>
                        </div>
                    </div>
                </div>
                <div className="form-group">                    
                    <div className="form-check">
                        {loanBookStatuses.map(status => (
                            <label key={status.id} style={{marginRight: '10px'}}>
                                <input type="checkbox" key={status.id} name='bookStatus' value={status.id} checked={(filter.bookStatuses || []).includes(status.id)}
                                    onChange={(event) => handleInputChange(event)} /> {status.name}
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

LoanSearchFilter.propTypes = {
    filter: PropTypes.object,
    loanBookStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleInputChange: PropTypes.func.isRequired
}

export default LoanSearchFilter;