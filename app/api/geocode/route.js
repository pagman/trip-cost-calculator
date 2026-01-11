import { NextResponse } from 'next/server';

// This runs on the server when someone calls /api/geocode
export async function POST(request) {
  console.log('[GEOCODE] POST request received');
  try {
    // Get the address from the request body
    const body = await request.json();
    console.log('[GEOCODE] Request body:', body);
    const { address } = body;

    // Validate input
    if (!address) {
      console.log('[GEOCODE] No address provided');
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Get Mapbox token from environment variables (server-side, secure!)
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log('[GEOCODE] Token exists:', !!mapboxToken, 'Length:', mapboxToken?.length);

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
    console.log('[GEOCODE] Calling Mapbox API for address:', address);

    const response = await fetch(url);
    const data = await response.json();
    console.log('[GEOCODE] Mapbox response status:', response.status);
    console.log('[GEOCODE] Mapbox response:', JSON.stringify(data).substring(0, 200));

    // Check if we got results
    if (!data.features || data.features.length === 0) {
      console.log('[GEOCODE] No results found');
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    // Extract the coordinates [longitude, latitude]
    const [longitude, latitude] = data.features[0].center;
    const placeName = data.features[0].place_name;

    console.log('[GEOCODE] Success! Coordinates:', { longitude, latitude });

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
