# Image assets

Keep images beside the site area that uses them:

- `brand/` — UP and UPRI identity marks used in the header and footer.
- `hero/` — the three hero showcase slides. See its README for replacement guidance.
- `community/carousel/` — community photos. The carousel displays files in filename order, so keep that order in mind when adding or renaming images.
- `projects/` — project logos and thumbnails. The Earthquake Hub logo here is a project image, not the browser favicon.
- `earthquake-hub/`, `shake-table/`, `publications/`, and `location/` — section-specific illustrations and screenshots.
- `team/` and `opportunities/` — editable people and role images, including their archives. See their existing data files and READMEs for update instructions.

The browser favicon is `public/favicon.svg`. Replace that file to update the tab icon, keeping the SVG format, or update the icon link in `index.html` if using a different format.

Unreferenced legacy images and conversion source files are kept in `archive/assets/legacy/` at the repository root. They are outside `src/` and `public/`, so Vite does not include them in the site build.
