"use client";
import type { JSX, ReactNode } from "react";
import { Metadata } from "next";
import StyleClasses from "../../lib/style-classes";

export default function ContactFormInput(props: {
	idLabel: string;
	labelText: string;
	errors?: string[];
	divClass?: string;
	children: ReactNode;
}) {
	return (
		<div className={`flex flex-col ${props.divClass}`}>
			{/* Label and Input */}
			<div className="flex flex-row">
				<label htmlFor={props.idLabel}>{props.labelText}</label>
				{props.children}
			</div>
			{/* Error(s) */}
			<div
				id={`${props.idLabel}-error`}
				aria-live="polite"
				aria-atomic="true"
			>
				{props.errors?.map((error: string) => (
					<p className={StyleClasses.formErrorClass} key={error}>
						{error}
					</p>
				))}
			</div>
		</div>
	);
}
