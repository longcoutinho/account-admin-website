import React, {useEffect, useState} from "react";
import {Box, Link} from "@mui/material";
import {menuBar} from "@/constants/menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {getDisplayMenu, saveDisplayMenuToSessionStorage} from "@/constants/FnCommon";

export default function Menu() {
    const [displayMatrix, setDisplayMatrix] = useState<number[]>([]);

    useEffect(() => {
        let initMatrix = getDisplayMenu();
        if (initMatrix?.length) {
            setDisplayMatrix(initMatrix);
        }
        else {
            for(let i = 0; i < menuBar.length; i++) {
                if (menuBar[i].child == null) {
                    initMatrix[i] = 0;
                }
                else {
                    initMatrix[i] = 0;
                }
            }
            setDisplayMatrix(initMatrix);
        }
    }, [])

    const switchDisplayComponent = (ind: number) => {
        let newMatrix = displayMatrix;
        newMatrix[ind] = 1 - newMatrix[ind];
        setDisplayMatrix([...newMatrix]);
        saveDisplayMenuToSessionStorage(newMatrix);
    }

    const listMenu = menuBar.map((menuElement, index) => (
        <Box key={index} className="menu-element-wrapper">
                <Box onClick={() => switchDisplayComponent(index)} className="menu-element-content">
                    <FontAwesomeIcon icon={menuElement.icon}></FontAwesomeIcon>
                    <Box>
                        <p>{menuElement.title}</p>
                    </Box>
                    <FontAwesomeIcon style={{display: menuElement.child?.length ? "block" : "none"}} className="angle-down-icon" icon={faAngleDown}></FontAwesomeIcon>
                </Box>
            {menuElement.child?.map((menuChild, index2) => (
                <Box className="menu-element-child-container" key={index2} sx={{display: displayMatrix[index] == 1 ? "flex" : "none" }}>
                    <Link href={menuChild.url}>{menuChild.title}</Link>
                </Box>
            ))}
        </Box>
    ));
    return (
        <Box className="big-menu">
            {listMenu}
        </Box>
    );
};
