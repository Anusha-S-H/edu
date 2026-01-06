import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  image: string;
  nextLesson: string;
  timeLeft: string;
}

const CourseCard = ({ title, instructor, progress, image, nextLesson, timeLeft }: CourseCardProps) => {
  return (
    <div className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full gradient-accent"
          />
        </div>

        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
          <Play className="w-4 h-4 text-primary fill-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-sm mb-1 line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{instructor}</p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{timeLeft}</span>
          </div>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Next: {nextLesson}</p>
          <Button variant="hero" size="sm" className="w-full">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
