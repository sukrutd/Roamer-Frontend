import React, { useReducer, useEffect } from 'react';
import { validate } from 'Utils/validators';
import { isFunction } from 'Utils';
import clsx from 'clsx';
import './input.scss';

const inputReducer = (state, { type, payload, validators }) => {
    switch (type) {
        case 'CHANGE':
            return { ...state, value: payload, isValid: validate(payload, validators) };

        case 'TOUCH':
            return { ...state, isTouched: true };

        default:
            return state;
    }
};

const Input = ({
    id,
    label,
    className,
    placeholder,
    element = 'input',
    type = 'text',
    rows = 4,
    validators = [],
    errorText,
    onInput
}) => {
    const [{ value, isValid, isTouched }, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false
    });

    useEffect(() => {
        if (isFunction(onInput)) onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({ type: 'CHANGE', payload: event.target.value, validators });
    };

    const touchHandler = () => dispatch({ type: 'TOUCH' });

    const component =
        element === 'input' ? (
            <input
                id={id}
                type={type}
                value={value}
                onChange={changeHandler}
                onBlur={touchHandler}
                placeholder={placeholder}
            />
        ) : (
            <textarea
                id={id}
                rows={rows}
                value={value}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={clsx('form-control', {
                'form-control--invalid': !isValid && isTouched,
                [className]: !!className
            })}
        >
            <label htmlFor={id}>{label}</label>
            {component}
            {!isValid && isTouched && <p>{errorText}</p>}
        </div>
    );
};

export default Input;
