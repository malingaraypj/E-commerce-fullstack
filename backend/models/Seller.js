import mongoose from "mongoose";
import bcrypt from "bcrypt";

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // 1. Basic business information
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    businessType: {
      type: String,
      enum: ["individual", "company", "partnership", "manufacturer"],
      default: "individual",
    },
    businessDescription: {
      type: String,
      trim: true,
    },

    // 2. Personal Information
    contactPhone: {
      type: String,
      required: true,
    },
    governmentId: {
      type: String,
      required: true,
    },

    // 3. Address Details
    pickupAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    returnAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    taxId: {
      type: String,
    },
    intendedCategories: [{ type: String }],
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  if (!this.isModified(this.governmentId)) return next();

  this.governmentId = await bcrypt.hash(this.governmentId, 12);
  next();
});

const Seller = mongoose.model("SellerApplication", sellerSchema);

export default Seller;
