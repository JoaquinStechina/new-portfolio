import React from "@/components/Icons/React/React";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FrontendCard: React.FC = () => {
  return (
    <Card className="w-48 border-y-primary">
      <CardHeader>
        <CardTitle className="text-xl flex justify-center items-center">
          <React color="white" />
          <h2 className="relative inline-block text-2xl font-bold">
            <span className="relative z-10">Frontend</span>
            <div className="absolute left-1 top-4 w-[calc(100%)] h-4 bg-blue-700/80   z-9" />
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Passionate about UI/UX. Over 3 years of development experience in
          HTML, CSS, JS, React and NextJS frameworks.
        </p>
      </CardContent>
    </Card>
  );
};

export default FrontendCard;
