import { ExperienceAccordionItemProps } from "@/src/types/ExperienceProps";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const ExperienceAccordionItem: React.FC<ExperienceAccordionItemProps> = ({
  value,
  experience,
  icon: IconComponent,
  rounded,
}) => {
  return (
    <AccordionItem
      value={value}
      className={cn(`bg-[var(--card)] p-2`, rounded)}
    >
      <AccordionTrigger className="cursor-pointer">
        <span className="flex items-center gap-2 text-xl">
          {IconComponent && <IconComponent size={50} />}
          {experience.company}
        </span>
      </AccordionTrigger>
      {experience.jobs.map((job, i) => {
        return (
          <AccordionContent
            key={"contentKey" + i}
            className="flex flex-col gap-4 text-balance pl-6 relative"
          >
            {/* Línea vertical decorativa */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[var(--primary)] opacity-30"></div>

            {/* Encabezado del trabajo con estrella */}
            <div className="flex items-center gap-2 mb-2">
              {/*<span className="text-yellow-500 text-lg">•</span>*/}
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {job.jobTitle}
              </h3>
            </div>

            {/* Contenido con sangría */}
            <div className="ml-6 space-y-4">
              <p className="text-[var(--foreground)] opacity-90 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, id) => (
                    <Badge
                      className="text-md"
                      variant="outline"
                      key={"techKey" + id}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[var(--foreground)] opacity-80">
                <span className="text-lg">📅</span>
                <span className="font-medium">
                  {job.startMonth} {job.startYear} -{" "}
                  {job.endMonth && job.endYear
                    ? `${job.endMonth} ${job.endYear}`
                    : "Present"}
                </span>
              </div>
            </div>
          </AccordionContent>
        );
      })}
    </AccordionItem>
  );
};

export default ExperienceAccordionItem;
