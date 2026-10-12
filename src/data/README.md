# Updating page lists

- **Team:** Edit `team.js`. Give each member a unique `slug` and a `group` of
  `leadership`, `developers`, or `interns`. For a portrait, add
  `src/assets/team/<slug>/profile.avif` (or `.webp`, `.png`, `.jpg`, `.jpeg`).
  The card uses initials when no portrait exists.
- **Opportunities:** Edit `opportunities.js` and place each poster in
  `src/assets/opportunities/`. Set `status` to `open` to display the posting in
  the current opportunities carousel, or `closed` to hide it. Set `applyHref`
  for each posting; the shared application form constant is only a convenience
  when several roles use the same destination. Changes require a new site build
  and deployment.
- **Projects, products, and publications:** Update the corresponding data file
  in this directory. Verify any new internal anchor matches a section ID.
