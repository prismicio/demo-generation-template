"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { createClient } from "@/prismicio"

export function PageIndex() {
	const client = createClient()

	const { data: pages } = useQuery({
		queryFn: ({ signal }) =>
			client.getAllByType("landing_page", { fetchOptions: { signal } }),
		queryKey: ["prismic", "landing_page_index"],
	})

	if (!pages) return null

	return (
		<div className="mx-auto max-w-2xl px-6 py-16">
			<h1 className="mb-8 text-3xl font-bold">Pages</h1>
			{pages.length === 0 ?
				<p className="text-gray-500">No pages available yet.</p>
			:	<ul className="space-y-3">
					{pages.map((page) => (
						<li key={page.id}>
							<Link
								href={`/${page.uid}`}
								className="block rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
							>
								{page.uid}
							</Link>
						</li>
					))}
				</ul>
			}
		</div>
	)
}
