// Keep the group explicit so changing a title does not move a member.
// Portraits are matched by slug in src/assets/team/<slug>/profile.<extension>.
export const members = [
  { name: "Dr. Alfredo Mahar Francisco A. Lagmay", role: "UPRI Executive Director", slug: "alfredo-mahar-francisco-a-lagmay", group: "leadership" },
  { name: "Engr. John Christian C. Cabang", role: "Electronics/Controls Engineer, SEISMO Lead / Shake Table Lead", slug: "john-christian-c-cabang", group: "developers" },
  { name: "Lyward Manuel S. Tongzon", role: "Software Engineer, Seismic Network Lead", slug: "lyward-manuel-s-tongzon", group: "developers" },
  { name: "Geraldine L. Mosquera", role: "Admin Officer", slug: "geraldine-l-mosquera", group: "administration" },
  { name: "Jhelyn M. Bensurto", role: "Human Resource Management", slug: "jhelyn-m-bensurto", group: "administration" },
  { name: "Shankar Vembu Aky V. Alcantara", role: "Mechanical Engineer", slug: "shankar-vembu-aky-v-alcantara", group: "shake-table" },
  { name: "James Henry D. Dolojan", role: "Mechanical Engineer", slug: "james-henry-d-dolojan", group: "shake-table" },
  { name: "Kenny Gene Robert C. Selotan", role: "Electronics/Controls Engineer", slug: "kenny-gene-robert-c-selotan", group: "shake-table" },
  { name: "John Ace F. Viola", role: "Electronics/Controls Engineer", slug: "john-ace-f-viola", group: "shake-table" },
  { name: "Honneluv T. Labanan", role: "Frontend Developer", slug: "honneluv-t-labanan", group: "seismic-network" },
  { name: "Shain Andrei Q. Sahagun", role: "Backend Developer", slug: "shain-andrei-q-sahagun", group: "seismic-network" },
  { name: "Lara S. Mendizabal", role: "Science Communicator", slug: "lara-s-mendizabal", group: "public-relations" },
]

export const teamGroups = [
  { id: "leadership", label: "Leadership", description: "Research direction and oversight." },
  { id: "developers", label: "Project Developers", description: "Active engineering and delivery support." },
  { id: "administration", label: "Administration" },
  { id: "shake-table", label: "Shake Table Team" },
  { id: "seismic-network", label: "Seismic Network Team" },
  { id: "public-relations", label: "Public Relations Team" },
]
