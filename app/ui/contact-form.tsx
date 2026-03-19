"use client";
import { Metadata } from "next";
import StyleClasses from "../lib/style-classes";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
//import { ContactFormState, sendContactForm } from "../lib/actions";

export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default function ContactForm() {
	const initialFormData = new FormData();
	initialFormData.set("first_name", "");
	initialFormData.set("last_name", "");
	initialFormData.set("email", "");
	initialFormData.set("message", "");
	initialFormData.set("message_type", "Business Inquiry");

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/";

	/*const initialState: ContactFormState = {
		fields: initialFormData,
		message: null,
		errors: {},
	};
	//const [state, formAction] = useActionState(sendContactForm, initialState);
*/

	const state = {
		fields: initialFormData,
		message: null,
		errors: { first_name: [""] },
	};

	return (
		<form
			//action={formAction}
			id="contact"
			className="flex flex-col mx-auto my-8 p-5 rounded-[25px]  border-3 border-gray-500 bg-gray-300 w-190"
		>
			<section className="flex">
				<label htmlFor="first-name">First Name:</label>
				<input
					id="first-name"
					type="text"
					placeholder="John"
					defaultValue={state.fields.get("first_name") as string}
					className={StyleClasses.inputFormClass + " mr-[12%]"}
					aria-describedby="first-name-error"
				/>
				<div
					id="first-name-error"
					aria-live="polite"
					aria-atomic="true"
				>
					{state.errors?.first_name &&
						state.errors.first_name.map((error: string) => (
							<p
								className="mt-2 text-sm text-red-500"
								key={error}
							>
								{error}
							</p>
						))}
				</div>

				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="text"
					placeholder="abc123@mail.com"
					className={StyleClasses.inputFormClass}
				/>
			</section>
			<br />
			<section className="">
				<label htmlFor="last-name">Last Name:</label>
				<input
					id="last-name"
					type="text"
					placeholder="Doe"
					className={StyleClasses.inputFormClass + " mr-[12%]"}
				/>
				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					placeholder="Type message here"
					className={StyleClasses.inputFormClass}
				></textarea>
			</section>
			<br />
			<section className="ml-auto w-90">
				<select
					id="message-type"
					className={`${StyleClasses.inputFormClass} my-2`}
				>
					<option value="business">Business Inquiry</option>
					<option value="feedback">Feedback</option>
					<option value="general">General Question</option>
				</select>

				<button className={`${StyleClasses.buttonClass} ml-8`}>
					Contact Me
				</button>
			</section>
		</form>
	);
}
