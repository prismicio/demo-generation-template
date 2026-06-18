import { z } from "zod"

const BrandThemeTokensSchema = z.object({
	primary: z.string(),
	primaryHover: z.string(),
	primaryForeground: z.string(),
	accent: z.string(),
	accentSoft: z.string(),
	secondary: z.string(),
	logoChip: z.string(),
})

const BrandInputSchema = z.object({
	theme: BrandThemeTokensSchema,
})

/**
 * @param {string} base64
 * @returns {z.infer<typeof BrandThemeTokensSchema>}
 */
export function decodeBrandBase64(base64) {
	const json = Buffer.from(base64, "base64").toString("utf-8")
	return parseBrandInput(JSON.parse(json))
}

/**
 * @param {unknown} data
 * @returns {z.infer<typeof BrandThemeTokensSchema>}
 */
export function parseBrandInput(data) {
	const parsed = BrandInputSchema.parse(data)
	return parsed.theme
}

/**
 * @param {unknown} data
 * @returns {z.infer<typeof BrandThemeTokensSchema>}
 */
export function readThemeFromBrandFileData(data) {
	if (data == null || typeof data !== "object" || !("theme" in data)) {
		throw new Error(
			"Brand file must include a precomputed theme object. Theme tokens are produced by the website generator pipeline.",
		)
	}

	return BrandThemeTokensSchema.parse(data.theme)
}
