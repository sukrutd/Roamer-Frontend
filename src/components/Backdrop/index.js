/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

const Backdrop = (props) => {
    return ReactDOM.createPortal(
        <div className='backdrop' onClick={props.onClick}></div>,
        document.querySelector('#backdrop-hook')
    );
};

export default Backdrop;
