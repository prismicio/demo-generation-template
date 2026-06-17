import { LandingPageContent } from "@/components/LandingPageContent"
import { getLandingPageStaticParams } from "@/lib/staticParams"

interface PageProps {
	params: Promise<{ uid: string }>
}

export async function generateStaticParams() {
	return getLandingPageStaticParams()
}

export default function LandingPage(props: PageProps) {
	return <LandingPageContent params={props.params} />
}
