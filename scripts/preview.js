#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import { createServer } from "node:http"
import fs from "node:fs"
import path from "node:path"

import { applyBrand, parseBrandArg } from "./applyBrand.js"
import { buildAppUrl, openBrowser, resolvePort } from "./nextDevUtils.js"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "out")
const { repositoryName } = JSON.parse(
	fs.readFileSync(path.join(root, "prismic.config.json"), "utf-8"),
)

const skipBuild = process.argv.includes("--skip-build")
const brandName = parseBrandArg(process.argv)

applyBrand({ root, brandName })

if (!skipBuild) {
	console.log("[preview] Building static export...")
	execFileSync("yarn", ["build"], { cwd: root, stdio: "inherit" })
}

if (!fs.existsSync(outDir)) {
	console.error(
		`[preview] Build output not found at ${outDir}. Run yarn build first.`,
	)
	process.exit(1)
}

const port = resolvePort()
const openPath = buildAppUrl({ repositoryName, pathname: "/home" })
const previewUrl = `http://localhost:${port}${openPath}`

const server = createServer((request, response) => {
	const requestUrl = new URL(request.url ?? "/", `http://localhost:${port}`)
	const filePath = resolveStaticFilePath({
		pathname: requestUrl.pathname,
		repositoryName,
		outDir,
	})

	if (!filePath) {
		response.writeHead(404)
		response.end("Not found")
		return
	}

	const contentType = inferContentType(filePath)
	response.writeHead(200, { "Content-Type": contentType })
	response.end(fs.readFileSync(filePath))
})

server.on("error", (error) => {
	if ("code" in error && error.code === "EADDRINUSE") {
		console.error(
			`[preview] Port ${port} is already in use. Set PORT or NEXT_PREVIEW_PORT to use another port.`,
		)
		process.exit(1)
	}

	throw error
})

server.listen(port, () => {
	console.log(`[preview] Serving static export at ${previewUrl}`)
	console.log(
		"[preview] Content loads from the live Prismic Document API at runtime.",
	)

	openBrowser(previewUrl).catch((error) => {
		console.error(
			`[preview] Could not open browser:`,
			error instanceof Error ? error.message : error,
		)
		console.error(`[preview] Open manually: ${previewUrl}`)
	})
})

function resolveStaticFilePath(args) {
	const { pathname, repositoryName, outDir } = args
	const basePath = `/${repositoryName}`

	if (!pathname.startsWith(`${basePath}/`) && pathname !== `${basePath}/`) {
		return null
	}

	const relativePath = pathname.slice(basePath.length) || "/"
	const staticFilePatterns = [
		"/_next/",
		"/mockServiceWorker.js",
		"/robots.txt",
		"/favicon.ico",
		"/sitemap.xml",
	]

	const isStaticFile = staticFilePatterns.some((pattern) =>
		relativePath.startsWith(pattern),
	)

	const targetPath = isStaticFile ?
		path.join(outDir, relativePath)
	:	resolvePageHtmlPath(relativePath, outDir)

	if (!targetPath.startsWith(outDir)) {
		return null
	}

	return fs.existsSync(targetPath) ? targetPath : null
}

function resolvePageHtmlPath(relativePath, outDir) {
	const pagePath = relativePath.endsWith("/") ?
		relativePath.slice(0, -1)
	:	relativePath

	if (pagePath === "" || pagePath === "/") {
		return path.join(outDir, "index.html")
	}

	return path.join(outDir, pagePath, "index.html")
}

function inferContentType(filePath) {
	if (filePath.endsWith(".html")) return "text/html; charset=utf-8"
	if (filePath.endsWith(".css")) return "text/css; charset=utf-8"
	if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8"
	if (filePath.endsWith(".json")) return "application/json; charset=utf-8"
	if (filePath.endsWith(".svg")) return "image/svg+xml"
	if (filePath.endsWith(".png")) return "image/png"
	if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
		return "image/jpeg"
	}
	if (filePath.endsWith(".webp")) return "image/webp"
	if (filePath.endsWith(".ico")) return "image/x-icon"
	if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8"
	return "application/octet-stream"
}
