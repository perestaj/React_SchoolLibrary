import * as roles from '../common/roles';

export default class AccessManager {
    static canAddBook(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }
    
    static canEditBook(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }

    static canDeleteBook(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }

    static canRequestBook(currentUser) {
        return currentUser && currentUser.isLoggedIn;
    }

    static canEditLoans(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }

    static displayAdministrationLink(currentUser) {
        return this.canEditAuthors(currentUser) || this.canEditPublishers(currentUser) || this.canEditUsers(currentUser);
    }

    static canEditAuthors(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }

    static canEditPublishers(currentUser){
        return currentUser && currentUser.isLoggedIn && (currentUser.role===roles.LIBRARIAN || currentUser.role===roles.ADMINISTRATOR);
    }

    static canEditUsers(currentUser){
        return currentUser && currentUser.isLoggedIn && currentUser.role===roles.ADMINISTRATOR;
    }
}