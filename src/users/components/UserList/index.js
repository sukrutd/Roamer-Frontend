import React from 'react';
import Card from 'Components/Card';
import UserItem from 'Users/components/UserItem';
import './styles.scss';

const UserList = ({ users = [] }) => {
    if (users.length === 0) {
        return (
            <Card>
                <div className='align-center'>No places found. Do you wish to create one?</div>
            </Card>
        );
    }

    return (
        <ul className='user-list'>
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    image={user.image}
                    placeCount={user.places}
                />
            ))}
        </ul>
    );
};

export default UserList;
