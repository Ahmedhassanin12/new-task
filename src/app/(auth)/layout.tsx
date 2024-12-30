import { getServerSession } from "next-auth";
import AuthProvider from "../_providers/AuthProvider";
import { authOptions } from "../../../auth";
import "../../styles/globals.css";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body>
				<AuthProvider session={session}>{children}</AuthProvider>
			</body>
		</html>
	);
}
