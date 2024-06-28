import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { styleModal } from "../user/UserAccounts";
import { IOrderDetail, ISaleOrderDetail } from "@/interfaces/request";
import { formatVND } from "@/constants/FnCommon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface IProps {
  open: boolean;
  onClose: () => void;
  transaction?: ISaleOrderDetail;
}

const DetailTransaction = ({ open, onClose, transaction }: IProps) => {
  const { detailTrans, loading } = useSelector(
    (state: RootState) => state.transaction
  );

  return (
    <Modal open={open} onClose={onClose}>
      {!loading ? (
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

            {transaction?.price && (
              <TextField
                value={formatVND(transaction?.price, false)}
                label="Số tiền"
                disabled
              />
            )}
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
            {detailTrans &&
              detailTrans?.map((e: IOrderDetail, i: number) => (
                <div key={i} className="flex gap-4 flex-col">
                  <p>
                    {i + 1}. {e?.cardName}
                  </p>
                  <div className="flex gap-1">
                    {e?.cards &&
                      e?.cards?.map((c) => (
                        <div className="flex flex-col gap-1 text-xs text-gray-500 border p-2 w-1/3">
                          <p>
                            Code: <span className="text-black">{c?.code}</span>
                          </p>
                          <p>
                            Serial:{" "}
                            <span className="text-black">{c?.serial}</span>
                          </p>
                          <p>
                            Value:{" "}
                            <span className="text-black">{c?.value}</span>
                          </p>
                          <p>
                            Expiry:{" "}
                            <span className="text-black">{c?.expiry}</span>
                          </p>
                          <p>
                            Vendor:{" "}
                            <span className="text-black">{c?.vendor}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
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
      ) : (
        <></>
      )}
    </Modal>
  );
};
export default DetailTransaction;
