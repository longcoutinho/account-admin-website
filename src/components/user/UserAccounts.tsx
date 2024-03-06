import { Frontend, HTTP_STATUS } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { adjustBalance, getUserAccount } from "@/services/userService";
import { ResponseUser } from "@/interfaces/response";
import { formatDateTime, formatVND, redirectUrl } from "@/constants/FnCommon";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserAccounts(props: any) {
  const [list, setList] = useState<ResponseUser[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openPW, setOpenPW] = React.useState(false);
  const [item, setItem] = useState<ResponseUser>();
  const [loading, setLoading] = React.useState(false);
  const [change, setChange] = React.useState<string>("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (props.type != null) {
      renderListAccount();
    }
  }, [props.type]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await adjustBalance(
        item && item.username ? item.username : "",
        change === "inc" ? Number(balance) : -Number(balance)
      );
      if (res.status == HTTP_STATUS.OK) {
        setLoading(false);
        renderListAccount();
        handleClose();
        toast.success("Thành công");
      } else {
        setLoading(false);
        toast.success("Không thành công");
      }
    } catch {
      setLoading(false);
      toast.success("Không thành công");
      //
    }
  };

  const handleOpen = () => setOpen(true);
  const handleOpenPW = () => setOpenPW(true);
  const handleClose = () => {
    setOpen(false);
    setOpenPW(false);
    setChange("");
    setBalance("");
  };

  const router = useRouter();

  const renderListAccount = () => {
    getUserAccount(props.type)
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      {list?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên đăng nhập</TableCell>
                <TableCell>Số dư</TableCell>
                <TableCell>Ngày tạo tài khoản</TableCell>
                <TableCell>Thay đổi mật khẩu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, index) => (
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      handleOpen();
                      setItem(row);
                    }}
                  >
                    {formatVND(row.balance, false)}
                    <Edit
                      sx={{
                        width: "14px",
                        height: "14px",
                        marginBottom: "4px",
                        marginLeft: "4px",
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {formatDateTime(row.createDate)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button className="bg-transparent" onClick={handleOpenPW}>
                      <Edit />
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
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="flex gap-4 flex-col">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center font-semibold"
            >
              Điều chỉnh số dư
            </Typography>
            <p>Số dư: {item?.balance}</p>
            <TextField
              className="w-full"
              id="outlined-select-currency"
              select
              label="Tăng/Giảm số dư"
              defaultValue=""
              value={change}
              onChange={(e) => setChange(e.target.value)}
            >
              <MenuItem value={"inc"}>Tăng</MenuItem>
              <MenuItem value={"dec"}>Giảm</MenuItem>
            </TextField>
            <TextField
              label="Nhập số"
              className="w-full"
              type="number"
              value={balance}
              placeholder="Nhập số"
              onChange={(e) => setBalance(e.target.value)}
            />
            <Box className="flex gap-5 px-10 mt-4">
              <Button
                className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
                onClick={handleConfirm}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                )}
                Xác nhận
              </Button>
              <Button
                className="hover:bg-gray-400 bg-gray-600  w-32 h-10 text-white"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {openPW && (
        <Modal
          open={openPW}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="flex gap-4 flex-col">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center font-semibold"
            >
              Thay đổi mật khẩu
            </Typography>
            <TextField
              label="Mật khẩu mới"
              className="w-full"
              value={balance}
              type="password"
              placeholder="Mật khẩu mới"
              onChange={(e) => setBalance(e.target.value)}
            />
            <TextField
              label="Nhập lại mật khẩu mới"
              className="w-full"
              value={balance}
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              onChange={(e) => setBalance(e.target.value)}
            />
            <Box className="flex gap-5 px-10 mt-4">
              <Button
                className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
                onClick={handleConfirm}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                )}
                Xác nhận
              </Button>
              <Button
                className="hover:bg-gray-400 bg-gray-600  w-32 h-10 text-white"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
