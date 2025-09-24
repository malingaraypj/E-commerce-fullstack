import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils"; // shadcn helper for merging classNames

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, className }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn(
        "flex w-full cursor-pointer hover:scale-105 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition",
        className
      )}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
