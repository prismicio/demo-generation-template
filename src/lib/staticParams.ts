import { mockDocuments } from "@/mocks/data/landing-page"
import { createClient, repositoryName } from "@/prismicio"

export async function getLandingPageStaticParams() {
	if (repositoryName === "mock") {
		return mockDocuments.map((page) => ({
			uid: page.uid,
		}))
	}

	const client = createClient()
	const pages = await client.getAllByType("landing_page")

	return pages.map((page) => ({
		uid: page.uid,
	}))
}
