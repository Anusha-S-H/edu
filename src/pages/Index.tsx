import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Courses from "@/components/landing/Courses";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Pricing />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
