import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function MenuBar() {
    // const [expanded, setExpanded] = useState(true);

    // const toggleMenu = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "150px",
                backgroundColor: "#f0f0f0",
                minHeight: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <List style={{ marginTop: "70px" }}>
                <ListItem button component={Link} to="/dashboard">
                    Dashboard
                </ListItem>
                <ListItem button component={Link} to="/organizations">
                    Organizations
                </ListItem>
                <ListItem button component={Link} to="/sites">
                    Sites
                </ListItem>
            </List>
            {/* <IconButton onClick={toggleMenu} style={{ position: "absolute", bottom: "10px" }}>
                <MenuIcon />
            </IconButton> */}
        </Box>
    );
}
