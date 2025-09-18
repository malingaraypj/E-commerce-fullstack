import getAllFactory from "./../factory/getAllFactory.js";
import getOneFactory from "../factory/getOneFactory.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

export const getAllUsers = getAllFactory(User);

export const getOneUser = getOneFactory(User, {
  populate: [{ path: "checkedProduct.Product" }],
});

export const getAllApplication = getAllFactory(Seller);
