import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import React from "react";
import ListCard from "@/components/Card";

export default function PageCard() {
  return (
    <Page title={PAGE_TITLE.ALL_PRODUCTS} menuIndex={1}>
      <ListCard />
    </Page>
  );
}
