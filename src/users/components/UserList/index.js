import './styles.scss';

import Card from 'Components/Card';
import React from 'react';
import UserItem from 'Users/components/UserItem';

const UserList = ({ users = [] }) => {
    if (users.length === 0) {
        return (
            <Card>
                <div className='align-center'>No users found.</div>
            </Card>
        );
    }

    return (
        <ul className='userList'>
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
