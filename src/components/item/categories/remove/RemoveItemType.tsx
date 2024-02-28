import {Box, Button} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useState} from "react";
import {deleteItemType} from "@/services/item";
import {HTTP_STATUS} from "@/constants";

export default function RemoveItemType(props: any) {
    const [notify, setNotify] = useState('');

    const edit = () => {
        deleteItemType(props.id).then(
            (res) => {
                if (res.status == HTTP_STATUS.OK) {
                    props.renderListItem();
                    props.closeRemoveItemType();
                }
            }).catch((err) => {
            setNotify(err.response.data);
        });
    }

    return (
        <Box sx={{display: props.open ? 'block' :'none'}}>
            <Box className="overlay-container"></Box>
            <Box className="center-box">
                <p>Do you want to remove this item type ?</p>
                <p className="text-red-600">{notify}</p>
                <Box className="center-box-button-container">
                    <Button variant="contained" color="success" onClick={() => edit()}>Add</Button>
                    <Button onClick={() => props.closeRemoveItemType()} variant="contained" color="error">Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
}
