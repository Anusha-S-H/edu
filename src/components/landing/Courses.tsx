import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    category: "Development",
    duration: "42 hours",
    students: "12.5K",
    rating: 4.9,
    price: "$89",
    color: "from-blue-500 to-indigo-600",
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
    price: "$129",
    color: "from-purple-500 to-pink-600",
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
    price: "$79",
    color: "from-teal-500 to-cyan-600",
  },
];

const Courses = () => {
  return (
    <section className="py-24 bg-muted/30" id="courses">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Popular <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Explore our top-rated courses taught by industry experts
            </p>
          </div>
          <Button variant="outline" className="gap-2 self-start md:self-auto">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
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
                    <Button size="sm" variant="hero">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
