"use client";

import { useEffect, useReducer } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { Action, initialState, reducer, State } from "./ProjectsReducer";

const Projects: React.FC = () => {
  const [state, dispatch] = useReducer(
    reducer as React.Reducer<State, Action>,
    initialState
  );

  const { projects, loading, error } = state;
  useEffect(() => {
    import("./projects.json")
      .then((data) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data.default || data,
        });
      })
      .catch(() => {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Error loading proyects",
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading proyects...</p>
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
          projects.map((project) => (
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
