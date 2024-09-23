import { HTTP_STATUS, PAGE_TITLE, STATUS_ORDER } from "@/constants";
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
import { ISaleOrderDetail } from "@/interfaces/request";
import { formatVND } from "@/constants/FnCommon";
import CopyToClipboard from "react-copy-to-clipboard";
import Iconify from "@/components/Iconify";
import { formatId } from "@/utils/formatNumber";
import { Search, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchListTransaction } from "@/redux/slices/transaction";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import ExportToCSVButton from "@/components/ExportToCsv";
import { fetchListProductOders } from "@/redux/slices/productOrders";
import { requestEditOrderStatus } from "@/services/sale-order";
import { toast } from "react-toastify";
import { isUndefined } from "lodash";
import DetailOrder from "@/components/history/DetailOrder";

export default function SaleOrderStats() {
  const STATUS_TRANSACTION = [
    { label: "Đang xác nhận", value: STATUS_ORDER?.PENDING, color: "warning" },
    {
      label: "Đã tiếp nhận",
      value: STATUS_ORDER?.RECEIVED,
      color: "secondary",
    },
    { label: "Đang chuẩn bị", value: STATUS_ORDER?.PROCESSING, color: "info" },
    { label: "Vận chuyển", value: STATUS_ORDER?.TRANSPORT, color: "primary" },
    { label: "Thành công", value: STATUS_ORDER?.SUCCESS, color: "success" },
    { label: "Thất bại", value: STATUS_ORDER?.FAILED, color: "error" },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = 10;
  const [page, setPage] = React.useState(1);
  const [detailTransaction, setDetailTransaction] =
    useState<ISaleOrderDetail>();
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const { listProductOrders } = useSelector(
    (state: RootState) => state.productOrders
  );
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState(undefined);
  const [transId, setTransId] = useState("");
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    renderListTransaction();
  }, [page]);

  const renderListTransaction = async () => {
    try {
      dispatch(
        fetchListProductOders({
          page: page - 1,
          pageSize: pageSize,
          ...(userName !== "" && { username: userName }),
          ...(!isUndefined(status) && { status: status }),
          ...(transId !== "" && { transId: transId }),
          ...(fromDate !== null && {
            fromDate: fromDate?.format("DD-MM-YYYY"),
          }),
          ...(toDate !== null && {
            toDate: toDate?.format("DD-MM-YYYY"),
          }),
        })
      );
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
  };

  const handleSearch = () => {
    dispatch(
      fetchListTransaction({
        page: 0,
        pageSize: pageSize,
        ...(userName !== "" && { username: userName }),
        ...(!isUndefined(status) && { status: status }),
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
    console.log(event.target.value);
    if (event.target.value === "ALL") {
      setStatus(undefined);
    } else {
      setStatus(event.target.value);
    }
  };

  const handleEditStatus = async (event: any, id: string) => {
    try {
      const res = await requestEditOrderStatus(id, event.target.value);
      if (res?.status === HTTP_STATUS.OK) {
        toast.success("Thành công");
        renderListTransaction();
      } else {
        toast.error("Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleReset = () => {
    setUserName("");
    setStatus(undefined);
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
            value={isUndefined(status) ? "All" : status}
          >
            {STATUS_TRANSACTION &&
              STATUS_TRANSACTION?.map((item) => (
                <MenuItem value={item?.value} key={item?.value}>
                  {item?.label}
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
              jsonData={JSON.stringify(listProductOrders?.listData)}
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
        {listProductOrders &&
        listProductOrders?.count &&
        listProductOrders?.count > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Người thực hiện</TableCell>
                  <TableCell>IP</TableCell>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProductOrders?.listData?.map((row, index) => (
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
                      {row?.productName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-select-currency"
                        select
                        className="!border-none w-full rounded-md"
                        placeholder="chọn danh mục"
                        onChange={(e) => handleEditStatus(e, row?.id)}
                        value={row.status}
                      >
                        {STATUS_TRANSACTION &&
                          STATUS_TRANSACTION?.map((item) => (
                            <MenuItem value={item?.value} key={item?.value}>
                              <Chip
                                label={item?.label}
                                color={item?.color as any}
                                variant="outlined"
                              />
                            </MenuItem>
                          ))}
                      </TextField>
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
        {listProductOrders?.totalRevenue && (
          <p className="text-blue-500">
            Tổng doanh thu: {formatVND(listProductOrders?.totalRevenue, false)}
          </p>
        )}
        <p className="text-blue-500">
          Số lượt mua hàng: {listProductOrders?.count}
        </p>
      </Box>
      {listProductOrders?.count && listProductOrders?.count > 0 && (
        <Pagination
          count={Math.ceil(listProductOrders?.count / pageSize)}
          page={page}
          onChange={handleChange}
          className="custom-pagination"
        />
      )}
      {openModalDetail && (
        <DetailOrder
          open={openModalDetail}
          onClose={() => setOpenModalDetail(false)}
          transaction={detailTransaction}
        />
      )}
    </Page>
  );
}
