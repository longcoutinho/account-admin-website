import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon";
import React, { useState } from "react";
import EditItem from "@/components/item/all/edit/EditItem";

export default function ListItem() {
  const [itemLevel1, setItemLevel1] = useState<number | null>(null);
  const [itemLevel2, setItemLevel2] = useState<number | null>(null);

  const changeParentChooseItemId = (itemId: number, level: number) => {
    if (level == 1) {
      setItemLevel1(itemId);
    } else if (level == 2) {
      setItemLevel2(itemId);
    }
  };

  return (
    <Page title={PAGE_TITLE.EDIT_ITEM} menuIndex={1}>
      <EditItem></EditItem>
    </Page>
  );
}
