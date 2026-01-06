import { motion } from "framer-motion";
import { Flame, Target, Calendar } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

const StreakCard = ({ currentStreak, longestStreak }: StreakCardProps) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completedDays = [true, true, true, true, true, true, true];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="gradient-streak rounded-2xl p-6 text-foreground"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <div className="text-3xl font-display font-bold">{currentStreak}</div>
          <div className="text-sm opacity-80">Day Streak</div>
        </div>
      </div>

      {/* Week Progress */}
      <div className="flex justify-between mb-4">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                completedDays[index] ? "bg-white/30" : "bg-white/10"
              }`}
            >
              {completedDays[index] && <Flame className="w-4 h-4" />}
            </motion.div>
            <span className="text-xs opacity-70">{day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 opacity-80">
          <Target className="w-4 h-4" />
          <span>Best: {longestStreak} days</span>
        </div>
        <div className="flex items-center gap-1 opacity-80">
          <Calendar className="w-4 h-4" />
          <span>This week</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StreakCard;
