import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
    conversationId?: string;
}

export async function POST(request: Request, { parms }: { parms: IParams }) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = parms;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }

        // Find Existing Conversatin
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        });

        if (!conversation) {
            return new NextResponse('Invalid Id', { status: 400 });
        }

        // Find the last message
        const lastMessage =
            conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        // Update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });

        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSEGES_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
