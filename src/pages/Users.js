import React, { useEffect, useState } from 'react';
import { useHttpClient } from 'Hooks/useHttpClient';
import LoadingSpinner from 'Components/LoadingSpinner';
import ErrorModal from 'Components/ErrorModal';
import UserList from 'Users/components/UserList';

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        sendRequest(`${process.env.SERVER_URL}/users`).then((data) => setUsers(data.users));
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='align-center'>
                    <LoadingSpinner />
                </div>
            )}
            <UserList users={users} />
        </>
    );
};

export default Users;
