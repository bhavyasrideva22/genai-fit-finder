import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/assessment";
import { likertOptions } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  value: string | number | undefined;
  onAnswer: (questionId: string, value: string | number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  value,
  onAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const handleLikertResponse = (selectedValue: string) => {
    const numericValue = likertOptions.indexOf(selectedValue) + 1;
    onAnswer(question.id, numericValue);
  };

  const handleMultipleChoice = (selectedValue: string) => {
    onAnswer(question.id, selectedValue);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </span>
        </div>
        <CardTitle className="text-lg">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === "likert" && (
          <RadioGroup
            value={value ? likertOptions[Number(value) - 1] : ""}
            onValueChange={handleLikertResponse}
            className="space-y-3"
          >
            {likertOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "multiple-choice" && question.options && (
          <RadioGroup
            value={value as string || ""}
            onValueChange={handleMultipleChoice}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "yes-no" && (
          <RadioGroup
            value={value as string || ""}
            onValueChange={handleMultipleChoice}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`} className="flex-1 cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`} className="flex-1 cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};