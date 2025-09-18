import { deleteOneFactory } from "../factory/deleteFactory.js";
import { updateOneFactory } from "../factory/updateFactory.js";
import User from "../models/User.js";

export const updateOneUser = updateOneFactory(User);
export const deleteOneUser = deleteOneFactory(User);
