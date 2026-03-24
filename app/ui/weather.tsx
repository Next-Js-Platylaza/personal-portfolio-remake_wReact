"use client";

import { useWeatherForecast } from "../hooks/useWeatherForecast";
import { CrossPageData } from "../lib/api";

export default function WeatherComponent() {
	const weatherForecast = useWeatherForecast();
	const usingSavedData = weatherForecast.data == null || weatherForecast.data == undefined;

	const weatherData = usingSavedData ? (CrossPageData.weatherData ?? weatherForecast.data) : weatherForecast.data;
	const weatherText = weatherData ? `${weatherData?.temp} ${weatherData?.word}` : ""; 
	let locationText = "Logan";

	if (usingSavedData)
	{
		if (CrossPageData.weatherLocationWasLocal) locationText = "Local";
	} else if (weatherForecast.location?.coords && !weatherForecast.location?.loading) {
		locationText = "Local";
	}

	return (
		<div className="flex flex-col h-[52px] min-w-[80px] max-w-[190px] p-auto m-1 grow items-center justify-center text-center gap-2 rounded-md bg-gray-100 border-gray-200 border-3 p-3 text-sm my-auto md:flex-none">
			<p className="-mb-1.75 text-xs">{locationText}</p>
			<p> {weatherText} </p>
		</div>
	);
}
