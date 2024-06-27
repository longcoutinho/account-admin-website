import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { styleModal } from "../user/UserAccounts";
import { ISaleOrderDetail } from "@/interfaces/request";
import { formatDateTime, formatVND } from "@/constants/FnCommon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface IProps {
  open: boolean;
  onClose: () => void;
  transaction?: ISaleOrderDetail;
}

const DetailTransaction = ({ open, onClose, transaction }: IProps) => {
  const { listCards } = useSelector((state: RootState) => state.card);
  const { detailTrans } = useSelector((state: RootState) => state.transaction);
  console.log(detailTrans);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styleModal} className="flex gap-4 w-[600px] flex-col">
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

          {transaction?.price && (
            <TextField
              value={formatVND(transaction?.price, false)}
              label="Số tiền"
              disabled
            />
          )}
          {transaction?.createDate && (
            <TextField
              value={formatDateTime(transaction?.createDate)}
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
          {transaction?.request &&
            JSON.parse(transaction?.request)?.map(
              (e: { cardId: string | number; quantity: number }, i: number) => (
                <div key={i} className="flex gap-3">
                  <TextField
                    value={
                      listCards &&
                      listCards?.find((c) => c?.id === e?.cardId)?.name
                    }
                    label="Thẻ"
                    disabled
                    className="w-2/3"
                  />
                  <TextField
                    value={e.quantity}
                    label="Số lượng"
                    disabled
                    className="w-1/3"
                  />
                </div>
              )
            )}
          <Button
            type="submit"
            //   loading={loading}
            variant="outlined"
            className="w-36 mx-auto"
          >
            Gửi
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default DetailTransaction;
