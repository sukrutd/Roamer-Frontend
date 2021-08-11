import Avatar from 'Components/Avatar';
import Card from 'Components/Card';
import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ id, name, image, placeCount }) => {
    return (
        <li className='userItem'>
            <Card className='userItem__content'>
                <Link to={`/${id}/places`}>
                    <div className='userItem__image'>
                        <Avatar image={image} altText={name} />
                    </div>
                    <div className='userItem__info'>
                        <h2>{name}</h2>
                        <p>
                            {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
                        </p>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
