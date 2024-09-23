import { Box, Chip, Modal, TextField, Typography } from "@mui/material";
import { styleModal } from "../user/UserAccounts";
import { ISaleOrderDetail } from "@/interfaces/request";
import { Backend } from "@/constants";
interface IProps {
  open: boolean;
  onClose: () => void;
  transaction?: ISaleOrderDetail;
}

const DetailOrder = ({ open, onClose, transaction }: IProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={styleModal}
        className="!flex !gap-4 !w-[800px] !flex-col !overflow-auto !max-h-[calc(100vh-40px)]"
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="text-center font-semibold"
        >
          Giao dịch
        </Typography>

        <div className="flex flex-col gap-3">
          <TextField value={transaction?.id} label="Mã giao dịch" disabled />
          <TextField
            value={transaction?.createUser}
            label="Người thực hiện"
            disabled
          />
          {transaction?.createDate && (
            <TextField
              value={transaction?.createDate}
              label="Ngày thực hiện"
              disabled
            />
          )}
          {transaction?.status && (
            <p className=" opacity-50">
              Trạng thái:{" "}
              {transaction.status === "SUCCESS" ? (
                <Chip label="Thành công" color="success" variant="outlined" />
              ) : transaction.status === "FAILED" ? (
                <Chip label="Thất bại" color="error" variant="outlined" />
              ) : (
                <Chip
                  label="Đang tiến hành"
                  color="warning"
                  variant="outlined"
                />
              )}
            </p>
          )}
          <p>Chi tiết</p>
          {transaction &&
            transaction?.imageList &&
            transaction?.imageList?.length > 0 && (
              <Box
                component="img"
                src={Backend.BASE_URL + transaction?.imageList[0]}
                alt={`Preview`}
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            )}
          <div className="flex flex-col gap-3">
            <p>
              <span className="text-gray-500 text-sm">Sản phẩm:</span>{" "}
              {transaction?.productName}
            </p>
            <p>
              <span className="text-gray-500 text-sm">Phân loại:</span>{" "}
              {transaction?.categoriesName}
            </p>
            <p>
              <span className="text-gray-500 text-sm">Địa chỉ:</span>{" "}
              {transaction?.address}
            </p>
            <p>
              <span className="text-gray-500 text-sm">Số điện thoại:</span>{" "}
              {transaction?.phoneNumber}
            </p>
            <p>
              <span className="text-gray-500 text-sm">Email:</span>{" "}
              {transaction?.email}
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default DetailOrder;
