import {Box, Button, TextField} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useState} from "react";
import {createNewItemType} from "../../../../services/item";
import {ItemType} from "@/interfaces/request";
import {HTTP_STATUS} from "@/constants";

export default function AddItemType(props: any) {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [notify, setNotify] = useState('');

    const createItemType = () => {
        const request: ItemType = {
            code: itemCode,
            name: itemName,
            level: props.itemLevel,
            parentId: props.itemLevel == 1 ? null : props.parentId,
            itemTypeId: 1
        };
        createNewItemType(request).then(
            (res) => {
                if (res.status == HTTP_STATUS.OK) {
                    props.renderListItem();
                    props.closeAddItemType();
                }
            }).catch((err) => {
                setNotify(err.response.data);
        });
    }

    return (
        <Box sx={{display: props.open ? 'block' :'none'}}>
            <Box className="overlay-container"></Box>
            <Box className="center-box">
                {props.itemLevel == 1 ?
                    <p>Add item type level 1</p> :
                    <p>Add item type level 2</p>
                }
                <TextField value={itemName} onChange={e => setItemName(e.target.value)} label="Type name" variant="filled" />
                <TextField value={itemCode} onChange={e => setItemCode(e.target.value)} sx={{marginTop: "20px"}} label="Type code" variant="filled" />
                <Box className="center-box-button-container">
                    <Button variant="contained" color="success" onClick={() => createItemType()}>Add</Button>
                    <Button onClick={() => props.closeAddItemType()} variant="contained" color="error">Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
}
