import * as types from './actionTypes';
import { ajaxCallError, ajaxCallSuccess } from './ajaxStatusActions';
import LoanApi from '../api/LoanApi';
import { loadBooks } from './bookActions'

import * as fields from '../common/loanSortFields';

function filterLoansSuccess(loansSearchFilter) {
    return { type: types.FILTER_LOANS, loansSearchFilter };
}

function loadFilteredLoansSuccess(loans) {
    return { type: types.LOAD_FILTERED_LOANS_SUCCESS, loans };
}

function loadLoansSuccess(loans) {
    return { type: types.LOAD_LOANS_SUCCESS, loans };
}

function getFilteredLoans(loans, loansSearchFilter) {
    if (!loansSearchFilter) {
        return loans;
    }

    let filteredLoans = loans.filter((loan) => {        
        let titleQuery = !loansSearchFilter.title || loansSearchFilter.title.length === 0 || loan.book.title.toUpperCase().includes(loansSearchFilter.title.toUpperCase());
        let userQuery = !loansSearchFilter.user || loansSearchFilter.user.length === 0 || loan.user.fullName.toUpperCase().includes(loansSearchFilter.user.toUpperCase());
        let statusQuery = !loansSearchFilter.bookStatuses || loansSearchFilter.bookStatuses.includes(loan.book.status);

        return titleQuery && userQuery && statusQuery;
    });

    if (filteredLoans){
        filteredLoans.sort((first, second)=>{               
          let firstField='';
          let secondField='';
  
  
          if (loansSearchFilter.loansSortField === fields.TITLE) {
            firstField = first.book.title.toUpperCase();
            secondField = second.book.title.toUpperCase();                    
          }
          else if (loansSearchFilter.loansSortField === fields.AUTHORS) {
            firstField = first.book.authorsList.toUpperCase();
            secondField = second.book.authorsList.toUpperCase();          
          }
          else if (loansSearchFilter.loansSortField === fields.USER) {
            firstField = first.user.fullName.toUpperCase();
            secondField = second.user.fullName.toUpperCase();          
          }
          else if (loansSearchFilter.loansSortField === fields.REQUEST_DATE) {
            firstField = first.requestDate;
            secondField = second.requestDate;          
          }
          else if (loansSearchFilter.loansSortField === fields.BORROW_DATE) {
            firstField = first.borrowDate;
            secondField = second.borrowDate;          
          }
          else if (loansSearchFilter.loansSortField === fields.STATUS) {
            firstField = first.book.statusName.toUpperCase();
            secondField = second.book.statusName.toUpperCase();          
          }
          else {
            return 0;
          }
  
          let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
          if (loansSearchFilter.loansSortDesc) {
            comparison = -comparison;
          }
  
          return comparison;
        });
      }




    return filteredLoans;
}

export function filterLoans(loansSearchFilter) {
    return (dispatch, getState) => {
        dispatch(filterLoansSuccess(loansSearchFilter));

        var loans = getState().loanReducer.loans;

        var filteredLoans = getFilteredLoans(loans, loansSearchFilter);

        dispatch(loadFilteredLoansSuccess(filteredLoans));
    };
}

export function loadLoans() {
    return (dispatch, getState) => {
        LoanApi.getLoans().then(response => {
            if (response.ok) {
                response.json()
                    .then(loans => {
                        dispatch(loadLoansSuccess(loans));

                        var loansSearchFilter = getState().loanReducer.loansSearchFilter;

                        var filteredLoans = getFilteredLoans(loans, loansSearchFilter);

                        dispatch(loadFilteredLoansSuccess(filteredLoans));

                        dispatch(ajaxCallSuccess());
                    })
            }
            else {
                dispatch(ajaxCallError());
            }
        })
            .catch(error => {
                throw (error);
            });
    };
}



export function requestBook(bookID, history) {
    return (dispatch, getState) => {
        LoanApi.requestBook(bookID)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            loadBooks()(dispatch, getState);
                        })
                }
                else if (response.status === 401) {
                    history.push('/login' + (history.location.pathname || ''));
                }
                else {
                    dispatch(ajaxCallError());
                }
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function returnBook(userID, bookID, history) {
    return (dispatch, getState) => {
        LoanApi.returnBook(userID, bookID)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            loadLoans()(dispatch, getState);
                        })
                }
                else if (response.status === 404) {
                    history.push('/login' + (history.location.pathname || ''));
                }
                else {
                    dispatch(ajaxCallError());
                }
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function lendBook(userID, bookID, history) {
    return (dispatch, getState) => {
        LoanApi.lendBook(userID, bookID)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            loadLoans()(dispatch, getState);
                        })
                }
                else if (response.status === 404) {
                    history.push('/login' + (history.location.pathname || ''));
                }
                else {
                    dispatch(ajaxCallError());
                }
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function setBookStatusToLost(userID, bookID, history) {
    return (dispatch, getState) => {
        LoanApi.setBookStatusToLost(userID, bookID)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            loadLoans()(dispatch, getState);
                        })
                }
                else if (response.status === 404) {
                    history.push('/login' + (history.location.pathname || ''));
                }
                else {
                    dispatch(ajaxCallError());
                }
            })
            .catch(error => {
                throw (error);
            });
    };
}