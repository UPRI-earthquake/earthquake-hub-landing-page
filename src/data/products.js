import r_Shake from "../assets/R-SHAKE_converted.avif";
import singleST from "../assets/SingleAxisST.png";
import doubleAxisST from "../assets/2AxisST.png";

export const products = [
  {
    id: 1,
    title: "R-SHAKE",
    description:
      "is a professional-grade seismograph for the Raspberry Pi, the Shake uses geophone sensors to detect earthquakes from local rumbles to global events. It streams real-time data, allowing users to monitor seismic activity and contribute directly to a worldwide research network.",
    images: r_Shake,
  },
  {
    id: 2,
    title: "Single Axis Shake Table",
    description:
      "This microcontroller-controlled table uses a DC servo motor and belt drive to translate recorded seismic data into precise single-axis horizontal motion, demonstrating earthquake effects on structures for education and awareness.",
    images: singleST,
  },
  {
    id: 3,
    title: "2 Axis Shake Table",
    description: "This microcontroller-driven table reproduces real earthquake data from the Citizen Science Seismic Network. Using DC servo motors and a lead-screw system, it generates precise X and Y horizontal motion to demonstrate structural response for education and risk assessment.",
    images: doubleAxisST,
  },
];

