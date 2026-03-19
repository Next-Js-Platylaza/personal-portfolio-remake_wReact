import { WeatherData } from "../lib/definitions";
import { getWeatherData } from "../lib/api";

// NWS API
export async function useLocalWeather() {
	const weatherData = (await getWeatherData()) as WeatherData;

	return (
		<div className="flex h-[52px] w-[90px] p-auto m-1 grow items-center justify-center text-center gap-2 rounded-md bg-gray-100 border-gray-200 border-3 p-3 text-md my-auto md:flex-none">
			<p>
				{weatherData.temp} {weatherData.word}
			</p>
		</div>
	);
}
