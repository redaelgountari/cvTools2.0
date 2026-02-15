import { NextRequest, NextResponse } from 'next/server';

// Note: Values kept in Cookiesmv.js for now as requested by user
const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;

async function redisRequest(command: any[]) {
    try {
        const encodedCommand = command.map(part => encodeURIComponent(String(part))).join('/');
        const response = await fetch(`${REDIS_URL}/${encodedCommand}`, {
            headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Redis request failed: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Redis API Error:', error);
        return null;
    }
}

export async function POST(req: NextRequest) {
    try {
        const { action, key, data, expirySeconds } = await req.json();

        switch (action) {
            case 'get':
                const result = await redisRequest(['GET', key]);
                return NextResponse.json({ result: result ? JSON.parse(result) : null });

            case 'set':
                const value = JSON.stringify(data);
                if (expirySeconds) {
                    await redisRequest(['SETEX', key, expirySeconds, value]);
                } else {
                    await redisRequest(['SET', key, value]);
                }
                return NextResponse.json({ success: true });

            case 'del':
                await redisRequest(['DEL', key]);
                return NextResponse.json({ success: true });

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process cache request' }, { status: 500 });
    }
}
