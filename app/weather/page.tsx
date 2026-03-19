import { notFound } from "next/navigation";
import { useLocalWeather } from "../hooks/useLocalWeather";

export default async function WeatherPage() {
	const localWeather = useLocalWeather();

	return <div>{localWeather}</div>;
}
