import './styles.scss';

import React from 'react';

const Card = ({ children, className }) => {
    const classes = `card  ${className || ''}`.trim();

    return <div className={classes}>{children}</div>;
};

export default Card;
