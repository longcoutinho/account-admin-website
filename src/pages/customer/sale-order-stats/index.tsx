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
    TableRow, TextField,
    Typography,
} from "@mui/material";
import {ISaleOrderList, ITopUpList, SaleOrderRequest, TopUpRequest} from "@/interfaces/request";
import {confirmTopUpRequest, getAllTopUpRequest, getReportTopUp} from "@/services/top-up";
import { TaskAltOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import {formatDateTime, formatVND} from "@/constants/FnCommon";
import {getAllSaleOrder} from "@/services/sale-order";

export default function SaleOrderStats() {
    const [list, setList] = useState<ISaleOrderList[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [username, setUsername] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalRequest, setTotalRequest] = useState(0);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        renderListTopUp();
    }, []);

    const renderListTopUp = () => {
        const params: SaleOrderRequest = {
            transId: transactionId != "" ? transactionId : null,
            username: username != "" ? username : null,
            status: 1
        }
        getAllSaleOrder(params)
            .then((res) => {
                if (res.status == HTTP_STATUS.OK) {
                    setList(res.data.listSaleOrder);
                    setTotalRequest(res.data.totalRequest);
                    setTotalAmount(res.data.totalAmount);
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

    return (
        <Page title={PAGE_TITLE.HOME} menuIndex={1}>
            {/*<Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">*/}
            {/*    <Box className="w-[calc(50%-2rem)]">*/}
            {/*        <TextField size="small" type="small" className="w-full" label="Tên đăng nhập" value={username}*/}
            {/*                   onChange={(e) => setUsername(e.target.value)}*/}
            {/*        ></TextField>*/}
            {/*    </Box>*/}
            {/*    <Box className="w-[calc(50%-2rem)]">*/}
            {/*        <TextField size="small" type="small" className="w-full" label="Mã giao dịch" value={transactionId}*/}
            {/*                   onChange={(e) => setTransactionId(e.target.value)}*/}
            {/*        ></TextField>*/}
            {/*    </Box>*/}
            {/*    <Box className="w-full flex flex-row items-center">*/}
            {/*        <Button variant="outlined" className="w-1/10" onClick={() => renderListTopUp()}>Tìm kiếm</Button>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
            <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
                {list?.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã giao dịch</TableCell>
                                    <TableCell>Tên đăng nhập</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Số tiền</TableCell>
                                    <TableCell>Thời gian</TableCell>
                                    {/*<TableCell>Xác nhận</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.userId}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.itemName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {formatVND(row.price)}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {formatDateTime(row.createDate)}
                                        </TableCell>
                                        {/*<TableCell component="th" scope="row">*/}
                                        {/*    <Button*/}
                                        {/*        aria-describedby={id}*/}
                                        {/*        className="bg-transparent"*/}
                                        {/*        onClick={handleClick}*/}
                                        {/*    >*/}
                                        {/*        <TaskAltOutlined />*/}
                                        {/*    </Button>*/}
                                        {/*    <Popover*/}
                                        {/*        id={id}*/}
                                        {/*        open={open}*/}
                                        {/*        anchorEl={anchorEl}*/}
                                        {/*        onClose={handleClose}*/}
                                        {/*        anchorOrigin={{*/}
                                        {/*            vertical: "bottom",*/}
                                        {/*            horizontal: "left",*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <Typography sx={{ p: 2, textAlign: "center" }}>*/}
                                        {/*            Xác nhận!*/}
                                        {/*        </Typography>*/}
                                        {/*        <Box className="flex gap-5 px-10 pb-6">*/}
                                        {/*            <Button*/}
                                        {/*                className=" bg-blue-400 hover:bg-blue-600 w-20 h-8 text-white"*/}
                                        {/*                onClick={() => handleConfirm(row.id)}*/}
                                        {/*            >*/}
                                        {/*                Ok*/}
                                        {/*            </Button>*/}
                                        {/*            <Button*/}
                                        {/*                className="bg-gray-400 hover:bg-gray-600  w-20 h-8 text-white"*/}
                                        {/*                onClick={handleClose}*/}
                                        {/*            >*/}
                                        {/*                Cancel*/}
                                        {/*            </Button>*/}
                                        {/*        </Box>*/}
                                        {/*    </Popover>*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No data</p>
                )}
            </Box>
            <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
                <p className="text-blue-500">Tổng doanh thu: {formatVND(totalAmount, false)}</p>
                <p className="text-blue-500">Số luợt mua hàng: {totalRequest}</p>
            </Box>
        </Page>
    );
}
