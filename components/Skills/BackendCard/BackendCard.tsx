import Database from "@/components/Icons/Database/Database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BackendCard: React.FC = () => {
  return (
    <Card className="w-48 border-primary rounded-l-2xl">
      <CardHeader>
        <CardTitle className="text-xl flex justify-center items-center">
          <Database color="white" />
          <h2 className="relative inline-block text-2xl font-bold">
            <span className="relative z-10">Backend</span>
            <div className="absolute left-1 top-4 w-[calc(100%)] h-4 bg-red-500/80   z-9" />
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Worked with Java, Spring, and Hibernate creating APIs for different
          digital products.
        </p>
      </CardContent>
    </Card>
  );
};

export default BackendCard;
