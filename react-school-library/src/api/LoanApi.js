import * as bookStatus from '../common/bookStatuses';
import axios from "axios";

class LoanApi {
    static getLoans() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/loans`);
    }

    static returnBook(userID, bookID) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/loans/update/${userID}/${bookID}/${bookStatus.AVAILABLE}`);
    }

    static requestBook(bookID) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/loans/request?bookID=${bookID}`);
    }

    static lendBook(userID, bookID) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/loans/update/${userID}/${bookID}/${bookStatus.BORROWED}`);
    }

    static setBookStatusToLost(userID, bookID) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/loans/update/${userID}/${bookID}/${bookStatus.LOST}`);
    }
}

export default LoanApi;