// Toll calculator for Greek highways
// Toll prices are estimates and may vary

interface TollResult {
  estimatedToll: number;
  matchedRoute: string | null;
}

export function calculateTolls(
  origin: string,
  destination: string,
  vehicleType: string,
  distanceKm: number
): TollResult {
  // Normalize location names
  const orig = origin.toLowerCase();
  const dest = destination.toLowerCase();

  // Vehicle multipliers (car is baseline)
  const vehicleMultipliers: Record<string, number> = {
    'motorcycle': 0.5,
    'car': 1.0,
    'suv': 1.0,
    'small-truck': 1.5,
    'large-truck': 2.0
  };

  const multiplier = vehicleMultipliers[vehicleType] || 1.0;

  // Major toll routes in Greece with approximate costs (for cars)
  const knownRoutes: Record<string, number> = {
    'athens-thessaloniki': 22.50,
    'athens-patras': 12.00,
    'athens-corinth': 2.80,
    'athens-lamia': 9.00,
    'thessaloniki-kavala': 8.00,
    'corinth-patras': 9.20,
    'lamia-igoumenitsa': 12.00,
  };

  // Try to match known routes (bidirectional)
  for (const [route, baseCost] of Object.entries(knownRoutes)) {
    const [city1, city2] = route.split('-');

    if ((orig.includes(city1) && dest.includes(city2)) ||
        (orig.includes(city2) && dest.includes(city1))) {
      return {
        estimatedToll: baseCost * multiplier,
        matchedRoute: route
      };
    }
  }

  // If no specific route matched, estimate based on distance
  // Average toll in Greece is about €0.06-0.08 per km for cars
  const estimatedToll = distanceKm * 0.07 * multiplier;

  return {
    estimatedToll: Math.max(0, estimatedToll),
    matchedRoute: null
  };
}
