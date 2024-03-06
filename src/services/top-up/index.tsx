import { Backend } from "@/constants";
import { doGetRequest, doPostRequest, getUserInfo } from "@/constants/FnCommon";
import { TopUpRequest } from "@/interfaces/request";

export const getAllTopUpRequest = async (
  params?: TopUpRequest
): Promise<any> => {
  const url = Backend.TOPUP_SERVICE + "/list";
  return doGetRequest(url, params);
};

export const confirmTopUpRequest = async (id: string): Promise<any> => {
  const url = Backend.TOPUP_SERVICE + "/confirm";
  const request = {
    id: id,
  };
  return doPostRequest(url, request);
};

export const cancelTopUpRequest = async (id: string): Promise<any> => {
  const url = Backend.TOPUP_SERVICE + "/cancel";
  const request = {
    id: id,
  };
  return doPostRequest(url, request);
};

export const getReportTopUp = async (): Promise<any> => {
  const url = Backend.REPORT_SERVICE + "/top-up";
  return doGetRequest(url, null);
};
