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

  useEffect(() => {
    let initMatrix = getDisplayMenu();
    if (initMatrix?.length) {
      setDisplayMatrix(initMatrix);
    } else {
      for (let i = 0; i < menuBar.length; i++) {
        if (menuBar[i].child == null) {
          initMatrix[i] = 0;
        } else {
          initMatrix[i] = 0;
        }
      }
      setDisplayMatrix(initMatrix);
    }
  }, []);

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
        <FontAwesomeIcon
          icon={menuElement.icon}
          width={20}
          height={20}
        ></FontAwesomeIcon>
        <Box>
          <p>{menuElement.title}</p>
        </Box>
        <FontAwesomeIcon
          style={{ display: menuElement.child?.length ? "block" : "none" }}
          className="angle-down-icon"
          icon={faAngleDown}
        ></FontAwesomeIcon>
      </Box>
      {menuElement.child?.map((menuChild, index2) => (
        <Link
          href={menuChild.url}
          className={`menu-element-child-container ${
            route.pathname === menuChild.url ? "bg-gray-800" : ""
          }`}
          key={index2}
          sx={{ display: displayMatrix[index] == 1 ? "flex" : "none" }}
        >
          {menuChild.title}
        </Link>
      ))}
    </Box>
  ));
  return <Box className="big-menu">{listMenu}</Box>;
}
