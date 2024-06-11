import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ backgroundColor: "#FFF9E2", width: "100%" }}
    >
      <Header />

      <Box display="flex" flexGrow={1}>
        <Sidebar />

        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            maxWidth="lg"
            style={{ width: "100%" }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
