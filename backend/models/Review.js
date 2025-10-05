import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      maxlength: [500, "Review cannot exceed 500 characters"],
    },
    rating: {
      type: Number,
      // required: [true, "Rating is required"],
      // min: [1, "Rating must be at least 1"],
      // max: [5, "Rating cannot exceed 5"],
    },
    responses: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
          trim: true,
          required: [true, "a response shouldn't be empty"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// virtual fields
reviewSchema.pre("find", function (next) {
  this.populate({
    path: "user",
    select: "name email profileImage",
  });
  next();
});

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
