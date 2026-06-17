"use client"

import { PrismicToolbar } from "@prismicio/react"
import { useQueryClient } from "@tanstack/react-query"

import { isProductionRepository, repositoryName } from "@/prismicio"

export function PrismicToolbarWrapper() {
	const queryClient = useQueryClient()

	if (!isProductionRepository) return null

	return (
		<PrismicToolbar
			repositoryName={repositoryName}
			onPreviewUpdate={invalidatePrismicQueries}
			onPreviewEnd={invalidatePrismicQueries}
		/>
	)

	function invalidatePrismicQueries(event: Event) {
		event.preventDefault()
		queryClient.invalidateQueries({ queryKey: ["prismic"] })
	}
}
