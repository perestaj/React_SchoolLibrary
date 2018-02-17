import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as publisherActions from "../../actions/publisherActions";

import PublishersList from './PublishersList';
import PublisherSearchFilter from './PublisherSearchFilter';

class PublishersPage extends Component {
    componentDidMount(props, context) {
        this.props.publisherActions.loadPublishers();
    }

    handleInputChange(event) {
        const filter = { ...this.props.filter };   
    
        filter[event.target.name] = event.target.value;
    
        this.props.publisherActions.filterPublishers(filter);
    }

    addPublisher(event) {
        event.preventDefault();
        this.props.history.push("/administration/publishers/0");
      }
    
    deletePublisher(event, publisherID){
        event.preventDefault();
        
        if (window.confirm("Do you want to delete the publisher?")) {
            this.props.publisherActions.deletePublisher(publisherID, this.props.history);
        }
    }

    sortPublishers(field) {
        const filter = { ...this.props.filter };
    
        filter.publishersSortDesc = field === filter.publishersSortField ? !filter.publishersSortDesc : false;
        filter.publishersSortField = field;
    
        this.props.publisherActions.filterPublishers(filter);
    }

    render() {
        const { filter, publishers } = this.props;

        return (
                <div>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Publishers</h1>
                    <PublisherSearchFilter filter={filter} handleInputChange={this.handleInputChange.bind(this)} addPublisher={this.addPublisher.bind(this)}/>
                    <PublishersList publishers={publishers} sortField={filter.publishersSortField || ''} 
                                 deletePublisher={this.deletePublisher.bind(this)} sortPublishers={this.sortPublishers.bind(this)} />
                </div>
        );    
    }
}

function mapStateToProps(state, ownProps) {
    return {
      filter: state.publisherReducer.publishersSearchFilter,            
      publishers: state.publisherReducer.filteredPublishers || []      
    };
}
  
function mapDispatchToProps(dispatch, ownProps) {
    return {
      publisherActions: bindActionCreators(publisherActions, dispatch)      
    };
}
  
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PublishersPage)
);

