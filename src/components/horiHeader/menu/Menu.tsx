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
      <Box
        onClick={() => switchDisplayComponent(index)}
        className="menu-element-content"
      >
        <FontAwesomeIcon icon={menuElement.icon}></FontAwesomeIcon>
        <Box>
          <p>{menuElement.title}</p>
        </Box>
      </Box>
      {menuElement.child?.map((menuChild, index2) => (
        <Box
          className={`menu-element-child-container ${
            route.pathname === menuChild.url ? "bg-gray-800" : ""
          }`}
          key={index2}
        >
          <Link href={menuChild.url}>{menuChild.title}</Link>
        </Box>
      ))}
    </Box>
  ));
  return <Box className="big-menu">{listMenu}</Box>;
}
