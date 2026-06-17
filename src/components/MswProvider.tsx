"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

import prismicConfig from "../../prismic.config.json"

interface MswProviderProps {
	children: ReactNode
}

export function MswProvider(props: MswProviderProps) {
	const { children } = props
	const pathname = usePathname()
	const [ready, setReady] = useState(process.env.NODE_ENV !== "development")

	useEffect(() => {
		if (process.env.NODE_ENV !== "development") return
		if (pathname.includes("/slice-preview/")) {
			setReady(true)
			return
		}

		const basePath = `/${prismicConfig.repositoryName}`
		const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`
		const mockServiceWorkerUrl = `${normalizedBase}mockServiceWorker.js`

		async function startMsw() {
			try {
				const { worker } = await import("@/mocks/browser")
				await worker.start({
					onUnhandledRequest: "bypass",
					serviceWorker: { url: mockServiceWorkerUrl },
				})
			} catch (error) {
				console.error("MSW failed to start; continuing without mocks.", error)
			} finally {
				setReady(true)
			}
		}

		startMsw()
	}, [pathname])

	if (!ready) return null

	return children
}
