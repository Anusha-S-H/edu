import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Flame, Trophy, Target, Clock, BookOpen, Play, 
  Brain, TrendingUp, Calendar, Bell, ChevronRight,
  Zap, Star, Award, BarChart3, BookOpenCheck, Dices, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProgressRing from "@/components/dashboard/ProgressRing";
import StreakCard from "@/components/dashboard/StreakCard";
import CourseCard from "@/components/dashboard/CourseCard";
import QuickStats from "@/components/dashboard/QuickStats";
import UpcomingQuizzes from "@/components/dashboard/UpcomingQuizzes";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import { useCourses } from "@/contexts/CourseContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { enrolledCourses, courses, quizScores, getWeeklyPerformance } = useCourses();
  const weeklyPerformance = getWeeklyPerformance();
  const recentQuizzes = quizScores.slice(-5).reverse();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground">
              {enrolledCourses.length > 0 
                ? "You're on a roll! Keep up the great work." 
                : "Start your learning journey today!"}
            </p>
          </div>
          <Button variant="hero" className="self-start md:self-auto" onClick={() => navigate("/courses")}>
            <BookOpenCheck className="w-4 h-4" />
            Browse Courses
          </Button>
        </motion.div>

        {/* Stats Row */}
        <QuickStats enrolledCount={enrolledCourses.length} />

        {/* AI Tools Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Notes Summarizer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all cursor-pointer group"
            onClick={() => navigate("/notes-summarizer")}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-display font-bold mb-2">AI Notes Summarizer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Summarize your notes and extract key points using AI
            </p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Start Summarizing
            </Button>
          </motion.div>

          {/* Random Quiz Generator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500/60 transition-all cursor-pointer group"
            onClick={() => navigate("/random-quiz")}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Dices className="w-6 h-6 text-white" />
              </div>
              <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-display font-bold mb-2">Random Quiz Generator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Test your knowledge with randomly generated quizzes
            </p>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              Start Quiz
            </Button>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Course Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  {enrolledCourses.length > 0 ? "Continue Learning" : "Get Started"}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigate("/courses")}>
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {enrolledCourses.slice(0, 2).map((course) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      instructor={course.instructor}
                      progress={course.progress}
                      image={course.image}
                      nextLesson={course.modules[course.currentModuleIndex]?.title || "Complete!"}
                      timeLeft={`${course.modules.length - course.currentModuleIndex} modules left`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold mb-2">No courses enrolled yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start learning by enrolling in a course
                  </p>
                  <Button variant="hero" onClick={() => navigate("/courses")}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold">Weekly Performance</h2>
                  <p className="text-sm text-muted-foreground">Your learning activity this week</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Study Time</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-muted-foreground">Quizzes</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between h-48 gap-3 px-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                  const studyHeight = [60, 80, 45, 90, 70, 40, 85][index];
                  const quizHeight = weeklyPerformance[index] || 0;
                  
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end pb-2">
                      <div className="w-full flex gap-1 justify-center items-end flex-1">
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: `${studyHeight}%` }}
                          transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                          className="w-4 gradient-primary rounded-t"
                        />
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: `${quizHeight}%` }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                          className="w-4 gradient-accent rounded-t"
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{day}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recommended Courses */}
            <RecommendedCourses />
          </div>

          {/* Right Column - Streak, Quizzes, Progress */}
          <div className="space-y-6">
            {/* Streak Card */}
            <StreakCard currentStreak={7} longestStreak={21} />

            {/* Today's Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">Today's Goal</h3>
              <div className="flex items-center justify-center mb-4">
                <ProgressRing progress={enrolledCourses.length > 0 ? 75 : 0} size={140} strokeWidth={10}>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold">{enrolledCourses.length > 0 ? 75 : 0}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </ProgressRing>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Study Time</span>
                  <span className="font-medium">45m / 1h</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Courses Enrolled</span>
                  <span className="font-medium">{enrolledCourses.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-medium text-xp">+{enrolledCourses.length * 50} XP</span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Quizzes */}
            <UpcomingQuizzes />

            {/* Recent Quiz Scores */}
            {recentQuizzes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-bold">Recent Quizzes</h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/random-quiz")}>
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentQuizzes.slice(0, 3).map((quiz, index) => (
                    <div key={quiz.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{quiz.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(quiz.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-sm">{quiz.score}/{quiz.total}</p>
                          <p className={`text-xs font-semibold ${
                            quiz.percentage >= 80 ? "text-green-600" :
                            quiz.percentage >= 60 ? "text-yellow-600" :
                            "text-red-600"
                          }`}>
                            {quiz.percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievement Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="gradient-xp rounded-2xl p-6 text-primary-foreground"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-1">
                    {enrolledCourses.length > 0 ? "Keep Learning!" : "Start Your Journey!"}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {enrolledCourses.length > 0 
                      ? `You have ${enrolledCourses.length} course(s) in progress. Complete them to earn badges!`
                      : "Enroll in your first course to earn XP and unlock achievements!"}
                  </p>
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white" onClick={() => navigate("/courses")}>
                    {enrolledCourses.length > 0 ? "View Achievements" : "Explore Courses"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
