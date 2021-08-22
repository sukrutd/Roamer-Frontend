import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainHeader from 'Components/MainHeader';
import UserPlaces from 'Pages/UserPlaces';
import NewPlace from 'Pages/NewPlace';
import Users from 'Pages/Users';

const App = () => {
    return (
        <Router>
            <MainHeader />
            <main>
                <Switch>
                    <Route path='/' component={Users} exact />
                    <Route path='/:userId/places' component={UserPlaces} exact />
                    <Route path='/places/new' component={NewPlace} exact />
                    <Redirect to='/' />
                </Switch>
            </main>
        </Router>
    );
};

export default App;
