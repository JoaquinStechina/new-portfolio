import experienceData from "./experience.json";
import { Accordion } from "../ui/accordion";
import ExperienceAccordionItem from "./ExperienceAccordionItem";
import { Globant, JPSystems, Rocking, UTN } from "@/components/Icons";

type CompanyName = "Rocking" | "UTN" | "Globant" | "JPSystems";

const iconMap: Record<CompanyName, React.ComponentType> = {
  Rocking: Rocking,
  UTN: UTN,
  Globant: Globant,
  JPSystems: JPSystems,
};

const Experiences: React.FC = () => {
  const experienceLength = experienceData.length;

  return (
    <div
      id="experience"
      className="flex flex-col justify-center items-center max-lg:w-3/4 lg:w-1/2 mt-[5%] mb-[5%] max-md:mt-3 max-md:mb-3"
    >
      <h1 className="text-4xl mb-8">My Experiences</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full gap-1 rounded-2xl border-2 border-[var(--primary)]"
        defaultValue="item-0"
      >
        {experienceData.map((e, i) => {
          const IconComponent = iconMap[e.icon as CompanyName];
          return (
            <ExperienceAccordionItem
              key={"itemkey-" + i}
              icon={IconComponent}
              value={`item-${i}`}
              experience={e}
              rounded={
                i === 0
                  ? "rounded-t-2xl"
                  : i === experienceLength - 1
                  ? "rounded-b-2xl"
                  : undefined
              }
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default Experiences;
