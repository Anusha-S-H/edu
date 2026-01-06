import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, ArrowRight, ChevronLeft, Check } from "lucide-react";
import { useCourses } from "@/contexts/CourseContext";
import { toast } from "sonner";

const AllCoursesPage = () => {
  const navigate = useNavigate();
  const { courses, enrollInCourse, isEnrolled } = useCourses();

  const handleEnroll = (courseId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEnrolled(courseId)) {
      enrollInCourse(courseId);
      toast.success("Successfully enrolled!", {
        description: "Course added to your dashboard"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Home
          </Button>
          <Button variant="hero" onClick={() => navigate("/dashboard")}>
            My Dashboard
          </Button>
        </div>
      </header>

      <div className="container px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start learning for free with our curated collection of courses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const enrolled = isEnrolled(course.id);
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${course.color}`}>
                      {course.category}
                    </div>
                    {enrolled && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Enrolled
                      </div>
                    )}
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                      <Play className="w-6 h-6 text-primary fill-primary" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-display font-bold text-lg line-clamp-2">
                        {course.title}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                      <span className="text-sm text-muted-foreground">{course.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-bold text-primary">
                        {course.price}
                      </span>
                      {enrolled ? (
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.id}`); }}>
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="hero" onClick={(e) => handleEnroll(course.id, e)}>
                          Enroll Free
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;
