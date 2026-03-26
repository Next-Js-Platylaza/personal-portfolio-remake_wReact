"use client";

import { useRef, useEffect, useState, } from "react";
import sensiLorem from "sensible-lorem";

export default function Page() {
	return (
		<>
			<h1>Typing speed calculator</h1>
			<WPMCalculator />
		</>
	);
}

function WPMCalculator() {
	const [prompt, setPrompt] = useState<string>(
		usePrompt("The quick brown fox jumps over the lazy dog."),
	);
	const [promptPercentage, setPromptPercentage] = useState<string>("0");
	const [startTime, setStartTime] = useState<number | null>(null);
	const [finishTime, setFinishTime] = useState<number | null>(null);
	const [wpmTime, setWpmTime] = useState<string | null>(null);
	const inputRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [inputRef]);

	function reset() {
		setPrompt(usePrompt());
		setStartTime(null);
		setFinishTime(null);
	}

	function handleInput(input : HTMLInputElement) {
		// Reset & start calculator
		if (input.value.length == 0 && finishTime) {
			reset();
		} else if (input.value.length == 1) {
			setStartTime(Date.now());
		}

		if (!finishTime) {
			// Progress report
			setWpmTime(useWPMCalc(startTime as number, Date.now(), input.value));
			if (
				input.value.length < prompt.length &&
				prompt.includes(input.value)
			) {
				setPromptPercentage(
					((input.value.length / prompt.length) * 100).toFixed(2),
				);
			}

			// Complete test
			if (input.value == prompt) {
				setFinishTime(Date.now());
			}
		}
	}

	// Setup info text to display under the input element
	let wpmText = "";
	if (finishTime) {
		wpmText = "WPM: " + wpmTime;
	} else if (startTime) {
		wpmText = "Calculating.. " + promptPercentage + "%";
	} else {
		wpmText = "Type to start.";
	}
	const wpmProgressText = wpmText.includes("Calculating")
		? "(" + wpmTime + " WPM)"
		: "";

	return (
		<>
			<p className="font-lg">Prompt: {prompt}</p>
			<input
				ref={inputRef}
				onInput={()=>{
					handleInput(inputRef.current!);
				}}
				className="w-[700px] font-xl"
			></input>
			<h2>{wpmText}</h2>
			<h3>{wpmProgressText}</h3>
		</>
	);
}

function usePrompt(basePrompt:string = "") {
	let prompt;
	if (basePrompt) {
		// Set a specific prompt if basePrompt is set
		prompt = basePrompt;
	} else {
		// Set the prompt to a string of random words
		const wordCount = Math.floor(Math.random() * 2 + 8); //
		prompt = sensiLorem(wordCount) + ".";
	}
	return prompt[0].toUpperCase() + prompt.slice(1);
}

function useWPMCalc(startTime: number, endTime: number, prompt: string) {
	if (!startTime) {
		return "0.00";
	}

	const timeDif: number = endTime - startTime;
	const seconds: number = timeDif / 1000;
	const minutes: number = seconds / 60;
	const wpm: number = prompt.length / 5 / minutes;

	return wpm.toFixed(2);
}
