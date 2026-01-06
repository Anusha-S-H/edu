export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  explanation: string;
}

const quizBank: { [key: string]: QuizQuestion[] } = {
  mathematics: [
    {
      id: "math_1",
      question: "What is the derivative of x³?",
      options: ["3x²", "x²", "3x", "2x²"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "Using the power rule: d/dx(x^n) = n*x^(n-1), so d/dx(x³) = 3x²"
    },
    {
      id: "math_2",
      question: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "The sum of all interior angles in any triangle is always 180 degrees."
    },
    {
      id: "math_3",
      question: "Solve: 2x + 5 = 13",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "2x + 5 = 13 → 2x = 8 → x = 4... wait, let me recalculate: 2(4) + 5 = 13. That's correct, so x = 4"
    },
    {
      id: "math_4",
      question: "What is √144?",
      options: ["10", "12", "14", "16"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "√144 = 12 because 12 × 12 = 144"
    },
    {
      id: "math_5",
      question: "Calculate: (5 + 3) × 2 - 4",
      options: ["12", "14", "16", "18"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "(5 + 3) × 2 - 4 = 8 × 2 - 4 = 16 - 4 = 12"
    },
    {
      id: "math_6",
      question: "What is the integral of 2x?",
      options: ["x² + C", "2x + C", "x + C", "2 + C"],
      correctAnswer: 0,
      difficulty: "medium",
      topic: "mathematics",
      explanation: "Using the power rule for integration: ∫2x dx = x² + C"
    },
    {
      id: "math_7",
      question: "What is the value of π (pi) approximately?",
      options: ["2.14", "3.14", "4.14", "5.14"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "mathematics",
      explanation: "π ≈ 3.14159... It's the ratio of a circle's circumference to its diameter."
    },
  ],
  science: [
    {
      id: "sci_1",
      question: "What is the chemical formula for water?",
      options: ["H2O", "O2", "H2O2", "HO"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "science",
      explanation: "Water consists of 2 hydrogen atoms and 1 oxygen atom: H2O"
    },
    {
      id: "sci_2",
      question: "What is the speed of light?",
      options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁴ m/s", "3 × 10² m/s"],
      correctAnswer: 0,
      difficulty: "medium",
      topic: "science",
      explanation: "The speed of light in vacuum is approximately 299,792,458 m/s or 3 × 10⁸ m/s"
    },
    {
      id: "sci_3",
      question: "What is the atomic number of Carbon?",
      options: ["6", "8", "12", "14"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "science",
      explanation: "Carbon has 6 protons, so its atomic number is 6."
    },
    {
      id: "sci_4",
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "science",
      explanation: "Mitochondria is responsible for producing energy (ATP) in the cell."
    },
    {
      id: "sci_5",
      question: "What is Newton's first law of motion?",
      options: ["F = ma", "An object in motion stays in motion unless acted upon", "Energy cannot be created", "Action equals reaction"],
      correctAnswer: 1,
      difficulty: "medium",
      topic: "science",
      explanation: "Newton's first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by a force."
    },
  ],
  history: [
    {
      id: "hist_1",
      question: "In which year did the Titanic sink?",
      options: ["1910", "1912", "1914", "1920"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "history",
      explanation: "The RMS Titanic sank on April 15, 1912, after hitting an iceberg."
    },
    {
      id: "hist_2",
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "Benjamin Franklin"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "history",
      explanation: "George Washington served as the first President of the United States from 1789 to 1797."
    },
    {
      id: "hist_3",
      question: "In what year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: 2,
      difficulty: "easy",
      topic: "history",
      explanation: "World War II ended in 1945 with Germany's surrender in May and Japan's in September."
    },
    {
      id: "hist_4",
      question: "Which ancient wonder was located in Egypt?",
      options: ["Hanging Gardens", "Great Pyramid of Giza", "Statue of Zeus", "Mausoleum of Halicarnassus"],
      correctAnswer: 1,
      difficulty: "medium",
      topic: "history",
      explanation: "The Great Pyramid of Giza, built for Pharaoh Khufu, is the only ancient wonder still standing."
    },
  ],
  programming: [
    {
      id: "prog_1",
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "programming",
      explanation: "HTML stands for Hyper Text Markup Language, the standard markup language for web pages."
    },
    {
      id: "prog_2",
      question: "What is the purpose of CSS?",
      options: ["Add functionality", "Style web pages", "Manage databases", "Compile code"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "programming",
      explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages."
    },
    {
      id: "prog_3",
      question: "Which of these is NOT a programming language?",
      options: ["Python", "HTML", "JavaScript", "C++"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "programming",
      explanation: "HTML is a markup language, not a programming language. The others are programming languages."
    },
    {
      id: "prog_4",
      question: "What is a loop in programming?",
      options: ["An error in code", "A way to repeat code blocks", "A debugging tool", "A variable type"],
      correctAnswer: 1,
      difficulty: "easy",
      topic: "programming",
      explanation: "A loop is a programming construct that repeats a block of code until a condition is met."
    },
    {
      id: "prog_5",
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Instruction", "Automated Program Integration", "Application Process Improvement"],
      correctAnswer: 0,
      difficulty: "medium",
      topic: "programming",
      explanation: "API stands for Application Programming Interface, which allows different software applications to communicate."
    },
  ],
};

export function generateRandomQuiz(
  topics: string[] = [],
  difficulty: "easy" | "medium" | "hard" | "mixed" = "mixed",
  questionCount: number = 5
): QuizQuestion[] {
  const availableTopics = topics.length > 0 ? topics : Object.keys(quizBank);
  const questions: QuizQuestion[] = [];
  const usedIds = new Set<string>();

  while (questions.length < questionCount) {
    const randomTopic =
      availableTopics[Math.floor(Math.random() * availableTopics.length)];
    const topicQuestions = quizBank[randomTopic] || [];

    if (topicQuestions.length === 0) continue;

    let filteredQuestions = topicQuestions;

    if (difficulty !== "mixed") {
      filteredQuestions = topicQuestions.filter((q) => q.difficulty === difficulty);
    }

    if (filteredQuestions.length === 0) continue;

    const randomQuestion =
      filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

    if (!usedIds.has(randomQuestion.id)) {
      questions.push(randomQuestion);
      usedIds.add(randomQuestion.id);
    }
  }

  return questions;
}

export function getAvailableTopics(): string[] {
  return Object.keys(quizBank);
}

export function calculateScore(
  answers: number[],
  questions: QuizQuestion[]
): { score: number; percentage: number; correct: number; total: number } {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++;
    }
  });

  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);

  return { score: correct, percentage, correct, total };
}
