import Skills from "@/components/Skills/Skills";
import MainTitle from "../../components/MainTitle/MainTitle";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <MainTitle />
      <Skills />
      <Projects />
      <Experience />
    </main>
  );
}
