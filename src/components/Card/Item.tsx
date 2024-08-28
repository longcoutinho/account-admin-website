import {
  Box,
  Button,
  Modal,
  Paper,
  Popover,
  Tab,
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
import { ICardsRes, IItemCardRes, IPriceItem } from "@/interfaces/response";
import {
  requestAddPriceFee,
  requestEditCard,
  requestGetItemCard,
} from "@/services/buy-card";
import { HTTP_STATUS } from "@/constants";
import { Delete, Edit } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FormEditCard from "./FormEditCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFieldArray, useForm } from "react-hook-form";
import { getItemById } from "@/services/item";

interface IProps {
  openEdit: boolean;
  handleClose: () => void;
  setRefetch: () => void;
  itemSelected?: ICardsRes;
}

export default function Items({
  openEdit,
  handleClose,
  itemSelected,
  setRefetch,
}: IProps) {
  const [listItems, setListItems] = useState<IItemCardRes[]>([]);
  const [item, setItem] = useState<IItemCardRes>();
  const [itemCard, setItemCard] = useState<IPriceItem>();
  const [open, setOpen] = useState(false);
  const [anchorElDel, setAnchorElDel] = useState<HTMLButtonElement | null>(
    null
  );
  const openDel = Boolean(anchorElDel);
  const idDel = openDel ? "del-popover" : undefined;
  const [tabValue, setTabValue] = useState("1");
  const [newName, setNewName] = useState(itemSelected?.name);
  const [file, setFile] = useState<string>(
    itemSelected?.image ? itemSelected?.image : ""
  );
  const { paymentMethods } = useSelector((state: RootState) => state.payment);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();

  const values = watch();
  const { fields, append } = useFieldArray({
    control,
    name: "price",
  });

  useEffect(() => {
    handleGetListItemCard();
  }, [itemSelected, openEdit]);

  useEffect(() => {
    if (!open) reset({ price: [] });
    appendListPrice();
  }, [itemCard, open, reset]);

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

  const appendListPrice = () => {
    if (
      open &&
      itemCard &&
      paymentMethods &&
      paymentMethods?.length > 0 &&
      fields?.length < paymentMethods?.length
    ) {
      paymentMethods?.map((e) =>
        append({
          currency: e.currency,
          price: itemCard?.listFees?.find((it) => it?.currency === e?.currency)
            ? itemCard?.listFees?.find((it) => it?.currency === e?.currency)
                ?.price
            : undefined,
        })
      );
    }
  };

  const handleOpenEditPrice = async (item: IItemCardRes) => {
    setItem(item);
    try {
      const res = await getItemById(item?.id);
      if (res?.status === HTTP_STATUS.OK) {
        setOpen(true);
        setItemCard(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleClickDel = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorElDel(event.currentTarget);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleChangeFile = (e: any) => {
    console.log(e.target.files, URL.createObjectURL(e.target.files[0]));
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleEditCard = async () => {
    try {
      const res = await requestEditCard({
        id: itemSelected?.id?.toString(),
        name: newName ? newName : itemSelected?.name,
        imageUrl: file ? file : itemSelected?.image,
      });
      if (res?.status === HTTP_STATUS.OK) {
        setNewName("");
        setFile("");
        handleClose();
        setRefetch();
      }
      console.log(res);
    } catch {}
  };

  const confirmPrice = async () => {
    try {
      const res = await requestAddPriceFee({
        cardItemId: item?.id,
        data: values?.price,
      });
      if (res?.status === HTTP_STATUS.OK) {
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleModal}
          className="flex gap-4 flex-col !w-[80dvw] !max-h-[80dvh] !h-fit !overflow-y-auto"
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            className="text-center font-semibold"
          >
            {itemSelected?.name}
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="Chỉnh sửa thẻ" value="1" />
                  <Tab label="Mệnh giá" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" className="flex gap-4 flex-col">
                <FormEditCard
                  handleClose={handleClose}
                  setRefetch={setRefetch}
                  itemSelected={itemSelected}
                />
              </TabPanel>
              <TabPanel value="2">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItems.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row?.name}</TableCell>
                          <TableCell>
                            <Button
                              aria-describedby={idDel}
                              className="bg-transparent mr-2"
                              onClick={() => handleOpenEditPrice(row)}
                            >
                              <Edit />
                            </Button>
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
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={styleModal}
            className="flex gap-4 flex-col !w-[50dvw] !max-h-[80dvh] !h-fit !overflow-y-auto"
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center font-semibold"
            >
              Mệnh giá: {item?.name}
            </Typography>
            <form onSubmit={handleSubmit(confirmPrice)}>
              {fields.map((field, index) => (
                <div key={field.id} className="w-full flex flex-col gap-4 mb-4">
                  <div className="flex gap-3">
                    <TextField
                      {...register(`price.${index}.currency`)}
                      label={
                        paymentMethods &&
                        paymentMethods?.find(
                          (p) => p.currency === (field as any)?.currency
                        )
                          ? paymentMethods?.find(
                              (p) => p.currency === (field as any)?.currency
                            )?.name
                          : (field as any)?.currency
                      }
                      className="w-1/2"
                      disabled
                    />
                    <TextField
                      label="Price"
                      type="number"
                      className="w-1/2"
                      {...register(`price.${index}.price`, { required: true })}
                    />
                  </div>
                </div>
              ))}
              <Box className="flex gap-5 px-10 mt-4 items-center justify-center">
                <Button
                  className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 !h-10 !text-white"
                  type="submit"
                >
                  {/* {loading && (
              <CircularProgress size={20} color="inherit" className="mr-2" />
            )} */}
                  Xác nhận
                </Button>
                <Button
                  className="!hover:bg-gray-400 !bg-gray-600  !w-32 !h-10 !text-white"
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </Button>
              </Box>
            </form>
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
