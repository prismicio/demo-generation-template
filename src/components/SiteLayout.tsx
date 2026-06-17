"use client"

import { useQuery } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { createClient } from "@/prismicio"

interface SiteLayoutProps {
	children: ReactNode
}

export function SiteLayout(props: SiteLayoutProps) {
	const { children } = props
	const client = createClient()

	const { data: header } = useQuery({
		queryFn: ({ signal }) =>
			client.getSingle("header", { fetchOptions: { signal } }),
		queryKey: ["prismic", "header"],
	})

	const { data: footer } = useQuery({
		queryFn: ({ signal }) =>
			client.getSingle("footer", { fetchOptions: { signal } }),
		queryKey: ["prismic", "footer"],
	})

	return (
		<div>
			{header ?
				<Header data={header.data} />
			:	null}
			<main>{children}</main>
			{footer ?
				<Footer data={footer.data} />
			:	null}
		</div>
	)
}
