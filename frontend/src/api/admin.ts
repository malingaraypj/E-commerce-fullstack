import { baseUrl, getData, patchData } from "./api";

export const getSellerApplications = async (signal: AbortSignal) => {
  const url = `${baseUrl}/admin/sellerApplications`;
  return getData(url, signal);
};

export const validateApplication = async (
  id: string,
  validate: string
): Promise<void> => {
  const url = `${baseUrl}/admin/sellerApplications/${id}/${validate}`;
  console.log(url);
  return patchData(url, {});
};
