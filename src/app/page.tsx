import Skills from "@/components/Skills/Skills";
import MainTitle from "../../components/MainTitle/MainTitle";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <MainTitle />
      <Skills />
      <Projects />
    </main>
  );
}
