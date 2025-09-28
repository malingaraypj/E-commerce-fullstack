import type { SellerApplicationData } from "@/pages/ApplySeller.page";
import { baseUrl, postData } from "./api";

export const submitSellerApplication = (data: SellerApplicationData) => {
  const url = `${baseUrl}/seller/apply-for-seller`;
  return postData(url, data);
};
