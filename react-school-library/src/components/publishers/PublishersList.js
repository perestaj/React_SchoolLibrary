import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import TableHeader from '../common/TableHeader';

import * as fields from '../../common/publisherSortFields';

let PublishersList = ({publishers, sortField, deletePublisher, sortPublishers}) => { 
    if (!publishers || publishers.length === 0) {
        return ( <div style={{ textAlign: "center" }}>0 publishers found</div> );
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>
                            <TableHeader title="Name" field={fields.NAME} sortField={sortField} sort={sortPublishers} />
                        </th>
                        <th>
                            <TableHeader title="Address" field={fields.ADDRESS} sortField={sortField} sort={sortPublishers} />
                        </th>
                        <th>
                            <TableHeader title="Additional Information" field={fields.ADDITIONAL_INFORMATION} sortField={sortField} sort={sortPublishers} />
                        </th>
                        <th />                
                    </tr>
                </thead>
                <tbody>
                    {publishers.map(item => (
                    <tr key={item.publisherID}>
                        <td>
                            <NavLink to={"/administration/publishers/" + item.publisherID}>{item.name}</NavLink>
                        </td>
                        <td>{item.address}</td>      
                        <td>{item.additionalInformation}</td>              
                        <td> 
                            <button className="btn btn-danger" style={{marginLeft: '10px'}} onClick={event => deletePublisher(event, item.publisherID)}>Delete</button>                    
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

PublishersList.propTypes = {
    publishers: PropTypes.arrayOf(PropTypes.object),    
    sortField: PropTypes.string, 
    deletePublisher: PropTypes.func, 
    sortPublishers: PropTypes.func
}

export default PublishersList;