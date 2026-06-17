"use client"

import { cookie } from "@prismicio/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

import { createClient, repositoryName } from "@/prismicio"

const basePath = `/${repositoryName}`

function PreviewContent() {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const controller = new AbortController()

		const previewToken = searchParams.get("token")
		if (previewToken) {
			const cookieValue = buildPrismicPreviewCookie(previewToken)
			document.cookie = `${cookie.preview}=${encodeURIComponent(cookieValue)}; path=${basePath}`
		}

		const client = createClient()
		client
			.resolvePreviewURL({
				defaultURL: "/",
				fetchOptions: { signal: controller.signal },
			})
			.then((url) => router.replace(url))

		return () => controller.abort()
	}, [router, searchParams])

	return null
}

export default function PreviewPage() {
	return (
		<Suspense fallback={null}>
			<PreviewContent />
		</Suspense>
	)
}

function buildPrismicPreviewCookie(previewToken: string) {
	const apiHost = new URL(previewToken).hostname
	return JSON.stringify({
		[apiHost]: { preview: previewToken },
	})
}
