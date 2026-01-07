import Skills from "@/components/Skills/Skills";
import MainTitle from "../../components/MainTitle/MainTitle";
import Projects from "@/components/Projects/Projects";
import Experiences from "@/components/Experiences/Experiences";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <MainTitle />
      <Skills />
      <Projects />
      <Experiences />
    </main>
  );
}
