import {Box, Link} from "@mui/material";
import Container from "@mui/system/Container";
import React from "react";
import Logo from "@/components/header/logo/Logo";
import InteractiveIcon from "@/components/header/interactive-icon/InteractiveIcon";
import {PageURL} from "@/constants";

export default function Header() {
    return (
        <Box className="header-container h-20 border-b-2">
            <Box className="header-wrapper h-full">
                <InteractiveIcon></InteractiveIcon>
            </Box>
            {/*<Box className="black-header">*/}
            {/*    /!*<p>Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer </p>*!/*/}
            {/*    /!*<Box className="shop-now-wrapper">*!/*/}
            {/*    /!*    <Link href={PageURL.ITEM}>Shop now</Link>*!/*/}
            {/*    /!*</Box>*!/*/}
            {/*</Box>*/}
        </Box>
    );
}
