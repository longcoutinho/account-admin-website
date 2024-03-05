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
import { getAllTopUpRequest } from "@/services/top-up";
import { TaskAltOutlined } from "@mui/icons-material";

export default function Inventory() {
  const [list, setList] = useState<ITopUpList[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    renderListTopUp();
  }, []);

  const renderListTopUp = () => {
    getAllTopUpRequest()
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

  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      {list?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Phương thức</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Xác nhận</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.userId}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.method === 1
                      ? "internet banking"
                      : row.method === 2
                      ? "Momo"
                      : ""}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {dayjs(row.createDate).format("YYYY-MM-DD HH:mm:ss")}
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
                          // onClick={handleClick}
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
    </Page>
  );
}
