import {HTTP_STATUS} from "@/constants";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
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
            <Box className="item-type-page-content">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Loai san pham</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Loai san pham"
                        onChange={(e: any) => props.changeTypeId(e.target.value)}
                    >
                        {
                            listItem.map((itemType) => (
                                <MenuItem value={itemType.itemTypeId}>{itemType.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
    );
}
