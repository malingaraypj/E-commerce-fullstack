import Seller from "../models/Seller.js";

export const approveSellerApplicationService = async (id) => {
  if (!id) {
    throw new Error("Seller application id is required");
  }

  const sellerApplication = await Seller.findById(id);
  if (!sellerApplication) {
    throw new Error("Seller application not found");
  }
  sellerApplication.applicationStatus = "approved";
  await sellerApplication.save();
  return sellerApplication;
};

export const rejectSellerApplicationService = async (id) => {
  if (!id) {
    throw new Error("Seller application id is required");
  }
  const sellerApplication = await Seller.findById(id);
  if (!sellerApplication) {
    throw new Error("Seller application not found");
  }
  sellerApplication.applicationStatus = "rejected";
  await sellerApplication.save();
  return sellerApplication;
};
