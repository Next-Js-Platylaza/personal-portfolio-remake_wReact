"use client";
import { useRef, useEffect } from "react";
import { WeatherData } from "../lib/definitions";

// NWS API
export function useLocalWeather() {
	const weatherData = useRef({} as WeatherData);

	useEffect(() => {
		// Use coordinates for specific location
		fetch("https://api.weather.gov/points/41.725, -111.85", {
			headers: {
				"User-Agent": process.env.NWS_USER_AGENT || "default-agent",
			},
		})
			.then((res) => (!res.ok ? null : res.json()))
			.then((data) => {
				// NWS often requires a second call to get the actual forecast
				const forecastRes = fetch(data.properties.forecast, {
					headers: {
						"User-Agent":
							process.env.NWS_USER_AGENT || "default-agent",
					},
				});
				return forecastRes;
			})
			.then((forecastRes) => forecastRes.json())
			.then((json) => {
				const period = json.properties.periods[0];
				weatherData.current = {
					temp: `${period.temperature}°${period.temperatureUnit}`,
					word: period.shortForecast,
				} as WeatherData;
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<p>
				Test. Temp:({weatherData.current.temp}), Word:(
				{weatherData.current.word})
			</p>
		</div>
	);
	/*return {
		temp: `${period.temperature}°${period.temperatureUnit}`,
		word: period.shortForecast,
	} as WeatherData;*/
}
