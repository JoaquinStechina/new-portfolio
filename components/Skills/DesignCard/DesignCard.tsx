import CSS from "@/components/Icons/CSS/CSS";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DesignCard: React.FC = () => {
  return (
    <Card className="w-48 border-primary rounded-r-2xl">
      <CardHeader>
        <CardTitle className="text-xl flex justify-center items-center">
          <CSS color="white" />
          <h2 className="relative inline-block text-2xl font-bold">
            <span className="relative z-10">Design</span>
            <div className="absolute left-1 top-4 w-[calc(100%)] h-4 bg-yellow-500/80 z-9" />
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Skilled in creating and designing high-end visuals and animations with
          CSS3 and Tailwind.
        </p>
      </CardContent>
    </Card>
  );
};

export default DesignCard;
