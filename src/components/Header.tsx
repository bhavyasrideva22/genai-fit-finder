import { Progress } from "@/components/ui/progress";

interface HeaderProps {
  progress: number;
}

export const Header = ({ progress }: HeaderProps) => {
  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Should I Learn Generative AI?</h1>
            <p className="text-muted-foreground">Comprehensive Career Assessment & Guidance</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-foreground">{progress}% Complete</span>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
    </header>
  );
};