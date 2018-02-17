import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import TableHeader from '../common/TableHeader';

import * as fields from '../../common/userSortFields';

let UsersList = ({users, sortField, deleteUser, sortUsers}) => { 
    if (!users || users.length === 0) {
        return ( <div style={{ textAlign: "center" }}>0 users found</div> );
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>
                            <TableHeader title="Full Name" field={fields.FULL_NAME} sortField={sortField} sort={sortUsers} />
                        </th>
                        <th>
                            <TableHeader title="Email" field={fields.EMAIL} sortField={sortField} sort={sortUsers} />
                        </th>
                        <th>
                            <TableHeader title="Address" field={fields.ADDRESS} sortField={sortField} sort={sortUsers} />
                        </th>
                        <th>
                            <TableHeader title="Role" field={fields.ROLE_NAME} sortField={sortField} sort={sortUsers} />
                        </th>
                        <th />                
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => (
                    <tr key={item.userID}>
                        <td>
                            <NavLink to={"/administration/users/" + item.userID}>{item.fullName}</NavLink>
                        </td>
                        <td>{item.email}</td>  
                        <td>{item.address}</td>      
                        <td>{item.roleName}</td>              
                        <td>                            
                            <button className="btn btn-danger" style={{marginLeft: '10px'}} onClick={event => deleteUser(event, item.userID)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),    
    sortField: PropTypes.string, 
    deleteUser: PropTypes.func, 
    sortUsers: PropTypes.func
}

export default UsersList;