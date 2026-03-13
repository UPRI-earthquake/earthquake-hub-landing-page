import QQImg from "../assets/QQ-Logo.png";
import seismoFavicon from "../assets/SEISMOFAVICON_converted.avif";
import shakeTIcon from "../assets/shaketable.png";

export const projects = [
  {
    id: 1,
    title: "Shake Table",
    description:
      "The Shake Table Project builds scalable platforms that physically recreate real earthquake data—sourced from the L.I.N.D.O.L. Network—using precise mechanical motion. Available in single-axis and dual-axis (X/Y) configurations, each table is powered by DC servo motors and controlled by a microcontroller to deliver accurate, repeatable ground-motion simulations. Designed to support education, engineering demonstrations, and risk awareness, the system makes the impact of seismic activity tangible and accessible.",
    keywords: "Microcontroller-driven earthquake simulator",
    images: shakeTIcon,
    linkText: "Learn More",
    linkHref: "#products",
    isInternalLink: true,
  },
  {
    id: 2,
    title: "L.I.N.D.O.L",
    description:
      "L.I.N.D.O.L. is an open-source seismic monitoring platform designed to provide real-time accessible earthquake data across the Philippines.",
    keywords: "Citizen-powered seismic network",
    images: seismoFavicon,
    linkText: "Visit Website",
    linkHref: "https://earthquake.science.upd.edu.ph/",
    isInternalLink: false,
  },
  {
    id: 3,
    title: "Quake Quest",
    description:
      "Quake Quest is a scientific research competition hosted by the University of the Philippines Resilience Institute (UPRI), together with the University of the Philippines Intelligent Systems Center (UP ISC), aiming to utilize the UPRI's archived seismic data. We are calling on the bright minds of senior high school students to showcase their creativity and scientific knowledge by crafting innovative projects. Join us on a journey of discovery through a set of fun and engaging quests designed to challenge and inspire bright minds!",
    keywords: "Educational earthquake-themed game",
    images: QQImg,
    linkText: "Register Now",
    linkHref: "https://upri-earthquake.github.io/quake-quest/src/index.html#home",
    isInternalLink: false,
  },
];

