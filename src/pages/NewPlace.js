import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import { Button, Input } from 'Components/FormElements';
import LoadingSpinner from 'Components/LoadingSpinner';
import ErrorModal from 'Components/ErrorModal';
import * as validators from 'Utils/validators';
import { useHttpClient } from 'Hooks/useHttpClient';
import { useForm } from 'Hooks/useForm';

const NewPlace = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        sendRequest(
            'http://localhost:5000/api/places',
            'POST',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId
            }),
            {
                'Content-Type': 'application/json'
            }
        ).then(() => history.push('/'));
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={addPlaceHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id='title'
                    label='Title'
                    validators={[validators.VALIDATOR_REQUIRE()]}
                    errorText='Please enter a title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[validators.VALIDATOR_MINLENGTH(5)]}
                    errorText='Description must be at least 5 characters.'
                    onInput={inputHandler}
                />
                <Input
                    id='address'
                    label='Address'
                    validators={[validators.VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid address.'
                    onInput={inputHandler}
                />
                <div className='align-center'>
                    <Button type='submit' disabled={!formState.formIsValid}>
                        ADD PLACE
                    </Button>
                </div>
            </form>
        </>
    );
};

export default NewPlace;
