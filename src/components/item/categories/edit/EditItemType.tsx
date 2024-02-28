import {Box, Button, TextField} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useEffect, useState} from "react";
import {editItemType, getItemTypeById} from "@/services/item";
import {HTTP_STATUS} from "@/constants";

export default function EditItemType(props: any) {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [notify, setNotify] = useState('');

    useEffect(() => {
        if (props.id != undefined) {
            getItemTypeById(props.id).then(
                (res) => {
                    if (res.status == HTTP_STATUS.OK) {
                        setItemCode(res.data.code);
                        setItemName(res.data.name);
                    }
                }).catch((err) => {
                setNotify(err.response.data);
            });
        }
    }, [props.id])

    const edit = () => {
        editItemType(props.id, itemName, itemCode).then(
            (res) => {
                if (res.status == HTTP_STATUS.OK) {
                    props.renderListItem();
                    props.closeEditItemType()
                }
            }).catch((err) => {
            setNotify(err.response.data);
        });
    }

    return (
        <Box sx={{display: props.open ? 'block' :'none'}}>
            <Box className="overlay-container"></Box>
            <Box className="center-box">
                <p>Edit Item Type</p>
                <TextField value={itemName} onChange={e => setItemName(e.target.value)} label="Type name" variant="filled" />
                <TextField value={itemCode} onChange={e => setItemCode(e.target.value)} sx={{marginTop: "20px"}} label="Type code" variant="filled" />
                <Box className="center-box-button-container">
                    <Button variant="contained" color="success" onClick={() => edit()}>Add</Button>
                    <Button onClick={() => props.closeEditItemType()} variant="contained" color="error">Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
}
