import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { adjustBalance } from "@/services/userService";
import { ResponseUser } from "@/interfaces/response";

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
interface IProps {
  open: boolean;
  handleClose: () => void;
  item?: ResponseUser;
}
export default function ModalChangeBalance({
  open,
  handleClose,
  item,
}: IProps) {
  const [loading, setLoading] = React.useState(false);
  const [change, setChange] = React.useState<string>("");
  const [balance, setBalance] = useState("");
  const handleConfirm = async () => {
    try {
      const res = await adjustBalance(
        item && item.username ? item.username : "",
        change === "inc" ? Number(balance) : -Number(balance)
      );
    } catch {
      //
    }
  };
  return (
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
              <CircularProgress size={20} color="inherit" className="mr-2" />
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
  );
}
