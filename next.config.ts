import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NextConfig } from "next"

import prismicConfig from "./prismic.config.json"

const root = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
	basePath: `/${prismicConfig.repositoryName}`,
	output: "export",
	trailingSlash: true,
	turbopack: {
		root,
	},
	images: {
		unoptimized: true,
	},
}

export default nextConfig
