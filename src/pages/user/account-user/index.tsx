import { PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React from "react";
import UserAccounts from "@/components/user/UserAccounts";

export default function AccountUser() {
  return (
    <Page title={PAGE_TITLE.HOME} menuIndex={1}>
      <UserAccounts type={1}></UserAccounts>
    </Page>
  );
}
