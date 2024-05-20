import {
  Box,
  Button,
  CircularProgress,
  Modal,
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
import React, { useEffect, useState } from "react";
import { styleModal } from "@/components/user/UserAccounts";
import { ICardsRes, IItemCardRes } from "@/interfaces/response";
import { requestGetItemCard } from "@/services/buy-card";
import { HTTP_STATUS } from "@/constants";
import { Delete, Edit } from "@mui/icons-material";

interface IProps {
  openEdit: boolean;
  handleClose: () => void;
  itemSelected?: ICardsRes;
}
export default function Items({ openEdit, handleClose, itemSelected }: IProps) {
  const [listItems, setListItems] = useState<IItemCardRes[]>([]);
  const [item, setItem] = useState<IItemCardRes>();
  const [price, setPrice] = useState<number>();
  const [open, setOpen] = useState(false);
  const [anchorElDel, setAnchorElDel] = useState<HTMLButtonElement | null>(
    null
  );
  const openDel = Boolean(anchorElDel);
  const idDel = openDel ? "del-popover" : undefined;

  useEffect(() => {
    handleGetListItemCard();
  }, [itemSelected, openEdit]);

  const handleGetListItemCard = async () => {
    try {
      const res = await requestGetItemCard(itemSelected?.id?.toString());
      if (res?.status === HTTP_STATUS.OK) {
        setListItems(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleOpenEditPrice = (item: IItemCardRes) => {
    setOpen(true);
    setItem(item);
    setPrice(item?.price);
  };
  const handleClickDel = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorElDel(event.currentTarget);
  };

  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="flex gap-4 flex-col w-[800px] h-4/5">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            className="text-center font-semibold"
          >
            {itemSelected?.name}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell onClick={() => handleOpenEditPrice(row)}>
                      {row.price.toLocaleString("en-US")}đ{" "}
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
        </Box>
      </Modal>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
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
              Mệnh giá: {item?.price.toLocaleString("en-US")}đ
            </Typography>

            <TextField
              type="number"
              label="Nhập mệnh giá mới"
              //   className="w-full"
              value={price}
              placeholder="Nhập mệnh giá"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Box className="flex gap-5 px-10 mt-4">
              <Button
                className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
                // onClick={() => handleConfirm(row.id)}
              >
                {/* {loading && (
              <CircularProgress size={20} color="inherit" className="mr-2" />
            )} */}
                Xác nhận
              </Button>
              <Button
                className="hover:bg-gray-400 bg-gray-600  w-32 h-10 text-white"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
            </Box>
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
            // onClick={() => handleConfirmCancel(idRow)}
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
    </>
  );
}
