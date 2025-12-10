"use client";
import { useState, useEffect } from "react";
import Github from "../Icons/Github/Github";
import Instagram from "../Icons/Instagram/Instagram";
import Linkedin from "../Icons/Linkedin/Linkedin";

const SideBar: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getIconStyle = (iconName: string) => {
    const isHovered = hoveredIcon === iconName;
    const otherHovered = hoveredIcon && hoveredIcon !== iconName;

    return {
      transform: isHovered
        ? "scale(1)"
        : otherHovered
        ? "scale(0.75)"
        : "scale(1)",
      opacity: isHovered ? 1 : otherHovered ? 0.5 : 1,
      transition: "all 400ms",
    };
  };

  return (
    <div
      className={`z-20 max-w-1/16 flex flex-col items-center justify-center fixed h-screen bg-transparent transform transition-all duration-700 ease-out ${
        isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="w-0.5 h-full bg-white mb-4" />
      <div
        className="m-4"
        style={getIconStyle("instagram")}
        onMouseEnter={() => setHoveredIcon("instagram")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a
          href="https://www.instagram.com/joaquin_stechina"
          target="_blank"
          className="block"
        >
          <Instagram color="white" />
        </a>
      </div>
      <div
        className="m-4"
        style={getIconStyle("github")}
        onMouseEnter={() => setHoveredIcon("github")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a
          href="https://github.com/JoaquinStechina"
          target="_blank"
          className="block"
        >
          <Github color="white" />
        </a>
      </div>
      <div
        className="m-4"
        style={getIconStyle("linkedin")}
        onMouseEnter={() => setHoveredIcon("linkedin")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a
          href="https://www.linkedin.com/in/joaquinstechina/"
          target="_blank"
          className="block"
        >
          <Linkedin color="white" />
        </a>
      </div>
      <div className="w-0.5 h-full bg-white mt-4" />
    </div>
  );
};
export default SideBar;
