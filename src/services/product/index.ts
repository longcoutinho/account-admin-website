import { Backend } from "@/constants";
import { doGetRequest, doPostRequest } from "@/constants/FnCommon";
import { IProductReq } from "@/interfaces/request/product";

export const getListCategory = async (): Promise<any> => {
  const url = Backend.BASE_URL + "/product-type";

  return doGetRequest(url, null);
};

export const getListProduct = async (): Promise<any> => {
  const url = Backend.BASE_URL + "/product";

  return doGetRequest(url, null);
};

export const createCategory = async (name: string): Promise<any> => {
  const url = Backend.BASE_URL + "/product-type";
  const request = {
    name: name,
  };
  return doPostRequest(url, request);
};

export const requestCreateProduct = async (body: IProductReq): Promise<any> => {
  const url = Backend.BASE_URL + "/product";
  const request = body;
  return doPostRequest(url, request);
};

export const requestCreateImageProduct = async (
  productId: string | number,
  imagesList: FormData
): Promise<any> => {
  const url = Backend.BASE_URL + `/product/images/${productId} `;
  const request = imagesList;
  return doPostRequest(url, request);
};

export const requestGetDetailProduct = async (
  productId: string | number
): Promise<any> => {
  const url = Backend.BASE_URL + `/product/${productId} `;

  return doGetRequest(url, null);
};

export const requestGetListPaymentMethod = async (): Promise<any> => {
  const url = Backend.BASE_URL + "/payment/method";
  return doGetRequest(url, null);
};
