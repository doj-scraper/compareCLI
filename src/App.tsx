import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import FireflyBackground from './components/FireflyBackground';
import Navigation from './components/Navigation';
import BentoGrid from './components/BentoGrid';
import MatrixSection from './sections/MatrixSection';
import ArchitectureSection from './sections/ArchitectureSection';
import SwarmSection from './sections/SwarmSection';
import LifecycleSection from './sections/LifecycleSection';

export type Section = 'landing' | 'matrix' | 'architecture' | 'swarm' | 'lifecycle';

const sections: Section[] = ['landing', 'matrix', 'architecture', 'swarm', 'lifecycle'];

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [isNavigating, setIsNavigating] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const navigateTo = (section: Section) => {
    if (section === currentSection || isNavigating) return;
    setIsNavigating(true);
    setCurrentSection(section);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const goNext = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      navigateTo(sections[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      navigateTo(sections[currentIndex - 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  const renderSection = () => {
    switch (currentSection) {
      case 'landing':
        return <BentoGrid onNavigate={navigateTo} />;
      case 'matrix':
        return <MatrixSection />;
      case 'architecture':
        return <ArchitectureSection />;
      case 'swarm':
        return <SwarmSection />;
      case 'lifecycle':
        return <LifecycleSection />;
      default:
        return <BentoGrid onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-night-sky overflow-hidden">
      {/* Firefly Background */}
      <FireflyBackground />
      
      {/* Static Header */}
      <Navigation 
        currentSection={currentSection} 
        onNavigate={navigateTo} 
      />

      {/* Main Content Area */}
      <main 
        ref={mainRef}
        className="relative z-10 pt-20 pb-24 min-h-screen"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          onClick={goPrev}
          disabled={currentSection === 'landing'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            backdrop-blur-xl border border-white/10
            transition-all duration-300
            ${currentSection === 'landing' 
              ? 'opacity-30 cursor-not-allowed bg-white/5' 
              : 'bg-white/10 hover:bg-white/20 hover:border-starlight/30 hover:shadow-glow'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5 text-moonlight" />
        </motion.button>

        {/* Section Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => navigateTo(section)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${currentSection === section 
                  ? 'w-8 bg-starlight shadow-glow' 
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goNext}
          disabled={currentSection === 'lifecycle'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            backdrop-blur-xl border border-white/10
            transition-all duration-300
            ${currentSection === 'lifecycle' 
              ? 'opacity-30 cursor-not-allowed bg-white/5' 
              : 'bg-white/10 hover:bg-white/20 hover:border-starlight/30 hover:shadow-glow'
            }
          `}
        >
          <ChevronRight className="w-5 h-5 text-moonlight" />
        </motion.button>
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-4 right-6 z-50 text-xs text-moonlight-dim/60 font-body">
        <span className="font-display text-sm text-starlight-dim">Night Forest</span> Analytics
      </div>
    </div>
  );
}

export default App;
