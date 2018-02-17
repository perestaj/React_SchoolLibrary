import React, { Component } from 'react';

import { connect } from "react-redux";
import * as publisherActions from "../../actions/publisherActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import PublisherEditForm from './PublisherEditForm';
import PublisherDetailsForm from './PublisherDetailsForm';

class PublisherDetailsPage extends Component {    

    componentDidMount() {        
        const id = Number(this.props.match.params.id);
    
        if (id === 0) {      
            this.props.actions.createPublisher({});
            this.props.actions.setPublisherEditMode(true);     
        } else {
          this.props.actions.loadPublisher(id);
        }
    }

    componentWillUnmount() {
        this.props.actions.setPublisherEditMode(false);
    }

    redirectToPublishersList() {
        this.props.history.push("/administration/publishers");
    }

    edit(event) {
        event.preventDefault();
        this.props.actions.setPublisherEditMode(true);
    }     
    
    save(values) {   
        this.props.actions.updatePublisher(values, this.props.history);
    }
    
    cancel(event) {
        event.preventDefault();
        this.props.actions.setPublisherEditMode(false);
    }

    render() {
        const { publisher, publisherEditMode } = this.props;
        
            if (publisherEditMode) {
                const isAddMode = Number(this.props.match.params.id) === 0;

                return (
                    <PublisherEditForm initialValues={publisher} isAddMode={isAddMode} onSubmit={this.save.bind(this)} cancel={this.cancel.bind(this)} 
                                    redirectToPublishersList={this.redirectToPublishersList.bind(this)} />
                );
            }

            return (
                <PublisherDetailsForm publisher={publisher} edit={this.edit.bind(this)} redirectToPublishersList={this.redirectToPublishersList.bind(this)} />
            );
    }
}

function mapStateToProps(state, ownProps) {
  
    let publisher = state.publisherReducer.publisher;
    let publisherEditMode = state.publisherReducer.publisherEditMode || false;  
    
    var ajaxCallSuccess = state.ajaxCallSuccess;
    
    return {            
        publisher,
        publisherEditMode,
        ajaxCallSuccess      
    };
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      actions: bindActionCreators(publisherActions, dispatch)
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PublisherDetailsPage)
  );