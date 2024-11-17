import {
  Box,
  Button,
  Modal,
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
import React, { useEffect, useState } from "react";
import { Backend, HTTP_STATUS } from "@/constants";
import { Delete } from "@mui/icons-material";
import { styleModal } from "../user/UserAccounts";
import { deleteBanner, getListBanner } from "@/services/product";
import FormEditCard from "./FormEditCard";
interface ISliceData {
  id: number;
  url: string;
  idx: number;
}
export default function ListBanner() {
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<number>();
  const [refetch, setRefetch] = useState(false);
  const [anchorElDel, setAnchorElDel] = useState<HTMLButtonElement | null>(
    null
  );
  const [slideData, setSlideData] = useState<ISliceData[]>([]);
  const openDel = Boolean(anchorElDel);
  const idDel = openDel ? "del-popover" : undefined;

  useEffect(() => {
    handleFetchData();
  }, [refetch]);

  const handleFetchData = () => {
    getListBanner()
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setSlideData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCard = () => {
    setOpen(true);
  };

  const handleClickDel = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setIdDelete(id);
    setAnchorElDel(event.currentTarget);
  };

  const handleConfirmDelete = async () => {
    try {
      if (idDelete) {
        const res = await deleteBanner(idDelete);
        if (res?.status === HTTP_STATUS.OK) {
          setRefetch(!refetch);
          setAnchorElDel(null);
        }
      }
    } catch {}
  };
  return (
    <Box className="flex flex-row flex-wrap gap-10 p-10 justify-items-center">
      <Button
        className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 w-fit ml-auto h-10 !text-white"
        onClick={handleAddCard}
      >
        Thêm ảnh mới
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Index</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slideData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.idx}</TableCell>
                <TableCell component="th" scope="row">
                  <img
                    className=" h-14 object-cover"
                    src={Backend.BASE_URL + row?.url}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    aria-describedby={idDel}
                    className="bg-transparent"
                    onClick={(e) => handleClickDel(e, row?.id)}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={styleModal}
            className="flex gap-4 flex-col !w-[50dvw] !max-h-[80dvh] !h-fit !overflow-y-auto"
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center font-semibold"
            >
              Tạo thẻ
            </Typography>
            <FormEditCard
              handleClose={() => setOpen(false)}
              setRefetch={() => setRefetch(!refetch)}
            />
          </Box>
        </Modal>
      )}
      <Popover
        id={idDel}
        open={openDel}
        anchorEl={anchorElDel}
        onClose={() => setAnchorElDel(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, textAlign: "center" }}>Xác nhận xóa</Typography>
        <Box className="flex gap-5 px-10 pb-6">
          <Button
            className=" bg-blue-400 hover:bg-blue-600 w-20 h-8 text-white"
            onClick={() => handleConfirmDelete()}
          >
            Ok
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-600  w-20 h-8 text-white"
            onClick={() => setAnchorElDel(null)}
          >
            Cancel
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
