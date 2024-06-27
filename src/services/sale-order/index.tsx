import { Backend } from "@/constants";
import { doGetRequest } from "@/constants/FnCommon";

export const getAllSaleOrder = async (request: any): Promise<any> => {
  const url = Backend.BASE_URL + "/card/order";
  return doGetRequest(url, request);
};

export const requestGetOrderDetail = async (orderId: string): Promise<any> => {
  const url = Backend.BASE_URL + "/card/order/detail";
  const request = { orderId: orderId };
  return doGetRequest(url, request);
};
