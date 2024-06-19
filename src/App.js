// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Container, Box } from "@mui/material";
import Layout from "./layouts/Layout";
import ReportPage from "./pages/ReportPage";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    // Wrap the app in the DataProvider
    <DataProvider>
      <Router>
        <Box
          sx={{
            backgroundColor: "#FFF9E2",
            paddingTop: "4.9rem",
            height: "100vh",
          }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<ReportPage />} />
              {/* Add other routes here */}
            </Routes>
          </Layout>
        </Box>
      </Router>
    </DataProvider>
  );
}

export default App;
