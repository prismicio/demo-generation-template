#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { parseArgs } from "node:util"

const root = path.resolve(import.meta.dirname, "..")

main().catch((error) => {
	console.error(error)
	process.exit(1)
})

async function main() {
	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			repository: { type: "string", short: "r" },
			"brand-base64": { type: "string" },
			help: { type: "boolean", short: "h" },
		},
	})

	if (values.help) {
		printUsage(0)
	}

	const repositoryName = values.repository
	if (!repositoryName) {
		console.error("Missing required --repository value.")
		printUsage(1)
	}

	const documentAPIEndpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`
	const brandName = values["brand-base64"] ? "bolt" : "prismic"

	ensureDependenciesInstalled()
	const { applyBrand } = await import("./applyBrand.js")

	writePrismicConfig({ repositoryName, documentAPIEndpoint })
	await writeBrandInput({ brandName, brandBase64: values["brand-base64"] })
	applyBrand({ root, brandName })
	writePreparedMarker({ repositoryName, documentAPIEndpoint })

	console.log(`[prepare:bolt] Configured Prismic repository: ${repositoryName}`)
	console.log(`[prepare:bolt] Document API endpoint: ${documentAPIEndpoint}`)
	console.log("[prepare:bolt] Run npm run dev to start the website.")
}

function ensureDependenciesInstalled() {
	const nodeModulesPath = path.join(root, "node_modules")
	if (hasInstalledNodeModules(nodeModulesPath)) {
		return
	}

	console.log("[prepare:bolt] node_modules not found. Running npm install...")
	execFileSync("npm", ["install", "--workspaces=false"], {
		cwd: root,
		stdio: "inherit",
	})
}

function hasInstalledNodeModules(nodeModulesPath) {
	try {
		const stats = fs.statSync(nodeModulesPath)
		if (!stats.isDirectory()) {
			return false
		}

		return fs.readdirSync(nodeModulesPath).length > 0
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			return false
		}

		throw error
	}
}

function writePrismicConfig(args) {
	const { repositoryName, documentAPIEndpoint } = args
	const prismicConfig = {
		repositoryName,
		adapter: "@prismicio/adapter-next",
		libraries: ["./src/slices"],
		documentAPIEndpoint,
	}

	fs.writeFileSync(
		path.join(root, "prismic.config.json"),
		`${JSON.stringify(prismicConfig, null, 2)}\n`,
		"utf-8",
	)
}

async function writeBrandInput(args) {
	const { brandName, brandBase64 } = args
	if (!brandBase64) {
		return
	}

	const { parseBrandInput } = await import("../src/lib/brandInput.js")
	const brandsDir = path.join(root, "src", "mocks", "brands")
	const brandJson = Buffer.from(brandBase64, "base64").toString("utf-8")
	const brandInput = JSON.parse(brandJson)
	parseBrandInput(brandInput)

	fs.writeFileSync(
		path.join(brandsDir, `${brandName}.json`),
		brandJson,
		"utf-8",
	)
}

function writePreparedMarker(args) {
	fs.writeFileSync(
		path.join(root, ".prismic-bolt.json"),
		`${JSON.stringify(
			{
				preparedAt: new Date().toISOString(),
				repositoryName: args.repositoryName,
				documentAPIEndpoint: args.documentAPIEndpoint,
			},
			null,
			2,
		)}\n`,
		"utf-8",
	)
}

function printUsage(exitCode) {
	console.error(`Usage:
  npm run prepare:bolt -- --repository <repository> [options]

Options:
  -r, --repository <name>              Generated Prismic repository name.
      --brand-base64 <base64>          Base64 encoded JSON: { "theme": { ... } }.
  -h, --help                           Show this help.
`)
	process.exit(exitCode)
}
