import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import TableHeader from '../common/TableHeader';

import * as fields from '../../common/bookSortFields';
import * as bookStatuses from '../../common/bookStatuses';

function BooksList({books, showDeleteButton, showRequestBook, sortField, requestBook, deleteBook, sort}) {   
    
    if (!books || books.length === 0) {
        return ( <div style={{ textAlign: "center" }}>0 books found</div> );
    }
    
    return (
    <div style={{width: '95%', margin: '0 auto'}}>
        <table className="table table-striped table-bordered table-hover">
            <thead className="thead-light">
                <tr>
                    <th scope="col"><TableHeader title="Title" field={fields.TITLE} sortField={sortField} sort={sort} /></th>
                    <th scope="col"><TableHeader title="Author(s)" field={fields.AUTHORS} sortField={sortField} sort={sort} /></th>
                    <th scope="col"><TableHeader title="Publisher" field={fields.PUBLISHER} sortField={sortField} sort={sort} /></th>
                    <th scope="col"><TableHeader title="Release Date" field={fields.RELEASE_DATE} sortField={sortField} sort={sort} /></th>
                    <th scope="col"><TableHeader title="Status" field={fields.STATUS} sortField={sortField} sort={sort} /></th>
                    <th scope="col" />                
                </tr>
            </thead>
            <tbody>
                {books.map(item => (
                <tr key={item.bookID}>
                    <td>
                        <NavLink to={"/books/" + item.bookID}>{item.title}</NavLink>
                    </td>
                    <td>{item.authorsList}</td>
                    <td>{item.publisherName}</td>
                    <td>{new Date(item.releaseDate).toLocaleDateString()}</td>
                    <td>{item.statusName}</td>
                    <td>
                    {item.status === bookStatuses.AVAILABLE && showRequestBook && (
                        <button className="btn btn-primary" onClick={event => requestBook(event, item.bookID)}>Request the Book</button>
                    )}                  
                    {showDeleteButton &&
                        (
                        <button className="btn btn-danger" style={{marginLeft: '10px'}} onClick={event => deleteBook(event, item.bookID)}>Delete</button>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );    
}

BooksList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object), 
    showDeleteButton: PropTypes.bool, 
    showRequestBook: PropTypes.bool, 
    sortField:PropTypes.string, 
    requestBook: PropTypes.func, 
    deleteBook: PropTypes.func, 
    sort: PropTypes.func
}

export default BooksList;