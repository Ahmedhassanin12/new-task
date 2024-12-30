import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export function AuthButton() {
	function handleLogout() {
		signOut({ callbackUrl: "/signin", redirect: true });
	}

	return (
		<div className="w-full flex flex-col h-12 border-stone-300 justify-end text-xs">
			<div
				onClick={handleLogout}
				onKeyUp={handleLogout}
				className="cursor-pointer"
			>
				<Button
					sx={{ width: "100%" }}
					variant="outlined"
					startIcon={<LogoutIcon />}
				>
					log out
				</Button>
			</div>
		</div>
	);
}
