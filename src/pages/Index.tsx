import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Introduction } from "@/components/Introduction";
import { PsychologicalFit } from "@/components/PsychologicalFit";
import { TechnicalAptitude } from "@/components/TechnicalAptitude";
import { WISCARAnalysis } from "@/components/WISCARAnalysis";
import { Results } from "@/components/Results";
import { AssessmentResponse, AssessmentResult } from "@/types/assessment";
import { calculateResults } from "@/utils/scoring";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(20);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setCurrentStep(1);
    setProgress(40);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setProgress(20 + (step * 20));
  };

  const handleUpdateResponse = (questionId: string, value: string | number) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, value } : r);
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep === 4) {
      // Calculate results before showing results page
      const calculatedResult = calculateResults(responses);
      setResult(calculatedResult);
    }
    setCurrentStep(nextStep);
    setProgress(20 + (nextStep * 20));
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    setProgress(20 + (prevStep * 20));
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(20);
    setResponses([]);
    setResult(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Introduction onStart={handleStart} />;
      case 1:
        return (
          <PsychologicalFit
            responses={responses}
            onUpdateResponse={handleUpdateResponse}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <TechnicalAptitude
            responses={responses}
            onUpdateResponse={handleUpdateResponse}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <WISCARAnalysis
            responses={responses}
            onUpdateResponse={handleUpdateResponse}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return result ? (
          <Results result={result} onRestart={handleRestart} />
        ) : (
          <div>Loading results...</div>
        );
      default:
        return <Introduction onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header progress={progress} />
      <Navigation currentStep={currentStep} onStepChange={handleStepChange} />
      <main>
        {renderCurrentStep()}
      </main>
    </div>
  );
};

export default Index;
