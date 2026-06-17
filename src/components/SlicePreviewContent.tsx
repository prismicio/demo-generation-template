"use client"

import { SliceZone } from "@prismicio/react"
import { use } from "react"

import {
	isSlicePreviewType,
	slicePreviewComponents,
	slicePreviewMocks,
} from "@/lib/slicePreviewMocks"

interface SlicePreviewContentProps {
	params: Promise<{ sliceType: string }>
}

export function SlicePreviewContent(props: SlicePreviewContentProps) {
	const { sliceType } = use(props.params)

	if (!isSlicePreviewType(sliceType)) {
		return (
			<p>
				Unknown slice type: {sliceType}. Expected one of:{" "}
				{Object.keys(slicePreviewMocks).join(", ")}.
			</p>
		)
	}

	const slice = slicePreviewMocks[sliceType]

	return (
		<div id="slice-preview-root">
			<SliceZone slices={[slice]} components={slicePreviewComponents} />
		</div>
	)
}
