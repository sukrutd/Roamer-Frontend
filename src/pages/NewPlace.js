import React from 'react';
import { Button, Input } from 'Components/FormElements';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'Utils/validators';
import { useForm } from 'Hooks/useForm';

const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false },
            address: { value: '', isValid: false }
        },
        false
    );

    const addPlaceHandler = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-console
        console.log(formState.inputs);
    };

    return (
        <form className='place-form' onSubmit={addPlaceHandler}>
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
            <div className='align-center'>
                <Button type='submit' disabled={!formState.formIsValid}>
                    ADD PLACE
                </Button>
            </div>
        </form>
    );
};

export default NewPlace;
