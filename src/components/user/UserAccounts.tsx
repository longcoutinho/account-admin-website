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
import { getUserAccount } from "@/services/userService";
import { ResponseUser } from "@/interfaces/response";
import { formatDateTime, formatVND, redirectUrl } from "@/constants/FnCommon";
import { useRouter } from "next/router";
import ModalChangeBalance from "./ModalChangeBalance";

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  useEffect(() => {
    if (props.type != null) {
      renderListAccount();
    }
  }, [props.type]);

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

  const handleClick = (username: any) => {
    redirectUrl(router, Frontend.EDIT_ACCOUNT_PAGE, {
      username: username,
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
                    <Button
                      className="bg-transparent"
                      onClick={() => handleClick(row.username)}
                    >
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
        <ModalChangeBalance open={open} handleClose={handleClose} item={item} />
      )}
    </Box>
  );
}
