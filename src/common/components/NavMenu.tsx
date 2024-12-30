import { Dashboard, Person, Settings } from "@mui/icons-material";
import { Box, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
	{
		icon: <Dashboard />,
		pageName: "DashBoard",
		pageLinks: ["/", "/dashboard"],
	},
	{ icon: <Person />, pageName: "Profile", pageLinks: ["/profile"] },
	{ icon: <Settings />, pageName: "Settings", pageLinks: ["/settings"] },
];

const NavMenu = () => {
	const pathname = usePathname();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 0.5,
				width: "100%",
			}}
		>
			{pages.map((page) => (
				<Link
					shallow
					passHref
					key={page.pageName}
					href={{
						pathname: page.pageLinks[0],
					}}
					style={{
						textDecoration: "none",
						width: "100%",
					}}
				>
					<MenuItem
						disableRipple
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							gap: 1,
							backgroundColor: page.pageLinks.some((link) => pathname === link)
								? "#e4e4e4"
								: "transparent",
						}}
					>
						{page.icon}
						{page.pageName}
					</MenuItem>
				</Link>
			))}
		</Box>
	);
};

export default NavMenu;
