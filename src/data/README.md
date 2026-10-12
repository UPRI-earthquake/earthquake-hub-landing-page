# Updating page lists

- **Team:** Edit `team.js`. Give each member a unique `slug` and a `group`
  matching a `teamGroups` ID in that file. For a portrait, add
  `src/assets/team/<slug>/profile.avif` (or `.webp`, `.png`, `.jpg`, `.jpeg`).
  The card uses initials when no portrait exists. Hidden records are parked in
  `archive/interns.js` or `archive/members.js`, with portraits under
  `src/assets/team/archive/`. Restore a record to `team.js` and its portrait to
  the active portrait directory to show the member again.
- **Opportunities:** Only the entries in `opportunities.js` feed the live
  carousel, in their listed order. To add a role, place its poster in
  `src/assets/opportunities/`, import that image at the top of the file, and
  copy a `createOpportunity({ ... })` entry. Give it a unique `id`, update the
  posting details and `materialSrc`, and set `status: "open"`.
  - To hide a role temporarily, set `status: "closed"`. To archive it and keep
    its poster out of the live build, move its entry to
    `archive/opportunities.js` and its poster to
    `src/assets/opportunities/archive/`, updating the image import path.
  - To restore a role, move its poster back, copy its import and entry into
    `opportunities.js`, set `status: "open"`, and review the details and
    `applyHref`. Remove the old archive entry and import.
  - To change the Google Form for all current roles, edit
    `APPLICATION_FORM_URL` near the top of `opportunities.js`. Each role using
    `applyHref: APPLICATION_FORM_URL` will use that link. Set an individual
    role's `applyHref` to another URL if it has a different form. The archive
    file's form URL is historical and does not affect the live page.
  - Run `npm run lint` and `npm run build`, check the poster and Apply link
    locally, then deploy the changed site. There is no admin editor.
- **Projects, products, and publications:** Update the corresponding data file
  in this directory. Verify any new internal anchor matches a section ID.
