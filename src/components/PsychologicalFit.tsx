import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";
import { psychologicalQuestions } from "@/data/questions";
import { AssessmentResponse } from "@/types/assessment";
import { Brain, Heart, Lightbulb, Target } from "lucide-react";

interface PsychologicalFitProps {
  responses: AssessmentResponse[];
  onUpdateResponse: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PsychologicalFit = ({
  responses,
  onUpdateResponse,
  onNext,
  onPrevious
}: PsychologicalFitProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = psychologicalQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / psychologicalQuestions.length) * 100;
  
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const allAnswered = psychologicalQuestions.every(q => 
    responses.some(r => r.questionId === q.id && r.value !== undefined)
  );

  const handleNext = () => {
    if (currentQuestionIndex < psychologicalQuestions.length - 1) {
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
        <h1 className="text-3xl font-bold mb-4">Psychological Fit Assessment</h1>
        <p className="text-muted-foreground mb-4">
          This section evaluates your personality traits, interests, cognitive style, and motivation 
          to determine how well you align with the demands and culture of Generative AI work.
        </p>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center p-4">
            <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-semibold">Interest Scale</h3>
            <p className="text-sm text-muted-foreground">Authentic motivation</p>
          </Card>
          <Card className="text-center p-4">
            <Brain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Personality</h3>
            <p className="text-sm text-muted-foreground">Big 5 + traits</p>
          </Card>
          <Card className="text-center p-4">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold">Cognitive Style</h3>
            <p className="text-sm text-muted-foreground">Thinking preferences</p>
          </Card>
          <Card className="text-center p-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Motivation</h3>
            <p className="text-sm text-muted-foreground">Internal vs external</p>
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
          totalQuestions={psychologicalQuestions.length}
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
            {currentQuestionIndex < psychologicalQuestions.length - 1 ? (
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
                Continue to Technical Assessment
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onPrevious}>
            ← Back to Introduction
          </Button>
        </div>
      </div>
    </div>
  );
};