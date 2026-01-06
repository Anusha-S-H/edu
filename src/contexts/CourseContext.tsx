import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
  duration: string;
  students: string;
  rating: number;
  price: string;
  color: string;
  description: string;
  modules: CourseModule[];
}

export interface EnrolledCourse extends Course {
  enrolledAt: Date;
  progress: number;
  currentModuleIndex: number;
}

interface CourseContextType {
  courses: Course[];
  enrolledCourses: EnrolledCourse[];
  enrollInCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
  updateProgress: (courseId: number, moduleIndex: number) => void;
  getCourseById: (courseId: number) => Course | undefined;
}

const allCourses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    category: "Development",
    duration: "42 hours",
    students: "12.5K",
    rating: 4.9,
    price: "Free",
    color: "from-blue-500 to-indigo-600",
    description: "Master HTML, CSS, JavaScript, React, and Node.js to become a full-stack developer.",
    modules: [
      { id: "1-1", title: "Introduction to Web Development", duration: "15:00", videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE", completed: false },
      { id: "1-2", title: "HTML Fundamentals", duration: "22:30", videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU", completed: false },
      { id: "1-3", title: "CSS Styling Basics", duration: "28:00", videoUrl: "https://www.youtube.com/embed/1PnVor36_40", completed: false },
      { id: "1-4", title: "JavaScript Essentials", duration: "35:00", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk", completed: false },
      { id: "1-5", title: "React Introduction", duration: "40:00", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0", completed: false },
    ]
  },
  {
    id: 2,
    title: "Machine Learning & AI Fundamentals",
    instructor: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    category: "AI & ML",
    duration: "38 hours",
    students: "8.2K",
    rating: 4.8,
    price: "Free",
    color: "from-purple-500 to-pink-600",
    description: "Learn machine learning, deep learning, and AI concepts from scratch.",
    modules: [
      { id: "2-1", title: "What is Machine Learning?", duration: "18:00", videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU", completed: false },
      { id: "2-2", title: "Python for ML", duration: "25:00", videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0", completed: false },
      { id: "2-3", title: "Linear Regression", duration: "30:00", videoUrl: "https://www.youtube.com/embed/nk2CQITm_eo", completed: false },
      { id: "2-4", title: "Neural Networks Basics", duration: "35:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", completed: false },
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Williams",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    duration: "28 hours",
    students: "15.3K",
    rating: 4.9,
    price: "Free",
    color: "from-teal-500 to-cyan-600",
    description: "Master design thinking, Figma, and create stunning user interfaces.",
    modules: [
      { id: "3-1", title: "Design Thinking Process", duration: "20:00", videoUrl: "https://www.youtube.com/embed/gHGN6hs2gZY", completed: false },
      { id: "3-2", title: "Color Theory", duration: "18:00", videoUrl: "https://www.youtube.com/embed/AvgCkHrcj90", completed: false },
      { id: "3-3", title: "Typography Essentials", duration: "22:00", videoUrl: "https://www.youtube.com/embed/QrNi9FmdlxY", completed: false },
      { id: "3-4", title: "Figma Basics", duration: "30:00", videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8", completed: false },
    ]
  },
];

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  const enrollInCourse = (courseId: number) => {
    const course = allCourses.find(c => c.id === courseId);
    if (course && !isEnrolled(courseId)) {
      const enrolledCourse: EnrolledCourse = {
        ...course,
        enrolledAt: new Date(),
        progress: 0,
        currentModuleIndex: 0,
      };
      setEnrolledCourses(prev => [...prev, enrolledCourse]);
    }
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some(c => c.id === courseId);
  };

  const updateProgress = (courseId: number, moduleIndex: number) => {
    setEnrolledCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const completedModules = moduleIndex + 1;
        const totalModules = course.modules.length;
        const progress = Math.round((completedModules / totalModules) * 100);
        return {
          ...course,
          currentModuleIndex: moduleIndex,
          progress,
          modules: course.modules.map((m, i) => ({
            ...m,
            completed: i <= moduleIndex
          }))
        };
      }
      return course;
    }));
  };

  const getCourseById = (courseId: number) => {
    return allCourses.find(c => c.id === courseId);
  };

  return (
    <CourseContext.Provider value={{ 
      courses: allCourses, 
      enrolledCourses, 
      enrollInCourse, 
      isEnrolled,
      updateProgress,
      getCourseById
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
