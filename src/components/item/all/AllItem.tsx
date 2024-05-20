import {
  Box,
  Button,
  CircularProgress,
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
import React, { useEffect, useState } from "react";
import { ICardsRes } from "@/interfaces/response";
import { Backend, HTTP_STATUS } from "@/constants";
import { requestGetListCards } from "@/services/buy-card";
import { Edit } from "@mui/icons-material";
import { styleModal } from "@/components/user/UserAccounts";

export default function AllItem() {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [listCards, setListCards] = useState<ICardsRes[]>([]);

  useEffect(() => {
    renderListCards();
  }, []);

  const renderListCards = async () => {
    try {
      const res = await requestGetListCards();
      if (res?.status === HTTP_STATUS.OK) {
        setListCards(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleOpenEdit = () => setOpenEdit(true);
  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <Box className="flex flex-row flex-wrap gap-10 p-10 justify-items-center">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCards.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell component="th" scope="row">
                  <img className=" h-14 object-cover" src={row?.image} />
                </TableCell>
                <TableCell>
                  {" "}
                  <Button className="bg-transparent" onClick={handleOpenEdit}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openEdit && (
        <Modal
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal} className="flex gap-4 flex-col">
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
              // value={balance}
              type="password"
              placeholder="Mật khẩu mới"
              // onChange={(e) => setBalance(e.target.value)}
            />
            <TextField
              label="Nhập lại mật khẩu mới"
              className="w-full"
              // value={balance}
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              // onChange={(e) => setBalance(e.target.value)}
            />
            <Box className="flex gap-5 px-10 mt-4">
              <Button
                className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
                // onClick={}
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
