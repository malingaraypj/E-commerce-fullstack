import { getSellerApplications } from "@/api/admin";
import ApplicationCard from "@/components/Admin/ApplicationCard";
import type { SellerApplication } from "@/components/Admin/ApplicationCard";
import { LoaderFour } from "@/components/ui/loader";
import { useValidationApplications } from "@/hooks/useValidateApplications";
import { useQuery } from "@tanstack/react-query";

function AdminDashBoard() {
  // 1. Fetch applications
  const { data, isPending } = useQuery<SellerApplication[]>({
    queryKey: ["seller", "applications"],
    queryFn: ({ signal }) => getSellerApplications(signal),
  });

  // 2. Define mutation hook for approving/rejecting
  const { mutate } = useValidationApplications();

  if (isPending) {
    return (
      <div className="w-full flex justify-center pt-10">
        <LoaderFour />
      </div>
    );
  }

  // Ensure data is available and is an array before mapping
  const applications: SellerApplication[] = data || [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Seller Applications Dashboard
      </h1>
      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((item) => (
            <ApplicationCard
              key={item._id}
              application={item}
              // CORRECTED: Pass the application ID and validation type to mutate
              onApprove={() =>
                mutate({ id: item._id, validationType: "approve" })
              }
              onReject={() =>
                mutate({ id: item._id, validationType: "reject" })
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No seller applications found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashBoard;
