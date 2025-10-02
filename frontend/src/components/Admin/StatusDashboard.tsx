import { getSellerApplications } from "@/api/admin";
import ApplicationCard from "@/components/Admin/ApplicationCard";
import type { SellerApplication } from "@/components/Admin/ApplicationCard";
import { LoaderFour } from "@/components/ui/loader";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function StatusDashboard({ status }: { status?: string }) {
  // 1. Fetch applications
  const { data, isPending } = useQuery<SellerApplication[]>({
    queryKey: ["seller", "applications"],
    queryFn: ({ signal }) => getSellerApplications(signal, status),
  });

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
    <ScrollArea className="space-y-4">
      {applications.length > 0 ? (
        applications.map((item) => (
          <ApplicationCard key={item._id} application={item} />
        ))
      ) : (
        <p className="text-center text-gray-500">
          No seller applications found.
        </p>
      )}
    </ScrollArea>
  );
}

export default StatusDashboard;
