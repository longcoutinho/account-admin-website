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

export default function Categories() {
    const [itemLevel1, setItemLevel1] = useState<number | null>(null);

    return (
        <Page title={PAGE_TITLE.HOME} menuIndex={1}>
            <ItemTypeComponent editable={true} display={true} level={1} parentId={null}></ItemTypeComponent>
            <AllItem lv1Id={itemLevel1}></AllItem>
        </Page>
    );
}
