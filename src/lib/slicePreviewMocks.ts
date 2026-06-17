import type { LandingPageDocumentDataSlicesSlice } from "../../prismicio-types"
import { faqSlice } from "../mocks/data/faq"
import { featureGridSlice } from "../mocks/data/feature-grid"
import { heroSlice1 } from "../mocks/data/hero"
import { logoCloudSlice } from "../mocks/data/logo-cloud"
import { testimonialsSlice } from "../mocks/data/testimonials"
import {
	type SlicePreviewType,
	slicePreviewComponents,
} from "./slicePreviewComponents"

export const slicePreviewMocks: Record<
	SlicePreviewType,
	LandingPageDocumentDataSlicesSlice
> = {
	hero: heroSlice1,
	feature_grid: featureGridSlice,
	faq: faqSlice,
	logo_cloud: logoCloudSlice,
	testimonials: testimonialsSlice,
}

export function isSlicePreviewType(
	sliceType: string,
): sliceType is SlicePreviewType {
	return sliceType in slicePreviewMocks
}

export { slicePreviewComponents }
