import React, { useState } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CustomAccordion from "../components/CustomAccordion";
import EvaluationCard from "../components/EvaluationCard";
import PerTrajectCard from "../components/PerTrajectCard";
import RapportageModal from "../components/RapportageModal";

// Import the icons
import BandIcon from "../images/icon-band.svg";
import TerugblikIcon from "../images/icon-terugblik.svg";
import DoelenIcon from "../images/icon-doelen.svg";
import MotivatieIcon from "../images/icon-motivatie.svg";
import SfeerIcon from "../images/icon-sfeer.svg";
import MozIcon from "../images/icon-moz.svg";

// Styled Button
const StyledButton = styled(Button)(({ variant }) => ({
  display: "flex",
  height: "3.625rem",
  padding: "0.8125rem 1.625rem",
  gap: "0.625rem",
  flex: "1 0 0",
  textTransform: "none", // Zorg ervoor dat de tekst niet in hoofdletters staat
  borderRadius: "0.375rem",
  ...(variant === "outlined"
    ? { color: "#182C61", border: "2px solid #182C61" }
    : { background: "#182C61", color: "#fff" }),
}));

// ReportPage Component
const ReportPage = () => {
  // State for the year
  const [year, setYear] = React.useState("2023 - 2024");
  // State for the modal
  const [modalOpen, setModalOpen] = useState(false);

  // Handle year change
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const iconMapping = {
    "Band Mentor-Mentee": BandIcon,
    Terugblik: TerugblikIcon,
    Doelen: DoelenIcon,
    Motivatie: MotivatieIcon,
    "Veiligheid (Sfeer)": SfeerIcon,
    "MoZ-Programma (Mentor)": MozIcon,
  };

  // Data for the accordions
  const accordionData = [
    {
      title: "Band Mentor-Mentee",
      questions: [
        "Ik kijk elke week uit naar Mentoren op Zuid (1 tot 5)",
        "Ben je blij met hoe we problemen samen oplossen? (1 tot 5)",
        "Waar kijk je naar uit als we samen zijn? (Open vraag)",
      ],
    },
    {
      title: "Terugblik",
      questions: [
        "Hoeveel plezier heb je gehad tijdens onze afspraken? (1 tot 5)",
        "Had je eerder een mentor of mentee willen hebben? (1 tot 5)",
        "Wat was voor jou een mooi moment tijdens MoZ? (Open vraag)",
      ],
    },
    {
      title: "Doelen",
      questions: [
        "Het werken aan je doelen tot nu toe heeft je geholpen. (1 tot 5)",
        "Door samen te werken, merken we allebei dat het steeds beter gaat met de doelen waar je graag aan wil werken. (1 tot 5)",
        "Waar wil je de volgende keren dat we elkaar zien nog extra aan werken? (Open vraag)",
      ],
    },
    {
      title: "Motivatie",
      questions: [
        "Hoeveel zin heb je om te werken aan je doelen elke week met mij? (1 tot 5)",
        "Heb je meer plezier in school sinds je een mentor of mentee hebt? (1 tot 5)",
        "Wat doe je als je merkt dat je minder zin hebt in school? (Open vraag)",
      ],
    },
    {
      title: "Veiligheid (Sfeer)",
      questions: [
        "Ik voel me veilig als ik met mijn mentor of mentee praat (1 tot 5)",
        "Ik kan veel vertellen aan mijn mentor of mentee. (1 tot 5)",
        "Vertel over een moment noemen waar ik goed naar je luisterde tijdens onze gesprekken. (Open vraag)",
      ],
    },
    {
      title: "MoZ-Programma (Mentor)",
      questions: [
        "Hoe beoordeel je het MoZ-programma? (1 tot 5)",
        "Heb je een goede voorbereiding gehad op MoZ? (1 tot 5)",
        "Hoe kunnen we het programma verbeteren? (Open vraag)",
      ],
    },
  ];
  return (
    <Box
      style={{
        backgroundColor: "#FFF9E2",
        minHeight: "100vh",
        padding: "32px",
      }}
    >
      {/* Top Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "1.25rem" }}
      >
        <Box>
          <StyledButton
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={handleModalOpen}
          >
            Rapportage Maken
          </StyledButton>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledButton variant="contained">Tussentijds</StyledButton>
          <StyledButton variant="outlined" style={{ marginLeft: "1rem" }}>
            Eind
          </StyledButton>
          <Select
            value={year}
            onChange={handleYearChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ marginLeft: "1rem" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
              disableScrollLock: true,
            }}
          >
            <MenuItem value="2023 - 2024">2023 - 2024</MenuItem>
            <MenuItem value="2022 - 2023">2022 - 2023</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Cards */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="stretch"
        gap="1.25rem"
        marginBottom="1.25rem"
      >
        <Box flex={1}>
          <EvaluationCard />
        </Box>
        <Box flex={1}>
          <PerTrajectCard />
        </Box>
      </Box>

      {/* Custom Accordions */}
      <Box>
        {accordionData.map((data, index) => (
          <CustomAccordion
            key={index}
            title={data.title}
            questions={data.questions}
            icon={iconMapping[data.title]}
          />
        ))}
      </Box>
      <RapportageModal open={modalOpen} handleClose={handleModalClose} />
    </Box>
  );
};

export default ReportPage;
