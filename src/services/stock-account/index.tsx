import {Backend} from "@/constants";
import {doFileRequest, doGetRequest, doPostRequest} from "@/constants/FnCommon";
import {Account} from "@/interfaces/request";

export const createNewAccount = async (request: Account) : Promise<any> => {
    const url = Backend.ACCOUNT_SERVICE + '/create';
    return doPostRequest(url, request);
}
