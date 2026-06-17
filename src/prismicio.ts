import { createClient as prismicCreateClient } from "@prismicio/client"

import prismicConfig from "../prismic.config.json"

export const repositoryName = prismicConfig.repositoryName

export const isProductionRepository =
	repositoryName !== "mock" &&
	new URL(prismicConfig.documentAPIEndpoint).hostname.endsWith(".prismic.io")

export function createClient() {
	return prismicCreateClient(repositoryName, {
		documentAPIEndpoint: prismicConfig.documentAPIEndpoint,
		routes: [{ type: "landing_page", path: "/:uid" }],
	})
}
