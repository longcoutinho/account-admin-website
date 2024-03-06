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
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ITopUpList, TopUpRequest } from "@/interfaces/request";
import {
  cancelTopUpRequest,
  confirmTopUpRequest,
  getAllTopUpRequest,
} from "@/services/top-up";
import { CancelOutlined, TaskAltOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { formatVND } from "@/constants/FnCommon";

export default function Inventory() {
  const [list, setList] = useState<ITopUpList>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElCancel, setAnchorElCancel] =
    React.useState<HTMLButtonElement | null>(null);
  const [username, setUsername] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [idRow, setIdRow] = useState("");

  const open = Boolean(anchorEl);
  const openCancel = Boolean(anchorElCancel);
  const id = open ? "simple-popover" : undefined;
  const idCancel = openCancel ? "cancel-popover" : undefined;

  useEffect(() => {
    renderListTopUp();
  }, []);

  const renderListTopUp = () => {
    const params: TopUpRequest = {
      transId: transactionId != "" ? transactionId : null,
      username: username != "" ? username : null,
      status: 0,
    };
    getAllTopUpRequest(params)
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setIdRow(id);
  };
  const handleClickCancel = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorElCancel(event.currentTarget);
    setIdRow(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElCancel(null);
  };

  const handleConfirm = async (id: string) => {
    try {
      const res = await confirmTopUpRequest(id);
      if (res.status == HTTP_STATUS.OK) {
        toast.success(" Thành công");
        handleClose();
        renderListTopUp();
      } else {
        toast.error("Không thành công");
      }
    } catch {
      toast.error("Không thành công");
      //
    }
  };
  const handleConfirmCancel = async (id: string) => {
    try {
      const res = await cancelTopUpRequest(id);
      if (res.status == HTTP_STATUS.OK) {
        toast.success(" Thành công");
        handleClose();
        renderListTopUp();
      } else {
        toast.error("Không thành công");
      }
    } catch {
      toast.error("Không thành công");
      //
    }
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
        {list?.totalRequest && list?.totalRequest > 0 ? (
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
                  <TableCell>Xác nhận</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list?.listTopUp.map((row, index) => (
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
                      {formatVND(row.amount, false)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(row.createDate).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        aria-describedby={id}
                        className="bg-transparent"
                        onClick={(e) => handleClick(e, row.id)}
                      >
                        <TaskAltOutlined />
                      </Button>
                      <Button
                        aria-describedby={idCancel}
                        className="bg-transparent ml-4"
                        onClick={(e) => handleClickCancel(e, row.id)}
                      >
                        <CancelOutlined />
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
          Xác nhận yêu cầu!
        </Typography>
        <Box className="flex gap-5 px-10 pb-6">
          <Button
            className=" hover:bg-blue-400 bg-blue-600 w-20 h-8 text-white"
            onClick={() => handleConfirm(idRow)}
          >
            Ok
          </Button>
          <Button
            className="hover:bg-gray-400 bg-gray-600  w-20 h-8 text-white"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Popover>
      <Popover
        id={idCancel}
        open={openCancel}
        anchorEl={anchorElCancel}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, textAlign: "center" }}>Hủy yêu cầu</Typography>
        <Box className="flex gap-5 px-10 pb-6">
          <Button
            className=" bg-blue-400 hover:bg-blue-600 w-20 h-8 text-white"
            onClick={() => handleConfirmCancel(idRow)}
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
    </Page>
  );
}
