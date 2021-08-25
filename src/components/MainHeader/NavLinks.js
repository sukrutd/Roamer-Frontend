import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import './navLinks.scss';

const NavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact>
                    ALL USERS
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/u1/places'>MY PLACES</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/places/new'>ADD PLACE</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to='/auth'>SIGN IN</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button type='button' onClick={auth.logout}>
                        SIGN OUT
                    </button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
