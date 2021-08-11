import React from 'react';
import UserList from 'Users/components/UserList';

const Users = () => {
    const users = [
        {
            id: 'u1',
            name: 'Jenifer Sanga',
            image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
            places: 3
        },
        {
            id: 'u2',
            name: 'John Hopkins',
            image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
            places: 2
        }
    ];

    return <UserList users={users} />;
};

export default Users;
