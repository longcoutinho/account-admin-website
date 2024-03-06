import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
    Box, TextField,
} from "@mui/material";
import {useRouter} from "next/router";
import {getUserAccount, getUserInfoByUsername} from "@/services/userService";
import LabelTitle from "@/components/label/LabelTitle";
import {formatDateTime} from "@/constants/FnCommon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export default function EditUser() {
    const [userName, setUsername] = useState('');
    const [balance, setBalance] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        console.log(router.query.username);
        if (router.query.username != null) {
            getUserInfoByUsername(router.query.username)
                .then((res) => {
                    if (res.status == HTTP_STATUS.OK) {
                        setUsername(res.data.username);
                        setBalance(res.data.balance);
                        setCreateDate(res.data.createDate);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [router.query]);

    return (
        <Page title={PAGE_TITLE.HOME} menuIndex={1}>
            <Box>
                <LabelTitle label="Thong tin tai khoan" />
                <Box className="flex flex-col gap-5">
                    <Box>
                        <p className="text-blue-500">Ten dang nhap: {userName}</p>
                        <p className="text-blue-500">Thoi gian tao tai khoan: {formatDateTime(createDate)}</p>
                    </Box>
                    <Box className="flex flex-col gap-5">
                        <p className="text-blue-500">Reset mat khau</p>
                        <Box className="flex flex-row items-center">
                            <TextField
                                id="outlined-select-currency"
                                label="Mat khau moi"
                                className="w-1/5"
                                // placeholder="chọn sản phẩm"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <FontAwesomeIcon id="cart-shopping-iconn" className="text-green-500 text-3xl" icon={faCheckCircle}></FontAwesomeIcon>
                        </Box>
                    </Box>
                    <Box>
                        <p className="text-blue-500">Dieu chinh tai khoan</p>
                        <Box>
                            <TextField
                                // id="outlined-select-currency"
                                label="So du"
                                className="w-1/5"
                                value={balance}
                                // placeholder="chọn sản phẩm"
                                onChange={(e) => setBalance(e.target.value)}
                            />
                            <FontAwesomeIcon id="cart-shopping-iconn" className="text-green-500 text-3xl" icon={faCheckCircle}></FontAwesomeIcon>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    );
}
