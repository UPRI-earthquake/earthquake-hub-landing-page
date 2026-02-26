import QQImg from "../assets/QQ-logo.png";
import qq1 from "../assets/Student presentation.JPG";
import qq2 from "../assets/GROUPPHOTO.jpg";
import singleAxisImg from "../assets/SingleAxisST.png";
import twoAxisImg from "../assets/2AxisST.png";
import CSSNImg from "../assets/CSSN.png";

export const projects = [
  {
    id: 1,
    title: "Quake Quest",
    description:
      "Quake Quest is a scientific research competition hosted by the University of the Philippines Resilience Institute (UPRI), together with the University of the Philippines Intelligent Systems Center (UP ISC), aiming to utilize the UPRI's archived seismic data. We are calling on the bright minds of senior high school students to showcase their creativity and scientific knowledge by crafting innovative projects. Join us on a journey of discovery through a set of fun and engaging quests designed to challenge and inspire bright minds!",
    images: [QQImg, qq1, qq2],
  },
  {
    id: 2,
    title: "Citizen Science Seismic Network",
    description:
      "In a significant step towards advancing earthquake research and enhancing risk management strategies, The UP Resilience Institute (UPRI), UP Diliman College of Engineering (UPD COE), UP Diliman College of Science (UPD CS), National Institute for Science and Mathematics Education Development (NISMED), National Institute of Geological Sciences (NIGS), and National Institute of Physics (NIP) joined forces to discuss the proposed earthquake research hub in UP Diliman, named UP TREMOR (Timely Research of Earthquakes for Management of Risks) on December 14, 2023, at the UPRI Training Room.",
    images: [CSSNImg],
  },
  {
  id: 3,
  title: "Shake Table",
  description: "A small-scale seismic simulator...",
  variants: [
    {
      type: "Single Axis",
      description: "This small-scale shake table is a single-axis, horizontally actuated platform that reproduces actual recorded seismic data by translating it into precise mechanical motion. It features a belt-driven mechanism powered by a DC servo motor, and is microcontroller-controlled for accurate playback of earthquake ground motion used to demonstrate the effects of ground shaking on structures, supporting earthquake education, structural awareness, and risk-informed decision-making.",
      images: [singleAxisImg],
    },
    {
      type: "Two Axis",
      description: "This 2-axis shake table provides horizontal motion in both the X and Y directions, enabling multidirectional ground-motion simulation. It uses a lead-screw drive system powered by DC servo motors for precise and repeatable movement. The platform is microcontroller-based and capable of reproducing actual recorded seismic data from the Citizen Science Seismic Network, translating earthquake recordings into accurate mechanical motion used to demonstrate the effects of ground shaking on structures, supporting earthquake education, structural awareness, and risk-informed decision-making.",
      images: [twoAxisImg],
    }
  ]
}
];

