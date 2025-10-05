import type { User } from "@/models/User";
import { baseUrl, patchData } from "./api";

export const updateUserProfile = async (profileData: Partial<User>) => {
  const url = `${baseUrl}/user/me`;
  return patchData(url, profileData);
};
