import { brandLogoUrl, brandName } from "./brand"

export const mockFooter = {
	id: "afs4rxEAABwA_Iam",
	uid: null,
	url: null,
	type: "footer",
	href: "https://mock.cdn.prismic.io/api/v2/documents/search?ref=mock-master-ref&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22afs4rxEAABwA_Iam%22%29+%5D%5D",
	tags: [],
	first_publication_date: "2026-05-06T12:48:48+0000",
	last_publication_date: "2026-05-06T12:48:48+0000",
	slugs: ["footer"],
	linked_documents: [],
	lang: "en-us",
	alternate_languages: [],
	data: {
		logo: {
			dimensions: { width: 0, height: 0 },
			alt: brandName,
			copyright: null,
			url: brandLogoUrl,
			id: "brand-footer-logo",
			edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
		},
		brand_name: brandName,
		navigation: [
			{
				link_type: "Web",
				key: "4bca904b-e7cb-4702-90e2-15eb6101fb84",
				url: "#",
				text: "Privacy",
			},
			{
				link_type: "Web",
				key: "c6fe98db-bd47-48a3-b1b7-d081171da896",
				url: "#",
				text: "Terms",
			},
			{
				link_type: "Web",
				key: "a33f6e21-1a16-4dec-b074-f959c1f31fc9",
				url: "#",
				text: "Careers",
			},
			{
				link_type: "Web",
				key: "8674cdc8-09f4-4d3c-96d4-1eef6396a41e",
				url: "#",
				text: "Support",
			},
		],
	},
}
