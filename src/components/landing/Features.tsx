import { motion } from "framer-motion";
import { Brain, Gamepad2, Video, BarChart3, BookOpen, Trophy, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Smart flashcards, auto-summarization, and adaptive quizzes generated from your course content.",
    gradient: "gradient-primary",
  },
  {
    icon: Gamepad2,
    title: "Gamified Experience",
    description: "Earn XP, unlock badges, maintain streaks, and compete on leaderboards to stay motivated.",
    gradient: "gradient-streak",
  },
  {
    icon: Video,
    title: "Interactive Courses",
    description: "HD video tutorials with in-video notes, bookmarks, and smart resume playback.",
    gradient: "gradient-accent",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Track your progress with beautiful charts, identify weaknesses, and optimize your learning.",
    gradient: "gradient-xp",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    description: "Rich text editor with highlights, tags, and AI-powered spaced repetition reminders.",
    gradient: "gradient-primary",
  },
  {
    icon: Trophy,
    title: "Live Competitions",
    description: "Join live quizzes, compete with peers, and earn exclusive rewards and certifications.",
    gradient: "gradient-accent",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Excel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-generated content to real-time analytics, we've built the most comprehensive learning platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>And many more features to discover...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
