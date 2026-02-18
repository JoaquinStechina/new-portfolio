export interface Project {
  id: string;
  name: string;
  link: string | null;
  description: string;
  imageLink: string | null;
}

export interface ProjectProps {
  project: Project;
}
