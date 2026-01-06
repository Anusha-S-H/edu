import { motion } from "framer-motion";
import { Clock, Zap, BookOpen, Trophy } from "lucide-react";

interface QuickStatsProps {
  enrolledCount?: number;
}

const QuickStats = ({ enrolledCount = 0 }: QuickStatsProps) => {
  const stats = [
    {
      icon: Clock,
      label: "Study Time Today",
      value: "2h 45m",
      change: "+15%",
      positive: true,
      gradient: "gradient-primary",
    },
    {
      icon: Zap,
      label: "XP Earned",
      value: `${enrolledCount * 250 + 500}`,
      change: `+${enrolledCount * 50} today`,
      positive: true,
      gradient: "gradient-xp",
    },
    {
      icon: BookOpen,
      label: "Courses Active",
      value: String(enrolledCount),
      change: `${enrolledCount > 0 ? enrolledCount : 0} in progress`,
      positive: true,
      gradient: "gradient-accent",
    },
    {
      icon: Trophy,
      label: "Quiz Score Avg",
      value: enrolledCount > 0 ? "87%" : "0%",
      change: enrolledCount > 0 ? "+5%" : "Start learning",
      positive: true,
      gradient: "gradient-streak",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-11 h-11 rounded-xl ${stat.gradient} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              stat.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-display font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
