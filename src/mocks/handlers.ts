import { http, HttpResponse } from "msw"

import { mockFooter } from "./data/footer"
import { mockHeader } from "./data/header"
import { mockDocuments } from "./data/landing-page"

export const handlers = [
	http.get("https://mock.cdn.prismic.io/api/v2", () => {
		return HttpResponse.json({
			refs: [
				{
					id: "master",
					ref: "mock-master-ref",
					label: "Master",
					isMasterRef: true,
				},
			],
			types: {
				landing_page: "Landing Page",
				header: "Header",
				footer: "Footer",
			},
			languages: [{ id: "en-us", name: "English - United States" }],
			tags: [],
		})
	}),

	http.get(
		"https://mock.cdn.prismic.io/api/v2/documents/search",
		({ request }) => {
			const url = new URL(request.url)
			const query = url.searchParams.get("q") ?? ""

			if (query.includes("document.type") && query.includes("header")) {
				return HttpResponse.json({
					page: 1,
					results_per_page: 1,
					results_size: 1,
					total_results_size: 1,
					total_pages: 1,
					next_page: null,
					prev_page: null,
					results: [mockHeader],
				})
			}

			if (query.includes("document.type") && query.includes("footer")) {
				return HttpResponse.json({
					page: 1,
					results_per_page: 1,
					results_size: 1,
					total_results_size: 1,
					total_pages: 1,
					next_page: null,
					prev_page: null,
					results: [mockFooter],
				})
			}

			if (query.includes("my.landing_page.uid")) {
				const uidMatch = query.match(/"([^"]+)"/)
				const uid = uidMatch?.[1]
				const doc = mockDocuments.find((d) => d.uid === uid)

				if (doc) {
					return HttpResponse.json({
						page: 1,
						results_per_page: 1,
						results_size: 1,
						total_results_size: 1,
						total_pages: 1,
						next_page: null,
						prev_page: null,
						results: [doc],
					})
				}
			}

			if (query.includes("document.type") && query.includes("landing_page")) {
				return HttpResponse.json({
					page: 1,
					results_per_page: 1,
					results_size: mockDocuments.length,
					total_results_size: mockDocuments.length,
					total_pages: 1,
					next_page: null,
					prev_page: null,
					results: mockDocuments,
				})
			}

			return HttpResponse.json({
				page: 1,
				results_per_page: 20,
				results_size: mockDocuments.length,
				total_results_size: mockDocuments.length,
				total_pages: 1,
				next_page: null,
				prev_page: null,
				results: mockDocuments,
			})
		},
	),
]
