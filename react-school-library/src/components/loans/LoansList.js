import React from "react";
import PropTypes from 'prop-types';
import * as bookStatus from '../../common/bookStatuses';
import * as fields from '../../common/loanSortFields';
import TableHeader from '../common/TableHeader';

const BookStatusSelector = ({status, userID, bookID, lendBook, returnBook, setBookStatusToLost}) => {        
    return (
        <div className="btn-group" role="group">
            <button id="bookStatusSelector" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Change status
            </button>
            <div className="dropdown-menu" aria-labelledby="bookStatusSelector">
                { status === bookStatus.REQUESTED && (
                    <a className="dropdown-item" style={{cursor: 'pointer'}} onClick={(event) => lendBook(event, userID, bookID)}>Borrowed</a>
                )}

                {(status === bookStatus.REQUESTED || status === bookStatus.BORROWED) && (
                    <a className="dropdown-item" style={{cursor: 'pointer'}} onClick={(event) => returnBook(event, userID, bookID)}>Available</a>
                )}

                <a className="dropdown-item" style={{cursor: 'pointer'}} onClick={(event) => setBookStatusToLost(event, userID, bookID)}>Lost</a>
            </div>
        </div>
    );
};

const LoansList = ({loans, sortField, sort, lendBook, returnBook, setBookStatusToLost}) => {

    if (!loans || loans.length === 0){
        return (<div style={{ textAlign: 'center' }}>0 loans found</div>);
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col"><TableHeader title="Title" field={fields.TITLE} sortField={sortField} sort={sort} /></th>
                        <th scope="col"><TableHeader title="Author(s)" field={fields.AUTHORS} sortField={sortField} sort={sort} /></th>
                        <th scope="col"><TableHeader title="User" field={fields.USER} sortField={sortField} sort={sort} /></th>
                        <th scope="col"><TableHeader title="Request Date" field={fields.REQUEST_DATE} sortField={sortField} sort={sort} /></th>
                        <th scope="col"><TableHeader title="Borrow Date" field={fields.BORROW_DATE} sortField={sortField} sort={sort} /></th>
                        <th scope="col"><TableHeader title="Status" field={fields.STATUS} sortField={sortField} sort={sort} /></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(item => (
                        <tr key={item.bookID}>
                            <td>
                                {item.book.title}
                            </td>
                            <td>
                                {item.book.authorsList}
                            </td>
                            <td>
                                {item.user.fullName}
                            </td>
                            <td>
                                {item && item.requestDate ? new Date(item.requestDate).toLocaleDateString() : ''}
                            </td>
                            <td>
                                {item && item.borrowDate ? new Date(item.borrowDate).toLocaleDateString() : ''}
                            </td>
                            <td>
                                {item.book.statusName}
                            </td>
                            <td>
                                {item.book.status !== bookStatus.LOST && 
                                    <BookStatusSelector userID={item.userID} bookID={item.bookID} status={item.book.status} lendBook={lendBook} 
                                                        returnBook={returnBook} setBookStatusToLost={setBookStatusToLost} />
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

LoansList.propTypes = {
    loans: PropTypes.arrayOf(PropTypes.object), 
    sortField: PropTypes.string, 
    sort: PropTypes.func, 
    lendBook: PropTypes.func, 
    returnBook: PropTypes.func, 
    setBookStatusToLost: PropTypes.func
}

export default LoansList;