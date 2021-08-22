import React from 'react';
import './styles.scss';

const Avatar = ({ className, image, altText }) => {
    const classes = `avatar  ${className || ''}`.trim();

    return (
        <div className={classes}>
            <img src={image} alt={altText} />
        </div>
    );
};

export default Avatar;
