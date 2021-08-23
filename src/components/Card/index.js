import React from 'react';
import clsx from 'clsx';
import './styles.scss';

const Card = ({ children, className }) => {
    return <div className={clsx('card', { [className]: !!className })}>{children}</div>;
};

export default Card;
