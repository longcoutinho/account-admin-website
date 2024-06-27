import { Backend } from "@/constants";
import { doGetRequest, doPostRequest, getUserInfo } from "@/constants/FnCommon";
import { TopUpRequest } from "@/interfaces/request";

export const getAllSaleOrder = async (request: any): Promise<any> => {
  const url = Backend.BASE_URL + "/card/order";
  return doGetRequest(url, request);
};
