import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplicationCardDescription from "./ApplicationCardDescription";

// A type for the application data, matching the Seller model
export type SellerApplication = {
  _id: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
  applicationStatus: "pending" | "approved" | "rejected";
  user: {
    name: string;
    email: string;
  };
  contactPhone: string;
  createdAt: string;
};

type ApplicationCardProps = {
  application: SellerApplication;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

const ApplicationCard = ({
  application,
  onApprove,
  onReject,
}: ApplicationCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="flex flex-col h-[280px]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{application.businessName}</CardTitle>
            <CardDescription>
              Applied by: {application.user.name} ({application.user.email})
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant(application.applicationStatus)}>
            {application.applicationStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 overflow-y-auto">
        <div className="flex gap-10 text-sm">
          <p>
            <strong>Business Type:</strong> {application.businessType}
          </p>
          <p>
            <strong>Phone:</strong> {application.contactPhone}
          </p>
          <p>
            <strong>Applied on:</strong>{" "}
            {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>

        <ApplicationCardDescription
          triggerText="Desciption"
          contentText={application.businessDescription}
        />
      </CardContent>

      {/* Only show buttons for pending applications */}
      {application.applicationStatus === "pending" && (
        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onReject(application._id)}>
            Reject
          </Button>
          <Button onClick={() => onApprove(application._id)}>Approve</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ApplicationCard;
