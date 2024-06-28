import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
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
  flexDirection: "column",
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
  const [selectedStakeholder, setSelectedStakeholder] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

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
    schoolsData: menteeSchoolData.schoolsData.map((school) => ({
      ...school,
      groups: school.groups || [], // Zorg ervoor dat de groups-eigenschap bestaat
    })),
  };

  const handleGeneratePDF = () => {
    generatePDF(data, selectedStakeholder, selectedSchool, selectedGroup);
  };

  const handleStakeholderChange = (event) => {
    const value = event.target.value;
    setSelectedStakeholder((prev) => (prev === value ? "" : value));
    setSelectedSchool("");
    setSelectedGroup("");
  };

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
    setSelectedGroup(""); // Reset the selected group when a new school is selected
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const selectedSchoolData = menteeSchoolData.schoolsData.find(
    (school) => school.name === selectedSchool
  ) || { groups: [] };
  const allGroups = [].concat(
    ...menteeSchoolData.schoolsData.map((school) => school.groups || [])
  );

  console.log("Selected School Data:", selectedSchoolData); // Debugging statement
  console.log("All Groups:", allGroups); // Debugging statement

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        <HeaderFrame>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-title" variant="h4" component="h2">
              Rapportage maken en exporteren
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Selecteer de stakeholder:</Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedStakeholder === "Gemeente Rotterdam"}
                    onChange={handleStakeholderChange}
                    value="Gemeente Rotterdam"
                  />
                }
                label="Gemeente Rotterdam"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedStakeholder === "Menteeschool"}
                    onChange={handleStakeholderChange}
                    value="Menteeschool"
                  />
                }
                label="Menteeschool"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedStakeholder === "Mentee Leerkracht"}
                    onChange={handleStakeholderChange}
                    value="Mentee Leerkracht"
                  />
                }
                label="Mentee Leerkracht"
              />
            </FormGroup>
            {selectedStakeholder === "Menteeschool" && (
              <Box mt={2}>
                <Typography variant="h6">Selecteer een school:</Typography>
                <Select
                  fullWidth
                  value={selectedSchool || ""}
                  onChange={handleSchoolChange}
                >
                  {menteeSchoolData.schoolsData.map((school) => (
                    <MenuItem key={school.id} value={school.name}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
            {selectedStakeholder === "Mentee Leerkracht" && (
              <>
                <Box mt={2}>
                  <Typography variant="h6">Selecteer een school:</Typography>
                  <Select
                    fullWidth
                    value={selectedSchool || ""}
                    onChange={handleSchoolChange}
                  >
                    {menteeSchoolData.schoolsData.map((school) => (
                      <MenuItem key={school.id} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box mt={2}>
                  <Typography variant="h6">Selecteer een groep:</Typography>
                  <Select
                    fullWidth
                    value={selectedGroup || ""}
                    onChange={handleGroupChange}
                  >
                    {selectedSchoolData.groups.map((group) => (
                      <MenuItem key={group.id} value={group.naam}>
                        {group.naam}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </>
            )}
          </Box>
        </HeaderFrame>
        <ContentFrame>
          <Report
            data={data}
            stakeholder={selectedStakeholder}
            selectedSchool={selectedSchool}
            selectedGroup={selectedGroup}
          />
        </ContentFrame>
        <FooterFrame>
          <StyledButton
            variant="contained"
            onClick={handleGeneratePDF}
            startIcon={<DownloadRoundedIcon />}
            disabled={
              selectedStakeholder === "Mentee Leerkracht" && !selectedGroup
            }
          >
            Downloaden
          </StyledButton>
        </FooterFrame>
      </ModalContainer>
    </Modal>
  );
};

export default RapportageModal;
