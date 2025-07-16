import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Target, BarChart, Trophy } from "lucide-react";

interface NavigationProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { id: 0, name: "Introduction", icon: BookOpen },
  { id: 1, name: "Psychological Fit", icon: Brain },
  { id: 2, name: "Technical Aptitude", icon: Target },
  { id: 3, name: "WISCAR Analysis", icon: BarChart },
  { id: 4, name: "Your Results", icon: Trophy },
];

export const Navigation = ({ currentStep, onStepChange }: NavigationProps) => {
  return (
    <nav className="w-full bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <Button
                key={step.id}
                variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                size="sm"
                onClick={() => onStepChange(step.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {step.name}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};