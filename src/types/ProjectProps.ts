export interface Project {
  name: string;
  link: string | null;
  description: string;
}

export interface ProjectProps {
  project: Project;
}
