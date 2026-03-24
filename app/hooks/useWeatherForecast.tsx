"use client";
import { useEffect, useState } from "react";
import {  LocationState, WeatherData } from "../lib/definitions";
import useGeolocation from "./useGeoLocation";
import { CrossPageData, getWeatherData } from "../lib/api";

// NWS API
export function useWeatherForecast() {
	const geoLocation = useGeolocation();
	const coords = `${geoLocation?.coords?.latitude}, ${geoLocation?.coords?.longitude}`;

	const [data, setData] = useState<WeatherData | null>(null);
	const [location, setLocation] = useState<LocationState | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setLocation(geoLocation);
				const result = await getWeatherData(
					geoLocation.coords ? coords : "41.725, -111.85",
				);
						
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
	}, [geoLocation.coords]);

	if (data) CrossPageData.weatherData = data;
	if (!location?.loading) CrossPageData.weatherLocationWasLocal = location?.coords != null && location.coords != undefined;

	return { data, location, loading, error };
}
