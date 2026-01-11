// Greek Toll Station Data - 2025 Prices
export interface TollStation {
  id: string;
  name: string;
  highway: string;
  prices: {
    motorcycle: number;
    car: number;
    suv: number;
    smallTruck: number;
    largeTruck: number;
  };
}

export interface HighwayRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distanceKm: number;
  tollStations: string[]; // IDs of toll stations on this route
  totalTolls: {
    motorcycle: number;
    car: number;
    suv: number;
    smallTruck: number;
    largeTruck: number;
  };
}

// All toll stations in Greece
export const tollStations: TollStation[] = [
  // OLYMPIA ODOS (Athens-Patras)
  {
    id: 'elefsina',
    name: 'Elefsina',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.70, car: 2.40, suv: 6.10, smallTruck: 6.10, largeTruck: 8.50 }
  },
  {
    id: 'nea-peramos',
    name: 'Nea Peramos',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.10, car: 1.60, suv: 4.10, smallTruck: 4.10, largeTruck: 5.70 }
  },
  {
    id: 'pachi',
    name: 'Pachi',
    highway: 'Olympia Odos',
    prices: { motorcycle: 0.70, car: 1.00, suv: 2.60, smallTruck: 2.60, largeTruck: 3.70 }
  },
  {
    id: 'ag-theodori',
    name: 'Ag. Theodori',
    highway: 'Olympia Odos',
    prices: { motorcycle: 0.40, car: 0.60, suv: 1.50, smallTruck: 1.50, largeTruck: 2.20 }
  },
  {
    id: 'isthmos',
    name: 'Isthmos',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.40, car: 2.00, suv: 5.20, smallTruck: 5.20, largeTruck: 7.30 }
  },
  {
    id: 'zevgolatio',
    name: 'Zevgolatio',
    highway: 'Olympia Odos',
    prices: { motorcycle: 0.60, car: 0.80, suv: 2.10, smallTruck: 2.10, largeTruck: 3.00 }
  },
  {
    id: 'kiato',
    name: 'Kiato',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.80, car: 2.60, suv: 6.60, smallTruck: 6.60, largeTruck: 9.20 }
  },
  {
    id: 'derveni',
    name: 'Derveni',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.00, car: 1.50, suv: 3.80, smallTruck: 3.80, largeTruck: 5.30 }
  },
  {
    id: 'akrata',
    name: 'Akrata',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.40, car: 2.00, suv: 5.00, smallTruck: 5.00, largeTruck: 7.00 }
  },
  {
    id: 'eleonas',
    name: 'Eleonas',
    highway: 'Olympia Odos',
    prices: { motorcycle: 2.60, car: 3.70, suv: 9.30, smallTruck: 9.30, largeTruck: 13.00 }
  },
  {
    id: 'rion',
    name: 'Rion',
    highway: 'Olympia Odos',
    prices: { motorcycle: 1.80, car: 2.60, suv: 6.50, smallTruck: 6.50, largeTruck: 9.10 }
  },

  // NEA ODOS (Athens-Thessaloniki)
  {
    id: 'afidnes',
    name: 'Afidnes',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 2.30, car: 3.30, suv: 8.30, smallTruck: 8.30, largeTruck: 11.65 }
  },
  {
    id: 'kapandriti',
    name: 'Kapandriti',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 1.40, car: 2.00, suv: 5.05, smallTruck: 5.05, largeTruck: 7.05 }
  },
  {
    id: 'malakasa',
    name: 'Malakasa',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 1.00, car: 1.40, suv: 3.60, smallTruck: 3.60, largeTruck: 5.05 }
  },
  {
    id: 'inofyta',
    name: 'Inofyta',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 0.45, car: 0.65, suv: 1.70, smallTruck: 1.70, largeTruck: 2.40 }
  },
  {
    id: 'thiva',
    name: 'Thiva',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 2.70, car: 3.90, suv: 9.75, smallTruck: 9.75, largeTruck: 13.65 }
  },
  {
    id: 'tragana',
    name: 'Tragana',
    highway: 'Nea Odos A.TH.E',
    prices: { motorcycle: 2.70, car: 3.85, suv: 9.70, smallTruck: 9.70, largeTruck: 13.60 }
  },

  // IONIA ODOS (Antirrio-Ioannina)
  {
    id: 'klokova',
    name: 'Klokova',
    highway: 'Ionia Odos',
    prices: { motorcycle: 2.10, car: 3.00, suv: 7.60, smallTruck: 7.60, largeTruck: 10.65 }
  },
  {
    id: 'aggelokastro',
    name: 'Aggelokastro',
    highway: 'Ionia Odos',
    prices: { motorcycle: 2.50, car: 3.55, suv: 8.95, smallTruck: 8.95, largeTruck: 12.50 }
  },
  {
    id: 'menidi',
    name: 'Menidi',
    highway: 'Ionia Odos',
    prices: { motorcycle: 2.10, car: 3.05, suv: 7.60, smallTruck: 7.60, largeTruck: 10.65 }
  },
  {
    id: 'terovo',
    name: 'Terovo',
    highway: 'Ionia Odos',
    prices: { motorcycle: 2.20, car: 3.15, suv: 7.85, smallTruck: 7.85, largeTruck: 11.00 }
  },

  // Special tolls
  {
    id: 'rio-antirrio-bridge',
    name: 'Rio-Antirrio Bridge',
    highway: 'Bridge',
    prices: { motorcycle: 9.80, car: 15.40, suv: 23.10, smallTruck: 23.10, largeTruck: 30.80 }
  }
];

// Major routes with their toll stations
export const highwayRoutes: HighwayRoute[] = [
  {
    id: 'athens-thessaloniki',
    name: 'Athens to Thessaloniki',
    from: 'Athens',
    to: 'Thessaloniki',
    distanceKm: 500,
    tollStations: ['afidnes', 'kapandriti', 'malakasa', 'inofyta', 'thiva', 'tragana'],
    totalTolls: {
      motorcycle: 20.55,
      car: 32.20,
      suv: 48.10,
      smallTruck: 48.10,
      largeTruck: 65.05
    }
  },
  {
    id: 'athens-patras',
    name: 'Athens to Patras (via Corinth)',
    from: 'Athens',
    to: 'Patras',
    distanceKm: 215,
    tollStations: ['elefsina', 'nea-peramos', 'pachi', 'ag-theodori', 'isthmos', 'zevgolatio', 'kiato', 'derveni', 'akrata', 'eleonas', 'rion'],
    totalTolls: {
      motorcycle: 8.50,
      car: 13.30,
      suv: 32.40,
      smallTruck: 32.40,
      largeTruck: 45.90
    }
  },
  {
    id: 'athens-patras-bridge',
    name: 'Athens to Patras (with Rio-Antirrio Bridge)',
    from: 'Athens',
    to: 'Patras',
    distanceKm: 215,
    tollStations: ['elefsina', 'nea-peramos', 'pachi', 'ag-theodori', 'isthmos', 'zevgolatio', 'kiato', 'derveni', 'akrata', 'eleonas', 'rion', 'rio-antirrio-bridge'],
    totalTolls: {
      motorcycle: 18.30,
      car: 28.70,
      suv: 55.50,
      smallTruck: 55.50,
      largeTruck: 76.70
    }
  },
  {
    id: 'corinth-kalamata',
    name: 'Corinth to Kalamata',
    from: 'Corinth',
    to: 'Kalamata',
    distanceKm: 205,
    tollStations: [], // We don't have individual stations, but we have total
    totalTolls: {
      motorcycle: 7.20,
      car: 11.30,
      suv: 17.50,
      smallTruck: 17.50,
      largeTruck: 24.50
    }
  },
  {
    id: 'antirrio-ioannina',
    name: 'Antirrio to Ioannina',
    from: 'Antirrio',
    to: 'Ioannina',
    distanceKm: 185,
    tollStations: ['klokova', 'aggelokastro', 'menidi', 'terovo'],
    totalTolls: {
      motorcycle: 8.90,
      car: 14.35,
      suv: 32.00,
      smallTruck: 32.00,
      largeTruck: 44.80
    }
  }
];

// Vehicle type mapping for our form
export const vehicleTypeMap = {
  'motorcycle': 'motorcycle',
  'car': 'car',
  'suv': 'suv',
  'small-truck': 'smallTruck',
  'large-truck': 'largeTruck'
};