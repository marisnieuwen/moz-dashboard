import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { jsPDF } from "jspdf";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useData } from "../context/DataContext";
import { generatePDF, Report } from "../report_templates/RapportageTemplate";

const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "90vh",
  borderRadius: "0.375rem",
  backgroundColor: "white",
  boxShadow:
    "-2px 21px 6px 0px rgba(0, 0, 0, 0.00), -1px 14px 5px 0px rgba(0, 0, 0, 0.01), -1px 8px 5px 0px rgba(0, 0, 0, 0.03), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
}));

const HeaderFrame = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: 2,
}));

const FooterFrame = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 2,
}));

const ContentFrame = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative",
}));

const StyledButton = styled(Button)(({ variant }) => ({
  display: "flex",
  height: "3.625rem",
  padding: "0.8125rem 1.625rem",
  gap: "0.625rem",
  flex: "1 0 0",
  maxWidth: "20%",
  textTransform: "none", // Zorg ervoor dat de tekst niet in hoofdletters staat
  borderRadius: "0.375rem",
  ...(variant === "outlined"
    ? { color: "#182C61", border: "2px solid #182C61" }
    : { background: "#182C61", color: "#fff" }),
}));

const RapportageModal = ({ open, handleClose }) => {
  const { evaluationData, menteeSchoolData } = useData();

  if (!evaluationData || !menteeSchoolData) return <p>Loading...</p>;

  const data = {
    satisfaction: [
      evaluationData["Band Mentor-Mentee"].averageMentorScore,
      evaluationData["Band Mentor-Mentee"].averageMenteeScore,
    ],
    attendance: [
      evaluationData["Doelen"].averageMentorScore,
      evaluationData["Doelen"].averageMenteeScore,
    ],
    relationship: [
      evaluationData["Motivatie"].averageMentorScore,
      evaluationData["Motivatie"].averageMenteeScore,
    ],
    motivation: [
      evaluationData["Terugblik"].averageMentorScore,
      evaluationData["Terugblik"].averageMenteeScore,
    ],
    equipment: [
      evaluationData["Veiligheid (Sfeer)"].averageMentorScore,
      evaluationData["Veiligheid (Sfeer)"].averageMenteeScore,
    ],
    totalEvaluationPercentage: menteeSchoolData.totalEvaluationPercentage,
    schoolsData: menteeSchoolData.schoolsData,
  };

  const handleGeneratePDF = () => {
    generatePDF(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        <HeaderFrame>
          <Typography id="modal-title" variant="h4" component="h2">
            Rapportage maken en exporteren
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </HeaderFrame>
        <ContentFrame>
          <Report data={data} />
        </ContentFrame>
        <FooterFrame>
          <StyledButton
            variant="contained"
            onClick={handleGeneratePDF}
            startIcon={<DownloadRoundedIcon />}
          >
            Downloaden
          </StyledButton>
        </FooterFrame>
      </ModalContainer>
    </Modal>
  );
};

export default RapportageModal;
