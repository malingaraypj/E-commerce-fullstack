import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
      minlength: [3, "name must be at least 3 characters"],
      maxlength: [20, "name must be at most 20 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "user must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "user must have a password"],
      minlength: [8, "password must be at least 8 characters"],
      maxlength: [20, "password must be at most 20 characters"],
      trim: true,
      select: false, // don't send password in queries by default
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
      message: "role is either: customer, seller, admin",
    },
    checkedProduct: [
      {
        Product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productCount: {
          type: Number,
          default: 0,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method for comparing password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isPasswordChanged = function (jwtIat) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // Return true if password changed AFTER token was issued
    return passwordChangedTimestamp > jwtIat;
  }

  return false;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
