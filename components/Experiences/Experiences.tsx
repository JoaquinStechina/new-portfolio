"use client";

import { useEffect, useReducer } from "react";
import { Accordion } from "../ui/accordion";
import ExperienceAccordionItem from "./ExperienceAccordionItem";
import { Globant, JPSystems, Rocking, UTN } from "@/components/Icons";
import { initialState, reducer } from "./ExperiencesReducer";

type CompanyName = "Rocking" | "UTN" | "Globant" | "JPSystems";

const iconMap: Record<CompanyName, React.ComponentType> = {
  Rocking: Rocking,
  UTN: UTN,
  Globant: Globant,
  JPSystems: JPSystems,
};

const Experiences: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { experience, loading, error } = state;
  const experienceLength = experience.length;

  useEffect(() => {
    import("./experience.json")
      .then((data) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data.default || data,
        });
      })
      .catch(() => {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Error loading experiences",
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading experiences...</p>
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
        {experience.map((e, i) => {
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
