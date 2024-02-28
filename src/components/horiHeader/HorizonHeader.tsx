import {Box, Link} from "@mui/material";
import React from "react";
import Logo from "@/components/header/logo/Logo";
import Menu from "@/components/horiHeader/menu/Menu";

export default function HorizonHeader() {
    return (
            <Box className="hori-header-container">
                <Logo></Logo>
                <Menu></Menu>
            </Box>
    );
}
