# WeatherApp

Single-page React app that fetches the current weather for **Novi Han** using the OpenWeather API. Built with Vite for fast local development.

## Features

- Live weather metrics: temperature, humidity, pressure, wind speed/direction, sunrise and sunset.
- Friendly Bulgarian UI labels and weather icon display.
- Error messaging for missing API keys or network issues.

## Prerequisites

- Node.js 18 or later
- An OpenWeather API key

## Setup

1. Install dependencies:

	```powershell
	npm install
	```

2. Configure your API key by creating an `.env` file (or `.env.local`) based on the provided example:

	```powershell
	Copy-Item .env.example .env.local
	# then edit .env.local and set VITE_OPENWEATHER_API_KEY
	```

3. Start the development server:

	```powershell
	npm run dev
	```

Visit the URL shown in the terminal (typically http://localhost:5173) to view the app.

## Building for Production

```powershell
npm run build
```

To preview the production build locally:

```powershell
npm run preview
```

## Linting

```powershell
npm run lint
```

## Notes

- Keep your `.env.local` out of version control; it is already ignored by default.
- To change the location, adjust the query string used in `fetch` inside `src/App.jsx`.
