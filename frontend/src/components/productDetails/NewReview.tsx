import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import UserAvatar from "../Global/UserAvatar";
import { addReview } from "@/api/product";

const NewReview: React.FC<{ onRefetch: () => void; productId: string }> = ({
  onRefetch,
  productId,
}) => {
  const [isActive, setisActive] = useState<boolean>(false);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview) {
      addReview(productId, newReview);
      onRefetch();
      setNewReview("");
    }
    setisActive(false);
  };

  const handleCancel = () => {
    setisActive(false);
    setNewReview("");
  };

  return (
    <div className="space-y-3  bg-slate-100 rounded-lg px-5 py-4">
      <div className="flex justify-center items-center">
        <UserAvatar />
        <Textarea
          placeholder="Write your review..."
          value={newReview}
          onFocus={() => setisActive(true)}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      {isActive && (
        <div className="flex justify-end items-center gap-5">
          <Button
            onClick={handleCancel}
            className="bg-stone-800 text-white cursor-pointer hover:scale-105"
          >
            cancel
          </Button>
          <Button
            className="bg-stone-800 text-white cursor-pointer hover:scale-105"
            onClick={handleAddReview}
          >
            Submit Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewReview;
