import AuthorizationService from '../authorization/AuthorizationService';
import * as bookStatus from '../common/bookStatuses';

class LoanApi {
    static getLoans() {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch("http://localhost:4200/api/loans", {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + authorizationData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }            
        })
        .then(res => res);
    }

    static returnBook(userID, bookID) {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.AVAILABLE}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + authorizationData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res);
    }

    static requestBook(bookID) {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch(`http://localhost:4200/api/loans/request?bookID=${bookID}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + authorizationData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res);
    }

    static lendBook(userID, bookID) {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.BORROWED}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + authorizationData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res);
    }

    static setBookStatusToLost(userID, bookID) {
        var authorizationData = AuthorizationService.getAuthorizationData();

        return fetch(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.LOST}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + authorizationData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res);
    }
}

export default LoanApi;