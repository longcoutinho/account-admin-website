import {Backend, ServiceType} from "@/constants";
import {doGetRequest, doPostRequest} from "@/constants/FnCommon";
import axios, {AxiosPromise} from "axios";

export const signUp = async (request: any) : Promise<any> => {
    const url = Backend.USER_SERVICE + '/register';
    return doPostRequest(url, request);
}

export const signIn = async (request: any) : Promise<any> => {
    const url = Backend.USER_SERVICE + '/login-admin';
    return doPostRequest(url, request);
}

export const getUserAccount = async (type: number) => {
    const url = Backend.USER_SERVICE + '';
    const request = {
        type: type
    };
    return doGetRequest(url, request);
};

export const getUserInfoByUsername = async (username: any) => {
    const url = Backend.USER_SERVICE + '/username/' + username;
    return doGetRequest(url, null);
};
