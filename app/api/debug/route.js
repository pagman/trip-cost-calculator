import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Debug endpoint works!',
    env: {
      hasMapboxToken: !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      tokenLength: process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.length || 0
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: 'POST works!',
      receivedBody: body,
      env: {
        hasMapboxToken: !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}
