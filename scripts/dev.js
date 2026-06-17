#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

import { brandToIndexCss } from "../../src/utils/brandToIndexCss.ts"
import { buildAppUrl, resolvePort } from "./nextDevUtils.js"

const root = path.resolve(import.meta.dirname, "..")
const brandsDir = path.join(root, "src", "mocks", "brands")
const { repositoryName } = JSON.parse(
	fs.readFileSync(path.join(root, "prismic.config.json"), "utf-8"),
)

const brandArg = process.argv.find((a) => a.startsWith("--brand="))
const brandName = brandArg?.split("=")[1] ?? "prismic"
const brandFile = path.join(brandsDir, `${brandName}.json`)

if (!fs.existsSync(brandFile)) {
	console.error(`[dev] Brand "${brandName}" not found.`)
	process.exit(1)
}

console.log(`[dev] Applying brand: ${brandName}`)
const brandData = JSON.parse(fs.readFileSync(brandFile, "utf-8"))
const css = brandToIndexCss(brandData)
const outputPath = path.join(root, "src", "app", "globals.css")
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, css, "utf-8")
console.log(`[dev] Wrote ${outputPath}`)

const port = resolvePort()
const homePath = buildAppUrl({ repositoryName, pathname: "/home" })
console.log(
	`[dev] Full page preview: http://localhost:${port}${homePath} (or yarn preview:page)`,
)

console.log(`[dev] Starting Next.js dev server...`)
execFileSync("npx", ["next", "dev", "-p", String(port)], {
	cwd: root,
	stdio: "inherit",
	env: { ...process.env, NEXT_PUBLIC_BRAND: brandName },
})
