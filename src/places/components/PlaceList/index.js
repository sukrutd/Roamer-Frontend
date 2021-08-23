import React from 'react';
import Card from 'Components/Card';
import PlaceItem from 'Places/components/PlaceItem';
import { Button } from 'Components/FormElements';
import './styles.scss';

const PlaceList = ({ places = [] }) => {
    if (places.length === 0) {
        return (
            <div className='place-list'>
                <Card className='align-center'>
                    <h2 className='font-weight-normal'>No places found. Maybe create one?</h2>
                    <Button to='/places/new'>Share Place</Button>
                </Card>
            </div>
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
