import { HTTP_STATUS } from "@/constants";
import { Box, MenuItem, TextField } from "@mui/material";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import { getAllItem } from "@/services/item";
import { Item } from "@/interfaces/response";

interface IProps {
  changeItem: (e: number) => void;
}
export default function SelectAllItem({ changeItem }: IProps) {
  const [listItem, setListItem] = useState<Item[]>([]);

  useEffect(() => {
    renderListItem();
  }, []);

  const renderListItem = () => {
    getAllItem()
      .then((res) => {
        if (res.status == HTTP_STATUS.OK) {
          setListItem(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className="item-type-page-content w-full">
      <TextField
        id="outlined-select-currency"
        select
        label="Sản phẩm"
        defaultValue="EUR"
        className="w-full"
        placeholder="chọn sản phẩm"
        onChange={(e) => changeItem(Number(e.target.value))}
      >
        {listItem.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
