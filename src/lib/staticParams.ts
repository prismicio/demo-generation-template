import { mockDocuments } from "@/mocks/data/landing-page"
import { repositoryName } from "@/prismicio"

const generatedLandingPageUid = "home"

export function getLandingPageStaticParams() {
	if (repositoryName === "mock") {
		return mockDocuments.map((page) => ({
			uid: page.uid,
		}))
	}

	return [{ uid: generatedLandingPageUid }]
}
