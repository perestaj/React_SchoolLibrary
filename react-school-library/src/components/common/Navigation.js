import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import LoginInfo from "./LoginInfo";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AccessManager from '../../authorization/AccessManager';

class Navigation extends Component {
  render() {
    const currentUser = this.props.currentUser;
    
    let privateLinks = (
        <Fragment>
          { AccessManager.canEditLoans(currentUser) && <li className="nav-item">
              <NavLink to="/loans" activeClassName="active" className="nav-link">Loans</NavLink>
            </li> }
          { AccessManager.displayAdministrationLink(currentUser) && 
            <li className="nav-item dropdown">
              <NavLink to='/administration' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Administration</NavLink>
              <div className="dropdown-menu">      
                {AccessManager.canEditAuthors(currentUser) && <NavLink to="/administration/authors" className="dropdown-item">Authors</NavLink> }
                {AccessManager.canEditPublishers(currentUser) && <NavLink to="/administration/publishers" className="dropdown-item">Publishers</NavLink>  } 
                {AccessManager.canEditUsers(currentUser) && <NavLink to="/administration/users" className="dropdown-item">Users</NavLink> }     
              </div>
            </li>  
          }
        </Fragment>
    );

    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">School Library</h5>
        
          <ul className="nav">
            <li className="nav-item">
              <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>              
            </li>
            <li className="nav-item">
              <NavLink to="/books" activeClassName="active" className="nav-link">Books</NavLink>
            </li>
            {privateLinks}            
          </ul>
        
        <span style={{ textAlign: "right" }}>
          <LoginInfo />
        </span>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.authorizationReducer    
  };
}

export default withRouter(connect(mapStateToProps)(Navigation));
