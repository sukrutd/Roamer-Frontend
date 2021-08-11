import NewPlace from 'Pages/NewPlace';
import Users from 'Pages/Users';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Users} exact />
                <Route path='/places/new' component={NewPlace} exact />
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default App;
