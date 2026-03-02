"use client";

import { useActionState, useState } from "react";
import { authenticate, AccountFormState } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
	const initialFormData = new FormData();
	initialFormData.set("email", "");
	initialFormData.set("password", "");

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/";

	const initialState: AccountFormState = {
		fields: initialFormData,
		message: null,
	};
	const [state, formAction, isPending] = useActionState(
		authenticate,
		initialState,
	);

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	return (
		<form action={formAction} className="space-y-3">
			<div className="rounded-md border-[2px] border-gray-300 w-[50%] m-auto bg-gray-100 mt-[5%] p-4 md:p-6 ">
				{callbackUrl != "/" && (
					<h1 className={"mb-3 text-2xl"}>
						Please log in to continue.
					</h1>
				)}
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-2 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Username or Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="text"
								name="email"
								placeholder="Enter your username or email address"
								defaultValue={
									state?.fields.get("email") as string
								}
								required
							/>
						</div>
					</div>
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Password
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
								className="flex h-10 ml-5 items-center rounded-lg px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
							>
								{passwordIsVisible
									? "Hide Password"
									: "Show Password"}
							</button>
						</div>
					</div>
				</div>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{state?.message && (
						<>
							<p className="text-sm text-red-500">
								{state.message}
							</p>
						</>
					)}
				</div>

				<hr className="mb-[25px]" />
				<input type="hidden" name="redirectTo" value={callbackUrl} />

				<div className="flex gap-4 w-[50%] mx-[25%] items-center px-[5%]">
					<Link
						href="/"
						className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
					>
						Cancel
					</Link>
					<button
						className="w-full h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 bg-gray-200 border-gray-400 border-2 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800 transition-colors"
						aria-disabled={isPending}
						onClick={() => {
							setPasswordIsVisible(false);
						}}
					>
						Log in{" "}
					</button>
				</div>
				<p className="mt-3 text-center">
					Don't have an account?{" "}
					<Link
						className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
						href={
							`/account/create` +
							(callbackUrl != "/"
								? `?callbackUrl=${encodeURIComponent(
										callbackUrl,
								  )}`
								: "")
						}
					>
						Create one!
					</Link>
				</p>
			</div>
		</form>
	);
}
