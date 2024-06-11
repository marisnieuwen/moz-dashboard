import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import PieChartIcon from "@mui/icons-material/PieChart";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const getMenuItemStyle = (path) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "84px",
    height: "84px", // Adjusted to fit both icon and text
    backgroundColor: location.pathname === path ? "white" : "transparent",
    borderRadius: location.pathname === path ? "0 5px 5px 0" : "none",
    textDecoration: "none",
    color: location.pathname === path ? "#6951C6" : "#020202",
    opacity: location.pathname === path ? 1 : 0.3003,
  });

  return (
    <Box
      sx={{
        display: "inline-flex",
        height: "100vh",
        padding: "86px 0 22px 0",
        flexDirection: "column",
        alignItems: "center",
        gap: "86px",
        flexShrink: 0,
        backgroundColor: "#6951C6",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "84px",
      }}
    >
      <Box component={Link} to="/" sx={getMenuItemStyle("/")}>
        <PieChartIcon fontSize="large" />
        <Typography variant="caption">Rapportages</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
