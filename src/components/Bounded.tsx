import clsx from "clsx"
import type { ReactNode } from "react"

interface BoundedProps {
	as?: "div" | "section" | "header"
	yPadding?: "sm" | "base" | "lg"
	collapsible?: boolean
	wide?: boolean
	className?: string
	children?: ReactNode
}

export function Bounded(props: BoundedProps) {
	const {
		as: Comp = "div",
		yPadding = "base",
		collapsible = true,
		wide = false,
		className,
		children,
	} = props

	return (
		<Comp
			data-collapsible={collapsible}
			className={clsx(
				wide ? "px-8 md:px-6" : "px-6",
				yPadding === "sm" && "py-section-sm md:py-8",
				yPadding === "base" && "py-section-md md:py-16",
				yPadding === "lg" && "py-section-lg md:py-20",
				className,
			)}
		>
			<div className="mx-auto w-full max-w-6xl">{children}</div>
		</Comp>
	)
}
