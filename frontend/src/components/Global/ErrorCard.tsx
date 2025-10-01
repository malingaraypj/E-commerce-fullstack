import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const ErrorCard: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  return (
    <Alert variant="default">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  );
};

export default ErrorCard;
