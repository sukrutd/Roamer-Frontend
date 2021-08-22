import React from 'react';
import Card from 'Components/Card';
import PlaceItem from 'Places/components/PlaceItem';
import './styles.scss';

const PlaceList = ({ places = [] }) => {
    if (places.length === 0) {
        return (
            <Card>
                <div className='align-center'>No users found.</div>
            </Card>
        );
    }

    return (
        <ul className='place-list'>
            {places.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    image={place.imageUrl}
                />
            ))}
        </ul>
    );
};

export default PlaceList;
