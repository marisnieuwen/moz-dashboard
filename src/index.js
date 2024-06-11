import React from "react";
import ReactDOM from "react-dom/client"; // Importeer de nieuwe client API
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Changed to serviceWorkerRegistration

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
    h1: {
      fontFamily: "Montserrat, Arial",
      fontSize: 22,
      fontWeight: 800,
      color: "#6951C6",
    },
    h2: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 700,
      fontSize: 20,
      color: "rgba(2, 2, 2, 0.87)",
    },
    h3: {
      fontFamily: "Montserrat, Arial",
      fontSize: 14,
      fontWeight: 600,
      color: "#202224",
    },
    h4: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 600,
      fontSize: 18,
      color: "#202224",
    },
    h5: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 800,
      fontSize: 16,
      color: "#6951C6",
    },
    h6: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 800,
      fontSize: 16,
      color: "#588f62",
      lineHeight: 1.334,
    },
    body1: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 400,
      fontSize: 16,
      color: "rgba(2, 2, 2, 0.60)",
    },
    body2: {
      fontFamily: "Montserrat, Arial",
      fontSize: 14,
      color: "rgba(2, 2, 2, 0.60)",
    },
    body3: {
      fontFamily: "Montserrat, Arial",
      fontSize: 12,
      fontWeight: 500,
      color: "rgba(2, 2, 2, 0.60)",
    },
    body4: {
      fontFamily: "Montserrat, Arial",
      fontSize: 16,
      fontWeight: 500,
      color: "#636566",
    },
    score1: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 700,
      fontSize: 28,
      color: "rgba(2, 2, 2, 0.87)",
    },
    score2: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 600,
      fontSize: 18,
      color: "rgba(2, 2, 2, 0.60)",
    },
    percentage: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 700,
      fontSize: 28,
      color: "#606060",
    },
    bodyhigh: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 600,
      fontSize: 16,
      color: "#00B69B",
    },
    bodylow: {
      fontFamily: "Montserrat, Arial",
      fontWeight: 600,
      fontSize: 16,
      color: "#F93C65",
    },
  },
});

// Zoek het root element
const container = document.getElementById("root");

// Maak een root met de nieuwe API
const root = ReactDOM.createRoot(container);

// Render de applicatie
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();

// reportWebVitals();
