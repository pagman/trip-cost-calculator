# 🚗 Greek Trip Cost Calculator

> A modern Next.js application for calculating fuel and toll costs for road trips across Greece. Features real-time route visualization, accurate toll pricing, and cost-splitting capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Mapbox](https://img.shields.io/badge/Mapbox-GL_JS-green?style=flat-square&logo=mapbox)](https://www.mapbox.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

## 📋 Overview

Planning a road trip in Greece? This calculator helps you estimate the total cost of your journey by calculating both fuel consumption and toll road fees. Built with Next.js 16, TypeScript, and Mapbox, it provides an intuitive interface with real-time route visualization.

### ✨ Key Features

- **🗺️ Interactive Route Mapping** - Visualize your journey on an interactive Mapbox map
- **⛽ Accurate Fuel Cost Calculation** - Based on vehicle type, consumption rate, and current fuel prices
- **🛣️ Real Greek Toll Prices** - Database of 21+ toll stations with official 2025 pricing
- **🚗 Multiple Vehicle Types** - Support for motorcycles, cars, SUVs, and trucks
- **👥 Cost Splitting** - Divide expenses among passengers
- **🔀 Avoid Tolls Option** - Find toll-free alternative routes
- **📊 Detailed Breakdown** - See fuel costs, toll costs, distance, and duration
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🎯 Use Cases

- **Road Trip Planning** - Calculate total costs before your journey
- **Expense Sharing** - Fair cost splitting among travel companions
- **Route Comparison** - Compare toll vs. toll-free routes
- **Budget Management** - Accurately estimate travel expenses

## 🛠️ Tech Stack

- **Framework:** [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Maps:** [Mapbox GL JS](https://www.mapbox.com/) + [react-map-gl](https://visgl.github.io/react-map-gl/)
- **APIs:** Mapbox Geocoding & Directions API

## 📸 Screenshots

<!-- Add screenshots here -->
_Coming soon - Add screenshots of your application_

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Mapbox account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/greek-trip-calculator.git
   cd greek-trip-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```
   
   Get your free Mapbox token at [mapbox.com/account/access-tokens](https://account.mapbox.com/access-tokens/)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Trip Calculation

1. **Select Vehicle Type** - Choose from motorcycle, car, SUV, or truck
2. **Enter Fuel Details** - Input consumption rate (L/100km) and current fuel price
3. **Set Route** - Enter starting point and destination
4. **Add Passengers** - Specify number of people to split costs
5. **Calculate** - Click the button to see results!

### Example Trip

**Athens to Thessaloniki:**
- Distance: ~500 km
- Duration: ~5 hours
- Toll Cost (Car): €32.20
- Fuel Cost (7L/100km @ €1.75): ~€61.25
- **Total: €93.45**

## 🗺️ Supported Routes

The calculator has exact toll pricing for these major routes:

| Route | Distance | Toll Stations | Toll (Car) |
|-------|----------|---------------|------------|
| Athens → Thessaloniki | 500 km | 3 | €32.20 |
| Athens → Patras | 215 km | 5 | €13.30 |
| Corinth → Kalamata | 205 km | - | €11.30 |
| Antirrio → Ioannina | 185 km | 4 | €14.35 |

For other routes, the calculator estimates tolls based on distance and similar routes.

## 🏗️ Project Structure

```
trip-cost-calculator/
├── app/
│   ├── page.tsx              # Main calculator page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       ├── geocode/          # Geocoding endpoint
│       │   └── route.ts
│       └── directions/       # Directions endpoint
│           └── route.ts
├── components/
│   └── MapView.tsx           # Interactive map component
├── lib/
│   ├── tollData.ts           # Toll station database
│   └── tollCalculator.ts     # Toll calculation logic
├── public/                   # Static assets
└── .env.local               # Environment variables
```

## 🔧 Configuration

### Vehicle Types

The calculator supports these vehicle categories with different toll rates:

- **Motorcycle** 🏍️ - Lowest toll rates
- **Car** 🚗 - Standard sedan rates  
- **SUV/Van** 🚙 - Higher rates (same as small trucks)
- **Small Truck** 🚚 - Commercial vehicle rates
- **Large Truck** 🚛 - Highest toll rates

### Toll Database

Toll prices are based on official 2025 rates from:
- **Olympia Odos** (Athens-Patras)
- **Nea Odos A.TH.E** (Athens-Thessaloniki)
- **Ionia Odos** (Antirrio-Ioannina)
- **Rio-Antirrio Bridge**

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Ideas for Contributions

- 🗺️ Add more Greek toll stations
- 🌍 Expand to other countries
- 💾 Add save/export trip functionality
- 📱 Improve mobile UI
- 🔍 Add location autocomplete
- 📊 Create trip history feature
- 🌐 Add internationalization (i18n)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Toll pricing data from official Greek highway operators
- Maps powered by [Mapbox](https://www.mapbox.com/)
- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)

## 📧 Contact

Your Name - [@yourtwitterhandle](https://twitter.com/yourtwitterhandle)

Project Link: [https://github.com/yourusername/greek-trip-calculator](https://github.com/yourusername/greek-trip-calculator)

---

<div align="center">
  Made with ❤️ for Greek road trippers
  
  ⭐ Star this repo if you find it helpful!
</div>