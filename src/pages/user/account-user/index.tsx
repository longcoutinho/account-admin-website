import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ITopUpList } from "@/interfaces/request";
import { confirmTopUpRequest, getAllTopUpRequest } from "@/services/top-up";
import { TaskAltOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import UserAccounts from "@/components/user/UserAccounts";

export default function AccountUser() {
    const [list, setList] = useState<ITopUpList[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConfirm = async (id: string) => {
        try {
            const res = await confirmTopUpRequest(id);
            if (res.status == HTTP_STATUS.OK) {
                toast.success(" Thành công");
                handleClose();
            } else {
                toast.error("Không thành công");
            }
        } catch {
            toast.error("Không thành công");
            //
        }
    };

    return (
        <Page title={PAGE_TITLE.HOME} menuIndex={1}>
            <UserAccounts type={1}></UserAccounts>
        </Page>
    );
}
