import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ICardsRes } from "@/interfaces/response";
import { requestCreateCard, requestEditCard } from "@/services/buy-card";
import { HTTP_STATUS } from "@/constants";

interface IProps {
  handleClose: () => void;
  setRefetch: () => void;
  itemSelected?: ICardsRes;
  isAdd?: boolean;
}

export default function FormEditCard({
  handleClose,
  itemSelected,
  setRefetch,
  isAdd,
}: IProps) {
  const [newName, setNewName] = useState(isAdd ? "" : itemSelected?.name);
  const [file, setFile] = useState<string>(
    itemSelected?.image ? itemSelected?.image : ""
  );

  const handleChangeFile = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleEditCard = async () => {
    try {
      let res: any;
      if (isAdd) {
        res = await requestCreateCard({
          name: newName,
          imageUrl: file,
        });
      } else {
        res = await requestEditCard({
          id: itemSelected?.id?.toString(),
          name: newName ? newName : itemSelected?.name,
          imageUrl: file ? file : itemSelected?.image,
        });
      }
      if (res?.status === HTTP_STATUS.OK) {
        setNewName("");
        setFile("");
        handleClose();
        setRefetch();
      }
      console.log(res);
    } catch {}
  };

  return (
    <>
      <TextField
        label="Tên"
        className="w-full"
        value={newName}
        placeholder="Nhập tên "
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        label="Ảnh"
        className="w-full"
        value={file}
        placeholder="Nhập url ảnh"
        onChange={(e) => setFile(e.target.value)}
      />
      {/* <div className="flex flex-col gap-2 ">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChangeFile} accept="image/*" />
        {file && <img src={file} width={200} height={200} />}
      </div> */}
      <Button
        className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 !w-fit !mx-auto !h-10 !text-white"
        onClick={handleEditCard}
      >
        {/* {loading && (
                    <CircularProgress
                      size={20}
                      color="inherit"
                      className="mr-2"
                    />
                  )} */}
        Xác nhận
      </Button>
    </>
  );
}
