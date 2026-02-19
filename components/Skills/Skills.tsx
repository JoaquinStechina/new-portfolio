"use client";
import {
  Angular,
  CSS,
  Hibernate,
  HTMLIcon,
  Java,
  Javascript,
  MySQL,
  NextJS,
  NodeJS,
  React,
  Spring,
  Typescript,
  Database,
} from "@/components/Icons";

import LogoLoop from "../LogoLoop";
import SkillCard, { SkillCardContent } from "./SkillCard";

const techLogos = [
  {
    node: <NextJS color="white" />,
    title: "Next.js",
    href: "https://nextjs.org/",
  },
  { node: <React />, title: "React", href: "https://react.dev" },
  { node: <Angular />, title: "Angular", href: "https://angular.dev/" },
  { node: <HTMLIcon />, title: "HTML5", href: "https://html.spec.whatwg.org/" },
  {
    node: <CSS color="#1172B8" />,
    title: "CSS3",
    href: "https://w3.org/TR/CSS/#css",
  },
  {
    node: <Javascript />,
    title: "Javascript",
    href: "https://ecma-international.org/publications-and-standards/standards/ecma-262/",
  },
  {
    node: <Typescript />,
    title: "Typescript",
    href: "https://www.typescriptlang.org/",
  },
  { node: <Java />, title: "Java", href: "https://www.java.com/en/" },
  {
    node: <Spring />,
    title: "Spring Boot",
    href: "https://spring.io/projects/spring-boot",
  },
  {
    node: <Hibernate />,
    title: "Hibernate",
    href: "https://hibernate.org/orm/",
  },
  { node: <MySQL />, title: "MySQL", href: "https://www.mysql.com/" },
  { node: <NodeJS />, title: "NodeJS", href: "https://nodejs.org/en" },
];

type Title = "Frontend" | "Backend" | "Design";

const iconMap: Record<Title, React.ComponentType> = {
  Frontend: React,
  Backend: Database,
  Design: CSS,
};

const skillArray: SkillCardContent[] = [
  {
    title: "Backend",
    color: "bg-red-500/80",
    icon: iconMap.Backend,
    content:
      "Worked with Java, Spring, and Hibernate creating APIs for different digital products.",
  },
  {
    title: "Frontend",
    color: "bg-blue-500/80",
    icon: iconMap.Frontend,
    content:
      "Passionate about UI/UX. Over 3 years of development experience in HTML, CSS, JS, React and NextJS frameworks.",
  },
  {
    title: "Design",
    color: "bg-yellow-500/80",
    icon: iconMap.Design,
    content:
      "Skilled in creating and designing high-end visuals and animations with CSS3 and Tailwind.",
  },
];

const Skills: React.FC = () => {
  const lastIndex = skillArray.length - 1;
  
  return (
    <div
      id="skills"
      className="flex flex-col justify-center items-center max-lg:w-3/4 md:h-screen"
    >
      <h1 className="text-4xl mb-8">My Expertise</h1>
      <div className="flex justify-center w-full mb-8 max-md:flex-col max-md:items-center">
        {skillArray.map((skill, i) => {
          return (
            <SkillCard
              key={"skillID" + i}
              index={i}
              lastIndex={lastIndex}
              skill={skill}
            />
          );
        })}
      </div>
      <div className="w-full max-w-[600px]">
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={20}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--secondary)"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};
export default Skills;
