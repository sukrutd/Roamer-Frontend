import React from 'react';
import Card from 'Components/Card';
import UserItem from 'Users/components/UserItem';
import './styles.scss';

const UserList = ({ users = [] }) => {
    if (users.length === 0) {
        return (
            <div className='user-list'>
                <Card className='align-center'>
                    <h2 className='font-weight-normal'>No users found.</h2>
                </Card>
            </div>
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
                    placeCount={user.places.length}
                />
            ))}
        </ul>
    );
};

export default UserList;
