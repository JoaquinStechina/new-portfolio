import GithubRounded from "@/components/Icons/Github/GithubRounded";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectProps } from "@/src/types/ProjectProps";

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="text-lg flex justify-center items-center">
          <h2 className="inline-block text-2xl font-bold">
            <span>{project.name}</span>
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-16">
        <p>{project.description}</p>
      </CardContent>
      <CardFooter>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="block hover:scale-105 transition"
          >
            <GithubRounded color="white" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
