import { Avatar, Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export function AccountMenu() {
	const { data: session } = useSession();

	return (
		<Box
			sx={{
				width: "100%",
				backgroundColor: "#e5e7eb",
				borderRadius: 1,
			}}
		>
			<Button
				type="button"
				sx={{
					width: "100%",
					display: "flex",
					alignItems: "flex-center",
					justifyContent: "space-between",
					gap: 1,
					px: 1,
				}}
			>
				<Avatar
					src={"https://api.dicebear.com/9.x/adventurer/svg?=dee"}
					alt="Avatar"
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: 0,
					}}
				>
					<span
						style={{ textTransform: "lowercase" }}
						className="text-xs  block"
					>
						{session?.user?.name}
					</span>
					<span
						style={{ textTransform: "lowercase" }}
						className="text-xs  block text-stone-500"
					>
						{session?.user?.email}
					</span>
				</Box>

				<div className="flex flex-col items-center gap-0">
					<KeyboardArrowUpIcon fontSize="small" />
					<KeyboardArrowDownIcon fontSize="small" />
				</div>
			</Button>
		</Box>
	);
}
