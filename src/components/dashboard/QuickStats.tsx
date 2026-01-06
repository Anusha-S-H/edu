import { motion } from "framer-motion";
import { Clock, Zap, BookOpen, Trophy } from "lucide-react";

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
    value: "1,250",
    change: "+320 today",
    positive: true,
    gradient: "gradient-xp",
  },
  {
    icon: BookOpen,
    label: "Courses Active",
    value: "5",
    change: "2 in progress",
    positive: true,
    gradient: "gradient-accent",
  },
  {
    icon: Trophy,
    label: "Quiz Score Avg",
    value: "87%",
    change: "+5%",
    positive: true,
    gradient: "gradient-streak",
  },
];

const QuickStats = () => {
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
