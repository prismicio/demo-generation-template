import { type Content, isFilled } from "@prismicio/client"
import { PrismicImage, type SliceComponentProps } from "@prismicio/react"
import clsx from "clsx"
import type { FC } from "react"

import { Bounded } from "../../components/Bounded"

type TextContentProps = {
	eyebrow: Content.HeroSliceDefaultPrimary["eyebrow"]
	headline: Content.HeroSliceDefaultPrimary["headline"]
	description: Content.HeroSliceDefaultPrimary["description"]
	cta_label: Content.HeroSliceDefaultPrimary["cta_label"]
	secondary_cta_label: Content.HeroSliceDefaultPrimary["secondary_cta_label"]
	centered?: boolean
}

const TextContent: FC<TextContentProps> = ({
	eyebrow,
	headline,
	description,
	cta_label,
	secondary_cta_label,
	centered = true,
}) => (
	<div
		className={clsx(
			"flex flex-col",
			centered ? "items-center text-center" : "items-start text-left",
		)}
	>
		{isFilled.keyText(eyebrow) && (
			<p className="text-accent mb-5 text-xs font-semibold tracking-[0.22em] uppercase">
				{eyebrow}
			</p>
		)}
		{isFilled.keyText(headline) && (
			<h1
				id="hero-heading"
				className="font-display text-hero text-foreground leading-[var(--leading-hero)] font-medium tracking-tight text-balance mb-8 md:leading-[1.05]"
			>
				{headline}
			</h1>
		)}
		{isFilled.keyText(description) && (
			<p
				className={clsx(
					"text-muted-foreground text-lg leading-[var(--leading-body)] md:text-xl mb-10",
					centered && "max-w-2xl",
				)}
			>
				{description}
			</p>
		)}
		<div
			className={clsx(
				"flex flex-col gap-4 sm:flex-row",
				centered ? "items-center sm:justify-center" : "items-start",
			)}
		>
			{isFilled.keyText(cta_label) && (
				<a
					href="#"
					className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary inline-flex min-h-11 items-center justify-center rounded-[length:var(--radius-button)] px-8 py-2.5 text-sm font-semibold shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_12px_32px_-8px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<span>{cta_label}</span>
				</a>
			)}
			{isFilled.keyText(secondary_cta_label) && (
				<a
					href="#"
					className="border-border bg-card/60 text-foreground hover:border-muted-foreground hover:bg-card-solid focus-visible:outline-muted-foreground inline-flex min-h-11 items-center justify-center rounded-[length:var(--radius-button)] border px-8 py-2.5 text-sm font-semibold backdrop-blur-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<span>{secondary_cta_label}</span>
				</a>
			)}
		</div>
	</div>
)

type HeroProps = SliceComponentProps<Content.HeroSlice>

const Hero: FC<HeroProps> = ({ slice }) => {
	const {
		eyebrow,
		headline,
		description,
		cta_label,
		secondary_cta_label,
		image,
	} = slice.primary
	const hasImage = isFilled.image(image)

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-background text-foreground relative font-sans"
			aria-labelledby="hero-heading"
		>
			<Bounded yPadding="lg" className="relative">
				{hasImage ?
					<div className="grid items-center gap-10 md:grid-cols-[1fr_0.85fr] md:gap-16">
						<TextContent
							eyebrow={eyebrow}
							headline={headline}
							description={description}
							cta_label={cta_label}
							secondary_cta_label={secondary_cta_label}
							centered={false}
						/>
						<div className="relative">
							<div className="bg-accent-soft absolute -inset-4 rounded-3xl opacity-30 blur-2xl" />
							<div className="ring-border relative overflow-hidden rounded-2xl shadow-2xl ring-1">
								<PrismicImage
									field={image}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				:	<div className="mx-auto max-w-3xl">
						<TextContent
							eyebrow={eyebrow}
							headline={headline}
							description={description}
							cta_label={cta_label}
							secondary_cta_label={secondary_cta_label}
							centered
						/>
					</div>
				}
			</Bounded>
		</section>
	)
}

export default Hero
