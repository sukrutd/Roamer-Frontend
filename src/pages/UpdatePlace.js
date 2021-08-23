import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'Components/FormElements';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'Utils/validators';
import { useForm } from 'Hooks/useForm';

const places = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: { lat: 40.748_440_5, lng: -73.985_664_4 },
        creator: 'u1',
        imageUrl:
            'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: { lat: 40.748_440_5, lng: -73.985_664_4 },
        creator: 'u2',
        imageUrl:
            'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
];

const UpdatePlace = () => {
    const { placeId } = useParams();
    const place = places.find((place) => place.id === placeId);

    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false }
        },
        false
    );

    useEffect(() => {
        if (place) {
            setFormData(
                {
                    title: { value: place.title, isValid: true },
                    description: { value: place.description, isValid: true }
                },
                true
            );
        }
        setIsLoading(false);
    }, [place, setFormData]);

    const updatePlace = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-console
        console.log(formState.inputs);
    };

    if (isLoading) {
        return <div className='align-center'>Loading...</div>;
    }

    if (!place) {
        return (
            <div className='place-form align-center'>
                <h2 className='font-weight-normal'>Could not find the place.</h2>
            </div>
        );
    }

    return (
        <form className='place-form' onSubmit={updatePlace}>
            <Input
                id='title'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a title.'
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id='description'
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Description must be at least 5 characters.'
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <div className='align-center'>
                <Button type='submit' disabled={!formState.formIsValid}>
                    UPDATE PLACE
                </Button>
            </div>
        </form>
    );
};

export default UpdatePlace;
