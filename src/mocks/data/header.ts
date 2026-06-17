import { brandLogoUrl, brandName } from "./brand"

export const mockHeader = {
	id: "afs4rhEAAB0A_Iag",
	uid: null,
	url: null,
	type: "header",
	href: "https://mock.cdn.prismic.io/api/v2/documents/search?ref=mock-master-ref&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22afs4rhEAAB0A_Iag%22%29+%5D%5D",
	tags: [],
	first_publication_date: "2026-05-06T12:48:48+0000",
	last_publication_date: "2026-05-06T12:48:48+0000",
	slugs: ["header"],
	linked_documents: [],
	lang: "en-us",
	alternate_languages: [],
	data: {
		logo: {
			dimensions: { width: 0, height: 0 },
			alt: brandName,
			copyright: null,
			url: brandLogoUrl,
			id: "brand-header-logo",
			edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
		},
		brand_name: brandName,
		navigation: [
			{
				link_type: "Web",
				key: "44e232f7-2f0c-4338-bba8-55c27864f2b2",
				url: "#",
				text: "Products",
			},
			{
				link_type: "Web",
				key: "156ac4aa-dd36-4261-a7fb-ca5d1d5fa106",
				url: "#",
				text: "Resources",
			},
			{
				link_type: "Web",
				key: "fd5a4367-ef96-4355-917f-a61f85bf5ba2",
				url: "#",
				text: "Company",
			},
			{
				link_type: "Web",
				key: "7ff97333-47a9-42da-9fd8-37db860777c3",
				url: "#",
				text: "Contact",
			},
		],
		cta: {
			link_type: "Web",
			key: "f3f8c322-f976-4df1-946d-8596c1e1b652",
			url: "#",
			text: "Get Started",
		},
	},
}
