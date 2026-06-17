"use client"

import { SliceZone } from "@prismicio/react"
import { useQuery } from "@tanstack/react-query"
import { use } from "react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"

interface LandingPageContentProps {
	params: Promise<{ uid: string }>
}

export function LandingPageContent(props: LandingPageContentProps) {
	const { uid } = use(props.params)
	const client = createClient()

	const { data: page } = useQuery({
		queryFn: ({ signal }) =>
			client.getByUID("landing_page", uid, { fetchOptions: { signal } }),
		queryKey: ["prismic", "landing_page", uid],
		enabled: Boolean(uid),
	})

	if (!page) return null

	return <SliceZone slices={page.data.slices} components={components} />
}
