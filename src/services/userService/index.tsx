import { Backend, ServiceType } from "@/constants";
import { doGetRequest, doPostRequest } from "@/constants/FnCommon";
import axios, { AxiosPromise } from "axios";

export const signUp = async (request: any): Promise<any> => {
  const url = Backend.USER_SERVICE + "/register";
  return doPostRequest(url, request);
};

export const signIn = async (request: any): Promise<any> => {
  const url = Backend.USER_SERVICE + "/login-admin";
  return doPostRequest(url, request);
};

export const getUserAccount = async (type: number, userName?: string) => {
  const url = Backend.USER_SERVICE + "";
  const request = {
    type: type,
    ...(userName !== "" && { username: userName }),
  };
  return doGetRequest(url, request);
};

export const getUserInfoByUsername = async (username: any) => {
  const url = Backend.USER_SERVICE + "/username/" + username;
  return doGetRequest(url, null);
};

export const adjustBalance = async (
  username: string,
  amount: number
): Promise<any> => {
  const params = {
    username: username,
    amount: amount,
  };
  const url = Backend.USER_SERVICE + "/adjust-balance";
  return doPostRequest(url, params);
};
