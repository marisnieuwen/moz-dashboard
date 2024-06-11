// CustomCircularProgress.js
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const CustomCircularProgress = ({ value }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size={200}
        thickness={5}
        style={{ color: "#8280FF" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="percentage" component="div" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
