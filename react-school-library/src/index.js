import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { loadAuthors } from './actions/authorActions';
import { loadPublishers } from './actions/publisherActions';
import { loadBookStatuses } from './actions/bookActions';
import { loginFromToken } from './actions/authorizationActions';
import { loadRoles } from './actions/userActions';
import { registerInterceptors } from './api/Interceptors';

registerInterceptors();

const store = configureStore();

store.dispatch(loadBookStatuses());
store.dispatch(loadPublishers());
store.dispatch(loadAuthors());
store.dispatch(loginFromToken());
store.dispatch(loadRoles());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
