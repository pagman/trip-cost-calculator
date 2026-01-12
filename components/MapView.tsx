'use client';

import { useMemo } from 'react';
import Map, { Marker, Layer, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  origin?: string;
  destination?: string;
  routeGeometry?: any;
}

export default function MapView({ origin, destination, routeGeometry }: MapViewProps) {
  // Calculate viewport based on route geometry
  const viewport = useMemo(() => {
    if (routeGeometry) {
      // Get coordinates from the geometry - handle both Feature and LineString formats
      let coordinates;
      if (routeGeometry.type === 'Feature' && routeGeometry.geometry) {
        coordinates = routeGeometry.geometry.coordinates;
      } else if (routeGeometry.coordinates) {
        coordinates = routeGeometry.coordinates;
      }

      if (coordinates && Array.isArray(coordinates) && coordinates.length > 0) {
        // Calculate center point from first and last coordinates
        const firstCoord = coordinates[0];
        const lastCoord = coordinates[coordinates.length - 1];
        const centerLng = (firstCoord[0] + lastCoord[0]) / 2;
        const centerLat = (firstCoord[1] + lastCoord[1]) / 2;

        return {
          latitude: centerLat,
          longitude: centerLng,
          zoom: 8
        };
      }
    }

    // Default viewport (center of Greece)
    return {
      latitude: 38.0,
      longitude: 23.7,
      zoom: 6
    };
  }, [routeGeometry]);

  const routeLayer = {
    id: 'route',
    type: 'line' as const,
    paint: {
      'line-color': '#3b82f6',
      'line-width': 4,
      'line-opacity': 0.8
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h2 className="text-xl font-semibold text-white">
          🗺️ Route Map
        </h2>
        <p className="text-blue-100 text-sm">
          {origin && destination
            ? `${origin} → ${destination}`
            : 'Enter locations and calculate to see route'
          }
        </p>
      </div>

      <div className="h-[600px]">
        <Map
          initialViewState={viewport}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Display route if available */}
          {routeGeometry && (() => {
            // Get coordinates array from geometry
            let coordinates;
            if (routeGeometry.type === 'Feature' && routeGeometry.geometry) {
              coordinates = routeGeometry.geometry.coordinates;
            } else if (routeGeometry.coordinates) {
              coordinates = routeGeometry.coordinates;
            }

            if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
              return null;
            }

            return (
              <>
                {/* Route Line */}
                <Source id="route" type="geojson" data={routeGeometry}>
                  <Layer {...routeLayer} />
                </Source>

                {/* Start Marker (Green) */}
                <Marker
                  longitude={coordinates[0][0]}
                  latitude={coordinates[0][1]}
                >
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                    A
                  </div>
                </Marker>

                {/* End Marker (Red) */}
                <Marker
                  longitude={coordinates[coordinates.length - 1][0]}
                  latitude={coordinates[coordinates.length - 1][1]}
                >
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                    B
                  </div>
                </Marker>
              </>
            );
          })()}
        </Map>
      </div>

      {/* Map Instructions */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> {routeGeometry
            ? 'Drag to pan, scroll to zoom. Green (A) is start, Red (B) is destination.'
            : 'Calculate a trip to see the route displayed on the map.'
          }
        </p>
      </div>
    </div>
  );
}
