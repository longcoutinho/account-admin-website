import { Box, Modal, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { styleModal } from "../user/UserAccounts";
import { createCategory } from "@/services/product";
import { HTTP_STATUS } from "@/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCategory } from "@/redux/slices/typeProduct";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const FormType = ({ open, onClose }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (data: FieldValues) => {
    setLoading(true);
    try {
      if (data && data?.name) {
        const res = await createCategory(data?.name);
        if (res?.status === HTTP_STATUS.OK) {
          setLoading(false);
          toast.success("Thành công");
          onClose();
          dispatch(fetchCategory());
        } else {
          setLoading(false);
          toast.error("Không thành công");
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styleModal} className="flex gap-4 w-[600px] flex-col">
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="text-center font-semibold"
        >
          Thêm danh mục sản phẩm
        </Typography>

        <form onSubmit={handleSubmit((data) => onSubmitForm(data))}>
          <div className="flex flex-col gap-3">
            <TextField
              {...register("name", { required: true })}
              label="Tên danh mục"
            />
            {errors.lastName && <p>Name is required.</p>}

            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              className="w-36 mx-auto"
            >
              Gửi
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default FormType;
