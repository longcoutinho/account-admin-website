import { Box } from "@mui/material";
import React from "react";
import { redirectUrl } from "@/constants/FnCommon";
import { PageURL } from "@/constants";
import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();
  return (
    <Box
      onClick={() => redirectUrl(router, PageURL.HOME)}
      className="logo-wrapper"
    >
      <Box className="logo-container">
        <img alt="" id="logo" src="/img/fb.png" height={48} width={48} />
      </Box>
    </Box>
  );
}
