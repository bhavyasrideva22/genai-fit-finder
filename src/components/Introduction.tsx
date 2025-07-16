import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, Zap, Palette, Shield } from "lucide-react";

interface IntroductionProps {
  onStart: () => void;
}

export const Introduction = ({ onStart }: IntroductionProps) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Discover Your Generative AI Career Potential</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in Generative AI development and research.
          </p>
          
          <div className="flex justify-center gap-8 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Career Guidance</span>
            </div>
          </div>
          
          <Button size="lg" onClick={onStart} className="px-8">
            Start Assessment
          </Button>
        </CardContent>
      </Card>

      {/* What is Generative AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            What is Generative AI?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Generative AI refers to <strong>machine learning models</strong> capable of generating new content—text, 
            images, audio, code—using <strong>large-scale datasets</strong> and transformer architectures 
            (e.g., GPT, DALL·E, Stable Diffusion). It blends creativity with computation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Content Generation</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">Create text, images, and code</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300">Transformer Models</h4>
              <p className="text-sm text-green-600 dark:text-green-400">Advanced neural architectures</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300">Creative Computing</h4>
              <p className="text-sm text-purple-600 dark:text-purple-400">Blend art with technology</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Career Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Prompt Engineer</h4>
              <p className="text-sm text-muted-foreground">Craft effective inputs for AI models</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">AI Research Engineer</h4>
              <p className="text-sm text-muted-foreground">Build custom AI applications</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">GenAI Product Manager</h4>
              <p className="text-sm text-muted-foreground">Guide AI product strategy</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">ML Scientist</h4>
              <p className="text-sm text-muted-foreground">Develop new algorithms</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Creative AI Developer</h4>
              <p className="text-sm text-muted-foreground">Build artistic AI tools</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">AI Ethicist</h4>
              <p className="text-sm text-muted-foreground">Shape responsible AI use</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Ideal Traits & Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Curious & creative thinking",
              "Abstract reasoning",
              "Tolerance for ambiguity",
              "Technical creativity",
              "Self-driven learning",
              "Interdisciplinary mindset"
            ].map((trait) => (
              <Badge key={trait} variant="secondary">{trait}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            What You'll Discover
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Assessment Modules:</h4>
              <ol className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Psychological Fit Evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Technical Aptitude Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>WISCAR Framework Analysis</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Your Results Include:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Personalized fit score (0-100)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Detailed trait analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Technical readiness assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Career pathway recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Next steps and learning resources</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};