import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ITopUpList, TopUpRequest } from "@/interfaces/request";
import { getAllTopUpRequest } from "@/services/top-up";
import { formatDateTime, formatVND } from "@/constants/FnCommon";

export default function TopUpStats() {
  const [list, setList] = useState<ITopUpList[]>([]);
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
    const params: TopUpRequest = {
      transId: transactionId != "" ? transactionId : null,
      username: username != "" ? username : null,
      status: 1,
    };
    getAllTopUpRequest(params)
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setList(res.data.listTopUp);
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
        <Box className="w-[calc(50%-2rem)]">
          <TextField
            size="small"
            type="small"
            className="w-full"
            label="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></TextField>
        </Box>
        <Box className="w-[calc(50%-2rem)]">
          <TextField
            size="small"
            type="small"
            className="w-full"
            label="Mã giao dịch"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          ></TextField>
        </Box>
        <Box className="w-full flex flex-row items-center">
          <Button
            variant="outlined"
            className="w-1/10"
            onClick={() => renderListTopUp()}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Box>
      <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
        {list?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Tên đăng nhập</TableCell>
                  <TableCell>Phương thức</TableCell>
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
                      {row.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.method === 1
                        ? "Internet Banking"
                        : row.method === 2
                        ? "MoMo"
                        : ""}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.amount}
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
          Tổng tiền: {formatVND(totalAmount, false)}
        </p>
        <p className="text-blue-500">Số luợt nạp tiền: {totalRequest}</p>
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
