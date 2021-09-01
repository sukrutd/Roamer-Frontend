import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from 'Components/ErrorModal';
import LoadingSpinner from 'Components/LoadingSpinner';
import PlaceList from 'Places/components/PlaceList';
import { useHttpClient } from 'Hooks/useHttpClient';

const UserPlaces = () => {
    const { userId } = useParams();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        sendRequest(`${process.env.SERVER_URL}/places/user/${userId}`).then((data) =>
            setLoadedPlaces(data.places)
        );
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces((previousPlaces) =>
            previousPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading ? (
                <div className='align-center'>
                    <LoadingSpinner />
                </div>
            ) : (
                <PlaceList places={loadedPlaces} onDeletePlace={placeDeletedHandler} />
            )}
        </>
    );
};

export default UserPlaces;
