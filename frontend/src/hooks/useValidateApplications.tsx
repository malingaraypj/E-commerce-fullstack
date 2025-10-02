import { validateApplication } from "@/api/admin";
import { queryClient } from "@/api/api";
import type { SellerApplication } from "@/components/Admin/ApplicationCard";
import { useMutation } from "@tanstack/react-query";

export const useValidationApplications = () => {
  return useMutation({
    mutationFn: ({
      id,
      validationType,
    }: {
      id: string;
      validationType: "approve" | "reject";
    }) => validateApplication(id, validationType),

    // 1. Rollback Snapshot and Optimistic Update
    onMutate: async ({ id, validationType }) => {
      // 1.1 Cancel any ongoing refetches for the applications query
      await queryClient.cancelQueries({ queryKey: ["seller", "applications"] });

      // 1.2 Snapshot the previous value
      const previousApplications = queryClient.getQueryData<
        SellerApplication[]
      >(["seller", "applications"]);

      // 1.3 Optimistically update the cache
      if (previousApplications) {
        queryClient.setQueryData(
          ["seller", "applications"],
          previousApplications.map((app) =>
            app._id === id
              ? {
                  ...app,
                  status:
                    validationType === "approve" ? "approved" : "rejected",
                }
              : app
          )
        );
      }

      // Return a context object with the snapshot value
      return { previousApplications };
    },

    // 2. Success: Invalidate and ensure UI is up to date
    onSuccess: () => {
      // Invalidate the applications query to trigger a background refetch
      queryClient.invalidateQueries({ queryKey: ["seller", "applications"] });
    },

    // 3. Error: Rollback to the previous state
    onError: (err, _, context) => {
      console.error("Mutation failed, rolling back:", err);
      // Use the context returned from onMutate to roll back the cache data
      if (context?.previousApplications) {
        queryClient.setQueryData(
          ["seller", "applications"],
          context.previousApplications
        );
      }
    },

    // 4. Settled: Always re-run the fetch to clean up pending state
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["seller", "applications"] });
    },
  });
};
