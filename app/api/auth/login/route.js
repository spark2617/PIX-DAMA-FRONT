import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const response = await fetch(`${BACKEND_URL}/api/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: data.message }
            );
        }

        // Set the cookie from the backend response
        const headers = new Headers();
        headers.append('Set-Cookie', response.headers.get('Set-Cookie'));

        return NextResponse.json(data, {
            success: true, 
            message: data.message,
            headers
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}