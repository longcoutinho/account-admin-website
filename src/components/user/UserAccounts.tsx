import {DATE_TIME_FORMAT, HTTP_STATUS, PAGE_TITLE} from "@/constants";
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
import {getUserAccount} from "@/services/userService";
import {ResponseUser} from "@/interfaces/response";
import {formatDateTime, formatVND} from "@/constants/FnCommon";

export default function UserAccounts(props: any) {
    const [list, setList] = useState<ResponseUser[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        if (props.type != null) {
            console.log(props.type);
            renderListAccount();
        }
    }, [props.type]);

    const renderListAccount = () => {
        getUserAccount(props.type)
            .then((res) => {
                if (res.status == HTTP_STATUS.OK) {
                    setList(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                renderListAccount();
            } else {
                toast.error("Không thành công");
            }
        } catch {
            toast.error("Không thành công");
            //
        }
    };

    return (
        <Box>
            {list?.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên đăng nhập</TableCell>
                                <TableCell>Số dư</TableCell>
                                <TableCell>Ngày tạo tài khoản</TableCell>
                                <TableCell>Đổi mật khẩu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row, index) => (
                                <TableRow
                                    key={row.username}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {formatVND(row.balance, false)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {formatDateTime(row.createDate)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button
                                            aria-describedby={id}
                                            className="bg-transparent"
                                            onClick={handleClick}
                                        >
                                            <TaskAltOutlined />
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                        >
                                            <Typography sx={{ p: 2, textAlign: "center" }}>
                                                Xác nhận!
                                            </Typography>
                                            <Box className="flex gap-5 px-10 pb-6">
                                                <Button
                                                    className=" bg-blue-400 hover:bg-blue-600 w-20 h-8 text-white"
                                                    onClick={() => handleConfirm(row.username)}
                                                >
                                                    Ok
                                                </Button>
                                                <Button
                                                    className="bg-gray-400 hover:bg-gray-600  w-20 h-8 text-white"
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No data</p>
            )}
        </Box>
    );
}
