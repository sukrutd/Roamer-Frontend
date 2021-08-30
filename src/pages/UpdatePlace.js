import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import { Button, Input } from 'Components/FormElements';
import LoadingSpinner from 'Components/LoadingSpinner';
import ErrorModal from 'Components/ErrorModal';
import * as validators from 'Utils/validators';
import { useHttpClient } from 'Hooks/useHttpClient';
import { useForm } from 'Hooks/useForm';

const UpdatePlace = () => {
    const history = useHistory();
    const { placeId } = useParams();
    const auth = useContext(AuthContext);
    const [loadedPlace, setLoadedPlace] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false }
        },
        false
    );

    useEffect(() => {
        sendRequest(`http://localhost:5000/api/places/${placeId}`).then((data) => {
            setLoadedPlace(data.place);
            setFormData(
                {
                    title: { value: data.place.title, isValid: true },
                    description: { value: data.place.description, isValid: true }
                },
                true
            );
        });
    }, [placeId, sendRequest, setFormData]);

    const updatePlace = (event) => {
        event.preventDefault();
        sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            {
                'Content-Type': 'application/json'
            }
        ).then(() => history.push('/' + auth.userId + '/places'));
    };

    if (isLoading) {
        return (
            <div className='align-center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className='place-form align-center'>
                <h2 className='font-weight-normal'>Could not find any place.</h2>
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className='place-form' onSubmit={updatePlace}>
                    <Input
                        id='title'
                        label='Title'
                        validators={[validators.VALIDATOR_REQUIRE()]}
                        errorText='Please enter a title.'
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id='description'
                        element='textarea'
                        label='Description'
                        validators={[validators.VALIDATOR_MINLENGTH(5)]}
                        errorText='Description must be at least 5 characters.'
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <div className='align-center'>
                        <Button type='submit' disabled={!formState.formIsValid}>
                            UPDATE PLACE
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default UpdatePlace;
