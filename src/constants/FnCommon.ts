import axios from "axios";
import { ItemToCart } from "@/interfaces/response";
import { NextRouter } from "next/router";
import { User } from "@/interfaces";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/index";

const insertStringAtIndex = (ind: number, str1: string, str2: string) => {
  let stringResult = "";
  stringResult += str1.substring(0, ind);
  stringResult += str2;
  stringResult += str1.substring(ind, str1.length + 1);
  return stringResult;
};
export const formatVND = (num: number, ignore: boolean) => {
  if (num === null) {
    return "0đ";
  }
  let str = num?.toString();
  for (let i = str?.length - 3; i > 0; i -= 3) {
    str = insertStringAtIndex(i, str, ".");
  }
  if (!ignore) str += "đ";
  return str;
};

export const doPostRequest = (url: string, data: any): any => {
  return axios({
    method: "post",
    url: url,
    data: data,
    headers: {
      Authorization:
        "Bearer " + getUserInfo()?.accessToken !== null
          ? getUserInfo()?.accessToken
          : "",
    },
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status == "401") {
        deleteUserInfo();
        location.href = "/login";
        // const router = useRouter();
        // redirectUrl(router, '/login', null);
      }
      return err;
    }
  );
};

export const doFileRequest = (url: string, data: any): any => {
  return axios({
    method: "post",
    url: url,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer " + getUserInfo()?.accessToken !== null
          ? getUserInfo()?.accessToken
          : "",
    },
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status == "401") {
        deleteUserInfo();
        location.href = "/login";
        // const router = useRouter();
        // redirectUrl(router, '/login', null);
      }
      return err;
    }
  );
};

export const doGetRequest = (url: string, params: any): any => {
  return axios({
    method: "get",
    url: url,
    params: params,
    headers: {
      Authorization:
        "Bearer " + getUserInfo()?.accessToken !== null
          ? getUserInfo()?.accessToken
          : "",
    },
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status == "401") {
        deleteUserInfo();
        location.href = "/login";
        // console.log('kk');
        // redirectUrl(router, '/login', null);
      }
      return err;
    }
  );
};

const getCartFromStorage = (): ItemToCart[] => {
  let JSONcart: any = window.localStorage.getItem("cart");
  if (JSONcart == null) return [];
  let cart: ItemToCart[] = JSON.parse(JSONcart);
  return cart;
};

export const getNumberItemInCart = (): number => {
  return getCartFromStorage().length;
};

export const addItemToCart = (newItem: ItemToCart): ItemToCart[] => {
  let cart: ItemToCart[] = getCartFromStorage();
  let haveInCart = false;
  let len = cart.length;
  for (let i = 0; i < len; i++) {
    if (cart[i].id === newItem.id) haveInCart = true;
    cart[i].amount += newItem.amount;
    cart[i].totalPrice += newItem.totalPrice;
  }
  if (!haveInCart) {
    cart[len] = newItem;
  }
  return cart;
};

export const buyItem = (newItem: ItemToCart): ItemToCart[] => {
  let cart: ItemToCart[] = [];
  cart[0] = newItem;
  return cart;
};

export const deleteItemByIndex = (index: number): ItemToCart[] => {
  let cart: ItemToCart[] = getCartFromStorage();
  let len = cart.length;
  let left = cart.slice(0, index),
    right = cart.slice(index + 1, len);
  return left.concat(right);
};

export const redirectUrl = (router: NextRouter, url: string, params?: any) => {
  router.push({
    pathname: url,
    query: params,
  });
};

export const isNullOrEmpty = (str: string): boolean => {
  return str == undefined || str == null || str.length == 0;
};

export const isValidLength = (
  str: string,
  num_start: number,
  num_finish: number
): boolean => {
  return num_start <= str.length && str.length <= num_finish;
};

export const getUserInfo = (): User | null => {
  if (typeof window !== "undefined") {
    const userInfoStr = sessionStorage.getItem("user-info");
    if (userInfoStr == null) return null;
    return JSON.parse(userInfoStr);
  }
  return null;
};

export const deleteUserInfo = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    sessionStorage.removeItem("user-info");
  }
};

export const saveUserToSessionStorage = (userInfo: User) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    sessionStorage.setItem("user-info", JSON.stringify(userInfo));
  }
};

export const saveDisplayMenuToSessionStorage = (displayArr: number[]) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    sessionStorage.setItem("display-menu", JSON.stringify(displayArr));
  }
};

export const getDisplayMenu = (): number[] => {
  if (typeof window !== "undefined") {
    const displayArr = sessionStorage.getItem("display-menu");
    if (displayArr == null) return [];
    return JSON.parse(displayArr);
  }
  return [];
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format(DATE_TIME_FORMAT);
};
