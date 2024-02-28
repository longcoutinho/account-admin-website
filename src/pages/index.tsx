import {useEffect} from "react";
import {getUserInfo, redirectUrl} from "@/constants/FnCommon";
import {useRouter} from "next/router";
import {PageURL} from "@/constants";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        if (getUserInfo() == null) {
            redirectUrl(router, PageURL.LOGIN);
        }
        else {
            redirectUrl(router, PageURL.HOME);
        }
    }, [])
}
