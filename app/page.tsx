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
  routeGeometry: GeoJSON.Feature | null;
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
      setError('Παρακαλώ εισάγετε αφετηρία και προορισμό');
      return;
    }

    if (!consumption || !fuelPrice) {
      setError('Παρακαλώ εισάγετε κατανάλωση και τιμή καυσίμου');
      return;
    }

    if (parseFloat(consumption) <= 0 || parseFloat(fuelPrice) <= 0) {
      setError('Η κατανάλωση και η τιμή καυσίμου πρέπει να είναι μεγαλύτερες από 0');
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
        throw new Error('Δεν βρέθηκε η τοποθεσία αφετηρίας');
      }

      const originData = await originResponse.json();

      // Step 2: Geocode destination
      const destResponse = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: destination })
      });

      if (!destResponse.ok) {
        throw new Error('Δεν βρέθηκε η τοποθεσία προορισμού');
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
        throw new Error('Δεν ήταν δυνατός ο υπολογισμός της διαδρομής');
      }

      const directionsData = await directionsResponse.json();
      
      // Step 4: Calculate fuel cost
      const distanceKm = directionsData.distance.kilometers;
      const fuelNeeded = (distanceKm / 100) * parseFloat(consumption);
      const fuelCost = fuelNeeded * parseFloat(fuelPrice);
      
      // Step 5: Calculate toll cost (only if not avoiding tolls)
      let tollCost = 0;
      let tollInfo = 'Χωρίς διόδια';
      
      if (!avoidTolls) {
        const tollResult = calculateTolls(
          originData.placeName,
          destData.placeName,
          vehicleType,
          distanceKm
        );
        
        tollCost = tollResult.estimatedToll;
        tollInfo = tollResult.matchedRoute || 'Εκτιμώμενο';
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
      const errorMessage = err instanceof Error ? err.message : 'Αποτυχία υπολογισμού. Παρακαλώ δοκιμάστε ξανά.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          Υπολογισμός Κόστους Ταξιδιού
        </h1>
        <p className="text-gray-700 mb-8">
          Υπολογίστε το κόστος καυσίμων και διοδίων για το ταξίδι σας στην Ελλάδα
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
                  🚗 Πληροφορίες Οχήματος
                </h2>

                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Τύπος Οχήματος
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                >
                  <option value="motorcycle">🏍️ Μοτοσικλέτα</option>
                  <option value="car">🚗 Αυτοκίνητο</option>
                  <option value="suv">🚙 SUV / Van</option>
                  <option value="small-truck">🚚 Μικρό Φορτηγό</option>
                  <option value="large-truck">🚛 Μεγάλο Φορτηγό</option>
                </select>
              </div>

              {/* Fuel Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Κατανάλωση Καυσίμου (L/100χλμ)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="π.χ., 7.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Πόσα λίτρα ανά 100 χιλιόμετρα
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Τιμή Καυσίμου (€ ανά λίτρο)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="π.χ., 1.75"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Τρέχουσα τιμή καυσίμου
                  </p>
                </div>
              </div>

              {/* Route Details */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  📍 Λεπτομέρειες Διαδρομής
                </h2>

                <div className="space-y-4">
                  <LocationAutocomplete
                    value={origin}
                    onChange={setOrigin}
                    placeholder="π.χ., Αθήνα, Θεσσαλονίκη, Πάτρα..."
                    label="Σημείο Αφετηρίας"
                  />

                  <LocationAutocomplete
                    value={destination}
                    onChange={setDestination}
                    placeholder="π.χ., Θεσσαλονίκη, Πάτρα, Ηράκλειο..."
                    label="Προορισμός"
                  />
                </div>
              </div>

              {/* Cost Splitting Section */}
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  👥 Μοιραστείτε το Κόστος
                </h2>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">
                    Αριθμός Ατόμων
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
                    Συμπεριλαμβανομένου εσάς (οδηγός + επιβάτες)
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
                    Αποφυγή διοδίων (μπορεί να διαρκέσει περισσότερο)
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
                {loading ? 'Υπολογισμός...' : 'Υπολογισμός Κόστους Ταξιδιού'}
              </button>
            </div>

            {/* Results Display */}
            {result && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Αποτελέσματα Ταξιδιού
                </h2>

                <div className="space-y-4">
                  {/* Distance and Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Απόσταση</p>
                      <p className="text-lg font-semibold text-gray-800">{result.distance.toFixed(1)} χλμ</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Διάρκεια</p>
                      <p className="text-lg font-semibold text-gray-800">{result.duration} λεπτά</p>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Συνολικό Κόστος Ταξιδιού</p>
                    <p className="text-3xl font-bold text-blue-700">
                      € {result.totalCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      (Καύσιμα + Διόδια)
                    </p>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">⛽ Κόστος Καυσίμων</p>
                      <p className="text-xl font-semibold text-gray-800">€ {result.fuelCost.toFixed(2)}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">🛣️ Κόστος Διοδίων</p>
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
                        Κόστος ανά Άτομο ({numPeople} άτομα)
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        € {result.costPerPerson.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Κάθε άτομο πληρώνει αυτό το ποσό
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