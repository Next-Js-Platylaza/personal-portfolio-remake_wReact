import { WeatherData } from "./definitions";

// NWS API
export async function getWeatherData(coords: string = "41.725, -111.85") {
	const res = await fetch("https://api.weather.gov/points/" + coords, {
		headers: {
			"User-Agent": "default-agent",
		},
	});

	if (!res.ok) return null;
	const data = await res.json();

	const forecastRes = await fetch(data.properties.forecast, {
		headers: {
			"User-Agent": "default-agent",
		},
	});
	const json = await forecastRes.json();
	const period = json.properties.periods[0];
	return {
		temp: `${period.temperature}°${period.temperatureUnit}`,
		word: period.shortForecast,
	} as WeatherData;
}

export class CrossPageData {
	static weatherLocationWasLocal: boolean = false;
	static weatherData: WeatherData | null | undefined;
}