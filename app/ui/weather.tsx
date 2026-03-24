"use client";
import { useLocalWeather } from "../hooks/useLocalWeather";

export default function WeatherComponent() {
	const localWeather = useLocalWeather();

	return (
		<div className="flex h-[52px] w-[100px] p-auto m-1 grow items-center justify-center text-center gap-2 rounded-md bg-gray-100 border-gray-200 border-3 p-3 text-sm my-auto md:flex-none">
			<p> {localWeather.data?.temp} </p>
			<p>{localWeather.data?.word}</p>
		</div>
	);
}
