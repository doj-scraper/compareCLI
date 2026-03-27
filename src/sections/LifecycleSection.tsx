import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { Trees, Sprout, Hammer, Rocket, Shield, ArrowRight } from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  number: string;
  description: string;
  tools: string[];
  architecture: string;
  color: string;
  icon: React.ElementType;
}

const phases: Phase[] = [
  {
    id: 'scaffolding',
    name: 'Scaffolding',
    number: '01',
    description: 'Greenfield development with disciplined, supervised file creation from a plan.',
    tools: ['Cline', 'Gemini CLI'],
    architecture: 'Spec-Driven / ReAct',
    color: '#2D5A3D',
    icon: Sprout,
  },
  {
    id: 'development',
    name: 'Active Development',
    number: '02',
    description: 'Maintaining deterministic structure and surgical interface changes.',
    tools: ['Claude Code', 'OpenCode'],
    architecture: 'LSP-Driven',
    color: '#00FFFF',
    icon: Hammer,
  },
  {
    id: 'migration',
    name: 'Massive Migrations',
    number: '03',
    description: 'Background automations and massive parallelization without slowing local machine.',
    tools: ['Kimi Code', 'Codex'],
    architecture: 'Cloud-Native / MoE Swarms',
    color: '#FFD700',
    icon: Rocket,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Debugging',
    number: '04',
    description: 'Connecting legacy code to Jira tickets, Confluence docs, and Slack context.',
    tools: ['Atlassian Rovo'],
    architecture: 'Graph-Based',
    color: '#FF6B6B',
    icon: Shield,
  },
];

const LifecycleSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 400;

    svg.attr('height', height);

    // Gradient definitions
    const defs = svg.append('defs');

    // Create gradients for each phase
    phases.forEach((phase) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${phase.id}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', phase.color)
        .attr('stop-opacity', 0.3);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', phase.color)
        .attr('stop-opacity', 0.05);
    });

    // Glow filter
    const glowFilter = defs.append('filter')
      .attr('id', 'lifecycleGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '8')
      .attr('result', 'coloredBlur');
    glowFilter.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');
    glowFilter.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Draw the river path (flowing timeline)
    const riverPath = d3.path();
    const startX = 80;
    const endX = width - 80;
    const y = height / 2;
    
    riverPath.moveTo(startX, y);
    
    // Create meandering river
    const segments = phases.length - 1;
    const segmentWidth = (endX - startX) / segments;
    
    for (let i = 0; i <= segments; i++) {
      const x = startX + i * segmentWidth;
      const offsetY = Math.sin(i * Math.PI / 2) * 30;
      
      if (i === 0) {
        riverPath.moveTo(x, y + offsetY);
      } else {
        const prevX = startX + (i - 1) * segmentWidth;
        const prevOffsetY = Math.sin((i - 1) * Math.PI / 2) * 30;
        const cpX = (prevX + x) / 2;
        riverPath.quadraticCurveTo(cpX, y + (prevOffsetY + offsetY) / 2, x, y + offsetY);
      }
    }

    // Draw river background
    phases.forEach((phase, i) => {
      const x = startX + i * segmentWidth;
      const offsetY = Math.sin(i * Math.PI / 2) * 30;
      
      // Phase pool (circle)
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y + offsetY)
        .attr('r', 50)
        .attr('fill', `url(#gradient-${phase.id})`)
        .attr('stroke', phase.color)
        .attr('stroke-width', hoveredPhase === phase.id ? 3 : 2)
        .attr('stroke-opacity', hoveredPhase === phase.id ? 1 : 0.5)
        .attr('filter', hoveredPhase === phase.id ? 'url(#lifecycleGlow)' : null)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredPhase(phase.id))
        .on('mouseleave', () => setHoveredPhase(null))
        .on('click', () => setActivePhase(activePhase === phase.id ? null : phase.id));

      // Phase number
      svg.append('text')
        .attr('x', x)
        .attr('y', y + offsetY - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', phase.color)
        .attr('font-size', '24px')
        .attr('font-family', '"Cormorant Garamond", serif')
        .attr('font-weight', '700')
        .text(phase.number)
        .style('pointer-events', 'none');

      // Phase name
      svg.append('text')
        .attr('x', x)
        .attr('y', y + offsetY + 15)
        .attr('text-anchor', 'middle')
        .attr('fill', '#E8F1F2')
        .attr('font-size', '11px')
        .attr('font-family', 'Inter, sans-serif')
        .text(phase.name)
        .style('pointer-events', 'none');

      // Connection to next phase
      if (i < phases.length - 1) {
        const nextX = startX + (i + 1) * segmentWidth;
        const nextOffsetY = Math.sin((i + 1) * Math.PI / 2) * 30;
        
        // River flow line
        svg.append('path')
          .attr('d', `M${x + 50},${y + offsetY} Q${(x + nextX) / 2},${y + (offsetY + nextOffsetY) / 2} ${nextX - 50},${y + nextOffsetY}`)
          .attr('stroke', phase.color)
          .attr('stroke-width', 3)
          .attr('fill', 'none')
          .attr('opacity', 0.4)
          .attr('stroke-linecap', 'round');

        // Animated flow particles
        const particle = svg.append('circle')
          .attr('r', 4)
          .attr('fill', phase.color)
          .attr('filter', 'url(#lifecycleGlow)');

        // Animate particle along path
        const pathNode = svg.append('path')
          .attr('d', `M${x + 50},${y + offsetY} Q${(x + nextX) / 2},${y + (offsetY + nextOffsetY) / 2} ${nextX - 50},${y + nextOffsetY}`)
          .attr('fill', 'none');

        pathNode.remove();

        // Create temporary path for animation
        const tempPath = svg.append('path')
          .attr('d', `M${x + 50},${y + offsetY} Q${(x + nextX) / 2},${y + (offsetY + nextOffsetY) / 2} ${nextX - 50},${y + nextOffsetY}`)
          .attr('fill', 'none')
          .attr('opacity', 0);

        const tempPathLength = (tempPath.node() as SVGPathElement).getTotalLength();
        
        function animateFlow() {
          particle
            .transition()
            .duration(2500)
            .ease(d3.easeLinear)
            .attrTween('transform', function() {
              return function(t: number) {
                const point = (tempPath.node() as SVGPathElement).getPointAtLength(t * tempPathLength);
                return `translate(${point.x}, ${point.y})`;
              };
            })
            .on('end', animateFlow);
        }

        setTimeout(animateFlow, i * 500);
      }
    });

    // Flow direction arrows
    phases.forEach((phase, i) => {
      if (i < phases.length - 1) {
        const x = startX + i * segmentWidth;
        const nextX = startX + (i + 1) * segmentWidth;
        const midX = (x + nextX) / 2;
        const offsetY = Math.sin(i * Math.PI / 2) * 30;
        const nextOffsetY = Math.sin((i + 1) * Math.PI / 2) * 30;
        const midY = y + (offsetY + nextOffsetY) / 2;

        svg.append('polygon')
          .attr('points', `${midX},${midY - 6} ${midX + 10},${midY} ${midX},${midY + 6}`)
          .attr('fill', phase.color)
          .attr('opacity', 0.6);
      }
    });

  }, [hoveredPhase, activePhase]);

  return (
    <div className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-earth/20 border border-earth/30">
            <Trees className="w-6 h-6 text-starlight" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-moonlight">
              Architectural Matchmaking
            </h2>
            <p className="text-moonlight-dim font-body">
              Best-fit tool architecture for each project lifecycle phase
            </p>
          </div>
        </div>
      </motion.div>

      {/* Lifecycle Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-6 overflow-hidden"
      >
        <svg 
          ref={svgRef} 
          className="w-full"
          style={{ minHeight: '400px' }}
        />
      </motion.div>

      {/* Phase Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          const isHovered = hoveredPhase === phase.id;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              onClick={() => setActivePhase(isActive ? null : phase.id)}
              onMouseEnter={() => setHoveredPhase(phase.id)}
              onMouseLeave={() => setHoveredPhase(null)}
              className={`
                glass-card rounded-xl p-5 cursor-pointer transition-all duration-300
                ${isActive || isHovered ? 'border-opacity-100' : 'border-opacity-30'}
              `}
              style={{ 
                borderColor: phase.color,
                boxShadow: isActive || isHovered ? `0 0 20px ${phase.color}30` : 'none'
              }}
            >
              {/* Phase Number & Icon */}
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="text-2xl font-display font-bold"
                  style={{ color: phase.color }}
                >
                  {phase.number}
                </span>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${phase.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: phase.color }} />
                </div>
              </div>

              {/* Phase Name */}
              <h3 className="font-display text-lg text-moonlight mb-2">
                {phase.name}
              </h3>

              {/* Description */}
              <p className="text-moonlight-dim text-sm font-body mb-4 line-clamp-2">
                {phase.description}
              </p>

              {/* Architecture Type */}
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                style={{ 
                  backgroundColor: `${phase.color}20`,
                  color: phase.color
                }}
              >
                {phase.architecture}
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-1">
                {phase.tools.map((tool) => (
                  <span 
                    key={tool}
                    className="px-2 py-0.5 rounded bg-white/5 text-moonlight-dim text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Flow Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8 flex items-center justify-center gap-4"
      >
        <div className="flex items-center gap-2 text-moonlight-dim/60 text-sm">
          <span>Greenfield</span>
          <ArrowRight className="w-4 h-4" />
          <span>Development</span>
          <ArrowRight className="w-4 h-4" />
          <span>Migration</span>
          <ArrowRight className="w-4 h-4" />
          <span>Enterprise</span>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-moonlight-dim/60 font-body text-sm max-w-2xl mx-auto">
          Each phase demands a different architectural approach. Match the right tool 
          to the right phase for optimal development velocity and code quality.
        </p>
      </motion.div>
    </div>
  );
};

export default LifecycleSection;
