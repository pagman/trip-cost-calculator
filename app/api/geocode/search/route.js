import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Call Mapbox Geocoding API with autocomplete
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&country=GR&limit=5&types=place,locality,neighborhood,address`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.features) {
      return NextResponse.json({ suggestions: [] });
    }

    // Format suggestions
    const suggestions = data.features.map(feature => ({
      place_name: feature.place_name,
      center: feature.center
    }));

    return NextResponse.json({ suggestions });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ suggestions: [] });
  }
}
