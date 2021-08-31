import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'Components/Avatar';
import Card from 'Components/Card';

const UserItem = ({ id, name, image, placeCount }) => {
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${id}/places`}>
                    <div className='user-item__image'>
                        <Avatar image={`http://localhost:5000/${image}`} altText={name} />
                    </div>
                    <div className='user-item__info'>
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
