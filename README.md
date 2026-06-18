# Website Generator Template

This is the template for the website generator. It is a React + Next.js application that renders Prismic slices and is deployed as a static site snapshot via SST. Branding (colors, typography, logo) is the only thing adjusted per generation.

This template is the **source of truth** for the Prismic model used during website generation. The slice models (`src/slices/*/model.json`) and custom types (`customtypes/*/index.json`) define the document structure that the generation pipeline reads when creating websites.

## How the Snapshot Build Works

During `sst deploy` (or `sst dev`), the `SnapshotDeployment` SST resource:

1. Collects all tracked files in this directory (via `git ls-files`).
2. Uploads them to a Vercel Sandbox.
3. Runs `npm ci` inside the sandbox.
4. If the lockfile is out of sync, falls back to `npm install` and writes the updated `package-lock.json` back to this directory.
5. Takes a snapshot of the sandbox — this snapshot is what gets used in production.

The production build runs `next build` with `output: "export"`, producing static files in `out/`.

### `package-lock.json` Must Be Committed

The `package-lock.json` in this directory is generated/validated during the SST snapshot build. CI checks that the lockfile was not modified during deploy:

- If `package-lock.json` is out of sync with `package.json`, the CI step **"Check template lockfile is committed"** will fail.
- To fix this: run `sst deploy` (or `sst dev`) locally, which will regenerate the lockfile, then commit the updated `package-lock.json`.

## Running the Dev Server

The dev server uses [MSW](https://mswjs.io/) to mock the Prismic API, allowing you to work on slices without a live Prismic repository.

Start the dev server with a specific brand:

```bash
npm run dev -- --brand=netflix
```

Available brands (see `src/mocks/brands/`):

- `prismic` (default)
- `facebook`
- `netflix`
- `snapchat`
- `spotify`

The `--brand` flag applies the brand's color palette to `src/app/globals.css` and controls the logo displayed in the header before starting Next.js.

The brands in `src/mocks/brands/` are only used for local development. You can add your own brand JSON file there to test custom color palettes without affecting the generation pipeline. You can retrieve any company branding at [context.dev](https://context.dev)

## Slice Preview and Simulator

Preview scripts open the browser themselves (Next.js has no `--open` CLI flag). URLs use trailing slashes to match `trailingSlash: true` in `next.config.ts`.

| Command | What it does |
|---|---|
| `npm run preview:page` | Dev server + MSW mocks; opens `/{repositoryName}/home/` with header, footer, and slices in generator order |
| `npm run preview:page -- <uid>` | Same as above for another landing page uid |
| `npm run preview:slice -- hero` | Dev server; opens `/{repositoryName}/slice-preview/hero/` (single slice, no MSW) |
| `npm run dev -- --brand=prismic` | Dev server; navigate manually to `http://localhost:3000/mock/home/` |
| `npm run preview` | Builds and serves the static `out/` export (content loads from live Prismic API at runtime) |
| `npm run preview -- --skip-build` | Serve existing `out/` without rebuilding |

Port configuration: `PORT` (Next.js native) or `NEXT_PREVIEW_PORT` (project alias), default `3000`.

Other routes:

- **Slice simulator** (configured in Prismic repo settings): `/{repositoryName}/slice-simulator/`
- **Prismic preview entry**: `/{repositoryName}/api/preview/?token=...`

Note: `next start` is not available with `output: "export"`. Use `npm run preview` for a production-like local preview.

## Adding a New Slice

When you add a new slice, you need to update three things: the component, the model, and the mock data.

1. **Create the slice component** in `src/slices/YourSlice/index.tsx`.
2. **Create the slice model** in `src/slices/YourSlice/model.json` — this JSON defines the slice's fields and variations and is uploaded to Prismic during generation.
3. **Register the slice in the custom type** — add it to the `choices` in `customtypes/landing_page/index.json` so the generation pipeline knows it's available.
4. **Add mock data** in `src/mocks/data/your-slice.ts` — export a Prismic slice object matching the model's shape.
5. **Wire the mock into the landing page** — import and add it to `src/mocks/data/landing-page.ts` so it appears during development.

Without the model JSON the slice won't be available during generation, and without the mock data it won't render in the dev server.
