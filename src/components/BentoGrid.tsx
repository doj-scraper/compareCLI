import { motion } from 'framer-motion';
import { 
  Cpu, 
  Network, 
  GitBranch, 
  Trees, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import type { Section } from '../App';

interface BentoGridProps {
  onNavigate: (section: Section) => void;
}

const bentoCards = [
  {
    id: 'matrix' as Section,
    title: 'The Spectrum',
    subtitle: 'AI Tools Comparison Matrix',
    description: 'Comprehensive analysis of 8 leading AI coding tools across key functional categories.',
    icon: Cpu,
    size: 'large',
    color: 'from-forest/20 to-midnight/20',
    accentColor: 'border-forest/30',
    stats: [
      { label: 'Tools', value: '8' },
      { label: 'Categories', value: '4' },
    ],
  },
  {
    id: 'architecture' as Section,
    title: 'Architecture',
    subtitle: 'LSP vs Agentic Search',
    description: 'The fundamental divide between deterministic and probabilistic approaches.',
    icon: Network,
    size: 'wide',
    color: 'from-midnight/20 to-twilight/20',
    accentColor: 'border-midnight/30',
    stats: [
      { label: 'Paradigms', value: '2' },
    ],
  },
  {
    id: 'swarm' as Section,
    title: 'Scaling',
    subtitle: 'Single Agent vs Swarms',
    description: 'How orchestration differs for complex and massive tasks.',
    icon: GitBranch,
    size: 'tall',
    color: 'from-twilight/20 to-forest/10',
    accentColor: 'border-twilight/30',
    stats: [
      { label: 'Models', value: '2' },
    ],
  },
  {
    id: 'lifecycle' as Section,
    title: 'Lifecycle',
    subtitle: 'Project Phase Matching',
    description: 'Which tool architecture performs best during specific development phases.',
    icon: Trees,
    size: 'wide',
    color: 'from-forest/10 to-earth/20',
    accentColor: 'border-earth/30',
    stats: [
      { label: 'Phases', value: '4' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    rotateX: 15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const BentoGrid = ({ onNavigate }: BentoGridProps) => {
  return (
    <div className="section-container min-h-screen flex flex-col justify-center">
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <Sparkles className="w-4 h-4 text-starlight" />
          <span className="text-sm text-moonlight-dim font-body">
            Intelligence Rooted in Nature
          </span>
        </motion.div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-moonlight mb-4 moonlight-glow">
          AI Coding Tools
          <span className="block text-starlight">Analysis</span>
        </h1>
        
        <p className="text-lg md:text-xl text-moonlight-dim max-w-2xl mx-auto font-body">
          A comprehensive study of intelligent development ecosystems, 
          visualized through the lens of a midnight forest.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full"
        style={{ perspective: '1000px' }}
      >
        {bentoCards.map((card) => {
          const Icon = card.icon;
          const isLarge = card.size === 'large';
          const isWide = card.size === 'wide';
          const isTall = card.size === 'tall';

          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onClick={() => onNavigate(card.id)}
              className={`
                relative group cursor-pointer overflow-hidden rounded-2xl
                backdrop-blur-xl bg-gradient-to-br ${card.color}
                border ${card.accentColor}
                transition-all duration-500
                hover:shadow-glass-hover hover:border-white/20
                ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                ${isWide ? 'md:col-span-2' : ''}
                ${isTall ? 'md:row-span-2' : ''}
              `}
            >
              {/* Card Content */}
              <div className={`
                relative z-10 p-6 h-full flex flex-col
                ${isLarge ? 'min-h-[400px]' : isTall ? 'min-h-[300px]' : 'min-h-[180px]'}
              `}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-3 rounded-xl bg-white/5 border border-white/10
                    group-hover:bg-white/10 group-hover:border-starlight/30
                    transition-all duration-300
                  `}>
                    <Icon className="w-6 h-6 text-starlight" />
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-3">
                    {card.stats.map((stat, i) => (
                      <div key={i} className="text-right">
                        <div className="text-2xl font-display text-moonlight">
                          {stat.value}
                        </div>
                        <div className="text-xs text-moonlight-dim/60 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-moonlight mb-1 group-hover:text-starlight transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-moonlight-dim/80 mb-3 font-body">
                    {card.subtitle}
                  </p>
                  <p className={`
                    text-moonlight-dim/60 font-body leading-relaxed
                    ${isLarge ? 'text-base' : 'text-sm line-clamp-2'}
                  `}>
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-2 text-starlight opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-body">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-night-sky/80 via-transparent to-transparent" />
                
                {/* Corner Glow */}
                <div className={`
                  absolute -bottom-20 -right-20 w-40 h-40 
                  bg-starlight/10 rounded-full blur-3xl
                  group-hover:bg-starlight/20 transition-all duration-500
                `} />
                
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border border-starlight/0 group-hover:border-starlight/20 transition-colors duration-500" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-sm text-moonlight-dim/40 font-body">
          Click any card to explore • Use arrow keys to navigate
        </p>
      </motion.div>
    </div>
  );
};

export default BentoGrid;
