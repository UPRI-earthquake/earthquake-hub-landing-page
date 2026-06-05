import singleST from "../assets/SingleAxisST.avif";
import doubleAxisST from "../assets/2AxisST.avif";

export const products = [
  {
    id: 1,
    category: "Prototype",
    title: "Single Axis Shake Table",
    description:
      "A microcontroller-controlled prototype that translates recorded seismic data into single-axis horizontal motion for teaching, demonstrations, and public earthquake awareness.",
    images: singleST,
  },
  {
    id: 2,
    category: "Prototype",
    title: "2 Axis Shake Table",
    description: "A microcontroller-driven prototype that reproduces earthquake records from the Citizen Science Seismic Network. DC servo motors and a lead-screw system generate X and Y horizontal motion for teaching, research, and risk awareness.",
    images: doubleAxisST,
  },
];
