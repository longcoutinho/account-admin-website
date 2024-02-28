import {Box, Button, Input} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useEffect, useState} from "react";
import {HTTP_STATUS} from "@/constants";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import {getItemById} from "@/services/item";
import {useLocation} from "react-router";
import {useRouter} from "next/router";

export default function EditItem(props: any) {
    const [itemLevel1, setItemLevel1] = useState<number>();
    const [itemLevel2, setItemLevel2] = useState<number>();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemListImages, setItemListImages] = useState<FileList>();

    const router = useRouter();

    useEffect(() => {
        if (router.query.id != null && router.query.id != undefined) {
            getItemById(router.query.id).then(
                (res) => {
                    if (res.status == HTTP_STATUS.OK) {
                        console.log(res);
                        setItemName(res.data.name);
                        setItemLevel1(res.data.lv1Id);
                        setItemLevel2(res.data.lv2Id);
                        setItemPrice(res.data.price);
                    }
                }).catch((err) => {
                console.log(err.response.data);
            });
        }
    }, [router.query])

    const changeParentChooseItemId = (itemId: number, level: number) => {
        if (level == 1) {
            setItemLevel1(itemId);
        }
        else if (level == 2) {
            setItemLevel2(itemId);
        }
    }

    const createItem = () => {
        const request = new FormData();
        request.append('price', itemPrice);
        request.append('name', itemName);
        if (itemLevel1 != undefined) request.append('lv1Id', itemLevel1.toString());
        if (itemLevel2 != undefined) request.append('lv2Id', itemLevel2.toString());
        if (itemListImages != null) {
            Array.from(itemListImages).forEach((image) => {
                request.append('listImages', image);
            })
        }
    }

    return (
        <Box>
            <Box>
                <p className="label">Item Name</p>
                <Input type="text"
                       onChange={(e) => setItemName(e.target.value)}
                       value = {itemName}
                />
            </Box>
            <Box>
                <ItemTypeComponent display={false}
                                   level={1}
                                   chosenId = {itemLevel1}
                                   parentId={null}
                                   changeParentChooseItemId={changeParentChooseItemId}>
                </ItemTypeComponent>
            </Box>
            <Box>
                <ItemTypeComponent display={false}
                                   level={2}
                                   chosenId = {itemLevel2}
                                   parentId={itemLevel1}
                                   changeParentChooseItemId={changeParentChooseItemId}>
                </ItemTypeComponent>
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
                       onChange={(e) => setItemPrice(e.target.value)}
                        value={itemPrice}
                />
            </Box>
            <Button variant="contained" onClick={createItem}>Add Item</Button>
        </Box>
    )
}
