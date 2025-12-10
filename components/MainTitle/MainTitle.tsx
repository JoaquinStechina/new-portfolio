"use client";
import RotatingText from "@/components/RotatingText";
import { useEffect, useState } from "react";

const MainTitle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div
      id="main"
      className={`h-screen flex flex-col justify-center transition-opacity duration-2000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-center text-5xl">{"</ JOAQUÍN STECHINA >"}</h1>
      <RotatingText
        texts={["Full-Stack Developer", "Designer", "Gamer", "Full time human"]}
        mainClassName="text-xl text-[var(--primary)] justify-center mt-4"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={3000}
      />
    </div>
  );
};

export default MainTitle;
