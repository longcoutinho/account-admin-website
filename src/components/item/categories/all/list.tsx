import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon";
import React from "react";
import { ItemType } from "@/interfaces/request";

interface IProps {
  listItem: ItemType[];
}
export default function ListItemCate({ listItem }: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>Created date</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {listItem.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.itemTypeId}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* <TableCell>{row.createDate}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
