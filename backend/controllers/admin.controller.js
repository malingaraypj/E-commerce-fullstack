import getAllFactory from "./../factory/getAllFactory.js";
import getOneFactory from "../factory/getOneFactory.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";
import {
  approveSellerApplicationService,
  rejectSellerApplicationService,
} from "../services/admin.services.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllUsers = getAllFactory(User);

export const getOneUser = getOneFactory(User, {
  populate: [{ path: "checkedProduct.Product" }],
});

// get applications
export const getAllApplication = getAllFactory(Seller);
export const getOneApplication = getOneFactory(Seller);
export const getApprovedSellerApplications = getAllFactory(Seller, {
  filter: { applicationStatus: "approved" },
});
export const getRejectedSellerApplications = getAllFactory(Seller, {
  filter: { applicationStatus: "rejected" },
});
export const getPendingSellerApplications = getAllFactory(Seller, {
  filter: { applicationStatus: "pending" },
});

export const approveSellerApplication = catchAsync(async (req, res) => {
  const sellerApplication = await approveSellerApplicationService(
    req.params.id
  );
  res.status(200).json({
    message: "Seller application approved",
    sellerApplication,
  });
});

export const rejectSellerApplication = catchAsync(async (req, res) => {
  const sellerApplication = await rejectSellerApplicationService(req.params.id);
  res.status(200).json({
    message: "Seller application rejected",
    sellerApplication,
  });
});
