import facebookBrand from "../brands/facebook.json"
import netflixBrand from "../brands/netflix.json"
import prismicBrand from "../brands/prismic.json"
import snapchatBrand from "../brands/snapchat.json"
import spotifyBrand from "../brands/spotify.json"

interface BrandData {
	brand: { title: string; logos: { url: string; mode: string; type: string }[] }
}

const brandModules: Record<string, BrandData> = {
	facebook: facebookBrand,
	netflix: netflixBrand,
	prismic: prismicBrand,
	snapchat: snapchatBrand,
	spotify: spotifyBrand,
}

const activeBrand = process.env.NEXT_PUBLIC_BRAND ?? "prismic"
const brandJson = brandModules[activeBrand] ?? brandModules.prismic

const lightLogo =
	brandJson.brand.logos.find((l) => l.mode === "light" && l.type === "logo") ??
	brandJson.brand.logos.find((l) => l.mode === "light")

export const brandLogoUrl = lightLogo?.url ?? ""
export const brandName = brandJson.brand.title
