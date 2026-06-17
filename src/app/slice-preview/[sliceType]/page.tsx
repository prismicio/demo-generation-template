import { SlicePreviewContent } from "@/components/SlicePreviewContent"
import { slicePreviewMocks } from "@/lib/slicePreviewMocks"

interface SlicePreviewPageProps {
	params: Promise<{ sliceType: string }>
}

export function generateStaticParams() {
	return Object.keys(slicePreviewMocks).map((sliceType) => ({
		sliceType,
	}))
}

export default function SlicePreviewPage(props: SlicePreviewPageProps) {
	return <SlicePreviewContent params={props.params} />
}
