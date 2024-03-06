import { HTTP_STATUS, PAGE_TITLE } from "@/constants";
import Page from "@/layouts";
import "@/constants/FnCommon";
import React, { useEffect, useState } from "react";
import {
    Box,
} from "@mui/material";

export default function LabelTitle(props: any) {

    return (
        <Box className="w-full flex-row items-center justify-center text-center">
            <p className="text-blue-500 text-5xl uppercase">{props.label}</p>
        </Box>
    );
}
