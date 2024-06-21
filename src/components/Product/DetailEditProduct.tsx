import {
  Box,
  Button,
  Chip,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { styleModal } from "../user/UserAccounts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { IPaymentMethodRes, IProductRes } from "@/interfaces/response/product";
import {
  requestCreateProduct,
  requestGetListPaymentMethod,
} from "@/services/product";
import { HTTP_STATUS } from "@/constants";
import { IProductReq } from "@/interfaces/request/product";
import { fetchDetailProduct } from "@/redux/slices/product";

interface IProps {
  open: boolean;
  onClose: () => void;
  product?: IProductRes;
}

const DetailEditProduct = ({ open, onClose, product }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.typeProduct);
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

  useEffect(() => {
    if (product?.id) {
      dispatch(fetchDetailProduct(product?.id));
    }
  }, [product]);
  console.log(productDetail);
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
      <Box sx={styleModal} className="flex gap-4 w-[600px] flex-col">
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
            <TextField
              {...register("description", { required: true })}
              label="Short description"
            />
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

            <TextField type="submit" />
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default DetailEditProduct;
