import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface ParallaxOptions {
  intensity?: number;
  damping?: number;
  stiffness?: number;
}

export const useParallax = ({
  intensity = 20,
  damping = 50,
  stiffness = 400,
}: ParallaxOptions = {}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping, stiffness };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = e;

      // Convert mouse position to normalized coordinates (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;

      setMousePosition({ x: normalizedX, y: normalizedY });
      rotateX.set(normalizedY * intensity);
      rotateY.set(normalizedX * intensity);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity, rotateX, rotateY]);

  return {
    mousePosition,
    rotateX: smoothRotateX,
    rotateY: smoothRotateY,
  };
};
