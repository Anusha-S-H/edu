import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, ChevronLeft, CheckCircle2, Clock, Users, Star, 
  BookOpen, Download, MessageSquare, Award, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/contexts/CourseContext";
import { toast } from "sonner";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById, enrollInCourse, isEnrolled, enrolledCourses, updateProgress } = useCourses();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  
  const course = getCourseById(Number(courseId));
  const enrolled = isEnrolled(Number(courseId));
  const enrolledCourse = enrolledCourses.find(c => c.id === Number(courseId));

  useEffect(() => {
    if (enrolledCourse) {
      setCurrentModuleIndex(enrolledCourse.currentModuleIndex);
    }
  }, [enrolledCourse]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    enrollInCourse(course.id);
    toast.success("Successfully enrolled!", {
      description: `You are now enrolled in ${course.title}`
    });
  };

  const handleModuleComplete = () => {
    updateProgress(course.id, currentModuleIndex);
    toast.success("Module completed!", {
      description: "+50 XP earned!"
    });
    if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
    }
  };

  const currentModule = course.modules[currentModuleIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            {enrolled && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${enrolledCourse?.progress || 0}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-muted-foreground">{enrolledCourse?.progress || 0}%</span>
              </div>
            )}
            <Button variant="hero" onClick={() => navigate("/quiz/" + courseId)}>
              Take Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video bg-black rounded-2xl overflow-hidden"
            >
              {enrolled ? (
                <iframe
                  src={currentModule.videoUrl}
                  title={currentModule.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Lock className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Enroll to Watch</h3>
                  <p className="text-muted-foreground mb-4">Start learning for free!</p>
                  <Button variant="hero" onClick={handleEnroll}>
                    Enroll Now - Free
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-bold mb-2">
                    {currentModule.title}
                  </h1>
                  <p className="text-muted-foreground">{course.title}</p>
                </div>
                {enrolled && (
                  <Button variant="hero" onClick={handleModuleComplete}>
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Complete
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentModule.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  {course.rating}
                </div>
              </div>

              {/* Course Description */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold mb-2">About this course</h3>
                <p className="text-muted-foreground">{course.description}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <div>
                      <div className="font-medium">{course.instructor}</div>
                      <div className="text-xs text-muted-foreground">Instructor</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Course Modules */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-display font-bold mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.modules.map((module, index) => {
                const isCompleted = enrolledCourse?.modules[index]?.completed;
                const isCurrent = index === currentModuleIndex;
                const isLocked = !enrolled && index > 0;

                return (
                  <motion.button
                    key={module.id}
                    onClick={() => enrolled && setCurrentModuleIndex(index)}
                    disabled={isLocked}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      isCurrent 
                        ? "bg-primary/10 border border-primary/30" 
                        : "hover:bg-muted/50"
                    } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    whileHover={!isLocked ? { scale: 1.02 } : {}}
                    whileTap={!isLocked ? { scale: 0.98 } : {}}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? "bg-green-500/20 text-green-500" 
                        : isCurrent 
                          ? "gradient-primary text-primary-foreground" 
                          : "bg-muted"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm truncate ${isCurrent ? "text-primary" : ""}`}>
                        {module.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{module.duration}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {!enrolled && (
              <Button variant="hero" className="w-full mt-6" onClick={handleEnroll}>
                Enroll Now - Free
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
