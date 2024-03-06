import { Box, Button, Input, TextField } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon";
import React, { useState } from "react";
import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import { createNewItem } from "@/services/item";

export default function AddItemComponent() {
  const [typeId, setTypeId] = useState<number>();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemListImages, setItemListImages] = useState<FileList>();

  const changeTypeId = (typeId: any) => {
    console.log(typeId);
    setTypeId(typeId);
  };

  const createItem = () => {
    const request = new FormData();
    request.append("price", itemPrice);
    request.append("name", itemName);
    if (typeId != undefined) request.append("typeId", typeId.toString());
    if (itemListImages != null) {
      Array.from(itemListImages).forEach((image) => {
        request.append("listImages", image);
      });
    }

    createNewItem(request)
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          console.log("ok");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      <Box className="flex flex-col bg-white rounded-2xl box-shadow p-5 gap-5">
        <Box className="flex gap-5">
          <TextField
            type="small"
            className="w-full"
            label="Tên sản phẩm"
            onChange={(e: any) => setItemName(e.target.value)}
          ></TextField>
          <TextField
            type="small"
            className="w-full"
            label="Giá sản phẩm"
            onChange={(e: any) => setItemPrice(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <ItemTypeComponent changeTypeId={changeTypeId}></ItemTypeComponent>
        </Box>
        <Box>
          <p className="label text-black">Ảnh sản phẩm</p>
          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) setItemListImages(e.target.files);
            }}
          ></Input>
        </Box>
        <Button
          variant="outlined"
          onClick={createItem}
          className="bg-blue-500 w-1/6 text-white"
        >
          Thêm sản phẩm
        </Button>
      </Box>
    </Page>
  );
}
