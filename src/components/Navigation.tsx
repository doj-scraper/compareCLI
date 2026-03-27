import { motion } from 'framer-motion';
import { Trees, Grid3X3, Cpu, Network, GitBranch } from 'lucide-react';
import type { Section } from '../App';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'landing', label: 'Overview', icon: Grid3X3 },
  { id: 'matrix', label: 'Spectrum', icon: Cpu },
  { id: 'architecture', label: 'Architecture', icon: Network },
  { id: 'swarm', label: 'Scaling', icon: GitBranch },
  { id: 'lifecycle', label: 'Lifecycle', icon: Trees },
];

const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav className="backdrop-blur-2xl bg-night-sky/60 border border-white/10 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Trees className="w-7 h-7 text-forest" />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-starlight rounded-full"
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl text-moonlight leading-none">
                  Night Forest
                </span>
                <span className="text-[10px] text-moonlight-dim/60 tracking-widest uppercase font-body">
                  AI Analytics
                </span>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-4 py-2 rounded-xl flex items-center gap-2
                      transition-all duration-300 font-body text-sm
                      ${isActive 
                        ? 'text-starlight' 
                        : 'text-moonlight-dim hover:text-moonlight'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-starlight' : ''}`} />
                    <span>{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/5 rounded-xl border border-starlight/20"
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30 
                        }}
                      />
                    )}
                    
                    {/* Hover Glow */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Current Section Indicator */}
            <div className="flex items-center gap-2 text-sm font-body text-moonlight-dim/60">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              <span className="hidden sm:inline">
                {navItems.find(item => item.id === currentSection)?.label}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;
