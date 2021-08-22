import React, { useCallback, useReducer } from 'react';
import { Button, Input } from 'Components/FormElements';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'Utils/validators';
import './styles.scss';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;

            for (const inputId in state.inputs) {
                formIsValid =
                    inputId === action.inputId
                        ? formIsValid && action.isValid
                        : formIsValid && state.inputs[inputId].isValid;
            }

            return {
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                formIsValid
            };
        }

        default:
            return state;
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false }
        },
        formIsValid: false
    });

    const inputHandler = useCallback(
        (inputId, value, isValid) => {
            dispatch({ type: 'INPUT_CHANGE', inputId, value, isValid });
        },
        [dispatch]
    );

    const addPlaceHandler = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-console
        console.log(formState.inputs);
    };

    return (
        <form className='new-place-form' onSubmit={addPlaceHandler}>
            <Input
                id='title'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a title.'
                onInput={inputHandler}
            />
            <Input
                id='description'
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Description must be at least 5 characters.'
                onInput={inputHandler}
            />
            <Input
                id='address'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid address.'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.formIsValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
