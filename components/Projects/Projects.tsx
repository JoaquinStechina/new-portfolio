"use client";

import { Project } from "@/src/types/ProjectProps";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Importación estática
      import("./projects.json").then((data) => {
        setProjects(data.default || data);
        setLoading(false);
      });
    } catch (err) {
      setError("Error cargando proyectos");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Cargando proyectos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div
      id="projects"
      className="flex flex-col justify-center items-center w-3/4 mt-[5%] mb-[5%]"
    >
      <h1 className="text-4xl mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <p className="text-gray-500 text-lg">
              No hay proyectos disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Projects;
