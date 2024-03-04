import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import AllItem from "@/components/item/all/AllItem";
import { Box, Button, TextField } from "@mui/material";
import {
  createNewItemType,
  getItemTypeByLevelAndParentId,
} from "@/services/item";
import { toast } from "react-toastify";
import { ItemType } from "@/interfaces/request";
import ListItemCate from "@/components/item/categories/all/list";

export default function Categories() {
  const [itemLevel1, setItemLevel1] = useState<number | null>(null);
  const [addItem, setAddItem] = useState<string>("");
  const [listItem, setListItem] = useState<ItemType[]>([]);

  useEffect(() => {
    renderListItem();
  }, []);

  const renderListItem = () => {
    getItemTypeByLevelAndParentId()
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setListItem(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddItem = async () => {
    try {
      const res = await createNewItemType({ name: addItem });
      if (res.status === HTTP_STATUS.OK) {
        toast.success("Add successfully");
        renderListItem();
        setAddItem("");
      } else {
        toast.error("Add failed");
      }
    } catch {
      toast.error("Add failed");
      //er
    }
  };

  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      {/* <ItemTypeComponent
        editable={true}
        display={true}
        level={1}
        parentId={null}
      ></ItemTypeComponent>
      <AllItem lv1Id={itemLevel1}></AllItem> */}
      <Box className="w-full flex gap-4 mb-4">
        <TextField
          label="Thêm loại sản phẩm"
          className="w-full"
          value={addItem}
          onChange={(e) => setAddItem(e.target.value)}
        ></TextField>
        <Button
          className="w-1/6 bg-blue-500"
          variant="contained"
          onClick={handleAddItem}
        >
          Add
        </Button>
      </Box>
      <ListItemCate listItem={listItem} />
    </Page>
  );
}
