import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ISaleOrderList, SaleOrderRequest } from "@/interfaces/request";
import { formatDateTime, formatVND } from "@/constants/FnCommon";
import { getAllSaleOrder } from "@/services/sale-order";

export default function SaleOrderStats() {
  const [list, setList] = useState<ISaleOrderList[]>([]);
  const [username, setUsername] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    renderListTopUp();
  }, []);

  const renderListTopUp = () => {
    const params: SaleOrderRequest = {
      transId: transactionId != "" ? transactionId : null,
      username: username != "" ? username : null,
      status: 1,
    };
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

  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
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
                      {formatVND(row.price, false)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {formatDateTime(row.createDate)}
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
      <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
        <p className="text-blue-500">
          Tổng doanh thu: {formatVND(totalAmount, false)}
        </p>
        <p className="text-blue-500">Số luợt mua hàng: {totalRequest}</p>
      </Box>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        className="custom-pagination"
      />
    </Page>
  );
}
