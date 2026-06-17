import { type Content, isFilled } from "@prismicio/client"
import { type SliceComponentProps } from "@prismicio/react"
import type { FC } from "react"

import { Bounded } from "../../components/Bounded"

type FaqProps = SliceComponentProps<Content.FaqSlice>

const Faq: FC<FaqProps> = ({ slice }) => {
	const { heading } = slice.primary

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-background text-foreground font-sans"
			aria-labelledby="faq-heading"
		>
			<Bounded yPadding="lg">
				{isFilled.keyText(heading) && (
					<h2
						id="faq-heading"
						className="font-display text-section text-foreground leading-[var(--leading-section)] font-medium tracking-tight text-balance md:text-4xl mx-auto mb-10 max-w-2xl text-center md:mb-12"
					>
						{heading}
					</h2>
				)}
				<div className="bg-muted/60 mx-auto max-w-3xl rounded-[length:var(--radius-card)] px-2 py-2 md:px-4">
					{slice.items.map((entry, i) => {
						if (
							!isFilled.keyText(entry.question) ||
							!isFilled.keyText(entry.answer)
						) {
							return null
						}
						return (
							<details
								key={i}
								className="group px-3 py-1 [&_summary::-webkit-details-marker]:hidden"
							>
								<summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold marker:content-none md:text-lg">
									<span className="pr-2">{entry.question}</span>
									<span
										className="bg-muted text-muted-foreground group-open:text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition group-open:rotate-45"
										aria-hidden
									>
										+
									</span>
								</summary>
								<div className="pt-1 pb-4 text-sm leading-[var(--leading-body)]">
									<p className="text-muted-foreground">{entry.answer}</p>
								</div>
							</details>
						)
					})}
				</div>
			</Bounded>
		</section>
	)
}

export default Faq
