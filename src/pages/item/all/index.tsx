import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/constants/FnCommon";
import React, { useState } from "react";
import AllItem from "@/components/item/all/AllItem";

export default function ListItem() {
  return (
    <Page title={PAGE_TITLE.ALL_PRODUCTS} menuIndex={1}>
      <AllItem></AllItem>
    </Page>
  );
}
