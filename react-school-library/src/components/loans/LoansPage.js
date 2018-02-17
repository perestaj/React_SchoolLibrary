import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loanActions from '../../actions/loanActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import LoanSearchFilter from './LoanSearchFilter'; 
import LoansList from './LoansList';

class LoansPage extends Component {
    componentDidMount() {
        this.props.actions.loadLoans();
    }

    handleInputChange(event) {
        const filter = {
            ...this.props.filter,
            bookStatuses: [...this.props.filter.bookStatuses]
        };

        const target = event.target;

        if (target.type === 'checkbox' && target.name === 'bookStatus') {
            var bookStatus = Number(target.value);
            if (target.checked) {
                if (!filter.bookStatuses.includes(bookStatus)) {
                    filter.bookStatuses.push(bookStatus);
                }
            }
            else {
                filter.bookStatuses = filter.bookStatuses.filter(x => x !== bookStatus);
            }
        } else {
            filter[target.name] = target.value;
        }

        this.props.actions.filterLoans(filter);
    }

    sort(field) {
        const filter = { ...this.props.filter, bookStatuses: [...this.props.filter.bookStatuses] };
    
        filter.loansSortDesc = field === filter.loansSortField ? !filter.loansSortDesc : false;
        filter.loansSortField = field;
    
        this.props.actions.filterLoans(filter);
      }

    returnBook(event, userID, bookID) {
        event.preventDefault();

        this.props.actions.returnBook(userID, bookID, this.props.history);
    }

    lendBook(event, userID, bookID) {
        event.preventDefault();

        this.props.actions.lendBook(userID, bookID, this.props.history);
    }

    setBookStatusToLost(event, userID, bookID) {
        event.preventDefault();

        this.props.actions.setBookStatusToLost(userID, bookID, this.props.history);
    }


    render() {
        const { ajaxCallSuccess, filter, loans, loanBookStatuses } = this.props;        

        if (!ajaxCallSuccess) {
            return <div>Error while loading loans</div>;
        } else {
            return (
                <div>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Loans</h1>

                    <LoanSearchFilter filter={filter} loanBookStatuses={loanBookStatuses} handleInputChange={this.handleInputChange.bind(this)}/>

                    <LoansList loans={loans} sortField={filter.loansSortField || ''} sort={(field)=> this.sort(field)} lendBook={this.lendBook.bind(this)} 
                               returnBook={this.returnBook.bind(this)} setBookStatusToLost={this.setBookStatusToLost.bind(this)} />
                </div>
            );
        }
    }}

function mapStateToProps(state, ownProps) {
    return {
        loanBookStatuses: (state.bookReducer.bookStatuses || []).filter(s=> s.id !== 1),
        filter: state.loanReducer.loansSearchFilter,
        loans: state.loanReducer.filteredLoans || [],
        ajaxCallSuccess: state.ajaxCallSuccess
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(loanActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoansPage));