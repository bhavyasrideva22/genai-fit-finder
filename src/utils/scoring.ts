import { AssessmentResponse, AssessmentResult, WISCARScore } from "@/types/assessment";
import { psychologicalQuestions, technicalQuestions, wiscarQuestions } from "@/data/questions";

export const calculateResults = (responses: AssessmentResponse[]): AssessmentResult => {
  // Calculate Psychological Fit Score
  const psychResponses = responses.filter(r => 
    psychologicalQuestions.some(q => q.id === r.questionId)
  );
  
  const interestScore = calculateCategoryScore(psychResponses, "interest");
  const personalityScore = calculateCategoryScore(psychResponses, "personality");
  const cognitiveScore = calculateCategoryScore(psychResponses, "cognitive");
  const motivationScore = calculateCategoryScore(psychResponses, "motivation");
  
  const psychologicalFit = Math.round((interestScore + personalityScore + cognitiveScore + motivationScore) / 4);

  // Calculate Technical Readiness Score
  const techResponses = responses.filter(r => 
    technicalQuestions.some(q => q.id === r.questionId)
  );
  
  const aptitudeScore = calculateTechnicalScore(techResponses, "aptitude");
  const prereqScore = calculateTechnicalScore(techResponses, "prerequisites");
  const genaiScore = calculateTechnicalScore(techResponses, "genai");
  
  const technicalReadiness = Math.round((aptitudeScore + prereqScore + genaiScore) / 3);

  // Calculate WISCAR Scores
  const wiscarResponses = responses.filter(r => 
    wiscarQuestions.some(q => q.id === r.questionId)
  );
  
  const wiscarScores: WISCARScore = {
    will: calculateCategoryScore(wiscarResponses, "will"),
    interest: calculateCategoryScore(wiscarResponses, "interest"),
    skill: calculateCategoryScore(wiscarResponses, "skill"),
    cognitive: calculateCategoryScore(wiscarResponses, "cognitive"),
    ability: calculateCategoryScore(wiscarResponses, "ability"),
    realWorld: calculateCategoryScore(wiscarResponses, "real-world")
  };

  // Calculate Overall Score
  const overallScore = Math.round(
    (psychologicalFit * 0.4 + technicalReadiness * 0.3 + getWISCARAverage(wiscarScores) * 0.3)
  );

  // Determine Recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallScore >= 75) {
    recommendation = 'yes';
  } else if (overallScore >= 50) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }

  // Generate Career Paths and Next Steps
  const careerPaths = generateCareerPaths(psychologicalFit, technicalReadiness, wiscarScores);
  const nextSteps = generateNextSteps(recommendation, technicalReadiness, psychologicalFit);

  return {
    psychologicalFit,
    technicalReadiness,
    wiscarScores,
    overallScore,
    recommendation,
    careerPaths,
    nextSteps
  };
};

const calculateCategoryScore = (responses: AssessmentResponse[], category: string): number => {
  const categoryResponses = responses.filter(r => {
    const question = [...psychologicalQuestions, ...wiscarQuestions].find(q => q.id === r.questionId);
    return question?.category === category;
  });

  if (categoryResponses.length === 0) return 0;

  const total = categoryResponses.reduce((sum, r) => sum + Number(r.value), 0);
  const maxPossible = categoryResponses.length * 5; // Assuming 5-point Likert scale
  
  return Math.round((total / maxPossible) * 100);
};

const calculateTechnicalScore = (responses: AssessmentResponse[], category: string): number => {
  const categoryResponses = responses.filter(r => {
    const question = technicalQuestions.find(q => q.id === r.questionId);
    return question?.category === category;
  });

  if (categoryResponses.length === 0) return 0;

  // For technical questions, we'll award points based on correct answers
  // This is simplified - in a real implementation, you'd have correct answer keys
  const correctAnswers = categoryResponses.filter(r => {
    // Simplified scoring logic - in practice, you'd check against correct answers
    if (category === "aptitude") {
      return ["11", "70", "To introduce non-linearity"].includes(r.value as string);
    } else if (category === "prerequisites") {
      return ["NumPy", "Supervised has labeled training data, unsupervised doesn't"].includes(r.value as string);
    } else if (category === "genai") {
      return ["Attention mechanisms", "Providing examples in the prompt", "Text classification"].includes(r.value as string);
    }
    return false;
  }).length;

  return Math.round((correctAnswers / categoryResponses.length) * 100);
};

const getWISCARAverage = (scores: WISCARScore): number => {
  const values = Object.values(scores);
  return values.reduce((sum, score) => sum + score, 0) / values.length;
};

const generateCareerPaths = (psychFit: number, techReadiness: number, wiscar: WISCARScore): string[] => {
  const paths: string[] = [];

  if (psychFit >= 75 && techReadiness >= 60) {
    paths.push("AI Research Engineer", "GenAI Product Manager");
  }
  
  if (wiscar.interest >= 80 && techReadiness < 60) {
    paths.push("Prompt Engineer", "Creative AI Developer");
  }
  
  if (psychFit >= 70 && wiscar.realWorld >= 70) {
    paths.push("Applied Machine Learning Scientist");
  }
  
  if (psychFit >= 60 && wiscar.cognitive >= 70) {
    paths.push("AI Ethicist / Policy Analyst");
  }

  return paths.length > 0 ? paths : ["Entry-level AI Assistant", "AI Tools User"];
};

const generateNextSteps = (recommendation: string, techReadiness: number, psychFit: number): string[] => {
  const steps: string[] = [];

  if (recommendation === 'yes') {
    steps.push(
      "Start with Python programming fundamentals",
      "Experiment with OpenAI Playground and prompt engineering",
      "Take 'Intro to Generative AI' course on Coursera or DeepLearning.AI",
      "Build a simple chatbot or text generation project"
    );
  } else if (recommendation === 'maybe') {
    if (techReadiness < 50) {
      steps.push(
        "Focus on building technical foundations first",
        "Learn Python programming basics",
        "Take a general 'What is AI?' course"
      );
    }
    if (psychFit < 60) {
      steps.push(
        "Explore Gen AI tools like ChatGPT and DALL·E",
        "Try creative writing or art generation exercises",
        "Join AI communities to explore interests"
      );
    }
  } else {
    steps.push(
      "Consider related paths like AI Product Management",
      "Explore UI/UX design for AI tools if creative but not technical",
      "Look into Data Analysis roles if logical thinking is strong",
      "Consider AI Ethics or Policy if interested in societal impact"
    );
  }

  return steps;
};