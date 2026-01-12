'use client';

import { useState } from 'react';
import MapView from '@/components/MapView';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { calculateTolls } from '@/lib/tollCalculator';

interface TripResult {
  distance: number; // km
  duration: number; // minutes
  fuelCost: number;
  tollCost: number;
  totalCost: number;
  costPerPerson: number;
  tollInfo: string;
  routeGeometry: any;
}

export default function Home() {
  // Vehicle and fuel settings
  const [vehicleType, setVehicleType] = useState('car');
  const [consumption, setConsumption] = useState('7.5');
  const [fuelPrice, setFuelPrice] = useState('1.75');
  
  // Location inputs
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  
  // Cost splitting
  const [numPeople, setNumPeople] = useState('1');
  
  // Options
  const [avoidTolls, setAvoidTolls] = useState(false);
  
  // Results and state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TripResult | null>(null);

  const handleCalculate = async () => {
    // Reset previous results
    setError('');
    setResult(null);
    
    // Validate inputs
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }
    
    if (!consumption || !fuelPrice) {
      setError('Please enter fuel consumption and price');
      return;
    }
    
    if (parseFloat(consumption) <= 0 || parseFloat(fuelPrice) <= 0) {
      setError('Fuel consumption and price must be greater than 0');
      return;
    }
    
    setLoading(true);
    
    try {
      // Step 1: Geocode origin
      const originResponse = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: origin })
      });

      if (!originResponse.ok) {
        throw new Error('Could not find origin location');
      }

      const originData = await originResponse.json();

      // Step 2: Geocode destination
      const destResponse = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: destination })
      });

      if (!destResponse.ok) {
        throw new Error('Could not find destination location');
      }

      const destData = await destResponse.json();

      // Step 3: Get directions
      const directionsResponse = await fetch('/api/directions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: originData.coordinates,
          destination: destData.coordinates,
          avoidTolls: avoidTolls
        })
      });

      if (!directionsResponse.ok) {
        throw new Error('Could not calculate route');
      }

      const directionsData = await directionsResponse.json();
      
      // Step 4: Calculate fuel cost
      const distanceKm = directionsData.distance.kilometers;
      const fuelNeeded = (distanceKm / 100) * parseFloat(consumption);
      const fuelCost = fuelNeeded * parseFloat(fuelPrice);
      
      // Step 5: Calculate toll cost (only if not avoiding tolls)
      let tollCost = 0;
      let tollInfo = 'No tolls';
      
      if (!avoidTolls) {
        const tollResult = calculateTolls(
          originData.placeName,
          destData.placeName,
          vehicleType,
          distanceKm
        );
        
        tollCost = tollResult.estimatedToll;
        tollInfo = tollResult.matchedRoute || 'Estimated';
      }
      
      // Step 6: Calculate totals
      const totalCost = fuelCost + tollCost;
      const people = parseInt(numPeople);
      const costPerPerson = totalCost / people;
      
      // Set results
      setResult({
        distance: distanceKm,
        duration: directionsData.duration.minutes,
        fuelCost: parseFloat(fuelCost.toFixed(2)),
        tollCost: parseFloat(tollCost.toFixed(2)),
        totalCost: parseFloat(totalCost.toFixed(2)),
        costPerPerson: parseFloat(costPerPerson.toFixed(2)),
        tollInfo,
        routeGeometry: directionsData.geometry
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate trip. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          Trip Cost Calculator
        </h1>
        <p className="text-gray-700 mb-8">
          Calculate fuel and toll costs for your journey in Greece
        </p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN - Form */}
          <div>
            {/* Main Form Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              
              {/* Vehicle Type Selection */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  🚗 Vehicle Information
                </h2>
                
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                >
                  <option value="motorcycle">🏍️ Motorcycle</option>
                  <option value="car">🚗 Car (Sedan)</option>
                  <option value="suv">🚙 SUV / Van</option>
                  <option value="small-truck">🚚 Small Truck</option>
                  <option value="large-truck">🚛 Large Truck</option>
                </select>
              </div>

              {/* Fuel Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Fuel Consumption (L/100km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="e.g., 7.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    How many liters per 100 kilometers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Fuel Price (€ per liter)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="e.g., 1.75"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Current fuel price
                  </p>
                </div>
              </div>

              {/* Route Details */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  📍 Route Details
                </h2>
                
                <div className="space-y-4">
                  <LocationAutocomplete
                    value={origin}
                    onChange={setOrigin}
                    placeholder="e.g., Athens, Thessaloniki, Patras..."
                    label="Starting Point"
                  />

                  <LocationAutocomplete
                    value={destination}
                    onChange={setDestination}
                    placeholder="e.g., Thessaloniki, Patras, Heraklion..."
                    label="Destination"
                  />
                </div>
              </div>

              {/* Cost Splitting Section */}
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  👥 Split the Cost
                </h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Number of People Sharing
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numPeople}
                    onChange={(e) => setNumPeople(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900"
                  />
                  <p className="text-xs text-gray-700 mt-1">
                    Including yourself (driver + passengers)
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="border-t pt-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="avoidTolls"
                    checked={avoidTolls}
                    onChange={(e) => setAvoidTolls(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="avoidTolls" className="ml-3 text-sm font-medium text-gray-800">
                    Avoid toll roads (may take longer)
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {loading ? 'Calculating...' : 'Calculate Trip Cost'}
              </button>
            </div>

            {/* Results Display */}
            {result && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Trip Results
                </h2>
                
                <div className="space-y-4">
                  {/* Distance and Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Distance</p>
                      <p className="text-lg font-semibold text-gray-800">{result.distance.toFixed(1)} km</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="text-lg font-semibold text-gray-800">{result.duration} min</p>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Trip Cost</p>
                    <p className="text-3xl font-bold text-blue-700">
                      € {result.totalCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      (Fuel + Tolls)
                    </p>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">⛽ Fuel Cost</p>
                      <p className="text-xl font-semibold text-gray-800">€ {result.fuelCost.toFixed(2)}</p>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">🛣️ Toll Cost</p>
                      <p className="text-xl font-semibold text-gray-800">€ {result.tollCost.toFixed(2)}</p>
                      {result.tollInfo && (
                        <p className="text-xs text-gray-600 mt-1">{result.tollInfo}</p>
                      )}
                    </div>
                  </div>

                  {/* Cost Per Person */}
                  {parseInt(numPeople) > 1 && (
                    <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Cost per Person ({numPeople} people)
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        € {result.costPerPerson.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Each person pays this amount
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Map */}
          <div className="lg:sticky lg:top-8 h-fit">
            <MapView 
              origin={origin} 
              destination={destination}
              routeGeometry={result?.routeGeometry}
            />
          </div>
        </div>
      </div>
    </main>
  );
}