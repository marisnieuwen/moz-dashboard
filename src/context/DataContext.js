import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchMenteescholenData,
  fetchEvaluationsData,
  fetchRecentBandMentorMenteeAnswers,
  fetchPerTrajectBandMentorMenteeAnswers,
} from "../utils/dataUtils";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [menteeSchoolData, setMenteeSchoolData] = useState(null);
  const [evaluationData, setEvaluationData] = useState(null);
  const [recentAnswers, setRecentAnswers] = useState(null);
  const [perTrajectData, setPerTrajectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const menteeData = await fetchMenteescholenData();
      const evalData = await fetchEvaluationsData();
      const answersData = await fetchRecentBandMentorMenteeAnswers();
      const trajectData = await fetchPerTrajectBandMentorMenteeAnswers();

      setMenteeSchoolData(menteeData);
      setEvaluationData(evalData);
      setRecentAnswers(answersData);
      setPerTrajectData(trajectData);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        menteeSchoolData,
        evaluationData,
        recentAnswers,
        perTrajectData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
