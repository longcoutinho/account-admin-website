import { Backend } from "@/constants";
import { doGetRequest, doPostRequest, getUserInfo } from "@/constants/FnCommon";
import { TopUpRequest } from "@/interfaces/request";

export const getAllSaleOrder = async (
    params: TopUpRequest
): Promise<any> => {
    const url = Backend.SALE_ORDER_SERVICE + "/list";
    return doGetRequest(url, params);
};

