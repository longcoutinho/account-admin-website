import {
  Box,
  Button,
  CircularProgress,
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
import { ICardsRes, IItemCardRes } from "@/interfaces/response";
import { requestEditCard, requestGetItemCard } from "@/services/buy-card";
import { HTTP_STATUS } from "@/constants";
import { Delete, Edit } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FormEditCard from "./FormEditCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const [price, setPrice] = useState<number>();
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

  useEffect(() => {
    handleGetListItemCard();
  }, [itemSelected, openEdit]);

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
  const handleOpenEditPrice = (item: IItemCardRes) => {
    setOpen(true);
    setItem(item);
    // setPrice(item?.price);
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
  console.log(listItems);
  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="flex gap-4 flex-col w-[800px] h-fit">
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
          <Box sx={styleModal} className="flex gap-4 flex-col w-[700px]">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center font-semibold"
            >
              Mệnh giá: {item?.name}
            </Typography>
            {paymentMethods &&
              paymentMethods?.map((e) => (
                <div className=" flex gap-3 w-full">
                  <TextField
                    label={e?.name}
                    defaultValue={e?.code}
                    value={e?.code}
                    disabled
                    className="w-1/2"
                  />
                  <TextField
                    label={"Price"}
                    value={e?.code}
                    className="w-1/2"
                  />
                </div>
              ))}
            <Box className="flex gap-5 px-10 mt-4">
              <Button
                className=" hover:bg-blue-400 bg-blue-600 !min-w-32 h-10 text-white"
                // onClick={() => handleConfirm(row.id)}
              >
                {/* {loading && (
              <CircularProgress size={20} color="inherit" className="mr-2" />
            )} */}
                Xác nhận
              </Button>
              <Button
                className="hover:bg-gray-400 bg-gray-600  w-32 h-10 text-white"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
            </Box>
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
