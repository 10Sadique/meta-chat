import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(requset: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await requset.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                seen: true,
                sender: true,
            },
        });
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGE');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
