# Replace the TwinOxis logo

Swap the current gradient "T" square in the sidebar for the uploaded TwinOxis globe mark, and use the same mark as the browser favicon.

## What changes

- Sidebar header (collapsed and expanded states) shows the uploaded logo image instead of the letter tile. Size ~32px, keeps the "TwinOxis / Digital Twin OS" wordmark next to it.
- The dark UI needs the mark to stay legible: the artwork is dark grey on white, so it will be rendered on a subtle light/rounded chip, or brightness-inverted, whichever reads better against the #0A0E1A sidebar. I'll go with the inverted/light-tinted treatment so it glows like the rest of the interface.
- Browser favicon replaced with a square 64x64 copy of the same mark, and the default Lovable favicon removed.

## Technical notes

- Upload registered as a CDN asset pointer at `src/assets/twinoxis-logo.png.asset.json` via the assets CLI; imported in `src/components/app-layout.tsx`.
- Favicon written as a real file `public/favicon.png` (padded square), referenced from `head().links` in `src/routes/__root.tsx`, replacing the `favicon.ico` entry; `public/favicon.ico` deleted.
- No data, routing, or role-logic changes.
