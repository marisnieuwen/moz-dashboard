import React from "react";
import { Typography } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";
import { useData } from "../context/DataContext";
import "../styles/reportStyles.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import VeranderTheorie from "../images/verandertheorie.svg";

// Import the emoji images
import Emoji1 from "../images/emoji-1.svg";
import Emoji2 from "../images/emoji-2.svg";
import Emoji3 from "../images/emoji-3.svg";
import Emoji4 from "../images/emoji-4.svg";
import Emoji5 from "../images/emoji-5.svg";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale);

// Generate Bar chart data
const getBarChartData = (label, data) => ({
  labels: ["Mentor", "Mentee"],
  datasets: [
    {
      label,
      data,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ],
});

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

// Function to generate the PDF
const generatePDF = async () => {
  // Select the report container
  const report = document.querySelector(".report-container");
  // Convert the report container to a canvas
  const canvas = await html2canvas(report, { scale: 2 });
  // Convert the canvas to an image
  const imgData = canvas.toDataURL("image/png");
  // New instance of jsPDF
  const pdf = new jsPDF("p", "mm", "a4");

  // Margins and dimensions for the PDF
  const margin = 10;
  const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const pdfHeight = pdf.internal.pageSize.getHeight() - margin * 2;

  // Get the image properties
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = margin;

  // Add the image to the PDF
  pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add extra pages if the image height is larger than the PDF height
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  // Save the PDF
  pdf.save("Voortgangsrapportage.pdf");
};

const Report = () => {
  const { evaluationData, menteeSchoolData } = useData();

  if (!evaluationData || !menteeSchoolData) return <p>Loading...</p>;

  // Extracting average scores
  const satisfaction = [
    evaluationData["Band Mentor-Mentee"].averageMentorScore,
    evaluationData["Band Mentor-Mentee"].averageMenteeScore,
  ];
  const attendance = [
    evaluationData["Doelen"].averageMentorScore,
    evaluationData["Doelen"].averageMenteeScore,
  ];
  const relationship = [
    evaluationData["Motivatie"].averageMentorScore,
    evaluationData["Motivatie"].averageMenteeScore,
  ];
  const motivation = [
    evaluationData["Terugblik"].averageMentorScore,
    evaluationData["Terugblik"].averageMenteeScore,
  ];
  const equipment = [
    evaluationData["Veiligheid (Sfeer)"].averageMentorScore,
    evaluationData["Veiligheid (Sfeer)"].averageMenteeScore,
  ];

  // Extracting total evaluation percentages
  const totalEvaluationPercentage = menteeSchoolData.totalEvaluationPercentage;
  const schoolsData = menteeSchoolData.schoolsData;

  return (
    <div className="report-container">
      <h1>Voortgangsrapportage Mentoren op Zuid</h1>
      <p>Schooljaar: 2023 - 2024</p>

      <p>
        Voor je ligt de voortgangsrapportage van Mentoren op Zuid van het hele
        programma. Het doel van deze rapportage is om inzicht te geven in hoe de
        start van het mentortraject in de verschillende groepen is verlopen, hoe
        de mentoren en mentees hun eigen voortgang beoordelen, en waar
        bijsturing nodig en mogelijk is.
      </p>

      <h2>Het rapport biedt onder andere informatie over:</h2>
      <p>
        Hoe tevreden de deelnemers zijn over de mentoring. Wat er tot nu toe
        tijdens de mentoring is gebeurd. Hoe gemotiveerd de deelnemers zijn. Hoe
        de deelnemers samenwerken en hebben van een mentor/mentee bevalt. Hoe de
        sfeer is tijdens de bijeenkomsten en over de MoZ voorzieningen voor de
        mentor.
      </p>

      <h2>Verandertheorie van Mentoren op Zuid</h2>
      <p>
        De onderwerpen in deze rapportage zijn ontleend aan de verandertheorie
        van Mentoren op Zuid. De verandertheorie beschrijft alle processen
        binnen het programma die bij elkaar leiden tot de beoogde uitkomst:
        persoonlijke groei en ontwikkeling bij mentoren en mentees.
      </p>
      <div className="image-container">
        <img
          className="image-verander"
          src={VeranderTheorie}
          alt="Verandertheorie"
        />
      </div>
      <h3>Kwaliteitszorgbeleid</h3>
      <p>
        Deze rapportage maakt onderdeel uit van het kwaliteitszorgbeleid van
        Mentoren op Zuid. Alle belangrijke betrokkenen zoals de mentoren, hun
        docenten, de docenten van de leerlingen, de modulehouders en teamleiders
        ontvangen een eigen rapportage met daarin de voor hen relevante
        gegevens. Zo kunnen de betrokkenen zelf werken aan een verbetering van
        hun proces. De rapportages vormen de input voor de gesprekken tussen
        programmateam en de verschillende betrokkenen.
      </p>

      <h2>1. Tevredenheid deelnemers</h2>
      <div style={{ width: "400px", height: "200px" }}>
        <Bar data={getBarChartData("Tevredenheid", satisfaction)} />
      </div>

      <h2>3. Wederzijdse band</h2>
      <div className="band-container">
        {relationship.map((bond, index) => (
          <div key={index}>
            <img
              src={getEmojiIcon(bond)}
              alt={`Bond score ${bond}`}
              style={{ width: "80px", height: "80px" }}
            />
            <Typography variant="body1">{`${bond}/5`}</Typography>
          </div>
        ))}
      </div>

      <h2>4. Motivatie van mentoren en mentees</h2>
      <div style={{ width: "400px", height: "200px" }}>
        <Bar data={getBarChartData("Motivatie", motivation)} />
      </div>

      <h2>5. Toerusting van mentoren</h2>
      <div style={{ width: "400px", height: "200px" }}>
        <Bar data={getBarChartData("Toerusting", equipment)} />
      </div>

      <h3>Evaluatie Percentage per School</h3>
      <ul>
        {schoolsData.map((school, index) => (
          <li key={index}>
            {school.name}: {school.evaluationPercentage}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export { generatePDF, Report };
