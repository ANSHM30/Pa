import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Starfield() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#000" },
        particles: {
          number: { value: 120, density: { enable: true, area: 1000 } },
          color: { value: "#fff" },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.3, random: true },
        },
      }}
    />
  );
}
