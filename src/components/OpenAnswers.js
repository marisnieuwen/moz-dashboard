import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useData } from "../context/DataContext";

const CustomButton = styled(Button)({
  backgroundColor: "#182C61",
  display: "flex",
  borderRadius: "0.375rem",
  padding: "0.6rem 0.6rem",
  textTransform: "none",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#14244D",
  },
  alignSelf: "flex-end",
});

const OpenAnswers = (questionNumber) => {
  const { recentAnswers } = useData();

  if (!recentAnswers) return <p>Loading...</p>;

  const { mentorAnswers, menteeAnswers } = recentAnswers;

  return (
    <Box
      sx={{
        mt: "1.25rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Open vragen antwoorden
      </Typography>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box
          flex={1}
          marginRight="1rem"
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Mentoren
          </Typography>
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vraag</TableCell>
                  <TableCell>Antwoord</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mentorAnswers.map((answer, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body3">3</Typography>
                    </TableCell>
                    <TableCell>{answer.answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomButton variant="contained">
              Bekijk alle antwoorden
            </CustomButton>
          </Box>
        </Box>
        <Box
          flex={1}
          marginLeft="1rem"
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Mentees
          </Typography>
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vraag</TableCell>
                  <TableCell>Antwoord</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menteeAnswers.map((answer, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {" "}
                      <Typography variant="body3">3</Typography>
                    </TableCell>
                    <TableCell>{answer.answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomButton variant="contained">
              Bekijk alle antwoorden
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OpenAnswers;
