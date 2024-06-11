// src/components/EvaluationCard.js
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CustomCircularProgress from "./CustomCircularProgress";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import PecentageIcon from "../images/icon-percentage.svg";
import RemoveIcon from "@mui/icons-material/Remove";
import { useData } from "../context/DataContext";

const CustomCard = styled(Box)({
  display: "flex",
  width: "100%",
  padding: "1rem 0.625rem",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.75rem",
  borderRadius: "0.875rem",
  background: "#FFF",
  height: "100%",
  boxShadow:
    "-2px 21px 6px 0px rgba(0, 0, 0, 0.00), -1px 14px 5px 0px rgba(0, 0, 0, 0.01), -1px 8px 5px 0px rgba(0, 0, 0, 0.03), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
});

const HeaderFrame = styled(Box)({
  display: "flex",
  height: "2.3125rem",
  padding: "var(--none, 0rem) 0.625rem",
  alignItems: "center",
  gap: "var(--3, 1.5rem)",
  alignSelf: "stretch",
});

const CustomCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "center",
});

const EvaluationCard = () => {
  const { menteeSchoolData } = useData();

  if (!menteeSchoolData) return <p>Loading...</p>;

  const {
    totalEvaluationPercentage,
    totalMentoren,
    totalEvaluaties,
    schoolsData,
  } = menteeSchoolData;

  // Find the school with the highest and lowest evaluation percentage
  const highestEvaluationSchool = schoolsData.reduce((prev, current) =>
    prev.evaluationPercentage > current.evaluationPercentage ? prev : current
  );
  const lowestEvaluationSchool = schoolsData.reduce((prev, current) =>
    prev.evaluationPercentage < current.evaluationPercentage ? prev : current
  );

  return (
    <CustomCard>
      <HeaderFrame>
        <img
          src={PecentageIcon}
          style={{ width: 42, height: 42, marginRight: "1rem" }}
        />
        <Typography variant="h4">Evaluatie Respons</Typography>
      </HeaderFrame>
      <CustomCardContent>
        <Box display="flex" alignItems="center">
          <CustomCircularProgress value={totalEvaluationPercentage} />
          <Box ml={3}>
            <Typography variant="body1" sx={{ mb: "2rem" }}>
              In totaal hebben{" "}
              <strong>{totalMentoren} mentoren en mentees</strong> de
              tussentijdsevaluatie ingevuld
            </Typography>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" color="#00B69B" mb={2}>
                <AddIcon style={{ marginRight: "0.25rem" }} />
                <Typography variant="body1">
                  Hoogste respons bij{" "}
                  <Typography variant="bodyhigh">
                    <strong>{highestEvaluationSchool.name}</strong>
                  </Typography>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" color="#F93C65" mb={2}>
                <RemoveIcon style={{ marginRight: "0.25rem" }} />
                <Typography variant="body1">
                  Laagste respons bij{" "}
                  <Typography variant="bodylow">
                    <strong>{lowestEvaluationSchool.name}</strong>
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CustomCardContent>
    </CustomCard>
  );
};

export default EvaluationCard;
