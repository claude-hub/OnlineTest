import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import registerServiceWorker from './registerServiceWorker';
import {store} from './lib';
import App from './App';
import Login from './Login';
import Register from './Register'
import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login}/>
                <Route path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
