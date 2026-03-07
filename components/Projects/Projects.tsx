import projectsData from "./projects.json";
import ProjectCard from "./ProjectCard/ProjectCard";

const Projects: React.FC = () => {
  return (
    <div
      id="projects"
      className="flex flex-col justify-center items-center w-3/4 mt-[5%] mb-[5%]"
    >
      <h1 className="text-4xl mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {projectsData.length > 0 ? (
          projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
