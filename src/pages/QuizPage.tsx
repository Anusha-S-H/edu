import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Clock, CheckCircle2, XCircle, Trophy, 
  ArrowRight, RotateCcw, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/contexts/CourseContext";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      correctAnswer: 0,
      explanation: "HTML stands for Hyper Text Markup Language, the standard language for creating web pages."
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color?",
      options: ["font-color", "text-color", "color", "foreground-color"],
      correctAnswer: 2,
      explanation: "The 'color' property is used to set the text color in CSS."
    },
    {
      id: 3,
      question: "What is the correct way to declare a JavaScript variable?",
      options: ["variable x = 5", "let x = 5", "v x = 5", "declare x = 5"],
      correctAnswer: 1,
      explanation: "In modern JavaScript, 'let' or 'const' are used to declare variables."
    },
    {
      id: 4,
      question: "What is React?",
      options: ["A database", "A JavaScript library for building UIs", "A programming language", "A web server"],
      correctAnswer: 1,
      explanation: "React is a JavaScript library developed by Facebook for building user interfaces."
    },
    {
      id: 5,
      question: "Which hook is used to manage state in React functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1,
      explanation: "useState is the primary hook for managing local state in functional components."
    },
  ],
  2: [
    {
      id: 1,
      question: "What type of learning is used when the data has labels?",
      options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Transfer Learning"],
      correctAnswer: 2,
      explanation: "Supervised learning uses labeled data to train models."
    },
    {
      id: 2,
      question: "What is a neural network inspired by?",
      options: ["Computer circuits", "Human brain", "Internet networks", "Social networks"],
      correctAnswer: 1,
      explanation: "Neural networks are inspired by the biological neural networks in the human brain."
    },
    {
      id: 3,
      question: "Which library is commonly used for machine learning in Python?",
      options: ["React", "TensorFlow", "Bootstrap", "jQuery"],
      correctAnswer: 1,
      explanation: "TensorFlow is one of the most popular libraries for machine learning in Python."
    },
    {
      id: 4,
      question: "What does 'overfitting' mean in ML?",
      options: ["Model is too simple", "Model memorizes training data", "Model is too fast", "Model uses too much memory"],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model learns the training data too well, including noise."
    },
  ],
  3: [
    {
      id: 1,
      question: "What does UX stand for?",
      options: ["User Excellence", "User Experience", "Universal Experience", "Unified Experience"],
      correctAnswer: 1,
      explanation: "UX stands for User Experience, focusing on the overall experience of using a product."
    },
    {
      id: 2,
      question: "Which tool is popular for UI/UX design?",
      options: ["Microsoft Word", "Figma", "Excel", "Notepad"],
      correctAnswer: 1,
      explanation: "Figma is a popular collaborative design tool for UI/UX designers."
    },
    {
      id: 3,
      question: "What is the purpose of a wireframe?",
      options: ["Final product design", "Basic structural layout", "Color scheme", "Animation design"],
      correctAnswer: 1,
      explanation: "Wireframes are low-fidelity representations of a design's basic structure."
    },
  ],
};

const QuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById, isEnrolled } = useCourses();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const course = getCourseById(Number(courseId));
  const questions = quizData[Number(courseId)] || quizData[1];

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNext();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("+100 XP!", { duration: 1500 });
    }
    
    setAnswers(prev => [...prev, selectedAnswer]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const xpEarned = score * 100;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              percentage >= 80 ? "gradient-xp" : percentage >= 50 ? "gradient-accent" : "bg-muted"
            }`}
          >
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          <h1 className="text-3xl font-display font-bold mb-2">
            {percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good Job!" : "Keep Practicing!"}
          </h1>
          <p className="text-muted-foreground mb-6">
            You completed the {course?.title || "Course"} Quiz
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">{score}/{questions.length}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold">{percentage}%</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-xp">+{xpEarned}</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="hero" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Exit Quiz
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-medium">{score * 100} XP</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft <= 10 ? "bg-red-500/20 text-red-500" : "bg-muted"
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-medium">{timeLeft}s</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-2xl px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-display font-bold">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrectness = showResult;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showCorrectness
                        ? isCorrect
                          ? "border-green-500 bg-green-500/10"
                          : isSelected
                            ? "border-red-500 bg-red-500/10"
                            : "border-border"
                        : isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                    }`}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        showCorrectness
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : isSelected
                              ? "bg-red-500 text-white"
                              : "bg-muted"
                          : isSelected
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted"
                      }`}>
                        {showCorrectness ? (
                          isCorrect ? <CheckCircle2 className="w-4 h-4" /> : isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + index)
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-muted/50 rounded-xl p-4 border border-border"
                >
                  <h4 className="font-bold mb-1">Explanation</h4>
                  <p className="text-muted-foreground text-sm">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {!showResult ? (
                <Button 
                  variant="hero" 
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button variant="hero" onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
