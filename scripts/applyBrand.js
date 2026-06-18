import fs from "node:fs"
import path from "node:path"

import { readThemeFromBrandFileData } from "../src/lib/brandInput.js"
import { renderGlobalsCss } from "../src/lib/renderGlobalsCss.js"

export function parseBrandArg(argv) {
	const brandArg = argv.find((argument) => argument.startsWith("--brand="))
	return brandArg?.split("=")[1] ?? "prismic"
}

export function applyBrand({ root, brandName }) {
	const brandsDir = path.join(root, "src", "mocks", "brands")
	const brandFile = path.join(brandsDir, `${brandName}.json`)

	if (!fs.existsSync(brandFile)) {
		console.error(`[brand] "${brandName}" not found in ${brandsDir}`)
		process.exit(1)
	}

	console.log(`[brand] Applying: ${brandName}`)
	const brandData = JSON.parse(fs.readFileSync(brandFile, "utf-8"))
	const theme = readThemeFromBrandFileData(brandData)
	const css = renderGlobalsCss(theme)
	const outputPath = path.join(root, "src", "app", "globals.css")
	fs.writeFileSync(outputPath, css, "utf-8")
	console.log(`[brand] Wrote ${outputPath}`)

	return brandName
}
