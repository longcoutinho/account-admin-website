import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import React from "react";
import ListProduct from "@/components/Product";

export default function PageProduct() {
  return (
    <Page title={PAGE_TITLE.PRODUCT} menuIndex={1}>
      <ListProduct />
    </Page>
  );
}
