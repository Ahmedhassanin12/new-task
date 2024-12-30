"use client";
import { AuthButton } from "./Auth";
import { AccountMenu } from "./AccountMenu";
import { Box } from "@mui/material";
import NavMenu from "../NavMenu";

export function Sidebar() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "#e1e1e12b",
				p: 1,
				ml: 1,
			}}
			style={{ justifyContent: "space-between" }}
		>
			<div className="w-full flex flex-col gap-3">
				<AccountMenu />
				<NavMenu />
			</div>

			<AuthButton />
		</Box>
	);
}
