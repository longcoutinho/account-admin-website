import {HTTP_STATUS} from "@/constants";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useEffect, useState} from "react";
import {ItemType} from "@/interfaces/request";
import {getItemTypeByLevelAndParentId} from "@/services/item";

export default function ItemTypeComponent(props: any) {
    const [listItem, setListItem] = useState<ItemType[]>([]);

    useEffect(() => {
        renderListItem();
    }, []);

    const renderListItem = () => {
        getItemTypeByLevelAndParentId().then(
            (res) => {
                if (res.status == HTTP_STATUS.OK) {
                    setListItem(res.data);
                }
            }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Box className="item-type-page-content w-full">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Loại sản phẩm"
                    defaultValue="EUR"
                    onChange={e => props.changeTypeId(e.target.value)}
                >
                    {
                        listItem.map((itemType) => (
                            <MenuItem value={itemType.itemTypeId}>{itemType.name}</MenuItem>
                        ))
                    }
                </TextField>
        </Box>
    );
}
