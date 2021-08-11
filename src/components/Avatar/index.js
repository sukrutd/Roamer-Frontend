import './styles.scss';

import React from 'react';

const Avatar = ({ className, image, altText }) => {
    const classes = `avatar  ${className || ''}`.trim();

    return (
        <div className={classes}>
            <img src={image} alt={altText} />
        </div>
    );
};

export default Avatar;
