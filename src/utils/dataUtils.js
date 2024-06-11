// src/utils/dataUtils.js
const {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} = require("firebase/firestore");
const { firestore } = require("../database/firebaseConfig");

export const fetchMenteescholenData = async () => {
  const querySnapshot = await getDocs(collection(firestore, "menteescholen"));
  let totalMentoren = 0;
  let totalEvaluaties = 0;

  const schoolsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const schoolMentoren = data.aantalMentoren || 0;
    const schoolEvaluaties = data.aantalEvaluaties || 0;

    totalMentoren += schoolMentoren;
    totalEvaluaties += schoolEvaluaties;

    const evaluationPercentage = (schoolEvaluaties / schoolMentoren) * 100 || 0;

    return {
      id: doc.id,
      name: data.naam || "Unknown School", // Assuming each document has a 'name' field for the school name
      evaluationPercentage,
    };
  });

  const totalEvaluationPercentage =
    (totalEvaluaties / totalMentoren) * 100 || 0;

  return {
    schoolsData,
    totalMentoren,
    totalEvaluaties,
    totalEvaluationPercentage,
  };
};

export const fetchEvaluationsData = async () => {
  const themes = [
    "Band Mentor-Mentee",
    "Doelen",
    "Motivatie",
    "Terugblik",
    "Veiligheid (Sfeer)",
  ];
  const evaluationsData = {};

  for (const theme of themes) {
    const querySnapshot = await getDocs(
      collection(firestore, `evaluaties/tussentijds/${theme}`)
    );
    let totalMenteeScore1 = 0;
    let totalMenteeScore2 = 0;
    let totalMentorScore1 = 0;
    let totalMentorScore2 = 0;
    let menteeCount1 = 0;
    let menteeCount2 = 0;
    let mentorCount1 = 0;
    let mentorCount2 = 0;

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const menteeScore1 = data.mentee_vraag1 || 0;
      const menteeScore2 = data.mentee_vraag2 || 0;
      const mentorScore1 = data.mentor_vraag1 || 0;
      const mentorScore2 = data.mentor_vraag2 || 0;

      // Add individual scores to the total scores
      totalMenteeScore1 += menteeScore1;
      totalMenteeScore2 += menteeScore2;
      totalMentorScore1 += mentorScore1;
      totalMentorScore2 += mentorScore2;

      // Increment the count by 1 for each score
      if (menteeScore1) menteeCount1++;
      if (menteeScore2) menteeCount2++;
      if (mentorScore1) mentorCount1++;
      if (mentorScore2) mentorCount2++;
    });

    const averageMenteeScore1 =
      (totalMenteeScore1 / menteeCount1).toFixed(1) || 0;
    const averageMenteeScore2 =
      (totalMenteeScore2 / menteeCount2).toFixed(1) || 0;
    const averageMentorScore1 =
      (totalMentorScore1 / mentorCount1).toFixed(1) || 0;
    const averageMentorScore2 =
      (totalMentorScore2 / mentorCount2).toFixed(1) || 0;

    evaluationsData[theme] = {
      averageMenteeScore1,
      averageMenteeScore2,
      averageMentorScore1,
      averageMentorScore2,
      averageMenteeScore:
        (
          (totalMenteeScore1 + totalMenteeScore2) /
          (menteeCount1 + menteeCount2)
        ).toFixed(1) || 0,
      averageMentorScore:
        (
          (totalMentorScore1 + totalMentorScore2) /
          (mentorCount1 + mentorCount2)
        ).toFixed(1) || 0,
    };
  }

  return evaluationsData;
};

export const fetchRecentBandMentorMenteeAnswers = async () => {
  const mentorQuerySnapshot = await getDocs(
    query(
      collection(firestore, `evaluaties/tussentijds/Band Mentor-Mentee`),
      orderBy("timestamp", "desc")
    )
  );

  const menteeQuerySnapshot = await getDocs(
    query(
      collection(firestore, `evaluaties/tussentijds/Band Mentor-Mentee`),
      orderBy("timestamp", "desc")
    )
  );

  let mentorAnswers = [];
  let menteeAnswers = [];

  mentorQuerySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.mentor_vraag3) {
      mentorAnswers.push({
        questionNumber: 3,
        answer: data.mentor_vraag3,
        timestamp: data.timestamp,
      });
    }
  });

  menteeQuerySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.mentee_vraag3) {
      menteeAnswers.push({
        questionNumber: 3,
        answer: data.mentee_vraag3,
        timestamp: data.timestamp,
      });
    }
  });

  // Sort by timestamp and limit to the 3 most recent
  mentorAnswers = mentorAnswers
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);
  menteeAnswers = menteeAnswers
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);

  return { mentorAnswers, menteeAnswers };
};
