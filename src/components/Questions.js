import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Questions = ({ questions }) => {
  return (
    <Box sx={{ mt: "1.25rem" }}>
      <Typography variant="h4">Vragen</Typography>
      <List>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", marginRight: "1rem" }}
            >
              {index + 1}
            </Typography>
            <ListItemText
              primary={question}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Questions;
