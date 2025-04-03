import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/user/session`, {
            headers: {
                Cookie: request.headers.get('cookie') || ''
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 401 }
        );
    }
}