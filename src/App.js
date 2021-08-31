import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import { useAuth } from 'Hooks/useAuth';
import MainHeader from 'Components/MainHeader';
import UserPlaces from 'Pages/UserPlaces';
import NewPlace from 'Pages/NewPlace';
import UpdatePlace from 'Pages/UpdatePlace';
import Users from 'Pages/Users';
import Auth from 'Pages/Auth';

const App = () => {
    const { userId, token, login, logout } = useAuth();

    const routes = token ? (
        <Switch>
            <Route path='/' component={Users} exact />
            <Route path='/:userId/places' component={UserPlaces} exact />
            <Route path='/places/new' component={NewPlace} exact />
            <Route path='/places/:placeId' component={UpdatePlace} exact />
            <Redirect to='/' />
        </Switch>
    ) : (
        <Switch>
            <Route path='/' component={Users} exact />
            <Route path='/:userId/places' component={UserPlaces} exact />
            <Route path='/auth' component={Auth} exact />
            <Redirect to='/auth' />
        </Switch>
    );

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
            <Router>
                <MainHeader />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
