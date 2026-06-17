import { faqSlice } from "./faq"
import { featureGridSlice } from "./feature-grid"
import { heroSlice1, heroSlice2 } from "./hero"
import { logoCloudSlice } from "./logo-cloud"
import { testimonialsSlice } from "./testimonials"

export const mockLandingPage = {
	id: "afs4qxEAAB8A_IaW",
	uid: "home",
	url: "/home",
	type: "landing_page",
	href: "https://mock.cdn.prismic.io/api/v2/documents/search?ref=mock-master-ref&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22afs4qxEAAB8A_IaW%22%29+%5D%5D",
	tags: [],
	first_publication_date: "2026-05-06T12:48:48+0000",
	last_publication_date: "2026-05-06T12:48:48+0000",
	slugs: ["visual-page-builder"],
	linked_documents: [],
	lang: "en-us",
	alternate_languages: [],
	data: {
		slices: [
			heroSlice1,
			logoCloudSlice,
			featureGridSlice,
			testimonialsSlice,
			faqSlice,
			heroSlice2,
		],
	},
}

export const mockDocuments = [mockLandingPage]
