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
      className={`max-lg:flex-row z-20 max-lg:max-h-1/4 max-lg:w-screen lg:h-screen lg:max-w-1/16 flex flex-col items-center justify-center fixed max-lg:bg-background lg:bg-transparent transform transition-all duration-700 ease-out ${
        isLoaded
          ? "max-lg:translate-y-0 lg:translate-x-0 opacity-100"
          : "max-lg:-translate-y-full lg:-translate-x-full opacity-0"
      }`}
    >
      <div className="max-lg:h-0.5 max-lg:w-full lg:w-0.5 lg:h-full bg-white lg:mb-4" />
      <div
        className="max-lg:m-2 lg:m-4"
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
        className="max-lg:m-2 lg:m-4"
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
        className="max-lg:m-2 lg:m-4"
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
      <div className="max-lg:h-0.5 max-lg:w-full lg:w-0.5 lg:h-full bg-white lg:mt-4" />
    </div>
  );
};
export default SideBar;
