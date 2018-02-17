import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Navigation from './components/common/Navigation';
import HomePage from './components/home/HomePage'
import './App.css';
import './signin.css';
import BooksPage from './components/books/BooksPage';
import BookDetailsPage from './components/books/BookDetailsPage';
import PublishersPage from './components/publishers/PublishersPage';
import PublisherDetailsPage from './components/publishers/PublisherDetailsPage';
import AuthorsPage from './components/authors/AuthorsPage';
import AuthorDetailsPage from './components/authors/AuthorDetailsPage';
import UsersPage from './components/users/UsersPage';
import UserDetailsPage from './components/users/UserDetailsPage';
import LoansPage from './components/loans/LoansPage';

import LoginPage from './components/home/LoginPage'

import * as roles from './common/roles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/home' component={HomePage} />
            <Route exact path="/books" component={BooksPage} />
            <Route path="/books/:id" component={BookDetailsPage} />            
            <PrivateRoute exact path="/administration/publishers" component={PublishersPage} roles={[roles.ADMINISTRATOR,roles.LIBRARIAN]} />
            <PrivateRoute path="/administration/publishers/:id" component={PublisherDetailsPage} roles={[roles.ADMINISTRATOR,roles.LIBRARIAN]} />            
            <PrivateRoute exact path="/administration/authors" component={AuthorsPage} roles={[roles.ADMINISTRATOR,roles.LIBRARIAN]} />
            <PrivateRoute path="/administration/authors/:id" component={AuthorDetailsPage} roles={[roles.ADMINISTRATOR,roles.LIBRARIAN]} />
            <PrivateRoute exact path="/administration/users" component={UsersPage} roles={[roles.ADMINISTRATOR]} />
            <PrivateRoute path="/administration/users/:id" component={UserDetailsPage} roles={[roles.ADMINISTRATOR]} />
            <PrivateRoute path="/loans" component={LoansPage} roles={[roles.ADMINISTRATOR,roles.LIBRARIAN]} />            
            <Route path='/login/:redirectUrl?' component={LoginPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
