import { Backend } from "@/constants";
import { doGetRequest, doPostRequest } from "@/constants/FnCommon";

export const getAllSaleOrder = async (request: any): Promise<any> => {
  const url = Backend.BASE_URL + "/card/order";
  return doGetRequest(url, request);
};

export const getAllProductOrder = async (request: any): Promise<any> => {
  const url = Backend.BASE_URL + "/product/order";
  return doGetRequest(url, request);
};

export const requestGetOrderDetail = async (orderId: string): Promise<any> => {
  const url = Backend.BASE_URL + "/card/order/detail";
  const request = { orderId: orderId };
  return doGetRequest(url, request);
};

export const requestEditOrderStatus = async (
  id: string,
  status: number
): Promise<any> => {
  const url =
    Backend.BASE_URL + `/product/order/${id}/modify-status?status=${status}`;
  return doPostRequest(url, null);
};
