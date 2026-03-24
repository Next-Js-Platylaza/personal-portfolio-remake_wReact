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
				error: "Geolocation is not supported by your browser"
			}));
			return;
		}

		const onSuccess: PositionCallback = (position) => {
			setState({
				loading: false,
				coords: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				},
				error: null,
			});
		};

		const onError: PositionErrorCallback = (error) => {
			setState((prev) => ({
				...prev,
				loading: false,
				error: error.message,
			}));
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		});
	}, []);

	return state;
};

export default useGeolocation;
