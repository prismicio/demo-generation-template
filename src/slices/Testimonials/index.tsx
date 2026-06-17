import { type Content, isFilled } from "@prismicio/client"
import { PrismicImage, type SliceComponentProps } from "@prismicio/react"
import type { FC } from "react"

import { Bounded } from "../../components/Bounded"

type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
	const { heading, subheading } = slice.primary

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-background text-foreground font-sans"
			aria-labelledby="testimonials-heading"
		>
			<Bounded yPadding="lg" wide>
				<div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
					{isFilled.keyText(heading) && (
						<h2
							id="testimonials-heading"
							className="font-display text-section text-foreground leading-[var(--leading-section)] font-medium tracking-tight text-balance md:text-4xl mb-4"
						>
							{heading}
						</h2>
					)}
					{isFilled.keyText(subheading) && (
						<p className="text-foreground/70 text-lg">{subheading}</p>
					)}
				</div>
				<ul className="flex flex-wrap justify-center gap-8">
					{slice.items.map((item, i) => {
						if (!isFilled.keyText(item.quote)) return null
						return (
							<li
								key={i}
								className="bg-muted/60 flex w-full flex-col rounded-[length:var(--radius-card)] p-6 md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
							>
								<span className="font-display text-foreground/20 mb-4 text-4xl leading-none">
									&ldquo;
								</span>
								<blockquote className="mb-6 flex-1">
									<p className="text-muted-foreground text-[17px] leading-[var(--leading-body)]">
										{item.quote}
									</p>
								</blockquote>
								<footer className="flex items-center gap-3 border-t border-border/50 pt-5">
									{isFilled.image(item.avatar) ?
										<div className="ring-background relative h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-sm ring-2">
											<PrismicImage
												field={item.avatar}
												alt=""
												className="h-full w-full object-cover"
											/>
										</div>
									:	<div
											className="bg-accent-soft text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
											aria-hidden
										>
											{isFilled.keyText(item.author) ?
												item.author.slice(0, 1).toUpperCase()
											:	"?"}
										</div>
									}
									<div>
										{isFilled.keyText(item.author) && (
											<p className="text-foreground text-sm font-semibold">
												{item.author}
											</p>
										)}
										{isFilled.keyText(item.role) && (
											<p className="text-subtle-foreground text-xs">
												{item.role}
											</p>
										)}
									</div>
								</footer>
							</li>
						)
					})}
				</ul>
			</Bounded>
		</section>
	)
}

export default Testimonials
