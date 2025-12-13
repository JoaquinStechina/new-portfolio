import Globant from "../Icons/Globant/Globant";
import JPSystems from "../Icons/JPSystems/JPSystems";
import UTN from "../Icons/UTN/UTN";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Experience: React.FC = () => {
  return (
    <div
      id="experience"
      className="flex flex-col justify-center items-center w-1/2 h-screen"
    >
      <h1 className="text-4xl mb-8">My Experiences</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full gap-1 rounded-2xl border-2 border-[var(--primary)]"
        defaultValue="item-1"
      >
        <AccordionItem
          value="item-1"
          className="rounded-t-2xl bg-[var(--card)] p-2"
        >
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <UTN size={35} />
              College Auxiliary Professor
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-[var(--card)] p-2">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <Globant size={35} />
              Web UI Developer
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="rounded-b-2xl bg-[var(--card)] p-2"
        >
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <JPSystems size={35} />
              Frontend Developer
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Experience;
