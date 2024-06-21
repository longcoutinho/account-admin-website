import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { styleModal } from "../user/UserAccounts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { IPaymentMethodRes, IProductRes } from "@/interfaces/response/product";
import {
  requestCreateProduct,
  requestGetListPaymentMethod,
} from "@/services/product";
import { Backend, HTTP_STATUS } from "@/constants";
import { IProductReq } from "@/interfaces/request/product";
import TextEditor from "../Editor";

interface IProps {
  open: boolean;
  onClose: () => void;
  product?: IProductRes;
}

const DetailEditProduct = ({ open, onClose, product }: IProps) => {
  const { productDetail } = useSelector((state: RootState) => state.product);
  const [listCategory, setListCategory] = useState<string[]>([]);
  const [inputCate, setInputCate] = useState("");
  const [listPaymentMethod, setListPaymentMethod] = useState<
    IPaymentMethodRes[]
  >([]);
  const [prodId, setProdId] = useState<number | string>();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [des, setDes] = useState<string>("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const defaultValues = useMemo(
    () => ({
      name: productDetail ? productDetail?.name : "",
      description: productDetail ? productDetail?.description : "",
      price: productDetail?.feeList?.map((e) => {
        return { paymentCode: e?.paymentCode, price: e?.price };
      }),
      category: productDetail?.categoryList?.map((e) => e?.id?.toString()),
    }),
    [productDetail, open]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "price",
  });
  useEffect(() => {
    if (productDetail?.description) {
      setDes(productDetail?.description);
    }
  }, [productDetail]);
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (productDetail && productDetail?.categoryList) {
      setListCategory(productDetail?.categoryList?.map((e) => e?.name));
    }
    if (productDetail && productDetail?.imagePathList) {
      setPreviewUrls(productDetail?.imagePathList);
    }
  }, [productDetail]);

  useEffect(() => {
    renderListPaymentMethod();
  }, []);

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
        const res: any = await requestCreateProduct(data as IProductReq);
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
          {product?.name}
        </Typography>

        <form
          onSubmit={handleSubmit((data) => onSubmitForm(data as IProductReq))}
        >
          <div className="flex flex-col gap-3">
            <TextField {...register("name", { required: true })} label="Name" />
            {errors.name && <p>Name is required.</p>}
            <Box>
              <TextEditor
                value={des}
                onChange={(e: any) => setDes(e)}
                label="Description"
              />
            </Box>
            {errors.description && <p>Short description is required.</p>}
            {/* <TextField
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
            {errors.typeId && <p>Type is required.</p>} */}
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
                  disabled
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
            <>
              <h2>Add list image </h2>
              <input
                type="file"
                accept="image/*"
                // onChange={handleChangeFile}
                multiple
                disabled
              />
              {previewUrls && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {previewUrls.map((url, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={Backend.BASE_URL + url}
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

              {/* <Button
              onClick={handleUploadImage}
              className=" !hover:bg-blue-400 !bg-blue-600 !w-fit !px-4 ml-auto h-10 !text-white"
            >
              Upload
            </Button> */}
            </>
            <TextField type="submit" disabled />
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default DetailEditProduct;
