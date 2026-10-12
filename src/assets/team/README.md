Place team profile images in the matching member directory below.

Recommended file naming:
- `profile.avif`
- `profile.webp`
- `profile.jpg`
- `profile.png`

Use one directory per active member, matching the `slug` in `src/data/team.js`.
Portraits for temporarily hidden intern contributors are in `archive/`.
For example, place Shankar Alcantara's portrait at
`src/assets/team/shankar-vembu-aky-v-alcantara/profile.png`.
Keep one `profile` image per member directory; replace an older format when
switching to a new one.

Add or update the matching entry in `src/data/team.js`. Set its `group` to a
`teamGroups` ID in that file. A matching portrait is shown when present;
otherwise the card displays initials.
