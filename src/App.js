import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import LoadingSpinner from 'Components/LoadingSpinner';
import MainHeader from 'Components/MainHeader';
import { useAuth } from 'Hooks/useAuth';

const Auth = lazy(() => import('Pages/Auth'));
const Users = lazy(() => import('Pages/Users'));
const NewPlace = lazy(() => import('Pages/NewPlace'));
const UpdatePlace = lazy(() => import('Pages/UpdatePlace'));
const UserPlaces = lazy(() => import('Pages/UserPlaces'));

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
                <main>
                    <Suspense
                        fallback={
                            <div className='align-center'>
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
