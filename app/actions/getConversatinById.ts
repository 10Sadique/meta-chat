import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversationById = async (conversatinId: string) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.email) {
            return null;
        }

        const conversatin = await prisma.conversation.findUnique({
            where: {
                id: conversatinId,
            },
            include: {
                users: true,
            },
        });

        return conversatin;
    } catch (error: any) {
        return null;
    }
};

export default getConversationById;
