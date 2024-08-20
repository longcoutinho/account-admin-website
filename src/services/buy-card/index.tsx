import { Backend } from "@/constants";
import { doGetRequest, doPostRequest } from "@/constants/FnCommon";

export const requestGetListCards = async (): Promise<any> => {
  const url = Backend.BASE_URL + "/card";
  return doGetRequest(url, null);
};

export const requestGetItemCard = async (id?: string): Promise<any> => {
  const url = Backend.ITEM_SERVICE + `/card/${id}`;
  return doGetRequest(url, null);
};

export const requestEditCard = async ({
  id,
  name,
  imageUrl,
}: {
  id?: string;
  name?: string;
  imageUrl?: string;
}): Promise<any> => {
  const url = Backend.BASE_URL + `/card/${id}`;
  const request = {
    name: name,
    imageUrl: imageUrl,
  };
  return doPostRequest(url, request);
};

export const requestDelCard = async (id?: string): Promise<any> => {
  const url = Backend.BASE_URL + `/card/remove/${id}`;
  return doPostRequest(url, null);
};

export const requestCreateCard = async ({
  name,
  imageUrl,
}: {
  name?: string;
  imageUrl?: string;
}): Promise<any> => {
  const url = Backend.BASE_URL + `/card`;
  const request = {
    name: name,
    imageUrl: imageUrl,
  };
  return doPostRequest(url, request);
};

export const requestAddPriceFee = async ({
  currency,
  cardItemId,
  price,
}: {
  currency?: string;
  cardItemId?: number;
  price?: number;
}): Promise<any> => {
  const url = Backend.BASE_URL + `/card/item/fee`;
  const request = {
    currency: currency,
    cardItemId: cardItemId,
    price: price,
  };
  return doPostRequest(url, request);
};
