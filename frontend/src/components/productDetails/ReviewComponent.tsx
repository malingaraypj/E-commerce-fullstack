import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import type { Review } from "@/models/Review";
import ReviewCard from "./ReviewCard";
import NewReview from "./NewReview";

function ReviewSection() {
  // Dummy reviews aligned with Review interface
  const dummyReviews: Review[] = [
    {
      id: "1",
      productId: "101",
      userId: "u1",
      user: {
        id: "u1",
        firstName: "Alice",
        profileImage: "https://i.pravatar.cc/50?img=1",
        email: "alice@example.com",
      },
      comment: "nothing great",
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    },
    {
      id: "2",
      productId: "101",
      userId: "u2",
      user: {
        id: "u2",
        firstName: "Bob",
        lastName: "Smith",
        profileImage: "https://i.pravatar.cc/50?img=2",
      },
      comment: "not bad",
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    },
  ];

  const [reviews, setReviews] = useState<Review[]>(dummyReviews);

  const handleAddReview = (newReview: { comment: string }) => {
    if (newReview.comment) {
      const newRev: Review = {
        id: Date.now().toString(),
        productId: "101",
        userId: "temp",
        user: {
          id: "temp",
          firstName: "username",
          profileImage: "https://i.pravatar.cc/50",
        },
        createdAt: new Date().toISOString(),
        comment: newReview.comment,
      };

      setReviews([...reviews, newRev]);
    }
  };

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
          <NewReview addReview={handleAddReview} />
          {/* display review */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewSection;
