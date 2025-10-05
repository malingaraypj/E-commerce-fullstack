import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NewReview from "./NewReview";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/api/product";
import { LoaderOne } from "../ui/loader";
import ReviewCard from "./ReviewCard";
import type { Review } from "@/models/Review";

function ReviewSection({ productId }: { productId: string }) {
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["review", productId],
    queryFn: ({ signal }) => getAllReviews(productId, signal),
  });

  if (isLoading) {
    return <LoaderOne />;
  }

  console.log(reviews);

  return (
    <div className="md:col-span-2 mt-10 bg-slate-100">
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>
            What others are saying about this product
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add new Review */}
          <NewReview productId={productId} onRefetch={refetch} />
          {/* display review */}
          {reviews.length > 0 &&
            reviews.map((review: Review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewSection;
