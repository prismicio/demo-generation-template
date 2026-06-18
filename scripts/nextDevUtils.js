import { execFile, spawn } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

const POLL_INTERVAL_MS = 500
const POLL_TIMEOUT_MS = 30_000

export function resolvePort() {
	const port = process.env.PORT ?? process.env.NEXT_PREVIEW_PORT ?? "3000"
	return Number(port)
}

export function buildAppUrl(args) {
	const { repositoryName, pathname } = args
	const basePath = `/${repositoryName}`
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
	const fullPath = `${basePath}${normalizedPath}`
	return fullPath.endsWith("/") ? fullPath : `${fullPath}/`
}

export async function openBrowser(url) {
	const platform = process.platform

	if (platform === "darwin") {
		await execFileAsync("open", [url])
		return
	}

	if (platform === "win32") {
		await execFileAsync("cmd", ["/c", "start", "", url])
		return
	}

	await execFileAsync("xdg-open", [url])
}

export async function startNextDevAndOpen(args) {
	const { root, port, openPath, env } = args
	const fullUrl = `http://localhost:${port}${openPath}`

	const child = spawn("npx", ["next", "dev", "-p", String(port)], {
		cwd: root,
		stdio: "inherit",
		env,
	})

	let browserOpened = false

	child.on("spawn", () => {
		waitForServer({ port, openPath })
			.then(() => {
				browserOpened = true
				return openBrowser(fullUrl)
			})
			.catch((error) => {
				console.error(
					`[dev] Could not open browser at ${fullUrl}:`,
					error instanceof Error ? error.message : error,
				)
				console.error(`[dev] Open manually: ${fullUrl}`)
			})
	})

	const exitCode = await new Promise((resolve, reject) => {
		child.on("error", reject)
		child.on("exit", (code, signal) => {
			if (signal) {
				reject(new Error(`next dev exited with signal ${signal}`))
				return
			}
			resolve(code ?? 0)
		})
	})

	if (exitCode !== 0) {
		process.exit(exitCode)
	}

	if (!browserOpened) {
		console.log(`[dev] Server ready at ${fullUrl}`)
	}
}

async function waitForServer(args) {
	const { port, openPath } = args
	const url = `http://localhost:${port}${openPath}`
	const deadline = Date.now() + POLL_TIMEOUT_MS

	while (Date.now() < deadline) {
		try {
			const response = await fetch(url, { redirect: "follow" })
			if (response.ok || response.status < 500) {
				return
			}
		} catch {
			// Server not ready yet.
		}

		await sleep(POLL_INTERVAL_MS)
	}

	throw new Error(`Timed out waiting for ${url}`)
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
