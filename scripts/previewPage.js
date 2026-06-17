#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

import { applyBrand, parseBrandArg } from "./applyBrand.js"
import { buildAppUrl, resolvePort, startNextDevAndOpen } from "./nextDevUtils.js"

const root = path.resolve(import.meta.dirname, "..")
const { repositoryName } = JSON.parse(
	fs.readFileSync(path.join(root, "prismic.config.json"), "utf-8"),
)

const pageUid =
	process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "home"

const brandName = parseBrandArg(process.argv)
applyBrand({ root, brandName })

const port = resolvePort()
const openPath = buildAppUrl({
	repositoryName,
	pathname: `/${pageUid}`,
})

console.log(`[preview:page] Opening http://localhost:${port}${openPath}`)
console.log(
	"[preview:page] MSW mocks header, footer, and landing page slices in generator order.",
)

await startNextDevAndOpen({
	root,
	port,
	openPath,
	env: { ...process.env, NEXT_PUBLIC_BRAND: brandName },
})
