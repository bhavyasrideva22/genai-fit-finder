export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'yes-no';
  options?: string[];
  category: string;
  subcategory?: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface ScoreResult {
  category: string;
  score: number;
  maxScore: number;
  interpretation: string;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscarScores: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  careerPaths: string[];
  nextSteps: string[];
}