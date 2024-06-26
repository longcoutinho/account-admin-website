import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ISaleOrderList } from "@/interfaces/request";
import { formatDateTime, formatVND } from "@/constants/FnCommon";
import { getAllSaleOrder } from "@/services/sale-order";
import CopyToClipboard from "react-copy-to-clipboard";
import Iconify from "@/components/Iconify";
import { enqueueSnackbar } from "notistack";
import { formatId } from "@/utils/formatNumber";
import { Visibility } from "@mui/icons-material";
import DetailTransaction from "@/components/history/DetaillHistory";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchListCard } from "@/redux/slices/card";

export default function SaleOrderStats() {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = 10;
  const [list, setList] = useState<ISaleOrderList[]>([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [page, setPage] = React.useState(1);
  const [detailTransaction, setDetailTransaction] = useState<ISaleOrderList>();
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    renderListTopUp();
    renderListCards();
  }, []);

  const renderListCards = async () => {
    try {
      dispatch(fetchListCard());
    } catch (e) {
      console.log(e);
    }
  };

  const renderListTopUp = () => {
    getAllSaleOrder()
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          console.log(res);
          setList(res.data);
          setTotalRequest(res.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCopy = (text: string) => {
    enqueueSnackbar("Copied!");
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(text ? text : "");
    }
  };

  const handleViewDetail = (row: ISaleOrderList) => {
    setDetailTransaction(row);
    setOpenModalDetail(true);
  };

  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      <Box className="flex flex-row items-center bg-white rounded-2xl p-5 box-shadow flex-wrap gap-3">
        {list?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Người thực hiện</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list
                  ?.slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                  )
                  .map((row, index) => (
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
                        {formatVND(row.price, false)}
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
                        {formatDateTime(row.createDate)}
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
        {/* <p className="text-blue-500">
          Tổng doanh thu: {formatVND(totalAmount, false)}
        </p> */}
        <p className="text-blue-500">Số luợt mua hàng: {totalRequest}</p>
      </Box>
      <Pagination
        count={Math.ceil(list?.length / pageSize)}
        page={page}
        onChange={handleChange}
        className="custom-pagination"
      />
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
