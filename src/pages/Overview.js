import React from "react";
import { Box } from "@mui/material";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import ExtraLargeCard from "../components/XLCard";
import EvaluationCard from "../components/EvaluationCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Overzicht = () => {
  return (
    <Box
      sx={{
        paddingTop: "90px",
        paddingLeft: "40px",
        backgroundColor: "#FFF9E2",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: 2,
          marginLeft: "120px", // Space for the Sidebar
        }}
      >
        {/* Eerste rij */}
        <Box sx={{ flex: "0 0 calc(25% - 20px)", height: "auto" }}>
          <MediumCard
            title="Aantal Mentoren In App"
            value="889"
            description="8.5% Meer dan vorig jaar"
          />
        </Box>
        <Box sx={{ flex: "0 0 calc(33.33% - 20px)", height: "auto" }}>
          <EvaluationCard />
        </Box>
        <Box sx={{ flex: "0 0 calc(33.33% - 20px)", height: "auto" }}>
          <LargeCard
            title="Mentee Doelen"
            score="Gemiddelde Score Tussentijds: 3.6 / 5 Eind: 4.6 / 5"
          />
        </Box>
        <Box sx={{ flex: "0 0 calc(25% - 20px)", height: "auto" }}>
          <MediumCard
            title="Mentoren met Meer dan 1 mentee"
            value="65"
            description={<a href="#">Bekijk de Mismatch</a>}
          />
        </Box>
        <Box sx={{ flex: "0 0 calc(25% - 20px)", height: "auto" }}>
          <MediumCard
            title="Band Mentor-Mentee"
            score="4.6 / 5"
            quotes={`
              "Ik ga mijn mentee missen na MoZ"
              "Kijk uit naar elke week"
            `}
          />
        </Box>
        <Box sx={{ flex: "0 0 calc(16.66% - 20px)", height: "auto" }}>
          <SmallCard title="Veiligheid" score="5.0 / 5" />
        </Box>
        <Box sx={{ flex: "0 0 calc(8.33% - 20px)", height: "auto" }}>
          <SmallCard title="Motivatie" score="3.5 / 5" />
        </Box>
        <Box sx={{ flex: "0 0 calc(25% - 20px)", height: "auto" }}>
          <MediumCard
            title="Terugblik"
            score="4.7 / 5"
            quotes={`"Zo veel geleerd!"`}
          />
        </Box>
        <Box sx={{ flex: "0 0 calc(33.33% - 20px)", height: "auto" }}>
          <LargeCard title="Mentor Doelen" score="Mentor doelen beschrijving" />
        </Box>
        <Box sx={{ flex: "0 0 calc(58.33% - 20px)", height: "auto" }}>
          <ExtraLargeCard
            title="MoZ-programma (Mentor)"
            scores={[
              { label: "Algemeen", value: 4.1 },
              { label: "Voorbereiding", value: 2.9 },
              { label: "Intervisies", value: 3.6 },
              { label: "MoZ-docent", value: 4.0 },
              { label: "Mentee School", value: 4.2 },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Overzicht;
