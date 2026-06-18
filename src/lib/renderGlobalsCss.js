/**
 * @typedef {object} BrandThemeTokens
 * @property {string} primary
 * @property {string} primaryHover
 * @property {string} primaryForeground
 * @property {string} accent
 * @property {string} accentSoft
 * @property {string} secondary
 * @property {string} logoChip
 */

/**
 * @param {BrandThemeTokens} theme
 * @returns {string}
 */
export function renderGlobalsCss(theme) {
	const {
		primary,
		primaryHover,
		primaryForeground,
		accent,
		accentSoft,
		secondary,
		logoChip,
	} = theme

	return `@import "tailwindcss";

:root {
  --font-ms-sans: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-ms-display: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
}

@theme {
  /* Font stacks */
  --font-sans: var(--font-ms-sans), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: var(--font-ms-display), ui-serif, Georgia, "Times New Roman", serif;

  /* Surfaces */
  --color-background: #ffffff;
  --color-muted: #f9fafb;
  --color-card: #f3f4f6;
  --color-card-solid: #f3f4f6;

  /* Text */
  --color-foreground: #1a1a1a;
  --color-muted-foreground: #6b7280;
  --color-subtle-foreground: #9ca3af;
  --color-card-foreground: #1f2937;

  /* Brand / actions */
  --color-primary: ${primary};
  --color-primary-hover: ${primaryHover};
  --color-primary-foreground: ${primaryForeground};
  --color-accent: ${accent};
  --color-accent-soft: ${accentSoft};
  --color-secondary: ${secondary};

  /* Borders */
  --color-border: #e5e7eb;

  /* Logo chip */
  --color-logo-chip: ${logoChip};

  /* Radius */
  --radius-card: 0.75rem;
  --radius-button: 9999px;

  /* Typography scale */
  --text-hero: clamp(2.25rem, 5vw, 3.75rem);
  --text-section: clamp(1.875rem, 3vw, 2.75rem);
  --text-card-title: 1.5rem;
  --leading-hero: 1.1;
  --leading-section: 1.2;
  --leading-body: 1.625;

  /* Section padding (default / <md); slices use md:py-* from md breakpoint up */
  --spacing-section-sm: 1.5rem;
  --spacing-section-md: 3rem;
  --spacing-section-lg: 4rem;
}

[data-collapsible="true"].bg-white + [data-collapsible="true"].bg-white {
  @apply pt-0 md:pt-0;
}

/* LogoCloud marquee */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.logo-marquee {
  animation: marquee-scroll 30s linear infinite;
}

.logo-marquee:hover {
  animation-play-state: paused;
}

.logo-marquee-mask {
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .logo-marquee {
    animation: none;
    width: 100%;
    justify-content: center;
  }

  .logo-marquee > :last-child {
    display: none;
  }

  .logo-marquee-mask {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
`
}
