import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Dices,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  generateRandomQuiz,
  getAvailableTopics,
  calculateScore,
  type QuizQuestion,
} from "@/lib/quizGenerator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/contexts/CourseContext";
import { toast } from "sonner";

const RandomQuizPage = () => {
  const navigate = useNavigate();
  const { addQuizScore } = useCourses();
  const [stage, setStage] = useState<"setup" | "quiz" | "results">("setup");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "mixed">("mixed");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizSaved, setQuizSaved] = React.useState(false);

  const availableTopics = getAvailableTopics();

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleStartQuiz = () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    const generatedQuestions = generateRandomQuiz(
      selectedTopics,
      difficulty,
      questionCount
    );

    if (generatedQuestions.length === 0) {
      toast.error("No questions available for selected criteria");
      return;
    }

    setQuestions(generatedQuestions);
    setAnswers(new Array(generatedQuestions.length).fill(-1));
    setCurrentQuestion(0);
    setQuizStartTime(Date.now());
    setStage("quiz");
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setStage("setup");
    setSelectedTopics([]);
    setDifficulty("mixed");
    setQuestionCount(5);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setQuizSaved(false);
  };

  const handleRetakeQuiz = () => {
    const generatedQuestions = generateRandomQuiz(
      selectedTopics,
      difficulty,
      questionCount
    );

    if (generatedQuestions.length === 0) {
      toast.error("No questions available for selected criteria");
      return;
    }

    setQuestions(generatedQuestions);
    setAnswers(new Array(generatedQuestions.length).fill(-1));
    setCurrentQuestion(0);
    setQuizStartTime(Date.now());
    setStage("quiz");
  };

  const results =
    stage === "results" && questions.length > 0
      ? calculateScore(answers, questions)
      : null;

  // Save quiz score when results are shown (only once per quiz completion)
  React.useEffect(() => {
    if (stage === "results" && results && questions.length > 0 && !quizSaved) {
      const topicName = selectedTopics.length === 1 ? selectedTopics[0] : `Mixed (${selectedTopics.join(", ")})`;
      addQuizScore({
        topic: topicName,
        score: results.score,
        total: results.total,
        percentage: results.percentage,
        date: new Date(),
        timeElapsed: Math.round((Date.now() - quizStartTime) / 1000),
      });
      setQuizSaved(true);
    }
  }, [stage]);

  const timeElapsed = quizStartTime
    ? Math.round((Date.now() - quizStartTime) / 1000)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Dices className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Random Quiz Generator</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* Setup Stage */}
          {stage === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
<Card className="glass-card border-slate-300 bg-white p-8">
                  <h2 className="text-2xl font-bold mb-2 text-slate-900">Quiz Setup</h2>
                  <p className="text-slate-600 mb-8">
                  Configure your quiz by selecting topics and difficulty level
                </p>

                {/* Topics Selection */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-slate-900">Select Topics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicToggle(topic)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm font-medium capitalize ${
                          selectedTopics.includes(topic)
                            ? "border-cyan-600 bg-cyan-100 text-cyan-900 font-semibold"
                            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="mb-8">
                  <label className="font-semibold block mb-4 text-slate-900">Difficulty Level</label>
                  <Select value={difficulty} onValueChange={(value) => setDifficulty(value as any)}>
                    <SelectTrigger className="bg-white border-slate-300 text-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-300">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question Count */}
                <div className="mb-8">
                  <label className="font-semibold block mb-4 text-slate-900">
                    Number of Questions: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>3</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Start Button */}
                <Button
                  onClick={handleStartQuiz}
                  className="w-full gradient-primary text-white text-lg py-6"
                >
                  Start Quiz
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Quiz Stage */}
          {stage === "quiz" && questions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-slate-400">
                      {Math.round(
                        ((currentQuestion + 1) / questions.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={((currentQuestion + 1) / questions.length) * 100}
                    className="h-2"
                  />
                </div>

                {/* Question Card */}
                <Card className="glass-card border-slate-300 bg-white p-8 mb-8">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold leading-relaxed flex-1 text-slate-900">
                      {questions[currentQuestion].question}
                    </h3>
                    <Badge
                      className={`ml-4 capitalize font-bold text-white ${
                        questions[currentQuestion].difficulty === "easy"
                          ? "bg-green-600"
                          : questions[currentQuestion].difficulty === "medium"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {questions[currentQuestion].difficulty}
                    </Badge>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          answers[currentQuestion] === index
                            ? "border-cyan-600 bg-cyan-100 text-slate-900 font-semibold"
                            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <span className="inline-block w-6 h-6 rounded-full border-2 border-current mr-3 text-center leading-5">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="flex-1 border-slate-700 hover:bg-slate-800"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={answers[currentQuestion] === -1}
                    className="flex-1 gradient-primary text-white"
                  >
                    {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Stage */}
          {stage === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-3xl mx-auto">
                {/* Score Summary */}
                <Card className="glass-card border-slate-300 bg-white p-8 mb-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-4">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-slate-900">Quiz Complete!</h2>
                    <p className="text-slate-600 mb-6">
                      Time elapsed: {Math.floor(timeElapsed / 60)}m {timeElapsed % 60}s
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-300">
                        <p className="text-sm text-slate-600 mb-1">Score</p>
                        <p className="text-3xl font-bold text-cyan-700">
                          {results.score}/{results.total}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-300">
                        <p className="text-sm text-slate-600 mb-1">Percentage</p>
                        <p className="text-3xl font-bold text-blue-700">
                          {results.percentage}%
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-300">
                        <p className="text-sm text-slate-600 mb-1">Grade</p>
                        <p className="text-3xl font-bold text-purple-700">
                          {results.percentage >= 90
                            ? "A"
                            : results.percentage >= 80
                            ? "B"
                            : results.percentage >= 70
                            ? "C"
                            : results.percentage >= 60
                            ? "D"
                            : "F"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Progress
                    value={results.percentage}
                    className="h-3 mb-4"
                  />
                </Card>

                {/* Answer Review */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Answer Review</h3>
                  {questions.map((question, index) => {
                    const isCorrect = answers[index] === question.correctAnswer;
                    return (
                      <Card
                        key={index}
                        className="glass-card border-slate-300 bg-white p-6 overflow-hidden"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {isCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold mb-2 text-slate-900">{question.question}</p>
                            <p className="text-sm text-slate-700 mb-3">
                              Your answer:{" "}
                              <span className={isCorrect ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                                {answers[index] !== -1
                                  ? question.options[answers[index]]
                                  : "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-slate-700 mb-3">
                                Correct answer:{" "}
                                <span className="text-green-700 font-semibold">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </p>
                            )}
                            <p className="text-sm text-slate-700 bg-slate-100 p-3 rounded border border-slate-300">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleRetakeQuiz}
                    className="flex-1 gradient-primary text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="flex-1 border-slate-300 hover:bg-slate-100 text-slate-900"
                  >
                    New Quiz
                  </Button>
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RandomQuizPage;
