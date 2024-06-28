// src/utils/dataUtils.js
const { collection, getDocs, query, orderBy } = require("firebase/firestore");
const { firestore } = require("../database/firebaseConfig");

// Fetch the total number of mentoren, evaluaties, and the evaluation percentage for each school
export const fetchMenteescholenData = async () => {
  const querySnapshot = await getDocs(collection(firestore, "menteescholen"));
  let totalMentoren = 0;
  let totalEvaluaties = 0;

  const schoolsData = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const schoolMentoren = data.aantalMentoren || 0;
      const schoolEvaluaties = data.aantalEvaluaties || 0;

      totalMentoren += schoolMentoren;
      totalEvaluaties += schoolEvaluaties;

      const evaluationPercentage =
        (schoolEvaluaties / schoolMentoren) * 100 || 0;

      // Fetch the groups for each school
      const groupsSnapshot = await getDocs(
        collection(firestore, `menteescholen/${doc.id}/groepen`)
      );
      const groups = groupsSnapshot.docs.map((groupDoc) => ({
        id: groupDoc.id,
        naam: groupDoc.data().naam,
        ...groupDoc.data(),
      }));

      return {
        id: doc.id,
        name: data.naam || "Unknown School",
        evaluationPercentage,
        groups,
      };
    })
  );

  const totalEvaluationPercentage =
    (totalEvaluaties / totalMentoren) * 100 || 0;

  return {
    schoolsData,
    totalMentoren,
    totalEvaluaties,
    totalEvaluationPercentage,
  };
};

// Fetch the average scores for each theme
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

// Fetch the 3 most recent answers for question 3 from both mentor and mentee
export const fetchRecentBandMentorMenteeAnswers = async () => {
  const mentorQuerySnapshot = await getDocs(
    query(
      collection(firestore, `evaluaties/tussentijds/Band Mentor-Mentee`),
      orderBy("timestamp", "desc")
    )
  );

  // Fetch the 3 most recent answers for question 3 from both mentor and mentee
  const menteeQuerySnapshot = await getDocs(
    query(
      collection(firestore, `evaluaties/tussentijds/Band Mentor-Mentee`),
      orderBy("timestamp", "desc")
    )
  );

  let mentorAnswers = [];
  let menteeAnswers = [];

  // Iterate over each document and extract the mentor answers for question 3
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

  // Iterate over each document and extract the mentee answers for question 3
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

// Fetch all school names and their corresponding IDs
const fetchSchoolNames = async () => {
  const querySnapshot = await getDocs(collection(firestore, "menteescholen"));
  const schoolNames = {};

  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    schoolNames[doc.id] = data.naam || "Unknown School";
  });

  console.log("Fetched school names:", schoolNames); // Debug logging
  return schoolNames;
};

// Fetch and calculate the average scores for each school
export const fetchPerTrajectBandMentorMenteeAnswers = async () => {
  const schoolNames = await fetchSchoolNames();

  const querySnapshot = await getDocs(
    collection(firestore, `evaluaties/tussentijds/Band Mentor-Mentee`)
  );

  const schoolData = {};

  // Iterate over each document and calculate the average scores for each school
  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const mentee = data.mentee || {};
    const schoolId = mentee.schoolId;

    if (!schoolId) {
      console.error("Missing schoolId in document:", doc.id, data); // Log documents with missing schoolId
      return; // Skip this document
    }

    // Get the school name from the schoolId
    const schoolName = schoolNames[schoolId] || "Unknown School";

    // Initialize the school data if it doesn't exist
    if (!schoolData[schoolName]) {
      schoolData[schoolName] = {
        mentorScore1: 0,
        menteeScore1: 0,
        mentorScore2: 0,
        menteeScore2: 0,
        mentorCount1: 0,
        menteeCount1: 0,
        mentorCount2: 0,
        menteeCount2: 0,
      };
    }

    // Add the scores to the total scores and increment the count
    if (data.mentor_vraag1 !== undefined) {
      schoolData[schoolName].mentorScore1 += data.mentor_vraag1;
      schoolData[schoolName].mentorCount1++;
    }

    // Add the scores to the total scores and increment the count
    if (data.mentee_vraag1 !== undefined) {
      schoolData[schoolName].menteeScore1 += data.mentee_vraag1;
      schoolData[schoolName].menteeCount1++;
    }

    // Add the scores to the total scores and increment the count
    if (data.mentor_vraag2 !== undefined) {
      schoolData[schoolName].mentorScore2 += data.mentor_vraag2;
      schoolData[schoolName].mentorCount2++;
    }

    // Add the scores to the total scores and increment the count
    if (data.mentee_vraag2 !== undefined) {
      schoolData[schoolName].menteeScore2 += data.mentee_vraag2;
      schoolData[schoolName].menteeCount2++;
    }
  });

  // Calculate the average scores for each school
  Object.keys(schoolData).forEach((school) => {
    const data = schoolData[school];
    data.averageMentorScore1 = (data.mentorScore1 / data.mentorCount1).toFixed(
      1
    );
    data.averageMenteeScore1 = (data.menteeScore1 / data.menteeCount1).toFixed(
      1
    );
    data.averageMentorScore2 = (data.mentorScore2 / data.mentorCount2).toFixed(
      1
    );
    data.averageMenteeScore2 = (data.menteeScore2 / data.menteeCount2).toFixed(
      1
    );
  });

  return schoolData;
};
