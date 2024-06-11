import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        flexShrink: 0,
        boxShadow:
          "0px 20px 6px 0px rgba(0, 0, 0, 0.00), 0px 13px 5px 0px rgba(0, 0, 0, 0.01), 0px 7px 4px 0px rgba(0, 0, 0, 0.05), 0px 3px 3px 0px rgba(0, 0, 0, 0.09), 0px 1px 2px 0px rgba(0, 0, 0, 0.10)",
        display: "flex",
        alignItems: "center",
        padding: "0 120px",
        backgroundColor: "#FEFEFE",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Typography variant="h1">Rapportages</Typography>
      <Box sx={{ marginLeft: "auto" }}>
        <Typography variant="body1">Mentoren op Zuid</Typography>
        <Typography variant="body2">Admin</Typography>
      </Box>
    </Box>
  );
};

export default Header;
