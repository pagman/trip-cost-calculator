import { NextResponse } from 'next/server';

// This runs on the server when someone calls /api/geocode
export async function POST(request) {
  try {
    // Get the address from the request body
    const body = await request.json();
    const { address } = body;

    // Validate input
    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Get Mapbox token from environment variables (server-side, secure!)
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
      console.error('[GEOCODE] NEXT_PUBLIC_MAPBOX_TOKEN is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Call Mapbox Geocoding API
    // Add country bias to prioritize Greek results
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&country=GR&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    // Check if we got results
    if (!data.features || data.features.length === 0) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    // Extract the coordinates [longitude, latitude]
    const [longitude, latitude] = data.features[0].center;
    const placeName = data.features[0].place_name;

    // Return the coordinates
    return NextResponse.json({
      success: true,
      coordinates: { longitude, latitude },
      placeName: placeName
    });

  } catch (error) {
    console.error('[GEOCODE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
