import type { Content } from "@prismicio/client"
import { asLink, isFilled } from "@prismicio/client"
import { PrismicImage } from "@prismicio/react"

type FooterProps = {
	data: Content.FooterDocumentData
}

export function Footer({ data }: FooterProps) {
	const { logo, brand_name, navigation } = data

	return (
		<footer className="bg-background border-border border-t">
			<div className="mx-auto max-w-6xl px-6 py-12">
				<div className="flex flex-col items-center gap-8">
					<div className="flex-shrink-0">
						{isFilled.image(logo) ?
							<span className="bg-logo-chip inline-flex items-center rounded-md px-2 py-1">
								<PrismicImage field={logo} className="h-8 w-auto" />
							</span>
						: isFilled.keyText(brand_name) ?
							<span className="text-foreground font-display text-lg font-semibold">
								{brand_name}
							</span>
						:	null}
					</div>

					{navigation && navigation.length > 0 && (
						<nav className="flex flex-wrap items-center justify-center gap-6">
							{navigation.map((link, i) => {
								const url = asLink(link)
								return (
									url && (
										<a
											key={i}
											href={url}
											className="text-muted-foreground hover:text-foreground text-sm font-medium transition"
										>
											{link.text}
										</a>
									)
								)
							})}
						</nav>
					)}
				</div>

				<hr className="border-border my-8" />

				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()}. All rights reserved.
					</p>
					<nav className="flex items-center gap-6">
						<a
							href="#"
							className="text-muted-foreground hover:text-foreground text-sm transition"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-muted-foreground hover:text-foreground text-sm transition"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="text-muted-foreground hover:text-foreground text-sm transition"
						>
							Cookies Settings
						</a>
					</nav>
				</div>
			</div>
		</footer>
	)
}
