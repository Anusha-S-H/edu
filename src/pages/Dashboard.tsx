import { motion } from "framer-motion";
import { 
  Flame, Trophy, Target, Clock, BookOpen, Play, 
  Brain, TrendingUp, Calendar, Bell, ChevronRight,
  Zap, Star, Award, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProgressRing from "@/components/dashboard/ProgressRing";
import StreakCard from "@/components/dashboard/StreakCard";
import CourseCard from "@/components/dashboard/CourseCard";
import QuickStats from "@/components/dashboard/QuickStats";
import UpcomingQuizzes from "@/components/dashboard/UpcomingQuizzes";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";

const Dashboard = () => {
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
              You're on a roll! Keep up the great work.
            </p>
          </div>
          <Button variant="hero" className="self-start md:self-auto">
            <Play className="w-4 h-4" />
            Continue Learning
          </Button>
        </motion.div>

        {/* Stats Row */}
        <QuickStats />

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
                <h2 className="text-xl font-display font-bold">Continue Learning</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <CourseCard
                  title="Advanced React Patterns"
                  instructor="Sarah Johnson"
                  progress={68}
                  image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
                  nextLesson="Custom Hooks Deep Dive"
                  timeLeft="2h 30m left"
                />
                <CourseCard
                  title="Machine Learning Basics"
                  instructor="Dr. Michael Chen"
                  progress={42}
                  image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
                  nextLesson="Neural Networks Intro"
                  timeLeft="4h 15m left"
                />
              </div>
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
              <div className="flex items-end justify-between h-48 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                  const studyHeight = [60, 80, 45, 90, 70, 40, 85][index];
                  const quizHeight = [30, 20, 60, 40, 50, 20, 45][index];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 justify-center" style={{ height: `${Math.max(studyHeight, quizHeight)}%` }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${studyHeight}%` }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="w-3 gradient-primary rounded-t-full origin-bottom"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${quizHeight}%` }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          className="w-3 gradient-accent rounded-t-full origin-bottom"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{day}</span>
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
                <ProgressRing progress={75} size={140} strokeWidth={10}>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold">75%</div>
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
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium">3 / 4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-medium text-xp">+180 XP</span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Quizzes */}
            <UpcomingQuizzes />

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
                  <h3 className="font-display font-bold mb-1">New Badge Unlocked!</h3>
                  <p className="text-sm text-white/80 mb-3">
                    You've earned the "Quick Learner" badge for completing 5 courses.
                  </p>
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                    View Achievements
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
