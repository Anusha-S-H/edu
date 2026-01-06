import { motion } from "framer-motion";
import { Clock, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quizzes = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    course: "Advanced React Patterns",
    dueIn: "2 hours",
    questions: 15,
    difficulty: "Medium",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Data Structures Test",
    course: "CS Fundamentals",
    dueIn: "Tomorrow",
    questions: 20,
    difficulty: "Hard",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "UI/UX Principles",
    course: "Design Masterclass",
    dueIn: "3 days",
    questions: 10,
    difficulty: "Easy",
    color: "bg-teal-500",
  },
];

const UpcomingQuizzes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold">Upcoming Quizzes</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ChevronRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
          >
            <div className={`w-2 h-10 rounded-full ${quiz.color}`} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{quiz.title}</div>
              <div className="text-xs text-muted-foreground truncate">{quiz.course}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {quiz.dueIn}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Brain className="w-3 h-3" />
                {quiz.questions}Q
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingQuizzes;
