import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from 'Places/components/PlaceList';

const UserPlaces = () => {
    const { userId } = useParams();

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

    const loadedPlaces = places.filter((place) => place.creator === userId);

    return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
