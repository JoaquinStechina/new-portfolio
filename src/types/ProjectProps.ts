export interface Project {
  name: string;
  link: string | null;
  description: string;
  imageLink: string | null;
}

export interface ProjectProps {
  project: Project;
}
