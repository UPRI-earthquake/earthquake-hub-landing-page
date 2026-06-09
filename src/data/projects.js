import QQImg from "../assets/QQ-Logo.png";
import ehubFavicon from "../assets/ehub-favicon.png";
import shakeTIcon from "../assets/shaketable.png";

export const projects = [
  {
    id: 2,
    title: "Earthquake Hub",
    description:
      "Earthquake Hub is an open-source seismic network platform built to provide accessible real-time earthquake data across the Philippines.",
    keywords: "Citizen-powered seismic network",
    images: ehubFavicon,
    actions: [
      {
        text: "View Platform Features",
        href: "#earthquake-hub",
        isInternal: true,
        variant: "primary",
      },
      {
        text: "Visit Website",
        href: "https://earthquake.up.edu.ph/",
        isInternal: false,
        variant: "secondary",
      },
    ],
  },
  {
    id: 1,
    title: "Shake Table",
    description:
      "Shake Table turns earthquake records from Earthquake Hub into controlled physical motion for demonstrations, classroom learning, and hands-on seismic education.",
    keywords: "Microcontroller-driven earthquake simulator",
    images: shakeTIcon,
    actions: [
      {
        text: "Learn More",
        href: "#shake-table-prototypes",
        isInternal: true,
        variant: "primary",
      },
    ],
  },
  {
    id: 3,
    title: "Quake Quest",
    description:
      "Quake Quest is a research competition that invites senior high school students to explore seismic data through creative, challenge-based learning.",
    keywords: "Educational earthquake-themed game",
    images: QQImg,
    actions: [
      {
        text: "Quake Quest 2024",
        href: "https://upri-earthquake.github.io/quake-quest/src/index.html",
        isInternal: false,
        variant: "primary",
      },
      {
        text: "Quake Quest 2026",
        href: "",
        isInternal: false,
        variant: "secondary",
        isDisabled: true,
      },
    ],
  },
];
