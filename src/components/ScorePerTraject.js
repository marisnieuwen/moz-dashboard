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

import Emoji1 from "../images/emoji-1.svg";
import Emoji2 from "../images/emoji-2.svg";
import Emoji3 from "../images/emoji-3.svg";
import Emoji4 from "../images/emoji-4.svg";
import Emoji5 from "../images/emoji-5.svg";

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

const getEmojiIcon = (score) => {
  if (score >= 5) {
    return Emoji5;
  } else if (score >= 4 && score < 5) {
    return Emoji4;
  } else if (score >= 3 && score < 4) {
    return Emoji3;
  } else if (score >= 2 && score < 3) {
    return Emoji2;
  } else {
    return Emoji1;
  }
};

const CenteredTableCell = styled(TableCell)({
  textAlign: "center",
});

const ScorePerTraject = () => {
  const { perTrajectData } = useData();

  if (!perTrajectData) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        mt: "1.25rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Traject</TableCell>
            <CenteredTableCell colSpan={2}>Vraag 1</CenteredTableCell>
            <CenteredTableCell colSpan={2}>Vraag 2</CenteredTableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <CenteredTableCell>Mentor</CenteredTableCell>
            <CenteredTableCell>Mentee</CenteredTableCell>
            <CenteredTableCell>Mentor</CenteredTableCell>
            <CenteredTableCell>Mentee</CenteredTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(perTrajectData).map((schoolName) => {
            const data = perTrajectData[schoolName];
            return (
              <TableRow key={schoolName}>
                <TableCell>
                  <Typography variant="body1">{schoolName}</Typography>
                </TableCell>
                <CenteredTableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img
                      src={getEmojiIcon(data.averageMentorScore1)}
                      alt="Mentor Emoji"
                      width="24"
                      height="24"
                    />
                    <Typography variant="trajectscore">
                      {data.averageMentorScore1}{" "}
                      <Typography
                        variant="trajectscore2"
                        component="span"
                        style={{ marginLeft: "0.25rem" }}
                      >
                        / 5
                      </Typography>
                    </Typography>
                  </Box>
                </CenteredTableCell>
                <CenteredTableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img
                      src={getEmojiIcon(data.averageMenteeScore1)}
                      alt="Mentee Emoji"
                      width="24"
                      height="24"
                    />
                    <Typography variant="trajectscore">
                      {data.averageMenteeScore1}{" "}
                      <Typography
                        variant="trajectscore2"
                        component="span"
                        style={{ marginLeft: "0.25rem" }}
                      >
                        / 5
                      </Typography>
                    </Typography>
                  </Box>
                </CenteredTableCell>
                <CenteredTableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img
                      src={getEmojiIcon(data.averageMentorScore2)}
                      alt="Mentor Emoji"
                      width="24"
                      height="24"
                    />
                    <Typography variant="trajectscore">
                      {data.averageMentorScore2}{" "}
                      <Typography
                        variant="trajectscore2"
                        component="span"
                        style={{ marginLeft: "0.25rem" }}
                      >
                        / 5
                      </Typography>
                    </Typography>
                  </Box>
                </CenteredTableCell>
                <CenteredTableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img
                      src={getEmojiIcon(data.averageMenteeScore2)}
                      alt="Mentee Emoji"
                      width="24"
                      height="24"
                    />
                    <Typography variant="trajectscore">
                      {data.averageMenteeScore2}{" "}
                      <Typography
                        variant="trajectscore2"
                        component="span"
                        style={{ marginLeft: "0.25rem" }}
                      >
                        / 5
                      </Typography>
                    </Typography>
                  </Box>
                </CenteredTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <CustomButton variant="contained">Zie alle resultaten</CustomButton>
    </Box>
  );
};

export default ScorePerTraject;
