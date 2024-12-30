"use client";
import { userInfo } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useStore } from "@/common/store/store";
import { CircularProgress } from "@mui/material";

export default function Home() {
	const { data: session } = useSession();
	const setError = useStore((state) => state.setError);
	const setUser = useStore((state) => state.setUser);
	const error = useStore((state) => state.error);
	const user = useStore((state) => state.user);
	const isLoading = useStore((state) => state.loading);
	const setLoading = useStore((state) => state.setLoading);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			const [res, reqError] = await userInfo(session?.accessToken);
			if (reqError) {
				setLoading(false);
				setError(reqError);
				return;
			}
			setLoading(false);
			setUser(res);
		};

		if (!error && session?.accessToken) {
			fetchUser();
		}
	}, [session?.accessToken, setError, setUser, error, setLoading]);

	return (
		<div className="flex flex-col items-center justify-center p-6">
			<p>App dashboard</p>
			{error ? <p>Some thing went wrong</p> : null}
			{user && !isLoading ? (
				<>
					<p>{user.name}</p>
					<p>{user.id}</p>
				</>
			) : null}
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center">
					<CircularProgress />
				</div>
			) : null}
		</div>
	);
}
