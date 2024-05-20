import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICardsRes } from "@/interfaces/response";
import { HTTP_STATUS } from "@/constants";
import { requestGetListCards } from "@/services/buy-card";
import { Edit } from "@mui/icons-material";
import Items from "./Item";

export default function ListCard() {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState<ICardsRes>();
  const [listCards, setListCards] = useState<ICardsRes[]>([]);

  useEffect(() => {
    renderListCards();
  }, []);

  const renderListCards = async () => {
    try {
      const res = await requestGetListCards();
      if (res?.status === HTTP_STATUS.OK) {
        setListCards(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleOpenEdit = (id: ICardsRes) => {
    setOpenEdit(true);
    setItemSelected(id);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <Box className="flex flex-row flex-wrap gap-10 p-10 justify-items-center">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCards.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell component="th" scope="row">
                  <img className=" h-14 object-cover" src={row?.image} />
                </TableCell>
                <TableCell>
                  {" "}
                  <Button
                    className="bg-transparent"
                    onClick={() => handleOpenEdit(row)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openEdit && (
        <Items
          openEdit={openEdit}
          handleClose={handleClose}
          itemSelected={itemSelected}
        />
      )}
    </Box>
  );
}
