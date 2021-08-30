import React from 'react';
import clsx from 'clsx';
import './styles.scss';

const LoadingSpinner = ({ asOverlay }) => {
    return (
        <div className={clsx({ 'loading-spinner__overlay': asOverlay })}>
            <div className='lds-dual-ring'></div>
        </div>
    );
};

export default LoadingSpinner;
