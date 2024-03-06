import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAccountByItemId } from "@/services/stock-account";
import dayjs from "dayjs";
import { IAccountInventory } from "@/interfaces/request";
import SelectAllItem from "@/components/item/all/SelectAllItem";

export default function Inventory() {
  const [listAccount, setListAccount] = useState<IAccountInventory[]>([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    renderListAccount(null);
  }, []);

  const renderListAccount = (id: number | null) => {
    getAccountByItemId(id)
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setListAccount(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      <SelectAllItem changeItem={renderListAccount} />
      {listAccount?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Mật khẩu</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAccount.map((row: IAccountInventory) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.itemId}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.password}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.status === 0 ? "Trong kho" : "Đã sử dụng"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(row.createDate).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            className="custom-pagination"
          />
        </>
      ) : (
        <p>No data</p>
      )}
    </Page>
  );
}
