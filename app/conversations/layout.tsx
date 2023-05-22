import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationsList from './components/ConversationsList';
import getConversations from '../actions/getConversations';

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();

    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConversationsList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
}
