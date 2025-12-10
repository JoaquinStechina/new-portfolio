import Angular from "../Icons/Angular/Angular";
import CSS from "../Icons/CSS/CSS";
import Hibernate from "../Icons/Hibernate/Hibernate";
import HTMLIcon from "../Icons/HTMLIcon/HTMLIcon";
import Java from "../Icons/Java/Java";
import Javascript from "../Icons/Javascript/Javascript";
import MySQL from "../Icons/MySQL/MySQL";
import NextJS from "../Icons/NextJS/NextJS";
import NodeJS from "../Icons/NodeJS/NodeJS";
import React from "../Icons/React/React";
import Spring from "../Icons/Spring/Spring";
import Typescript from "../Icons/Typescript/Typescript";
import LogoLoop from "../LogoLoop";
import BackendCard from "./BackendCard/BackendCard";
import DesignCard from "./DesignCard/DesignCard";
import FrontendCard from "./FrontendCard/FrontendCard";

const techLogos = [
  {
    node: <NextJS color="white" />,
    title: "Next.js",
    href: "https://nextjs.org/",
  },
  { node: <React />, title: "React", href: "https://react.dev" },
  { node: <Angular />, title: "React", href: "https://angular.dev/" },
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

const Skills: React.FC = () => {
  return (
    <div
      id="skills"
      className="flex flex-col justify-center items-center w-1/2 h-screen"
    >
      <h1 className="text-4xl mb-8">My Expertise</h1>
      <div className="flex justify-center w-full mb-8">
        <BackendCard />
        <FrontendCard />
        <DesignCard />
      </div>
      <LogoLoop
        logos={techLogos}
        className=""
        speed={40}
        direction="left"
        logoHeight={48}
        width={600}
        gap={20}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="var(--secondary)"
        ariaLabel="Technology partners"
      />
    </div>
  );
};
export default Skills;
