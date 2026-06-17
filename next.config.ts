import type { NextConfig } from "next"

import prismicConfig from "./prismic.config.json"

const nextConfig: NextConfig = {
	basePath: `/${prismicConfig.repositoryName}`,
	output: "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
}

export default nextConfig
