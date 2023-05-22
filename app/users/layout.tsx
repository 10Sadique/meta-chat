import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import getUsers from '../actions/getUsers';
import UserList from './components/UserList';

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();

    console.log(users);

    return (
        // @ts-expect-error Server Compnent
        <Sidebar>
            <UserList items={users} />
            <div className="h-full">{children}</div>
        </Sidebar>
    );
}
