"use client";
import { useState, useEffect } from "react";
import { Github, Instagram, Linkedin } from "@/components/Icons";

const SideBar: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const icons = [
    {
      name: "instagram",
      href: "https://www.instagram.com/joaquin_stechina",
      Icon: Instagram,
    },
    {
      name: "github",
      href: "https://github.com/JoaquinStechina",
      Icon: Github,
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/joaquinstechina/",
      Icon: Linkedin,
    },
  ];

  return (
    <div
      className={`max-lg:flex-row z-20 max-lg:max-h-1/4 max-lg:w-screen lg:h-screen lg:max-w-1/16 flex flex-col items-center justify-center fixed max-lg:bg-background lg:bg-transparent transform transition-all duration-700 ease-out ${
        isLoaded
          ? "max-lg:translate-y-0 lg:translate-x-0 opacity-100"
          : "max-lg:-translate-y-full lg:-translate-x-full opacity-0"
      }`}
    >
      <div className="max-lg:h-0.5 max-lg:w-full lg:w-0.5 lg:h-full bg-white lg:mb-4" />
      {icons.map(({ name, href, Icon }) => (
        <div
          key={name}
          className={`max-lg:m-2 lg:m-4 transition-all duration-400 ${
            hoveredIcon && hoveredIcon !== name
              ? "opacity-50 scale-75"
              : "opacity-100 scale-100"
          }`}
          onMouseEnter={() => setHoveredIcon(name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Icon color="white" />
          </a>
        </div>
      ))}
      <div className="max-lg:h-0.5 max-lg:w-full lg:w-0.5 lg:h-full bg-white lg:mt-4" />
    </div>
  );
};
export default SideBar;
