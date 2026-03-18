"use client";
import { notFound } from "next/navigation";
import { useLocalWeather } from "../ui/useLocalWeather";

export default async function WeatherPage() {
	const localWeather = useLocalWeather();

	return <div>{localWeather}</div>;
}
