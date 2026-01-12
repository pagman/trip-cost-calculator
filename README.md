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
- **🛣️ Smart Toll Estimation** - Matches against 7 major routes or estimates using €0.07/km formula
- **🚗 Multiple Vehicle Types** - Support for motorcycles, cars, SUVs, and trucks with different toll multipliers
- **👥 Cost Splitting** - Divide expenses among passengers
- **🔀 Avoid Tolls Option** - Find toll-free alternative routes
- **📊 Detailed Breakdown** - See fuel costs, toll costs, distance, and duration
- **🎯 Works for Any Route** - Known routes get exact prices, others are estimated by distance
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

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js app is with [Vercel](https://vercel.com):

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add `NEXT_PUBLIC_MAPBOX_TOKEN` with your Mapbox token
   - Deploy!

4. **Done!** Your app will be live at `your-project.vercel.app`

### Deploy to Other Platforms

The app can also be deployed to:

- **Netlify**: Use the Next.js runtime
- **AWS Amplify**: Connect your Git repository
- **Railway**: One-click deploy
- **DigitalOcean App Platform**: Container-based deployment

For all platforms, remember to:
1. Set `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable
2. Ensure Node.js 18+ is used
3. Build command: `npm run build`
4. Start command: `npm start`

### Environment Variables for Production

Required environment variables:
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox API token (get it from [mapbox.com](https://account.mapbox.com/access-tokens/))

**Important:** Never commit your `.env.local` file. Use your platform's environment variable settings instead.

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
- Toll Cost (Car): €22.50 (matched route)
- Fuel Cost (7L/100km @ €1.75): ~€61.25
- **Total: €83.75**

**Athens to Patras:**
- Distance: ~215 km
- Duration: ~2.5 hours
- Toll Cost (Car): €12.00 (matched route)
- Fuel Cost (7L/100km @ €1.75): ~€26.25
- **Total: €38.25**

## 🛣️ How Toll Calculation Works

The toll calculation system uses a **two-tier approach** to estimate toll costs:

### 1. Known Route Matching
The system first tries to match your route against predefined major highways:

| Route | Base Toll (Car) | Route |
|-------|-----------------|-------|
| Athens ↔ Thessaloniki | €22.50 | Athens ↔ Patras | €12.00 |
| Athens ↔ Corinth | €2.80 | Athens ↔ Lamia | €9.00 |
| Thessaloniki ↔ Kavala | €8.00 | Corinth ↔ Patras | €9.20 |
| Lamia ↔ Igoumenitsa | €12.00 | | |

Routes are matched **bidirectionally** - "Athens to Thessaloniki" = "Thessaloniki to Athens"

### 2. Vehicle Type Multipliers
Base toll prices (for cars) are adjusted based on vehicle type:

- 🏍️ **Motorcycle**: 0.5× (50% of car price)
- 🚗 **Car/SUV**: 1.0× (baseline)
- 🚚 **Small Truck**: 1.5× (150% of car price)
- 🚛 **Large Truck**: 2.0× (200% of car price)

### 3. Distance-Based Estimation
If no specific route is matched, tolls are estimated as:
```
€0.07 per km × distance × vehicle multiplier
```
Based on the average toll rate in Greece (€0.06-0.08/km for cars)

### 4. Future Enhancement
The codebase includes comprehensive toll station data with 21+ individual stations (Olympia Odos, Nea Odos, Ionia Odos, Rio-Antirrio Bridge) with exact prices - prepared for future station-by-station calculation.

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

### Current System

The app currently uses **predefined route totals** for major highways:
- 7 major routes with known toll costs
- Vehicle type multipliers (0.5× to 2.0×)
- Distance-based estimation (€0.07/km) for unmatched routes

### Available Data (For Future Enhancement)

The codebase includes detailed toll station data ready for implementation:
- **21+ individual toll stations** across Greece
- **Olympia Odos** (Athens-Patras corridor): 14 stations
- **Nea Odos A.TH.E** (Athens-Thessaloniki corridor): 8 stations  
- **Ionia Odos** (Western Greece): 9 stations
- **Special tolls**: Rio-Antirrio Bridge (€15.40 for cars)

All detailed prices are official 2025 rates from Greek highway operators, prepared for future station-by-station calculation.

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