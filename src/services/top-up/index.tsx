import {Backend} from "@/constants";
import {doGetRequest, doPostRequest, getUserInfo} from "@/constants/FnCommon";

export const getAllTopUpRequest = async () : Promise<any> => {
    const url = Backend.TOPUP_SERVICE + '/list';
    // const params = {
    //     typeId: searchTypeId,
    //     name: searchTypeName
    // }
    return doGetRequest(url, null);
}

export const confirmTopUpRequest = async (id: string) : Promise<any> => {
    const url = Backend.TOPUP_SERVICE + '/request';
    const request = {
        id: id
    }
    return doPostRequest(url, request);
}