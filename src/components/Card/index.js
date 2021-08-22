import React from 'react';
import './styles.scss';

const Card = ({ children, className }) => {
    const classes = `card  ${className || ''}`.trim();

    return <div className={classes}>{children}</div>;
};

export default Card;
