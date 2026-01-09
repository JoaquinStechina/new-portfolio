import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface SkillCardContent {
  title: string;
  color: string;
  icon: React.ComponentType<{
    width?: number;
    height?: number;
    size?: number;
    color?: string;
  }>;
  content: string;
}

interface SkillCardProps {
  skill: SkillCardContent;
  index: number;
  lastIndex: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, lastIndex }) => {
  return (
    <Card
      className={`${
        index === 0 &&
        "max-md:rounded-t-2xl max-md:border-b-0 md:rounded-l-2xl md:border-r-0"
      } ${
        index === lastIndex &&
        "max-md:rounded-b-2xl max-md:border-t-0 md:rounded-r-2xl md:border-l-0"
      } md:w-48 ${
        index != 0 && index != lastIndex && "md:border-y-2 max-md:border-x-2"
      } border-primary border-2`}
    >
      <CardHeader>
        <CardTitle className="text-xl flex max-lg:flex-col justify-center items-center">
          <skill.icon color={"white"} />
          <h2 className="relative inline-block text-2xl font-bold">
            <span className="relative z-10">{skill.title}</span>
            <div
              className={`absolute left-1 top-4 w-[calc(100%)] h-4 ${skill.color} z-9`}
            />
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{skill.content}</p>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
