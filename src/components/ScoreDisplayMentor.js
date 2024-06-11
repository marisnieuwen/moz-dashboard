import React from "react";
import { Box, Typography } from "@mui/material";
import { useData } from "../context/DataContext";

import Emoji1 from "../images/emoji-1.svg";
import Emoji2 from "../images/emoji-2.svg";
import Emoji3 from "../images/emoji-3.svg";
import Emoji4 from "../images/emoji-4.svg";
import Emoji5 from "../images/emoji-5.svg";

const getEmojiIcon = (score) => {
  if (score === 5) {
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

const ScoreDisplayMentor = ({ title, color, role }) => {
  const { evaluationData } = useData();

  if (!evaluationData) return <p>Loading...</p>;

  const averageScore = evaluationData["Band Mentor-Mentee"].averageMentorScore;

  const emojiIcon = getEmojiIcon(averageScore);

  const titleVariant = role === "mentor" ? "h5" : "h6"; // Customize variants based on role

  // Split the title into two parts
  const [firstWord, secondWord] = title.split(" ");

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      style={{ color }}
      sx={{ gap: "0.5rem" }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant={titleVariant} component="span">
          {firstWord}
        </Typography>
        <Typography
          variant="body4"
          component="span"
          style={{ marginLeft: "0.25rem" }}
        >
          {secondWord}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" style={{ gap: "1rem" }}>
        <img src={emojiIcon} alt={`${title} icon`} width="36" height="36" />
        <Box display="flex" alignItems="baseline">
          <Typography variant="score1" component="span">
            {averageScore}
          </Typography>
          <Typography
            variant="score2"
            component="span"
            style={{ marginLeft: "0.25rem" }}
          >
            / 5
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreDisplayMentor;
