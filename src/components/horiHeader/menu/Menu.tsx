import React, { useEffect, useState } from "react";
import { Box, Link } from "@mui/material";
import { menuBar } from "@/constants/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  getDisplayMenu,
  saveDisplayMenuToSessionStorage,
} from "@/constants/FnCommon";
import { useRouter } from "next/router";

export default function Menu() {
  const [displayMatrix, setDisplayMatrix] = useState<number[]>([]);
  const route = useRouter();

  const switchDisplayComponent = (ind: number) => {
    let newMatrix = displayMatrix;
    newMatrix[ind] = 1 - newMatrix[ind];
    setDisplayMatrix([...newMatrix]);
    saveDisplayMenuToSessionStorage(newMatrix);
  };

  const listMenu = menuBar.map((menuElement, index) => (
    <Box key={index} className="menu-element-wrapper">
      <Link
        href={menuElement.url}
        onClick={() => switchDisplayComponent(index)}
        className={`menu-element-content no-underline ${
          route.pathname === menuElement.url ? "bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={menuElement.icon}
          width={20}
          height={20}
        ></FontAwesomeIcon>
        <Box>
          <p>{menuElement.title}</p>
        </Box>
      </Link>
    </Box>
  ));
  return <Box className="big-menu">{listMenu}</Box>;
}
