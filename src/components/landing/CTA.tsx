import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating decorations */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-float" />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl animate-float" style={{ animationDelay: "-3s" }} />

          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            {/* Icons */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join 50,000+ learners who are already experiencing the future of education. 
              Start your journey today — it's free!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="xl"
                className="text-white border border-white/30 hover:bg-white/10"
              >
                View Pricing
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">
              No credit card required • Free forever plan available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
