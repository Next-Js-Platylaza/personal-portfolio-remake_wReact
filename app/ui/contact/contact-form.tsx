"use client";
import { Metadata } from "next";
import StyleClasses from "../../lib/style-classes";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { ContactFormState /*sendContactForm*/ } from "@/app/lib/actions";
import ContactFormInput from "./contact-form-input";

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

	const state: ContactFormState = {
		fields: initialFormData,
		message: null,
		errors: {
			first_name: ["Test 1st_Nm Error"],
			last_name: ["Test 1st_Nm Error"],
			email: ["Test Email Error"],
			message: ["Test Message Error"],
			message_type: ["Test MsgType Error"],
		},
	};

	return (
		<form
			//action={formAction}
			id="contact"
			className="flex flex-col mx-auto my-8 p-5 rounded-[25px]  border-3 border-gray-500 bg-gray-300 w-190"
		>
			<section className="flex">
				{/* First Name */}
				<ContactFormInput
					idLabel="first-name"
					labelText="First Name:"
					errors={state.errors?.first_name}
					divClass="mr-[12%]"
					inputTag={
						<input
							id="first-name"
							type="text"
							placeholder="John"
							defaultValue={
								state.fields.get("first_name") as string
							}
							className={StyleClasses.inputFormClass}
							aria-describedby="first-name-error"
						/>
					}
				/>
				{/* Email */}
				<ContactFormInput
					idLabel="email"
					labelText="Email:"
					errors={state.errors?.email}
					inputTag={
						<input
							id="email"
							type="text"
							placeholder="abc123@mail.com"
							className={StyleClasses.inputFormClass}
						/>
					}
				/>
			</section>
			<br />
			<section>
				{/* Last Name */}
				<div className="flex flex-col">
					<div className="flex flex-row">
						<label htmlFor="last-name">Last Name:</label>
						<input
							id="last-name"
							type="text"
							placeholder="Doe"
							className={StyleClasses.inputFormClass}
						/>
					</div>
					{/* Last-Name Error*/}
					<div
						id="last-name-error"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.errors?.last_name &&
							state.errors.last_name.map((error: string) => (
								<p
									className={StyleClasses.formErrorClass}
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
				{/* Message */}
				<div className="flex flex-col">
					<div className="flex flex-row">
						<label htmlFor="message">Message:</label>
						<textarea
							id="message"
							placeholder="Type message here"
							className={StyleClasses.inputFormClass}
						></textarea>
					</div>
					{/* Message Error*/}
					<div
						id="message-error"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.errors?.message &&
							state.errors.message.map((error: string) => (
								<p
									className={StyleClasses.formErrorClass}
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
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
