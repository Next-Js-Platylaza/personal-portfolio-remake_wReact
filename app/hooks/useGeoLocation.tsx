"use client";

import { useState, useEffect } from "react";
import { LocationState } from "../lib/definitions";

const useGeolocation = (): LocationState => {
	const [state, setState] = useState<LocationState>({
		loading: true,
		coords: null,
		error: null,
	});

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			setState((prev) => ({
				...prev,
				loading: false,
				error: {
					code: 2, // Position unavailable
					message: "Geolocation is not supported by your browser",
					PERMISSION_DENIED: 1,
					POSITION_UNAVAILABLE: 2,
					TIMEOUT: 3,
				} as GeolocationPositionError,
			}));
			return;
		}

		const onSuccess: PositionCallback = (position) => {
			setState({
				loading: false,
				coords: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					altitude: position.coords.altitude,
					altitudeAccuracy: position.coords.altitudeAccuracy,
					heading: position.coords.heading,
					speed: position.coords.speed,
				},
				error: null,
			});
		};

		const onError: PositionErrorCallback = (error) => {
			setState((prev) => ({
				...prev,
				loading: false,
				error,
			}));
		};

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	}, []);

	return state;
};

export default useGeolocation;
