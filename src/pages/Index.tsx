import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Introduction } from "@/components/Introduction";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(20);

  const handleStart = () => {
    setCurrentStep(1);
    setProgress(40);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setProgress(20 + (step * 20));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Introduction onStart={handleStart} />;
      case 1:
        return <div className="container mx-auto px-4 py-8"><h2 className="text-2xl font-bold">Psychological Fit Assessment</h2><p>Coming soon...</p></div>;
      case 2:
        return <div className="container mx-auto px-4 py-8"><h2 className="text-2xl font-bold">Technical Aptitude Test</h2><p>Coming soon...</p></div>;
      case 3:
        return <div className="container mx-auto px-4 py-8"><h2 className="text-2xl font-bold">WISCAR Analysis</h2><p>Coming soon...</p></div>;
      case 4:
        return <div className="container mx-auto px-4 py-8"><h2 className="text-2xl font-bold">Your Results</h2><p>Coming soon...</p></div>;
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
