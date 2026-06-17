import Faq from "../slices/Faq"
import FeatureGrid from "../slices/FeatureGrid"
import Hero from "../slices/Hero"
import LogoCloud from "../slices/LogoCloud"
import Testimonials from "../slices/Testimonials"

export const slicePreviewComponents = {
	faq: Faq,
	feature_grid: FeatureGrid,
	hero: Hero,
	logo_cloud: LogoCloud,
	testimonials: Testimonials,
} as const

export type SlicePreviewType = keyof typeof slicePreviewComponents
