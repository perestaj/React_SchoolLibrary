import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loanReducer(state = { 
    loansSearchFilter: initialState.loansSearchFilter, 
    filteredLoans: initialState.filteredLoans,
    loans: initialState.loans, 
    
}, action) {
    switch (action.type) {
        case types.FILTER_LOANS:
            return Object.assign({}, state, {
                loansSearchFilter: action.loansSearchFilter
            });

        case types.LOAD_FILTERED_LOANS_SUCCESS:
        return {
            ...state,
            filteredLoans: action.loans
        };

        case types.LOAD_LOANS_SUCCESS:
        return Object.assign({}, state, {
            loans: action.loans
        });        

        default:
            return state;
    }
}