import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, Sparkles, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Courses", href: "#courses" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 100; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="glass-card rounded-2xl border border-border/50">
          <div className="container px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold">LearnFlow</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700" />
                  )}
                </button>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border/50"
              >
                <div className="container px-6 py-4 space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="block py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 flex flex-col gap-3">                  <button
                    onClick={toggleTheme}
                    className="w-full p-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-500" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-slate-700" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Log In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full gap-2">
                        <Sparkles className="w-4 h-4" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
