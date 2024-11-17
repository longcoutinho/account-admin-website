import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import React from "react";
import ListBanner from "@/components/Banner";

export default function PageBanner() {
  return (
    <Page title={PAGE_TITLE.BANNER} menuIndex={1}>
      <ListBanner />
    </Page>
  );
}
