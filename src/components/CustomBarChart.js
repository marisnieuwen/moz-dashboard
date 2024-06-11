import React from "react";
import { BarChart } from "@mui/x-charts";
import { useData } from "../context/DataContext";

const CustomBarChart = () => {
  const { evaluationData } = useData();

  if (!evaluationData) return <p>Loading...</p>;

  const mentorScore1 = parseFloat(
    evaluationData["Band Mentor-Mentee"].averageMentorScore1
  );
  const menteeScore1 = parseFloat(
    evaluationData["Band Mentor-Mentee"].averageMenteeScore1
  );
  const mentorScore2 = parseFloat(
    evaluationData["Band Mentor-Mentee"].averageMentorScore2
  );
  const menteeScore2 = parseFloat(
    evaluationData["Band Mentor-Mentee"].averageMenteeScore2
  );

  const data = [
    { label: "Vraag 1", mentor: mentorScore1, mentee: menteeScore1 },
    { label: "Vraag 2", mentor: mentorScore2, mentee: menteeScore2 },
  ];

  return (
    <BarChart
      width={600}
      height={300}
      series={[
        {
          data: data.map((d) => d.mentor),
          label: "Mentoren",
          color: "#6951C6",
        },
        {
          data: data.map((d) => d.mentee),
          label: "Mentees",
          color: "#93C19B",
        },
      ]}
      xAxis={[{ scaleType: "band", data: data.map((d) => d.label) }]}
      yAxis={[{ min: 1, max: 5 }]}
    />
  );
};

export default CustomBarChart;
