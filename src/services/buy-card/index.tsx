import { Backend } from "@/constants";
import { doGetRequest } from "@/constants/FnCommon";

export const requestGetListCards = async (): Promise<any> => {
  const url = Backend.BASE_URL + "/card";
  return doGetRequest(url, null);
};

export const requestGetItemCard = async (id?: string): Promise<any> => {
  const url = Backend.ITEM_SERVICE + `/card/${id}`;
  return doGetRequest(url, null);
};
