import {Box, Button, Input} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useState} from "react";
import {HTTP_STATUS, PAGE_TITLE} from "@/constants";
import Page from "@/layouts";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import {createNewItem} from "@/services/item";

export default function AddItemComponent() {
    const [typeId, setTypeId] = useState<number>();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemListImages, setItemListImages] = useState<FileList>();

    const createItem = () => {
        const request = new FormData();
        request.append('price', itemPrice);
        request.append('name', itemName);
        if (typeId != undefined) request.append('typeId', typeId.toString());
        if (itemListImages != null) {
            Array.from(itemListImages).forEach((image) => {
                request.append('listImages', image);
            })
        }

        createNewItem(request).then(
            (res) => {
                if (res.status == HTTP_STATUS.OK) {
                    console.log('ok');
                }
            }).catch((err) => {
            console.log(err.response.data);
        });
    }

    return <Page title={PAGE_TITLE.HOME} menuIndex={1}>
        <Box>
            <Box>
                <p className="label">Item Name</p>
                <Input type="text"
                       onChange={(e) => setItemName(e.target.value)}/>
            </Box>
            <Box>
                <ItemTypeComponent></ItemTypeComponent>
            </Box>
            <Box>
                <p className="label">Item Image</p>
                <Input type="file" inputProps={{ multiple: true }} onChange={(e :React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files != null) setItemListImages(e.target.files);
                }}></Input>
            </Box>
            <Box>
                <p className="label">Item Price</p>
                <Input type="text"
                       onChange={(e) => setItemPrice(e.target.value)}/>
            </Box>
            <Button variant="contained" onClick={createItem}>Add Item</Button>
        </Box>
    </Page>;
}
