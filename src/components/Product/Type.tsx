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
import React, { useState } from "react";
import { HTTP_STATUS } from "@/constants";
import { requestDelCard } from "@/services/buy-card";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FormType from "./FormType";
import { formatDateTime } from "@/constants/FnCommon";
import { ICategoryRes } from "@/interfaces/response/product";

export default function TypeProduct() {
  const { category } = useSelector((state: RootState) => state.typeProduct);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<number>();
  const [itemSelected, setItemSelected] = useState<ICategoryRes>();
  const [refetch, setRefetch] = useState(false);
  const [anchorElDel, setAnchorElDel] = useState<HTMLButtonElement | null>(
    null
  );
  const openDel = Boolean(anchorElDel);
  const idDel = openDel ? "del-popover" : undefined;

  const handleOpenEdit = (id: ICategoryRes) => {
    setOpenEdit(true);
    setItemSelected(id);
  };
  const handleClose = () => {
    setOpenEdit(false);
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
      console.log(1);
      const res = await requestDelCard(idDelete?.toString());
      if (res?.status === HTTP_STATUS.OK) {
        setRefetch(!refetch);
      }
    } catch {}
  };

  return (
    <Box className="flex flex-row flex-wrap gap-10 justify-items-center">
      <Button
        className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 !w-fit !px-4 ml-auto h-10 !text-white"
        onClick={handleAddCard}
      >
        Thêm danh mục
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Create date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category &&
              category?.length > 0 &&
              category.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row?.id}</TableCell>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {formatDateTime(row?.create_date)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      className="bg-transparent mr-4"
                      // onClick={() => handleOpenEdit(row)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      aria-describedby={idDel}
                      className="bg-transparent"
                      // onClick={(e) => handleClickDel(e, row?.id)}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {openEdit && (
        <Items
          openEdit={openEdit}
          handleClose={handleClose}
          itemSelected={itemSelected}
          setRefetch={() => setRefetch(!refetch)}
        />
      )} */}
      {open && <FormType open={open} onClose={() => setOpen(false)} />}
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
