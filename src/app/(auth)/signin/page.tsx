"use client";
import { SignInValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FormValues = z.infer<typeof SignInValidationSchema>;
export default function SignUp() {
	const [requestSuccess, setRequestSuccess] = useState<string | undefined>();
	const [requestError, setRequestError] = useState<string | undefined>();
	const searchParams = useSearchParams();
	const router = useRouter();

	const form = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(SignInValidationSchema),
	});
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;
	const onSubmit = async (data: FormValues) => {
		setRequestSuccess(undefined);
		setRequestError(undefined);
		setLoading(true);
		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		if (!res?.ok) {
			if (res?.error === "CredentialsSignin") {
				setLoading(false);
				setRequestError("Invalid Credentials. Please try again.");
			} else {
				setLoading(false);
				setRequestError("Something went wrong. Please try again.");
			}
		} else {
			router.replace(searchParams?.get("from") ?? "/");
		}
	};

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<main
			style={{
				height: "calc(100vh - 80px)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div className="grid gap-6 mb-6 md:grid-cols-1 w-[400px] p-4 mt-8  rounded-lg bg-gradient-to-b from-slate-200 to-gray-50">
				<div>
					<h1 className="text-center font-semibold">Welcome Back</h1>
					<h4 className="text-center font-semibold">Sign in </h4>
				</div>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					className="w-full mt-3 flex flex-col items-center justify-center gap-5"
				>
					<div className="w-full flex flex-col items-center justify-center gap-3">
						<div className="w-full flex flex-col">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800 "
							>
								Email Address
							</label>
							<input
								disabled={loading}
								required
								id="email"
								autoComplete="email"
								{...register("email")}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<p className="text-sm text-red-500">{errors.email?.message}</p>
						</div>
						<div className="w-full flex flex-col">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800"
							>
								Password
							</label>

							<input
								disabled={loading}
								required
								type={showPassword ? "text" : "password"}
								id="password"
								autoComplete="current-password"
								{...register("password")}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<p className="text-sm text-red-400">{errors.password?.message}</p>
						</div>
						{requestError || requestSuccess ? (
							<div>
								{requestError ? (
									<p className="text-sm text-red-500">{requestError}</p>
								) : null}
								{requestSuccess ? (
									<p className="text-sm text-green-500">{requestSuccess}</p>
								) : null}
							</div>
						) : null}
					</div>

					<button
						disabled={loading}
						type="submit"
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{loading ? (
							<CircularProgress size={24} sx={{ color: "white" }} />
						) : (
							"Sign In"
						)}
					</button>
				</form>
			</div>
		</main>
	);
}
