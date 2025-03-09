import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Input,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { ISaleOrderDetail, ISaleOrderList } from "@/interfaces/request";
import { formatVND } from "@/constants/FnCommon";
import CopyToClipboard from "react-copy-to-clipboard";
import Iconify from "@/components/Iconify";
import { formatId } from "@/utils/formatNumber";
import { Search, Visibility } from "@mui/icons-material";
import DetailTransaction from "@/components/history/DetaillHistory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchListCard } from "@/redux/slices/card";
import {
  fetchDetailTransaction,
  fetchListTransaction,
} from "@/redux/slices/transaction";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import ExportToCSVButton from "@/components/ExportToCsv";
import { getAllSaleOrder } from "@/services/sale-order";

const STATUS_TRANSACTION = ["ALL", "SUCCESS", "FAILED"];
export default function SaleOrderStats() {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = 10;
  const [page, setPage] = React.useState(1);
  const [detailTransaction, setDetailTransaction] =
    useState<ISaleOrderDetail>();
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const { listTransaction } = useSelector(
    (state: RootState) => state.transaction
  );
  const [userName, setUserName] = useState("");
  const [listTransactionFull, setListTransactionFull] =
    useState<ISaleOrderList[]>();
  const [status, setStatus] = useState("");
  const [transId, setTransId] = useState("");
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    renderListCards();
  }, []);

  useEffect(() => {
    renderListTransaction();
  }, [page]);

  const renderListCards = async () => {
    try {
      dispatch(fetchListCard());
    } catch (e) {
      console.log(e);
    }
  };
  const renderListTransaction = async () => {
    try {
      dispatch(
        fetchListTransaction({
          page: page - 1,
          pageSize: pageSize,
          ...(userName !== "" && { username: userName }),
          ...(status !== "" && { status: status }),
          ...(transId !== "" && { transId: transId }),
          ...(fromDate !== null && {
            fromDate: fromDate?.format("DD-MM-YYYY"),
          }),
          ...(toDate !== null && {
            toDate: toDate?.format("DD-MM-YYYY"),
          }),
        })
      );
      const res = await getAllSaleOrder({
        page: 0,
        pageSize: 99999,
      });
      if (res?.status === 200) {
        setListTransactionFull(res?.data?.listData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCopy = (text: string) => {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(text ? text : "");
    }
  };

  const handleViewDetail = (row: ISaleOrderDetail) => {
    setDetailTransaction(row);
    setOpenModalDetail(true);
    dispatch(fetchDetailTransaction(row?.id));
  };

  const handleSearch = () => {
    dispatch(
      fetchListTransaction({
        page: 0,
        pageSize: pageSize,
        ...(userName !== "" && { username: userName }),
        ...(status !== "" && { status: status }),
        ...(transId !== "" && { transId: transId }),
        ...(fromDate !== null && {
          fromDate: fromDate?.format("DD-MM-YYYY"),
        }),
        ...(toDate !== null && {
          toDate: toDate?.format("DD-MM-YYYY"),
        }),
      })
    );
  };

  const handleChangeStatus = (event: any) => {
    if (event.target.value === "ALL") {
      setStatus("");
    } else {
      setStatus(event.target.value as string);
    }
  };
  const handleReset = () => {
    setUserName("");
    setStatus("");
    setTransId("");
    setFromDate(null);
    setToDate(null);
  };
  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
        <div className="w-full flex justify-end gap-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              className="w-1/3"
            />
            <DatePicker
              label="To date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              className="w-1/3"
            />
          </LocalizationProvider>
          <TextField
            id="outlined-select-currency"
            select
            label="Trạng thái"
            className="mb-4 border border-gray-500 w-1/3 rounded-md"
            placeholder="chọn danh mục"
            onChange={handleChangeStatus}
            value={status === "" ? "All" : status}
          >
            {STATUS_TRANSACTION &&
              STATUS_TRANSACTION?.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="w-full flex justify-end gap-2">
          <Input
            placeholder="Tìm kiếm người thực hiện"
            type="text"
            className=" border border-gray-500 px-4 w-1/3 rounded-md cursor-pointer h-[53px]"
            onChange={(e) => setUserName(e.target.value)}
            color="primary"
            endAdornment={<Search />}
          />
          <Input
            placeholder="Tìm kiếm mã giao dịch"
            type="text"
            className=" border border-gray-500 px-4 w-1/3 rounded-md cursor-pointer h-[53px]"
            onChange={(e) => setTransId(e.target.value)}
            color="primary"
            endAdornment={<Search />}
          />
          <div className="w-1/3 flex gap-2">
            <p
              className=" cursor-pointer text-blue-500 py-1 px-3 border border-blue-400 w-1/3  h-[52px] text-center leading-[46px]"
              onClick={handleSearch}
            >
              Tìm kiếm
            </p>
            <ExportToCSVButton
              fileName="transaction"
              jsonData={JSON.stringify(listTransactionFull)}
              classname="w-1/3"
            />
            <p
              className=" cursor-pointer text-red-500 py-1 px-3 border border-red-400 w-1/3  h-[52px] text-center leading-[46px]"
              onClick={handleReset}
            >
              Reset
            </p>
          </div>
        </div>
        {listTransaction &&
        listTransaction?.count &&
        listTransaction?.count > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Người thực hiện</TableCell>
                  <TableCell>IP</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listTransaction?.listData?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <CopyToClipboard
                        text={row.id}
                        onCopy={() => onCopy(row?.id)}
                      >
                        <Tooltip title="Copy">
                          <IconButton>
                            <Iconify
                              icon={"eva:copy-fill"}
                              width={20}
                              height={20}
                            />
                          </IconButton>
                        </Tooltip>
                      </CopyToClipboard>
                      {formatId(row.id)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.createUser}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.ip}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.price?.toLocaleString("vi-VN") +
                        " " +
                        row?.currency}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.status === "SUCCESS" ? (
                        <Chip
                          label="Thành công"
                          color="success"
                          variant="outlined"
                        />
                      ) : row.status === "FAILED" ? (
                        <Chip
                          label="Thất bại"
                          color="error"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          label="Đang tiến hành"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.createDate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        className="bg-transparent mr-4"
                        onClick={() => handleViewDetail(row)}
                      >
                        <Visibility />
                      </Button>
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
        {listTransaction?.totalRevenue && (
          <p className="text-blue-500">
            Tổng doanh thu: {formatVND(listTransaction?.totalRevenue, false)}
          </p>
        )}
        <p className="text-blue-500">
          Số lượt mua hàng: {listTransaction?.count}
        </p>
      </Box>
      {listTransaction?.count && listTransaction?.count > 0 && (
        <Pagination
          count={Math.ceil(listTransaction?.count / pageSize)}
          page={page}
          onChange={handleChange}
          className="custom-pagination"
        />
      )}
      {openModalDetail && (
        <DetailTransaction
          open={openModalDetail}
          onClose={() => setOpenModalDetail(false)}
          transaction={detailTransaction}
        />
      )}
    </Page>
  );
}
