import type { Metadata } from "next"

import { MswProvider } from "@/components/MswProvider"
import { PrismicToolbarWrapper } from "@/components/PrismicToolbarWrapper"
import { Providers } from "@/components/Providers"

import "./globals.css"

export const metadata: Metadata = {
	title: "Prismic Website",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="overflow-x-hidden antialiased">
				<Providers>
					<MswProvider>{children}</MswProvider>
					<PrismicToolbarWrapper />
				</Providers>
			</body>
		</html>
	)
}
