import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import TableHeader from '../common/TableHeader';

import * as fields from '../../common/authorSortFields';

let AuthorsList = ({authors, sortField, deleteAuthor, sortAuthors}) => { 

    if (!authors || authors.length === 0) {
        return ( <div style={{ textAlign: "center" }}>0 authors found</div> );
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>
                            <TableHeader title="Full Name" field={fields.FULL_NAME} sortField={sortField} sort={sortAuthors} />
                        </th>
                        <th>
                            <TableHeader title="Additional Information" field={fields.ADDITIONAL_INFORMATION} sortField={sortField} sort={sortAuthors} />
                        </th>
                        <th />                
                    </tr>
                </thead>
                <tbody>
                    {authors.map(item => (
                    <tr key={item.authorID}>
                        <td>
                            <NavLink to={"/administration/authors/" + item.authorID}>{item.fullName}</NavLink>
                        </td>
                        <td>{item.additionalInformation}</td>              
                        <td> 
                            <button className="btn btn-danger" style={{marginLeft: '10px'}} onClick={event => deleteAuthor(event, item.authorID)}>Delete</button>                    
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

AuthorsList.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object),     
    sortField: PropTypes.string, 
    deleteAuthor: PropTypes.func, 
    sortAuthors: PropTypes.func
}

export default AuthorsList;