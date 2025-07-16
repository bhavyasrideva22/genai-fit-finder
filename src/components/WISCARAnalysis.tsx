import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";
import { wiscarQuestions } from "@/data/questions";
import { AssessmentResponse } from "@/types/assessment";
import { Flame, Heart, Wrench, Brain, TrendingUp, MapPin } from "lucide-react";

interface WISCARAnalysisProps {
  responses: AssessmentResponse[];
  onUpdateResponse: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const WISCARAnalysis = ({
  responses,
  onUpdateResponse,
  onNext,
  onPrevious
}: WISCARAnalysisProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = wiscarQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / wiscarQuestions.length) * 100;
  
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const allAnswered = wiscarQuestions.every(q => 
    responses.some(r => r.questionId === q.id && r.value !== undefined)
  );

  const handleNext = () => {
    if (currentQuestionIndex < wiscarQuestions.length - 1) {
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
        <h1 className="text-3xl font-bold mb-4">WISCAR Framework Analysis</h1>
        <p className="text-muted-foreground mb-4">
          The WISCAR framework provides a comprehensive view of your readiness by examining 
          six key dimensions that predict success in Generative AI careers.
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="text-center p-4">
            <Flame className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-semibold">Will</h3>
            <p className="text-xs text-muted-foreground">Grit & persistence</p>
          </Card>
          <Card className="text-center p-4">
            <Heart className="h-8 w-8 mx-auto mb-2 text-pink-500" />
            <h3 className="font-semibold">Interest</h3>
            <p className="text-xs text-muted-foreground">Authentic passion</p>
          </Card>
          <Card className="text-center p-4">
            <Wrench className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <h3 className="font-semibold">Skill</h3>
            <p className="text-xs text-muted-foreground">Current ability</p>
          </Card>
          <Card className="text-center p-4">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Cognitive</h3>
            <p className="text-xs text-muted-foreground">Mental readiness</p>
          </Card>
          <Card className="text-center p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Ability</h3>
            <p className="text-xs text-muted-foreground">Learning capacity</p>
          </Card>
          <Card className="text-center p-4">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Real-World</h3>
            <p className="text-xs text-muted-foreground">Career alignment</p>
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
          totalQuestions={wiscarQuestions.length}
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
            {currentQuestionIndex < wiscarQuestions.length - 1 ? (
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
                View Your Results
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onPrevious}>
            ← Back to Technical Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};