import type { Review } from "@/models/Review";
import UserAvatar from "../Global/UserAvatar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { Separator } from "../ui/separator";
import { FaCommentDots } from "react-icons/fa";

interface ReviewProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="border-b pb-2 py-5 px-5 my-5 bg-slate-100 rounded-lg ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 justify-between w-full">
          {review.user.profileImage && (
            <UserAvatar
              img={review.user.profileImage}
              label={
                review.user.lastName
                  ? `${review.user.firstName} ${review.user.lastName}`
                  : review.user.firstName
              }
            />
          )}
          <div className="flex flex-col items-end gap-5">
            <HiOutlineDotsVertical className="cursor-pointer" />
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-700 ml-12">
        <p>{review.comment}</p>
        <Separator />
        <div className="flex gap-5 mt-5 items-center">
          <BiSolidLike size={20} className="hover:scale-110 cursor-pointer" />
          <BiSolidDislike
            size={20}
            className="hover:scale-110 cursor-pointer"
          />
          <FaCommentDots size={20} className="hover:scale-110 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
