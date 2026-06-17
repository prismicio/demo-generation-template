import type { Content } from "@prismicio/client"
import { asLink, isFilled } from "@prismicio/client"
import { PrismicImage } from "@prismicio/react"

type HeaderProps = {
	data: Content.HeaderDocumentData
}

export function Header({ data }: HeaderProps) {
	const { logo, brand_name, navigation, cta } = data

	return (
		<header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
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

				<nav className="hidden items-center gap-6 md:flex">
					{navigation?.map((link, i) => {
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

				{isFilled.link(cta) && (
					<a
						href={asLink(cta) ?? "#"}
						className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex h-9 items-center rounded-[length:var(--radius-button)] px-5 text-sm font-semibold transition"
					>
						{cta.text || "Get Started"}
					</a>
				)}
			</div>
		</header>
	)
}
