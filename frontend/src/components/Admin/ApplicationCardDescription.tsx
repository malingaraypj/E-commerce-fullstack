import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CardDescriptionProps {
  triggerText: string;
  contentText: string;
}

const ApplicationCardDescription: React.FC<CardDescriptionProps> = ({
  triggerText,
  contentText,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{triggerText}</AccordionTrigger>
        <AccordionContent>{contentText}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ApplicationCardDescription;
