import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

export const applyToBeSellerService = async (userId, applicationData) => {
  const {
    businessName,
    businessType,
    businessDescription,
    contactPhone,
    governmentId,
    pickupAddress,
    returnAddress,
    taxId,
    intendedCategories,
  } = applicationData;

  // Validate mandatory fields
  if (!businessName || !governmentId || !pickupAddress || !returnAddress) {
    throw new AppError("Please provide valid details", 400);
  }

  // Ensure user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) throw new AppError("User does not exist", 404);

  // Check if the user already has a pending application
  const existingApplication = await Seller.findOne({
    user: userId,
    status: "pending",
  });
  if (existingApplication)
    throw new AppError("You already have a pending application", 400);

  // Build application data dynamically
  let data = { user: userId };
  if (businessName) data.businessName = businessName;
  if (businessType) data.businessType = businessType;
  if (businessDescription) data.businessDescription = businessDescription;
  if (contactPhone) data.contactPhone = contactPhone;
  if (governmentId) data.governmentId = governmentId;
  if (pickupAddress) data.pickupAddress = pickupAddress;
  if (returnAddress) data.returnAddress = returnAddress;
  if (taxId) data.taxId = taxId;
  if (intendedCategories) data.intendedCategories = intendedCategories;

  // Save application in DB
  const newApplication = await Seller.create(data);

  return newApplication;
};
