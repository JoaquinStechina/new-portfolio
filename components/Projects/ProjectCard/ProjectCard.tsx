import { GithubRounded } from "@/components/Icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectProps } from "@/src/types/ProjectProps";
import Image from "next/image";

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Card className="border-primary border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg flex justify-center items-center">
          <h2 className="inline-block text-2xl font-bold">
            <span>{project.name}</span>
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-lg:flex max-lg:flex-col max-lg:items-center">
        <Image
          src={project.imageLink || ""}
          fill={false}
          height={200}
          width={430}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-[200px] pb-2"
          alt=""
        />
        <p>{project.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col">
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
