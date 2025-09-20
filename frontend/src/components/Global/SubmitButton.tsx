import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex w-full cursor-pointer hover:scale-105 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
