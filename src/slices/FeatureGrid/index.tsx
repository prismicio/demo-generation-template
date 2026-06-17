import { type Content, isFilled } from "@prismicio/client"
import { PrismicImage, type SliceComponentProps } from "@prismicio/react"
import clsx from "clsx"
import type { FC } from "react"

import { Bounded } from "../../components/Bounded"

type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>

function FeatureIcon() {
	return (
		<svg
			className="h-6 w-6 text-accent"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden
		>
			<path
				d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

const FeatureGrid: FC<FeatureGridProps> = ({ slice }) => {
	const { kicker, title, intro } = slice.primary

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-background text-foreground font-sans"
			aria-labelledby="feature-grid-heading"
		>
			<Bounded yPadding="lg" wide className="relative">
				<div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
					{isFilled.keyText(kicker) && (
						<p className="text-accent mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
							{kicker}
						</p>
					)}
					{isFilled.keyText(title) && (
						<h2
							id="feature-grid-heading"
							className="font-display text-section text-foreground leading-[var(--leading-section)] font-medium tracking-tight text-balance md:text-4xl mb-6"
						>
							{title}
						</h2>
					)}
					{isFilled.keyText(intro) && (
						<p className="text-muted-foreground text-lg leading-[var(--leading-body)]">
							{intro}
						</p>
					)}
				</div>
				<ul className="flex flex-wrap justify-center gap-6">
					{slice.items.map((item, i) => {
						const show =
							isFilled.keyText(item.feature_title) ||
							isFilled.keyText(item.feature_body)
						if (!show) return null
						const hasImage = isFilled.image(item.feature_image)
						return (
							<li
								key={i}
								className={clsx(
									"bg-muted/60 flex w-full flex-col rounded-[length:var(--radius-card)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]",
									hasImage ? "overflow-hidden" : "p-6",
								)}
							>
								{hasImage ?
									<div className="aspect-[16/10] w-full overflow-hidden">
										<PrismicImage
											field={item.feature_image}
											className="h-full w-full object-cover"
										/>
									</div>
								:	<div className="bg-accent-soft mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
										<FeatureIcon />
									</div>
								}
								<div
									className={hasImage ? "flex flex-1 flex-col p-6" : undefined}
								>
									{isFilled.keyText(item.feature_title) && (
										<h3 className="font-display text-foreground mb-2 text-[length:var(--text-card-title)] font-medium">
											{item.feature_title}
										</h3>
									)}
									{isFilled.keyText(item.feature_body) && (
										<p className="text-muted-foreground text-sm leading-[var(--leading-body)]">
											{item.feature_body}
										</p>
									)}
								</div>
							</li>
						)
					})}
				</ul>
			</Bounded>
		</section>
	)
}

export default FeatureGrid
