import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from 'Components/Backdrop';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLinks';
import './styles.scss';

const MainHeader = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => setDrawerIsOpen(true);

    const closeDrawer = () => setDrawerIsOpen(false);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}(
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className='drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <header className='main-header'>
                <button className='main-header__menu-button' onClick={openDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className='main-header__title'>
                    <Link to='/'>Roamer</Link>
                </h1>
                <nav className='main-header__nav'>
                    <NavLinks />
                </nav>
            </header>
        </>
    );
};

export default MainHeader;
