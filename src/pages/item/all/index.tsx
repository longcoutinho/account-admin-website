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

export default function ListItem() {
    const [itemLevel1, setItemLevel1] = useState<number | null>(null);
    const [itemLevel2, setItemLevel2] = useState<number | null>(null);

    const changeParentChooseItemId = (itemId: number, level: number) => {
        if (level == 1) {
            setItemLevel1(itemId);
        }
        else if (level == 2) {
            setItemLevel2(itemId);
        }
    }

    return (
        <Page title={PAGE_TITLE.ALL_PRODUCTS} menuIndex={1}>
            <ItemTypeComponent display={false} level={1} parentId={null} changeParentChooseItemId={changeParentChooseItemId}></ItemTypeComponent>
            <ItemTypeComponent display={false} level={2} parentId={itemLevel1} changeParentChooseItemId={changeParentChooseItemId}></ItemTypeComponent>
            <AllItem lv1Id={itemLevel1} lv2Id={itemLevel2}></AllItem>
        </Page>
  );
}
