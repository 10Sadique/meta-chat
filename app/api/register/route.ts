import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing info', {
                status: 400,
            });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponse('Internal error', {
            status: 500,
        });
    }
};
