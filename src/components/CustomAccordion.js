import React from "react";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomBarChart from "../components/CustomBarChart";
import ScoreDisplayMentor from "./ScoreDisplayMentor";
import ScoreDisplayMentee from "./ScoreDisplayMentee";
import OpenAnswers from "../components/OpenAnswers";
import Questions from "../components/Questions";
import MentorIcon from "../images/emoji-5.svg";
import MenteeIcon from "../images/emoji-5.svg";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  width: "100%",
  padding: "0.75rem 0.625rem",
  display: "flex",
  position: "unset",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: "0.375rem",
  background: "#FEFEFE",
  boxShadow:
    "-2px 21px 6px 0px rgba(0, 0, 0, 0.00), -1px 14px 5px 0px rgba(0, 0, 0, 0.01), -1px 8px 5px 0px rgba(0, 0, 0, 0.03), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  "&:not(:last-child)": {
    marginBottom: "1.25rem",
  },
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  "&.MuiAccordionSummary-root": {
    minHeight: "48px",
  },
  "&.Mui-expanded": {
    minHeight: "48px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "12px 0",
    width: "100%", // Ensure the content width is 100%
  },
  "&.Mui-expanded .MuiAccordionSummary-content": {
    margin: "12px 0",
    width: "100%", // Ensure the content width is 100%
  },
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
  gap: "1.25rem",
  width: "100%",
  padding: "0.625rem 1.25rem 1.25rem 2rem",
  flexGrow: 1,
}));

const HeaderFrame = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const ColumnContainer = styled(Box)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: "1.25rem",
  flexGrow: 1,
});

const RowContainer = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  flexGrow: 1,
});

const ContentFrame = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  flex: 1,
});

const ScoresFrame = styled(Box)({
  display: "flex",
  gap: "1.25rem",
});

const ChartFrame = styled(Box)({
  display: "flex",
  width: "50%",
  justifySelf: "flex-end",
});

const CustomAccordion = ({ title, questions, icon }) => (
  <StyledAccordion>
    <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
      <HeaderFrame>
        <img
          src={icon}
          alt={title}
          style={{ width: 36, height: 36, marginRight: "1rem" }}
        />
        <Typography variant="h2">{title}</Typography>
      </HeaderFrame>
    </CustomAccordionSummary>
    <CustomAccordionDetails>
      <ColumnContainer>
        <RowContainer>
          <ContentFrame>
            <Typography variant="h4">Gemiddelde Scores</Typography>
            <ScoresFrame>
              <ScoreDisplayMentor
                title="Mentor Score"
                color="#6951C6"
                icon={MentorIcon}
                role="mentor"
              />
              <ScoreDisplayMentee
                title="Mentee Score"
                color="#93C19B"
                icon={MenteeIcon}
                role="mentee"
              />
            </ScoresFrame>
            <Questions questions={questions} />
          </ContentFrame>
          <ChartFrame>
            <CustomBarChart />
          </ChartFrame>
        </RowContainer>
        <OpenAnswers />
      </ColumnContainer>
    </CustomAccordionDetails>
  </StyledAccordion>
);

export default CustomAccordion;
