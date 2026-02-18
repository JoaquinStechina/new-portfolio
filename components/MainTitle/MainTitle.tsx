"use client";
import RotatingText from "@/components/RotatingText";
import "./MainTitle.css";

const MainTitle: React.FC = () => {
  return (
    <div
      id="main"
      className="
        h-screen flex flex-col justify-center
        opacity-0 animate-fade-in
      "
    >
      <h1 className="text-center text-5xl">{"</ JOAQUÍN STECHINA >"}</h1>
      <RotatingText
        texts={["Full-Stack Developer", "Designer", "Gamer", "Full time human"]}
        mainClassName="text-xl text-[var(--primary)] justify-center mt-4"
        staggerFrom="last"
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
