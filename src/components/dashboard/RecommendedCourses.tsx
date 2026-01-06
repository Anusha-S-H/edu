import { motion } from "framer-motion";
import { Sparkles, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Python for Data Science",
    instructor: "Dr. Emily Watson",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=150&fit=crop",
    duration: "24 hours",
    students: "8.5K",
    rating: 4.9,
    reason: "Based on your interest in Machine Learning",
  },
  {
    id: 2,
    title: "System Design Fundamentals",
    instructor: "James Rodriguez",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=150&fit=crop",
    duration: "18 hours",
    students: "6.2K",
    rating: 4.8,
    reason: "Popular with Advanced React learners",
  },
];

const RecommendedCourses = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold">AI Recommended</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-28 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-sm font-semibold line-clamp-1">{course.title}</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.students}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  {course.rating}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary">
                <Sparkles className="w-3 h-3" />
                <span>{course.reason}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendedCourses;
