import {PAGE_TITLE} from "@/constants";
import Page from "@/layouts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon"
import React, {useState} from "react";
import ItemTypeComponent from "@/components/item/categories/all/ItemType";
import AllItem from "@/components/item/all/AllItem";
import {Input, Box, Button} from "@mui/material";

export default function BuyComponent() {
    const [typeId, setTypeId] = useState(null);
    const [typeName, setTypeName] = useState('');
    const [searchTypeId, setSearchTypeId] = useState(null);
    const [searchTypeName, setSearchTypeName] = useState('');

    const changeTypeId = (typeId: any) => {
        setTypeId(typeId);
    }

    const searchItem = () => {
        setSearchTypeId(typeId);
        setSearchTypeName(typeName);
    }

    return (
        <Page title={PAGE_TITLE.ALL_PRODUCTS} menuIndex={1}>
            <Box className="p-10">
                <ItemTypeComponent changeTypeId={changeTypeId}></ItemTypeComponent>
                <Box>
                    <p className="text-black">Ten san pham</p>
                    <Input onChange={(e: any) => setTypeName(e.target.value)}></Input>
                </Box>
                <Button onClick={searchItem} >Tim kiem</Button>
                <AllItem searchTypeId={searchTypeId} searchTypeName={searchTypeName}></AllItem>
            </Box>
        </Page>
    );
}
