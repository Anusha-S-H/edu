import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    name: "Free",
    icon: Sparkles,
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with learning",
    features: [
      "Access to all free courses",
      "AI Notes Summarizer",
      "Random Quiz Generator",
      "Basic progress tracking",
      "Community support",
      "Mobile app access",
    ],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    name: "Pro",
    icon: Zap,
    price: "$19",
    period: "per month",
    description: "For serious learners who want more",
    features: [
      "Everything in Free",
      "Premium course library",
      "Advanced AI features",
      "Personalized learning paths",
      "Offline course downloads",
      "Priority support",
      "Weekly live sessions",
      "Custom flashcard decks",
    ],
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "$99",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom course creation",
      "Advanced analytics dashboard",
      "Dedicated account manager",
      "SSO & security features",
      "API access",
      "White-label options",
    ],
    color: "from-amber-500 to-orange-500",
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Choose Your <span className="gradient-text">Learning Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`h-full bg-card border-2 ${plan.popular ? 'border-primary' : 'border-border'} rounded-2xl p-8 hover:shadow-xl transition-shadow`}>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full mb-6"
                  onClick={() => navigate("/signup")}
                >
                  {plan.name === "Free" ? "Get Started" : `Choose ${plan.name}`}
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Have questions? Check out our{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              FAQ
            </a>{" "}
            or{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              contact support
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
