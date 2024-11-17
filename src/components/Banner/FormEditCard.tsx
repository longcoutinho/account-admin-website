import { Button, CircularProgress, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { HTTP_STATUS } from "@/constants";
import { addBanner } from "@/services/product";

interface IProps {
  handleClose: () => void;
  setRefetch: () => void;
}

export default function FormEditCard({ handleClose, setRefetch }: IProps) {
  const [index, setIndex] = useState<number | undefined>();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFile(files[0]);
  };
  const handleEditCard = async () => {
    try {
      setLoading(true);
      if (index && file) {
        const body = new FormData();
        body.append("imagesList", file as any);
        const res = await addBanner(index, body);
        if (res?.status === HTTP_STATUS.OK) {
          setIndex(undefined);
          handleClose();
          setRefetch();
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        label="Vị trí"
        className="w-full"
        value={index}
        type="number"
        placeholder="Nhập số thứ tự vị trí (VD:1)"
        onChange={(e) => setIndex(Number(e.target.value))}
      />
      <input type="file" accept="image/*" onChange={handleChangeFile} />

      <Button
        className=" !hover:bg-blue-400 !bg-blue-600 !min-w-32 !w-fit !mx-auto !h-10 !text-white"
        onClick={handleEditCard}
      >
        {loading && (
          <CircularProgress size={20} color="inherit" className="mr-2" />
        )}
        Xác nhận
      </Button>
    </>
  );
}
