export interface ExperienceJobs {
  jobTitle: string;
  description: string;
  technologies: string[];
  startMonth: string;
  startYear: string;
  endMonth: string | null;
  endYear: string | null;
}

export interface Experience {
  icon: string;
  company: string;
  jobs: ExperienceJobs[];
}

export interface ExperienceAccordionItemProps {
  value: string;
  experience: Experience;
  icon?: React.ComponentType<{
    width?: number;
    height?: number;
    size?: number;
  }>;
  rounded?: string;
}
