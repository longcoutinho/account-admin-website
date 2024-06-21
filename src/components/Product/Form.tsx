import {
  Box,
  Button,
  Chip,
  MenuItem,
  Modal,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { styleModal } from "../user/UserAccounts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { IPaymentMethodRes } from "@/interfaces/response/product";
import {
  requestCreateImageProduct,
  requestCreateProduct,
  requestGetListPaymentMethod,
} from "@/services/product";
import { HTTP_STATUS } from "@/constants";
import { IProductReq } from "@/interfaces/request/product";
import { toast } from "react-toastify";
import { fetchListProduct } from "@/redux/slices/product";
import TextEditor from "../Editor";

interface IProps {
  open: boolean;
  onClose: () => void;
}
const steps = ["Thông tin", "Ảnh sản phẩm"];
const FormProduct = ({ open, onClose }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.typeProduct);
  const [listCategory, setListCategory] = useState<string[]>([]);
  const [inputCate, setInputCate] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [listPaymentMethod, setListPaymentMethod] = useState<
    IPaymentMethodRes[]
  >([]);
  const [prodId, setProdId] = useState<number | string>();
  const [des, setDes] = useState<string>("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "price",
  });

  useEffect(() => {
    renderListPaymentMethod();
  }, []);
  useEffect(() => {
    appendListPrice();
  }, [listPaymentMethod]);

  const appendListPrice = () => {
    if (listPaymentMethod && listPaymentMethod?.length > 0) {
      listPaymentMethod?.map((e) =>
        append({ paymentCode: e.code, price: undefined })
      );
    }
  };
  const renderListPaymentMethod = async () => {
    try {
      const res = await requestGetListPaymentMethod();
      if (res?.status === HTTP_STATUS.OK) {
        setListPaymentMethod(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmitForm = async (data: IProductReq) => {
    try {
      if (data) {
        const newReq = { ...data, description: des };
        const res: any = await requestCreateProduct(newReq as IProductReq);
        console.log(res);
        if (res?.status === HTTP_STATUS.OK) {
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep(1);
          setProdId(res?.data?.id);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddCategory = () => {
    if (inputCate !== "") {
      setValue("category", [...listCategory, inputCate]);
      setListCategory([...listCategory, inputCate]);
      setInputCate("");
    }
  };

  const handleDeleteCate = (e: string) => {
    setValue(
      "category",
      listCategory?.filter((el) => el !== e)
    );
    setListCategory(listCategory?.filter((el) => el !== e));
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFile(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleUploadImage = async () => {
    try {
      if (prodId && file) {
        const body = new FormData();
        file?.map((e) => body.append("imagesList", e as any));
        const res = await requestCreateImageProduct(prodId, body);
        if (res?.status === HTTP_STATUS.OK) {
          onClose();
          toast.success("Thành công");
          dispatch(fetchListProduct());
        } else {
          toast.error("Không thành công");
        }
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={styleModal}
        className="!flex !gap-4 !w-[600px] !flex-col !overflow-auto !max-h-screen"
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="text-center font-semibold"
        >
          Thêm sản phẩm mới
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? (
          <form
            onSubmit={handleSubmit((data) => onSubmitForm(data as IProductReq))}
          >
            <div className="flex flex-col gap-3">
              <TextField
                {...register("name", { required: true })}
                label="Name"
              />
              {errors.name && <p>Name is required.</p>}

              <Box>
                <TextEditor
                  value={des}
                  onChange={(e: any) => setDes(e)}
                  label="Description"
                />
              </Box>
              {errors.description && <p>Short description is required.</p>}
              <TextField
                id="outlined-select-currency"
                select
                label="Danh mục"
                className="w-full"
                placeholder="chọn danh mục"
                {...register("typeId", { required: true })}
              >
                {category &&
                  category?.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
              {errors.typeId && <p>Type is required.</p>}
              <div className="w-full flex justify-between items-center">
                <TextField
                  label="Category (VD: size S)"
                  className="w-[calc(100%-70px)]"
                  {...register("category")}
                  value={inputCate}
                  onChange={(e) => setInputCate(e?.target?.value)}
                />
                <Button
                  onClick={handleAddCategory}
                  className=" !hover:bg-blue-400 !bg-blue-600 !w-fit !px-4 ml-auto h-10 !text-white"
                >
                  Add
                </Button>
              </div>
              <div className="flex gap-1">
                {listCategory &&
                  listCategory?.map((e) => (
                    <Chip
                      label={e}
                      onDelete={() => handleDeleteCate(e)}
                      className="w-fit"
                    />
                  ))}
              </div>

              <h2>Price</h2>
              {fields.map((field, index) => (
                <div key={field.id} className="w-full flex gap-4">
                  {/* <Checkbox
                  checked={
                    values?.price?.filter(
                      (el: IPriceWithPaymentMethod) =>
                        el?.paymentCode === e?.code
                    )?.length > 0
                  }
                  onChange={(e) => {
                    setValue("price", [...values?.price, {}]);
                  }}
                /> */}
                  <TextField
                    {...register(`price.${index}.paymentCode`)}
                    className="w-1/2"
                  />
                  <TextField
                    label="Price"
                    type="number"
                    className="w-1/2"
                    {...register(`price.${index}.price`)}
                  />
                </div>
              ))}

              <TextField type="submit" />
            </div>
          </form>
        ) : (
          <>
            <h2>Add list image </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              multiple
            />
            {previewUrls && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {previewUrls.map((url, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={url}
                    alt={`Preview ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            )}

            <Button
              onClick={handleUploadImage}
              className=" !hover:bg-blue-400 !bg-blue-600 !w-fit !px-4 ml-auto h-10 !text-white"
            >
              Upload
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default FormProduct;
