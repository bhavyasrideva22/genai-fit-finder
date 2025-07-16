import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";
import { technicalQuestions } from "@/data/questions";
import { AssessmentResponse } from "@/types/assessment";
import { Calculator, Code, Cpu, Zap } from "lucide-react";

interface TechnicalAptitudeProps {
  responses: AssessmentResponse[];
  onUpdateResponse: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const TechnicalAptitude = ({
  responses,
  onUpdateResponse,
  onNext,
  onPrevious
}: TechnicalAptitudeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = technicalQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / technicalQuestions.length) * 100;
  
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const allAnswered = technicalQuestions.every(q => 
    responses.some(r => r.questionId === q.id && r.value !== undefined)
  );

  const handleNext = () => {
    if (currentQuestionIndex < technicalQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Technical Readiness Assessment</h1>
        <p className="text-muted-foreground mb-4">
          This section evaluates your current technical skills, logical reasoning abilities, 
          and specific knowledge related to Generative AI concepts and technologies.
        </p>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center p-4">
            <Calculator className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">General Aptitude</h3>
            <p className="text-sm text-muted-foreground">Logic & reasoning</p>
          </Card>
          <Card className="text-center p-4">
            <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Prerequisites</h3>
            <p className="text-sm text-muted-foreground">Math, Python, ML</p>
          </Card>
          <Card className="text-center p-4">
            <Cpu className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Gen AI Knowledge</h3>
            <p className="text-sm text-muted-foreground">Models & concepts</p>
          </Card>
          <Card className="text-center p-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold">Applied Skills</h3>
            <p className="text-sm text-muted-foreground">APIs & tools</p>
          </Card>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      <div className="space-y-6">
        <QuestionCard
          question={currentQuestion}
          value={currentResponse?.value}
          onAnswer={onUpdateResponse}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={technicalQuestions.length}
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestionIndex < technicalQuestions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!currentResponse?.value}
              >
                Next Question
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!allAnswered}
                className="bg-primary"
              >
                Continue to WISCAR Analysis
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onPrevious}>
            ← Back to Psychological Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};