import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/types/assessment";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Brain, Code, Target, Users, BookOpen, ArrowRight } from "lucide-react";

interface ResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const Results = ({ result, onRestart }: ResultsProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'maybe': return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'no': return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes': return "Yes, you should pursue Generative AI!";
      case 'maybe': return "Consider exploring Gen AI further";
      case 'no': return "Gen AI might not be the best fit right now";
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes': return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
      case 'maybe': return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
      case 'no': return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive analysis of your Generative AI career readiness
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className={`mb-8 ${getRecommendationColor()}`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            {getRecommendationIcon()}
          </div>
          <h2 className="text-2xl font-bold mb-2">{getRecommendationText()}</h2>
          <div className="text-6xl font-bold mb-4">{result.overallScore}/100</div>
          <p className="text-lg text-muted-foreground">Overall Confidence Score</p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{result.psychologicalFit}/100</div>
            <Progress value={result.psychologicalFit} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Your personality, interests, and cognitive style alignment with Gen AI work
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{result.technicalReadiness}/100</div>
            <Progress value={result.technicalReadiness} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Your current technical skills and knowledge foundation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              WISCAR Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6)}/100
            </div>
            <Progress 
              value={Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6)} 
              className="mb-2" 
            />
            <p className="text-sm text-muted-foreground">
              Comprehensive readiness across six key dimensions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Detailed Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(result.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-bold">{score}/100</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {result.careerPaths.map((path, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">{path}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Your Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  {index + 1}
                </div>
                <p className="flex-1">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Beginner Track</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Python Programming Fundamentals
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Introduction to Machine Learning
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  OpenAI Playground & Prompt Engineering
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Advanced Track</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Transformer Architecture Deep Dive
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Fine-tuning and RLHF
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Multi-modal AI Applications
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};