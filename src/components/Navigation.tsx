import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-glow">Cosmic Explorer</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#planets" className="text-foreground hover:text-primary transition-colors">
              Planets
            </a>
            <a href="#data" className="text-foreground hover:text-primary transition-colors">
              Space Data
            </a>
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              Explore Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#home"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#planets"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Planets
            </a>
            <a
              href="#data"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Space Data
            </a>
            <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
              Explore Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
