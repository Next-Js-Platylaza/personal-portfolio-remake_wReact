"use client";
import { useEffect, useState } from "react";
import { LocationCoords, WeatherData } from "../lib/definitions";
import useGeolocation from "./useGeoLocation";
import { getWeatherData } from "../lib/api";

// NWS API
export function useLocalWeather() {
	const geoLocation = useGeolocation().coords;
	const coords = `${geoLocation?.latitude}, ${geoLocation?.longitude}`;

	const [data, setData] = useState<WeatherData | null>(null);
	const [location, setLocation] = useState<LocationCoords | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const result = await getWeatherData(
					geoLocation ? coords : "41.725, -111.85",
				);
				setLocation(geoLocation);
				if (isMounted) {
					setData(result);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : "Error");
					setLoading(false);
				}
			}
		};

		fetchData();
		return () => {
			isMounted = false;
		};
	}, []);

	return { data, location, loading, error, message };
}
