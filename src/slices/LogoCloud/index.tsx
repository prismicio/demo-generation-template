import { type Content, isFilled } from "@prismicio/client"
import { PrismicImage, type SliceComponentProps } from "@prismicio/react"
import type { FC } from "react"

import { Bounded } from "../../components/Bounded"

const MAX_GRID_LOGOS = 5

type LogoCloudProps = SliceComponentProps<Content.LogoCloudSlice>

const LogoCloud: FC<LogoCloudProps> = ({ slice }) => {
	const headingId = `logo-cloud-heading-${slice.id ?? "default"}`
	const { heading } = slice.primary

	const isValidItem = (item: Content.LogoCloudSliceDefaultItem) =>
		isFilled.image(item.logo) || isFilled.keyText(item.company_name)

	const validCount = slice.items.filter(isValidItem).length
	const useMarquee = validCount > MAX_GRID_LOGOS

	const stableKey = (item: Content.LogoCloudSliceDefaultItem) =>
		item.logo?.url ?? item.company_name ?? ""

	const renderLogo = (
		item: Content.LogoCloudSliceDefaultItem,
		originalIndex: number,
		keyPrefix = "",
	) => {
		if (!isValidItem(item)) return null

		return (
			<div
				key={`${keyPrefix}${stableKey(item)}`}
				className="group flex shrink-0 items-center justify-center px-4"
			>
				{isFilled.image(item.logo) ?
					<PrismicImage
						field={
							item.logo.alt ?
								item.logo
							:	{ ...item.logo, alt: item.company_name ?? null }
						}
						fallbackAlt=""
						className="h-8 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-10"
					/>
				:	isFilled.keyText(item.company_name) && (
						<span className="font-display text-muted-foreground/60 text-lg font-semibold tracking-tight transition duration-300 group-hover:text-foreground">
							{item.company_name}
						</span>
					)
				}
			</div>
		)
	}

	const logoSet = (prefix: string) => (
		<div
			className="flex shrink-0 items-center gap-12"
			aria-hidden={prefix === "b-" ? true : undefined}
		>
			{slice.items.map((item, i) => renderLogo(item, i, prefix))}
		</div>
	)

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-background text-foreground font-sans"
			aria-labelledby={headingId}
		>
			<Bounded yPadding="lg" wide>
				{isFilled.keyText(heading) && (
					<h2
						id={headingId}
						className="text-muted-foreground mb-10 text-center text-sm font-medium tracking-wide uppercase md:mb-12"
					>
						{heading}
					</h2>
				)}

				{useMarquee ?
					<div className="logo-marquee-mask relative overflow-hidden">
						<div className="logo-marquee flex w-max items-center gap-12">
							{logoSet("a-")}
							{logoSet("b-")}
						</div>
					</div>
				:	<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10">
						{slice.items.map((item, i) => renderLogo(item, i))}
					</div>
				}
			</Bounded>
		</section>
	)
}

export default LogoCloud
