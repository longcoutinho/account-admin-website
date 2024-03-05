import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import { createNewAccount } from "@/services/stock-account";

interface IItem {
  username?: string;
  password?: string;
}
export default function Inventory() {
  const [addItem, setAddItem] = useState<IItem>();
  const [itemId, setItemId] = useState<number>();

  const handleAddInventory = async () => {
    try {
      const res = await createNewAccount({
        itemId: Number(itemId),
        username: addItem?.username || "",
        password: addItem?.password || "",
      });
      if (res.status === HTTP_STATUS.OK) {
        toast.success("Add successfully");
        // renderListItem();
        // setAddItem("");
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
      <FormControl className="w-full flex flex-col gap-4 mb-4">
        <TextField
          label="Tài khoản"
          className="w-full"
          value={addItem?.username}
          onChange={(e) => setAddItem({ username: e.target.value, ...addItem })}
        ></TextField>
        <TextField
          type="password"
          label="Mật khẩu"
          className="w-full"
          value={addItem?.password}
          onChange={(e) => setAddItem({ password: e.target.value, ...addItem })}
        ></TextField>
        <ItemTypeComponent changeTypeId={setItemId} />
        <Button
          className="w-1/6 bg-blue-500"
          variant="contained"
          onClick={handleAddInventory}
        >
          Add
        </Button>
      </FormControl>
    </Page>
  );
}
