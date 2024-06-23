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
import { Backend, HTTP_STATUS } from "@/constants";
import { Delete, Edit } from "@mui/icons-material";
import FormProduct from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { IProductRes } from "@/interfaces/response/product";
import DetailEditProduct from "./DetailEditProduct";
import { fetchDetailProduct, fetchListProduct } from "@/redux/slices/product";
import { requestDeleteProduct } from "@/services/product";
import { toast } from "react-toastify";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.product);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<number>();
  const [itemSelected, setItemSelected] = useState<IProductRes>();
  // const [refetch, setRefetch] = useState(false);
  const [anchorElDel, setAnchorElDel] = useState<HTMLButtonElement | null>(
    null
  );
  const openDel = Boolean(anchorElDel);
  const idDel = openDel ? "del-popover" : undefined;

  const handleOpenEdit = (item: IProductRes) => {
    dispatch(fetchDetailProduct(item?.id));
    setOpenEdit(true);
    setItemSelected(item);
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
      const res = await requestDeleteProduct(Number(idDelete));
      if (res?.status === HTTP_STATUS.OK) {
        toast.success("Thành công");
        dispatch(fetchListProduct());
        setAnchorElDel(null);
      }
    } catch {}
  };

  return (
    <Box className="flex flex-row flex-wrap gap-10 justify-items-center">
      <Button
        className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 !w-fit !px-4 ml-auto h-10 !text-white"
        onClick={handleAddCard}
      >
        Thêm sản phẩm
      </Button>
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
            {product &&
              product?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      className=" h-14 object-cover"
                      src={Backend.BASE_URL + row?.imagePath}
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      className="bg-transparent mr-4"
                      onClick={() => handleOpenEdit(row)}
                    >
                      <Edit />
                    </Button>
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
      {openEdit && (
        <DetailEditProduct
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          product={itemSelected}
        />
      )}
      {open && <FormProduct open={open} onClose={() => setOpen(false)} />}
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
