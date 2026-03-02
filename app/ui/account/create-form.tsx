"use client";
import Link from "next/link";
import { createUser, AccountFormState } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CreateAccountForm() {
	const initialFormData = new FormData();
	initialFormData.set("name", "");
	initialFormData.set("email", "");
	initialFormData.set("password", "");

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/";

	const initialState: AccountFormState = {
		fields: initialFormData,
		message: null,
		errors: {},
	};
	const [state, formAction] = useActionState(createUser, initialState);

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	return (
		<form action={formAction}>
			<div className="rounded-md border-[2px] border-gray-300 w-[50%] m-auto bg-gray-100 mt-[5%] p-4 md:p-6 ">
				{/* User Name */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium"
					>
						Enter username
					</label>
					<div className="relative">
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Enter username"
							defaultValue={state.fields.get("name") as string}
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="name-error"
						/>
					</div>
					<div id="name-error" aria-live="polite" aria-atomic="true">
						{state.errors?.name &&
							state.errors.name.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>

				{/* User Email */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-medium"
					>
						Enter email
					</label>
					<input
						id="email"
						name="email"
						type="text"
						placeholder="Enter email"
						defaultValue={state.fields.get("email") as string}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
						aria-describedby="email-error"
					/>
					<div id="email-error" aria-live="polite" aria-atomic="true">
						{state.errors?.email &&
							state.errors.email.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>

				{/* User Password */}
				<div className="mb-4">
					<label
						htmlFor="password"
						className="mb-2 block text-sm font-medium"
					>
						Enter password
					</label>
					<div className="flex">
						<input
							id="password"
							name="password"
							type={passwordIsVisible ? "text" : "password"}
							placeholder="Enter password"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="password-error"
						/>
						{/* Show/Hide Password Button*/}
						<button
							type="button"
							onClick={() => {
								setPasswordIsVisible((b) => !b);
							}}
							className="flex h-11 ml-5 items-center rounded-lg  px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
						>
							{passwordIsVisible
								? "Hide Password"
								: "Show Password"}
						</button>
					</div>
					<div
						id="password-error"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.errors?.password &&
							state.errors.password.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>

				<p className="mt-2 text-sm text-red-500">{state.message}</p>
				<hr className="mt-[25px] mb-[15px]" />
				<input type="hidden" name="redirectTo" value={callbackUrl} />

				<div className="flex justify-end gap-4">
					<Link
						href="/"
						className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
					>
						Create Account
					</button>
				</div>
				<p className="text-center">
					Already have an account?{" "}
					<Link
						className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
						href={
							`/account/login` +
							(callbackUrl != "/"
								? `?callbackUrl=${encodeURIComponent(
										callbackUrl,
								  )}`
								: "")
						}
					>
						Login here!
					</Link>
				</p>
			</div>
		</form>
	);
}
