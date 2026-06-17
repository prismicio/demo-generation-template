#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

import { applyBrand, parseBrandArg } from "./applyBrand.js"
import { buildAppUrl, resolvePort, startNextDevAndOpen } from "./nextDevUtils.js"

const root = path.resolve(import.meta.dirname, "..")
const { repositoryName } = JSON.parse(
	fs.readFileSync(path.join(root, "prismic.config.json"), "utf-8"),
)

const sliceType = process.argv[2]

if (!sliceType) {
	console.error("Usage: yarn preview:slice <sliceType> [--brand=name]")
	console.error("Example: yarn preview:slice hero")
	process.exit(1)
}

const brandName = parseBrandArg(process.argv)
applyBrand({ root, brandName })

const port = resolvePort()
const openPath = buildAppUrl({
	repositoryName,
	pathname: `/slice-preview/${sliceType}`,
})

console.log(`[preview:slice] Opening http://localhost:${port}${openPath}`)

await startNextDevAndOpen({
	root,
	port,
	openPath,
	env: { ...process.env, NEXT_PUBLIC_BRAND: brandName },
})
