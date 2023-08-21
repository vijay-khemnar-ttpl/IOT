import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';

import Snackbar from "./ui-component/snackbar";

import Header from "./views/Header";
import Footer from "./views/Footer";
import Routes from "./routes/allroutes";
import { red } from "@mui/material/colors";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
  const isForgotPasswordPage = location.pathname === "/forgot";
  const isRegisterPage = location.pathname === "/register";
  const isCreateOrganizationPage = location.pathname === "/create_organization";
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const shouldDisplaySideMenu = !(isLoginPage || isForgotPasswordPage || isRegisterPage || isCreateOrganizationPage);
  const shouldDisplayFooter = !(isLoginPage || isForgotPasswordPage || isRegisterPage);

  const [expanded, setExpanded] = useState(true);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", minHeight: !shouldDisplaySideMenu ? "90vh" : "100vh" }}>
      <Header />
      <Box style={{ display: "flex", flex: 1 }}>
        {shouldDisplaySideMenu && (
          <Box
            style={{
              flex: expanded ? "0 0 200px" : "0 0 50px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <List style={{ marginTop: "10px" }}>
              <Tooltip title="Dashboard" placement="right">
                <ListItem button component={Link} to="/dashboard"
                  onClick={() => handleTabClick("Dashboard")}
                  style={{
                    backgroundColor: selectedTab === "Dashboard" ? "#b3e0ff" : "transparent", borderRadius: 6,
                    // "&:hover": {
                    //   backgroundColor: "red",
                    // }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="Dashboard" />}
                </ListItem>
              </Tooltip>
              <Tooltip title="My Devices" placement="right">
                <ListItem button component={Link} to="/my_devices"
                  onClick={() => handleTabClick("My Devices")}
                  style={{
                    backgroundColor: selectedTab === "My Devices" ? "#b3e0ff" : "transparent", borderRadius: 6,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DevicesIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="My Devices" />}
                </ListItem>
              </Tooltip>
              <Tooltip title="Organizations" placement="right">
                <ListItem button component={Link} to="/organizations"
                  onClick={() => handleTabClick("Organizations")}
                  style={{
                    backgroundColor: selectedTab === "Organizations" ? "#b3e0ff" : "transparent", borderRadius: 6,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <CorporateFareIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="Organizations" />}
                </ListItem>
              </Tooltip>
              <Tooltip title="Sites" placement="right">
                <ListItem button component={Link} to="/sites"
                  onClick={() => handleTabClick("Sites")}
                  style={{
                    backgroundColor: selectedTab === "Sites" ? "#b3e0ff" : "transparent", borderRadius: 6,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <ViewListIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="Sites" />}
                </ListItem>
              </Tooltip>
              <Tooltip title="About Me" placement="right">
                <ListItem button component={Link} to="/user_profile"
                  onClick={() => handleTabClick("About Me")}
                  style={{
                    backgroundColor: selectedTab === "About Me" ? "#b3e0ff" : "transparent", borderRadius: 6,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <PersonIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="Me" />}
                </ListItem>
              </Tooltip>
            </List>
            <IconButton onClick={toggleMenu} style={{ position: "absolute", bottom: "10px" }}>
              <MenuOpenIcon />
            </IconButton>
          </Box>
        )}
        <Box
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Routes />
        </Box>
      </Box>
      <Snackbar />
      {!shouldDisplayFooter && <Footer />}
    </Box>
  );
}

export default App;
