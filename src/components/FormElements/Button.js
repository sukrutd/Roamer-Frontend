import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './button.scss';

const Button = ({
    to,
    matchExact,
    type = 'button',
    size,
    inverse,
    danger,
    disabled,
    onClick,
    children
}) => {
    if (to) {
        return (
            <Link
                to={to}
                exact={matchExact}
                className={clsx('button', {
                    'button--default': !!size,
                    'button--large': size === 'large',
                    'button--inverse': inverse,
                    'button--danger': danger
                })}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx({
                button: true,
                'button--default': !!size,
                'button--large': size === 'large',
                'button--inverse': inverse,
                'button--danger': danger
            })}
        >
            {children}
        </button>
    );
};

export default Button;
