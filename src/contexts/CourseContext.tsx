import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

export interface QuizScore {
  id: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: Date;
  timeElapsed: number;
}

interface CourseContextType {
  courses: Course[];
  enrolledCourses: EnrolledCourse[];
  quizScores: QuizScore[];
  enrollInCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
  updateProgress: (courseId: number, moduleIndex: number) => void;
  getCourseById: (courseId: number) => Course | undefined;
  addQuizScore: (quizScore: Omit<QuizScore, 'id'>) => void;
  getWeeklyPerformance: () => number[];
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
  {
    id: 4,
    title: "Python Programming Complete Course",
    instructor: "Alex Martinez",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    category: "Programming",
    duration: "35 hours",
    students: "18.7K",
    rating: 4.8,
    price: "Free",
    color: "from-green-500 to-emerald-600",
    description: "Learn Python from basics to advanced topics including OOP, data structures, and libraries.",
    modules: [
      { id: "4-1", title: "Python Basics for Beginners", duration: "25:00", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw", completed: false },
      { id: "4-2", title: "Data Structures in Python", duration: "30:00", videoUrl: "https://www.youtube.com/embed/pkYVOmU3MgA", completed: false },
      { id: "4-3", title: "Object-Oriented Programming", duration: "28:00", videoUrl: "https://www.youtube.com/embed/Ej_02ICOIgs", completed: false },
      { id: "4-4", title: "Python Libraries Overview", duration: "22:00", videoUrl: "https://www.youtube.com/embed/GPVsHOlRBBI", completed: false },
    ]
  },
  {
    id: 5,
    title: "Data Science & Analytics",
    instructor: "Dr. Lisa Anderson",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Data Science",
    duration: "45 hours",
    students: "10.2K",
    rating: 4.9,
    price: "Free",
    color: "from-orange-500 to-red-600",
    description: "Master data analysis, visualization, and statistical modeling with Python and R.",
    modules: [
      { id: "5-1", title: "Introduction to Data Science", duration: "20:00", videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30", completed: false },
      { id: "5-2", title: "Pandas for Data Analysis", duration: "35:00", videoUrl: "https://www.youtube.com/embed/vmEHCJofslg", completed: false },
      { id: "5-3", title: "Data Visualization with Matplotlib", duration: "25:00", videoUrl: "https://www.youtube.com/embed/3Xc3CA655Y4", completed: false },
      { id: "5-4", title: "Statistical Analysis", duration: "30:00", videoUrl: "https://www.youtube.com/embed/xxpc-HPKN28", completed: false },
    ]
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    instructor: "James Wilson",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    category: "Mobile Development",
    duration: "40 hours",
    students: "9.8K",
    rating: 4.7,
    price: "Free",
    color: "from-violet-500 to-purple-600",
    description: "Build cross-platform mobile apps for iOS and Android using React Native.",
    modules: [
      { id: "6-1", title: "React Native Basics", duration: "30:00", videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc", completed: false },
      { id: "6-2", title: "Components and Styling", duration: "28:00", videoUrl: "https://www.youtube.com/embed/ur6I5m2nTvk", completed: false },
      { id: "6-3", title: "Navigation and Routing", duration: "25:00", videoUrl: "https://www.youtube.com/embed/nQVCkqvU1uE", completed: false },
      { id: "6-4", title: "State Management with Redux", duration: "32:00", videoUrl: "https://www.youtube.com/embed/_shA5Xwe8_4", completed: false },
    ]
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    instructor: "Rachel Thompson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    category: "Security",
    duration: "32 hours",
    students: "7.5K",
    rating: 4.8,
    price: "Free",
    color: "from-red-500 to-rose-600",
    description: "Learn network security, ethical hacking, and protection against cyber threats.",
    modules: [
      { id: "7-1", title: "Introduction to Cybersecurity", duration: "22:00", videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA", completed: false },
      { id: "7-2", title: "Network Security Basics", duration: "28:00", videoUrl: "https://www.youtube.com/embed/qwfaoiWRYXQ", completed: false },
      { id: "7-3", title: "Ethical Hacking Overview", duration: "30:00", videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE", completed: false },
      { id: "7-4", title: "Cryptography Fundamentals", duration: "25:00", videoUrl: "https://www.youtube.com/embed/jhXCTbFnK8o", completed: false },
    ]
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    instructor: "David Kumar",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    category: "Cloud Computing",
    duration: "38 hours",
    students: "11.3K",
    rating: 4.9,
    price: "Free",
    color: "from-sky-500 to-blue-600",
    description: "Master Amazon Web Services including EC2, S3, Lambda, and cloud architecture.",
    modules: [
      { id: "8-1", title: "AWS Cloud Concepts", duration: "24:00", videoUrl: "https://www.youtube.com/embed/JIbIYCM48to", completed: false },
      { id: "8-2", title: "EC2 and Virtual Servers", duration: "28:00", videoUrl: "https://www.youtube.com/embed/iHX-jtKIVNA", completed: false },
      { id: "8-3", title: "S3 Storage Solutions", duration: "22:00", videoUrl: "https://www.youtube.com/embed/_I14_sXHO8U", completed: false },
      { id: "8-4", title: "Lambda and Serverless", duration: "26:00", videoUrl: "https://www.youtube.com/embed/eOBq__h4OJ4", completed: false },
    ]
  },
  {
    id: 9,
    title: "Digital Marketing Mastery",
    instructor: "Sophie Carter",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    duration: "30 hours",
    students: "14.6K",
    rating: 4.7,
    price: "Free",
    color: "from-pink-500 to-rose-600",
    description: "Learn SEO, social media marketing, content strategy, and digital advertising.",
    modules: [
      { id: "9-1", title: "Digital Marketing Overview", duration: "20:00", videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM", completed: false },
      { id: "9-2", title: "SEO Fundamentals", duration: "28:00", videoUrl: "https://www.youtube.com/embed/SnxeXZpZkI0", completed: false },
      { id: "9-3", title: "Social Media Marketing", duration: "26:00", videoUrl: "https://www.youtube.com/embed/GFqywciJWJg", completed: false },
      { id: "9-4", title: "Google Ads Basics", duration: "24:00", videoUrl: "https://www.youtube.com/embed/fWZWv8g_Gl8", completed: false },
    ]
  },
  {
    id: 10,
    title: "Blockchain & Cryptocurrency",
    instructor: "Nathan Green",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    category: "Blockchain",
    duration: "36 hours",
    students: "6.9K",
    rating: 4.8,
    price: "Free",
    color: "from-amber-500 to-orange-600",
    description: "Understand blockchain technology, smart contracts, and cryptocurrency fundamentals.",
    modules: [
      { id: "10-1", title: "Blockchain Basics", duration: "25:00", videoUrl: "https://www.youtube.com/embed/qOVAbKKSH10", completed: false },
      { id: "10-2", title: "Cryptocurrency Overview", duration: "22:00", videoUrl: "https://www.youtube.com/embed/1YyAzVmP9xQ", completed: false },
      { id: "10-3", title: "Smart Contracts with Solidity", duration: "32:00", videoUrl: "https://www.youtube.com/embed/M576WGiDBdQ", completed: false },
      { id: "10-4", title: "DeFi and NFTs", duration: "28:00", videoUrl: "https://www.youtube.com/embed/pWGLtjG-F5c", completed: false },
    ]
  },
  {
    id: 11,
    title: "Game Development with Unity",
    instructor: "Chris Parker",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
    category: "Game Development",
    duration: "48 hours",
    students: "13.1K",
    rating: 4.9,
    price: "Free",
    color: "from-indigo-500 to-violet-600",
    description: "Create 2D and 3D games using Unity game engine and C# programming.",
    modules: [
      { id: "11-1", title: "Unity Interface and Basics", duration: "26:00", videoUrl: "https://www.youtube.com/embed/pwZpJzpE2lQ", completed: false },
      { id: "11-2", title: "C# Scripting for Unity", duration: "32:00", videoUrl: "https://www.youtube.com/embed/IlKaB1etrik", completed: false },
      { id: "11-3", title: "2D Game Development", duration: "35:00", videoUrl: "https://www.youtube.com/embed/on9nwbZngyw", completed: false },
      { id: "11-4", title: "3D Game Mechanics", duration: "38:00", videoUrl: "https://www.youtube.com/embed/j48LtUkZRjU", completed: false },
    ]
  },
  {
    id: 12,
    title: "DevOps and CI/CD Pipeline",
    instructor: "Maria Rodriguez",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop",
    category: "DevOps",
    duration: "34 hours",
    students: "8.7K",
    rating: 4.8,
    price: "Free",
    color: "from-cyan-500 to-teal-600",
    description: "Master Docker, Kubernetes, Jenkins, and automated deployment pipelines.",
    modules: [
      { id: "12-1", title: "DevOps Principles", duration: "20:00", videoUrl: "https://www.youtube.com/embed/Xrgk023l4lI", completed: false },
      { id: "12-2", title: "Docker Containerization", duration: "30:00", videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE", completed: false },
      { id: "12-3", title: "Kubernetes Basics", duration: "35:00", videoUrl: "https://www.youtube.com/embed/X48VuDVv0do", completed: false },
      { id: "12-4", title: "CI/CD with Jenkins", duration: "28:00", videoUrl: "https://www.youtube.com/embed/7KCS70sCoK0", completed: false },
    ]
  },
];

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedEnrolledCourses = localStorage.getItem('enrolledCourses');
    const savedQuizScores = localStorage.getItem('quizScores');
    
    if (savedEnrolledCourses) {
      try {
        const parsed = JSON.parse(savedEnrolledCourses);
        setEnrolledCourses(parsed);
      } catch (e) {
        console.error('Failed to load enrolled courses from localStorage', e);
      }
    }

    if (savedQuizScores) {
      try {
        const parsed = JSON.parse(savedQuizScores).map((score: any) => ({
          ...score,
          date: new Date(score.date)
        }));
        setQuizScores(parsed);
      } catch (e) {
        console.error('Failed to load quiz scores from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Save to localStorage whenever quizScores changes
  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

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

  const addQuizScore = (quizScore: Omit<QuizScore, 'id'>) => {
    const newScore: QuizScore = {
      ...quizScore,
      id: `quiz_${Date.now()}`,
    };
    setQuizScores(prev => [...prev, newScore]);
  };

  const getWeeklyPerformance = (): number[] => {
    const weeklyScores = [0, 0, 0, 0, 0, 0, 0];
    const today = new Date();
    
    quizScores.forEach(score => {
      const scoreDate = new Date(score.date);
      const dayDiff = Math.floor((today.getTime() - scoreDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff >= 0 && dayDiff < 7) {
        const dayIndex = 6 - dayDiff;
        weeklyScores[dayIndex] = Math.max(weeklyScores[dayIndex], score.percentage);
      }
    });

    return weeklyScores;
  };

  return (
    <CourseContext.Provider value={{ 
      courses: allCourses, 
      enrolledCourses, 
      quizScores,
      enrollInCourse, 
      isEnrolled,
      updateProgress,
      getCourseById,
      addQuizScore,
      getWeeklyPerformance
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
