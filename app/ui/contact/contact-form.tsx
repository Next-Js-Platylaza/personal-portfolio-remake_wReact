"use client";
import StyleClasses from "../../lib/style-classes";
import { useActionState, useEffect } from "react";
import { ContactFormState, sendContactForm } from "@/app/lib/actions";
import ContactFormInput from "./contact-form-input";

export default function ContactForm() {
	const initialFormData = new FormData();
	initialFormData.set("first-name", "");
	initialFormData.set("last-name", "");
	initialFormData.set("email", "");
	initialFormData.set("message", "");
	initialFormData.set("message-type", "");

	const initialState: ContactFormState = {
		fields: initialFormData,
		message: null,
		errors: {},
		wasSubmited: false,
	};
	const [state, formAction] = useActionState(sendContactForm, initialState);

	const message_types: string[] = ["business", "feedback", "general"];
	const message_type_titles: string[] = [
		"Business Inquiry",
		"Feedback",
		"General Question",
	];

	return (
		<form
			action={formAction}
			id="contact"
			className="flex flex-col mx-auto my-8 p-5 px-8 rounded-[25px]  border-3 border-gray-500 bg-gray-300 w-190"
		>
			<section className="flex">
				{/* First Name */}
				<ContactFormInput
					idLabel="first-name"
					labelText="First Name:"
					errors={state.errors?.first_name}
				>
					<input
						id="first-name"
						name="first-name"
						type="text"
						placeholder={
							state.wasSubmited
								? (state.fields.get("first-name") as string)
								: "John"
						}
						defaultValue={
							state.wasSubmited
								? ""
								: (state.fields.get("first-name") as string)
						}
						className={StyleClasses.inputFormClass}
						aria-describedby="first-name-error"
					/>
				</ContactFormInput>
				{/* Email */}
				<ContactFormInput
					idLabel="email"
					labelText="Email:"
					errors={state.errors?.email}
					divClass="ml-auto"
				>
					<input
						id="email"
						name="email"
						type="text"
						placeholder={
							state.wasSubmited
								? (state.fields.get("email") as string)
								: "abc123@mail.com"
						}
						defaultValue={
							state.wasSubmited
								? ""
								: (state.fields.get("email") as string)
						}
						className={StyleClasses.inputFormClass}
					/>
				</ContactFormInput>
			</section>
			<br />
			<section className="flex">
				{/* Last Name */}
				<ContactFormInput
					idLabel="last-name"
					labelText="Last Name:"
					errors={state.errors?.last_name}
				>
					<input
						id="last-name"
						name="last-name"
						type="text"
						placeholder={
							state.wasSubmited
								? (state.fields.get("last-name") as string)
								: "Doe"
						}
						defaultValue={
							state.wasSubmited
								? ""
								: (state.fields.get("last-name") as string)
						}
						className={StyleClasses.inputFormClass}
					/>
				</ContactFormInput>
				{/* Message */}
				<ContactFormInput
					idLabel="message"
					labelText="Message:"
					errors={state.errors?.message}
					divClass="ml-auto"
				>
					<textarea
						id="message"
						name="message"
						placeholder={
							state.wasSubmited
								? (state.fields.get("message") as string)
								: "Type message here"
						}
						defaultValue={
							state.wasSubmited
								? ""
								: (state.fields.get("message") as string)
						}
						className={StyleClasses.inputFormClass}
					/>
				</ContactFormInput>
			</section>
			<br />

			<section className="flex flex-row w-full -mb-1">
				{/* Form Message */}
				<div
					id="message-type-error"
					aria-live="polite"
					aria-atomic="true"
					className="my-auto"
				>
					<p
						key={state.message}
						className={
							state.errors
								? StyleClasses.formErrorClass
								: "mt-1 ml-5 text-sm text-slate-700"
						}
					>
						{state.message}
					</p>
				</div>
				{/* Message Type */}
				<select
					id="message-type"
					name="message-type"
					key={state.fields.get("message-type") as string}
					defaultValue={state.fields.get("message-type") as string}
					className={`${StyleClasses.inputFormClass} ml-auto my-1`}
				>
					<option value="business">Business Inquiry</option>
					<option value="feedback">Feedback</option>
					<option value="general">General Question</option>
				</select>
				{/* Submit Button */}
				<button
					type="submit"
					className={`${StyleClasses.buttonClass} my-0.5 ml-8`}
				>
					Contact Me
				</button>
			</section>
		</form>
	);
}
