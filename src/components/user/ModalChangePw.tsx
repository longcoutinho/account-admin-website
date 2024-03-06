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
  balanceDefault: string;
}
export default function ModalChangePassword({ open, handleClose }: IProps) {
  const [loading, setLoading] = React.useState(false);
  const [change, setChange] = React.useState<string>("");
  const [balance, setBalance] = useState("");

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
          Thay đổi mật khẩu
        </Typography>

        <TextField
          label="Mật khẩu mới"
          className="w-full"
          value={balance}
          placeholder="Mật khẩu mới"
          onChange={(e) => setBalance(e.target.value)}
        />
        <TextField
          label="Nhập lại mật khẩu mới"
          className="w-full"
          value={balance}
          placeholder="Nhập lại mật khẩu mới"
          onChange={(e) => setBalance(e.target.value)}
        />
        <Box className="flex gap-5 px-10 mt-4">
          <Button
            className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
            // onClick={() => handleConfirm(row.id)}
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
