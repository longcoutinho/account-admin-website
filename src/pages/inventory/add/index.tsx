import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import { createNewAccount } from "@/services/stock-account";

export default function Add() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [itemId, setItemId] = useState<number>();

  const handleAddInventory = async () => {
    try {
      const res = await createNewAccount({
        itemId: Number(itemId),
        username: username || "",
        password: password || "",
      });
      if (res.status === HTTP_STATUS.OK) {
        toast.success("Add successfully");
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
      <FormControl className=" w-4/5 flex flex-col gap-4 mb-4">
        <TextField
          label="Tài khoản"
          className="w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>
        <TextField
          name="password"
          type="password"
          label="Mật khẩu"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
