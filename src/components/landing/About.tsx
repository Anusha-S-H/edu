import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Target, Users, Award, TrendingUp, Heart, Globe, Eye, Brain, AudioLines } from "lucide-react";

const stats = [
  { label: "Active Learners", value: "50K+", icon: Users },
  { label: "Courses Available", value: "500+", icon: Award },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
  { label: "Countries", value: "120+", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to make quality education accessible to everyone, everywhere.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision we make puts our learners at the center, ensuring the best learning experience.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We leverage AI and cutting-edge technology to create personalized learning paths.",
    color: "from-amber-500 to-orange-500",
  },
];

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    description: "High-contrast themes, scalable text, and screen-reader friendly labels to support low-vision learners.",
  },
  {
    icon: Brain,
    title: "Cognitive Support",
    description: "Chunked lessons, distraction-free focus mode, and optional plain-language summaries for clearer comprehension.",
  },
  {
    icon: AudioLines,
    title: "Multimodal Learning",
    description: "Audio narration, captions, and keyboard-first navigation so every learner can interact comfortably.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About LearnFlow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Empowering <span className="gradient-text">Global Learners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            LearnFlow is transforming education with AI-powered learning tools, gamification, 
            and a community-driven approach. We believe everyone deserves access to world-class education.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024, LearnFlow was born from a simple observation: traditional education 
                wasn't keeping up with the pace of change in our world. We saw brilliant minds held 
                back by expensive courses, rigid curricula, and one-size-fits-all approaches.
              </p>
              <p>
                Our founders, a team of educators, technologists, and lifelong learners, came together 
                with a vision to democratize education. We combined cutting-edge AI technology with 
                proven learning science to create a platform that adapts to each learner's unique needs.
              </p>
              <p>
                Today, LearnFlow serves over 50,000 learners across 120+ countries. But we're just 
                getting started. Our mission is to empower 10 million learners by 2030, making quality 
                education accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accessibility Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">Inclusive by Design</h3>
              <p className="text-muted-foreground">
                LearnFlow is built for all learners, including students who are visually impaired or navigating cognitive
                differences. We follow WCAG-aligned practices and keep accessibility top-of-mind in every feature we ship.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>One-tap toggle for high contrast and reduced motion experiences.</li>
                <li>Keyboard-first shortcuts plus descriptive alt text and ARIA labels.</li>
                <li>Focused study mode that minimizes clutter for lower cognitive load.</li>
                <li>Downloadable transcripts, captions, and audio lessons for flexible consumption.</li>
              </ul>
            </div>
            <div className="lg:w-1/2 grid md:grid-cols-2 gap-4">
              {accessibilityFeatures.map((feature, index) => {
                const isVisual = feature.title === "Visual Accessibility";

                return (
                  <motion.button
                    key={feature.title}
                    type="button"
                    onClick={() => isVisual && navigate("/accessible-dashboard")}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-muted/40 rounded-2xl p-5 border border-border text-left hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    aria-label={
                      isVisual
                        ? "Open visual accessibility dashboard"
                        : `${feature.title} details`
                    }
                  >
                    <div className="w-10 h-10 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    {isVisual && (
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Explore dashboard
                        <span aria-hidden>→</span>
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for passionate educators, developers, and innovators to join our mission. 
            If you're excited about transforming education, we'd love to hear from you.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium hover:scale-105 transition-transform"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
