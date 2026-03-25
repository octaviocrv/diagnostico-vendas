import { CardContent, CardHeader } from "@/components/ui/card";
import ProgressBar from "./ProgressBar";
import QuizQuestion from "./QuizQuestion";
import { quizQuestions } from "../../data/quizQuestions";

export default function QuizContainer({ 
  quizStep, 
  answers, 
  onAnswerSelect, 
  onPrevQuestion 
}) {
  const currentQuestion = quizQuestions[quizStep - 1];
  const selectedAnswer = answers[quizStep];
  const canGoBack = quizStep > 1;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <CardHeader className="p-0">
        <ProgressBar 
          step={quizStep} 
          totalSteps={quizQuestions.length} 
        />
      </CardHeader>

      <CardContent className="p-0">
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={onAnswerSelect}
          onPrevQuestion={onPrevQuestion}
          canGoBack={canGoBack}
        />
      </CardContent>
    </div>
  );
}