import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { origin, destination, avoidTolls } = body;

    // Validate input
    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination coordinates are required' },
        { status: 400 }
      );
    }

    // Get Mapbox token
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
      console.error('[DIRECTIONS] NEXT_PUBLIC_MAPBOX_TOKEN is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Build Mapbox Directions API URL
    const coordinates = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;

    // Add exclude parameter if avoiding tolls
    const excludeParam = avoidTolls ? '&exclude=toll' : '';

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&steps=false&access_token=${mapboxToken}${excludeParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.routes || data.routes.length === 0) {
      console.error('[DIRECTIONS] No route found');
      return NextResponse.json(
        { error: 'No route found between these locations' },
        { status: 404 }
      );
    }

    const route = data.routes[0];

    // Extract route information
    const result = {
      distance: {
        meters: route.distance,
        kilometers: route.distance / 1000
      },
      duration: {
        seconds: route.duration,
        minutes: Math.round(route.duration / 60)
      },
      geometry: {
        type: 'Feature',
        geometry: route.geometry
      }
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('[DIRECTIONS] Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate directions' },
      { status: 500 }
    );
  }
}
