import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { Network, Zap, Search, Code } from 'lucide-react';

const ArchitectureSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeSide, setActiveSide] = useState<'lsp' | 'agentic' | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 500;
    const centerX = width / 2;
    const gap = 60;

    svg.attr('height', height);

    // Background gradient definitions
    const defs = svg.append('defs');

    // LSP gradient
    const lspGradient = defs.append('linearGradient')
      .attr('id', 'lspGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    lspGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#00FFFF')
      .attr('stop-opacity', 0.2);
    lspGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00FFFF')
      .attr('stop-opacity', 0.05);

    // Agentic gradient
    const agenticGradient = defs.append('linearGradient')
      .attr('id', 'agenticGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    agenticGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFA500')
      .attr('stop-opacity', 0.2);
    agenticGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FFA500')
      .attr('stop-opacity', 0.05);

    // Glow filters
    const lspGlow = defs.append('filter')
      .attr('id', 'lspGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    lspGlow.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    lspGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');
    lspGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    const agenticGlow = defs.append('filter')
      .attr('id', 'agenticGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    agenticGlow.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    agenticGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');
    agenticGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Draw center divider (the "crack")
    const crackPath = d3.path();
    crackPath.moveTo(centerX, 0);
    
    // Create jagged crack line
    for (let y = 0; y <= height; y += 20) {
      const offset = Math.sin(y * 0.1) * 3 + (Math.random() - 0.5) * 4;
      crackPath.lineTo(centerX + offset, y);
    }

    svg.append('path')
      .attr('d', crackPath.toString())
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // LSP Side (Left)
    const lspGroup = svg.append('g')
      .attr('class', 'lsp-side')
      .style('cursor', 'pointer')
      .on('mouseenter', () => setActiveSide('lsp'))
      .on('mouseleave', () => setActiveSide(null));

    // LSP background
    lspGroup.append('rect')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', centerX - gap - 20)
      .attr('height', height - 40)
      .attr('fill', 'url(#lspGradient)')
      .attr('rx', 16)
      .attr('stroke', activeSide === 'lsp' ? '#00FFFF' : 'rgba(0,255,255,0.2)')
      .attr('stroke-width', activeSide === 'lsp' ? 2 : 1);

    // LSP Title
    lspGroup.append('text')
      .attr('x', 50)
      .attr('y', 70)
      .attr('fill', '#00FFFF')
      .attr('font-size', '24px')
      .attr('font-family', '"Cormorant Garamond", serif')
      .attr('font-weight', '600')
      .text('The LSP-Driven Surgeon');

    lspGroup.append('text')
      .attr('x', 50)
      .attr('y', 95)
      .attr('fill', 'rgba(0,255,255,0.6)')
      .attr('font-size', '14px')
      .attr('font-family', 'Inter, sans-serif')
      .text('Deterministic • Precise • Surgical');

    // LSP Diagram
    const lspNodes = [
      { x: 80, y: 150, label: 'LLM', icon: '🧠' },
      { x: 80, y: 250, label: 'LSP Server', icon: '🔌' },
      { x: 80, y: 350, label: 'AST', icon: '🌳' },
    ];

    // Draw LSP connections
    lspGroup.append('line')
      .attr('x1', 80)
      .attr('y1', 170)
      .attr('x2', 80)
      .attr('y2', 230)
      .attr('stroke', '#00FFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    lspGroup.append('line')
      .attr('x1', 80)
      .attr('y1', 270)
      .attr('x2', 80)
      .attr('y2', 330)
      .attr('stroke', '#00FFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    // Draw LSP nodes
    lspNodes.forEach((node) => {
      const nodeGroup = lspGroup.append('g')
        .attr('transform', `translate(${node.x}, ${node.y})`);

      // Node circle
      nodeGroup.append('circle')
        .attr('r', 30)
        .attr('fill', 'rgba(0,255,255,0.1)')
        .attr('stroke', '#00FFFF')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#lspGlow)');

      // Icon
      nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '5')
        .attr('font-size', '20px')
        .text(node.icon);

      // Label
      nodeGroup.append('text')
        .attr('x', 45)
        .attr('dy', '5')
        .attr('fill', '#E8F1F2')
        .attr('font-size', '14px')
        .attr('font-family', 'Inter, sans-serif')
        .text(node.label);
    });

    // LSP Features
    const lspFeatures = [
      'Direct LSP connection',
      'AST-based edits',
      'Compiler error feedback',
      'High accuracy',
    ];

    lspFeatures.forEach((feature, i) => {
      lspGroup.append('text')
        .attr('x', 200)
        .attr('y', 160 + i * 35)
        .attr('fill', 'rgba(0,255,255,0.8)')
        .attr('font-size', '13px')
        .attr('font-family', 'Inter, sans-serif')
        .text(`✓ ${feature}`);
    });

    // Animated data flow dots (LSP)
    const lspFlowData = [
      { x: 80, y1: 170, y2: 230 },
      { x: 80, y1: 270, y2: 330 },
    ];

    lspFlowData.forEach((flow, i) => {
      const dot = lspGroup.append('circle')
        .attr('cx', flow.x)
        .attr('cy', flow.y1)
        .attr('r', 4)
        .attr('fill', '#00FFFF')
        .attr('filter', 'url(#lspGlow)');

      // Animate
      function animateLSPDot() {
        dot
          .attr('cy', flow.y1)
          .transition()
          .duration(1500)
          .ease(d3.easeLinear)
          .attr('cy', flow.y2)
          .transition()
          .duration(0)
          .attr('cy', flow.y1)
          .on('end', animateLSPDot);
      }
      
      setTimeout(animateLSPDot, i * 750);
    });

    // Agentic Side (Right)
    const agenticGroup = svg.append('g')
      .attr('class', 'agentic-side')
      .style('cursor', 'pointer')
      .on('mouseenter', () => setActiveSide('agentic'))
      .on('mouseleave', () => setActiveSide(null));

    // Agentic background
    agenticGroup.append('rect')
      .attr('x', centerX + gap)
      .attr('y', 20)
      .attr('width', centerX - gap - 20)
      .attr('height', height - 40)
      .attr('fill', 'url(#agenticGradient)')
      .attr('rx', 16)
      .attr('stroke', activeSide === 'agentic' ? '#FFA500' : 'rgba(255,165,0,0.2)')
      .attr('stroke-width', activeSide === 'agentic' ? 2 : 1);

    // Agentic Title
    agenticGroup.append('text')
      .attr('x', centerX + gap + 30)
      .attr('y', 70)
      .attr('fill', '#FFA500')
      .attr('font-size', '24px')
      .attr('font-family', '"Cormorant Garamond", serif')
      .attr('font-weight', '600')
      .text('The Agentic Search Navigator');

    agenticGroup.append('text')
      .attr('x', centerX + gap + 30)
      .attr('y', 95)
      .attr('fill', 'rgba(255,165,0,0.6)')
      .attr('font-size', '14px')
      .attr('font-family', 'Inter, sans-serif')
      .text('Probabilistic • Exploratory • Adaptive');

    // Agentic Diagram
    const agenticNodes = [
      { x: centerX + gap + 60, y: 150, label: 'LLM', icon: '🧠' },
      { x: centerX + gap + 60, y: 250, label: 'Shell', icon: '💻' },
      { x: centerX + gap + 60, y: 350, label: 'Files', icon: '📁' },
    ];

    // Draw Agentic connections (dotted)
    agenticGroup.append('line')
      .attr('x1', centerX + gap + 60)
      .attr('y1', 170)
      .attr('x2', centerX + gap + 60)
      .attr('y2', 230)
      .attr('stroke', '#FFA500')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.6);

    agenticGroup.append('line')
      .attr('x1', centerX + gap + 60)
      .attr('y1', 270)
      .attr('x2', centerX + gap + 60)
      .attr('y2', 330)
      .attr('stroke', '#FFA500')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.6);

    // Draw Agentic nodes
    agenticNodes.forEach((node) => {
      const nodeGroup = agenticGroup.append('g')
        .attr('transform', `translate(${node.x}, ${node.y})`);

      // Node circle (cloud-like)
      nodeGroup.append('circle')
        .attr('r', 30)
        .attr('fill', 'rgba(255,165,0,0.1)')
        .attr('stroke', '#FFA500')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,3')
        .attr('filter', 'url(#agenticGlow)');

      // Icon
      nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '5')
        .attr('font-size', '20px')
        .text(node.icon);

      // Label
      nodeGroup.append('text')
        .attr('x', 45)
        .attr('dy', '5')
        .attr('fill', '#E8F1F2')
        .attr('font-size', '14px')
        .attr('font-family', 'Inter, sans-serif')
        .text(node.label);
    });

    // Agentic Features
    const agenticFeatures = [
      'Shell command execution',
      'grep/ls/read_file ops',
      'Recursive search',
      'Discovery-focused',
    ];

    agenticFeatures.forEach((feature, i) => {
      agenticGroup.append('text')
        .attr('x', centerX + gap + 180)
        .attr('y', 160 + i * 35)
        .attr('fill', 'rgba(255,165,0,0.8)')
        .attr('font-size', '13px')
        .attr('font-family', 'Inter, sans-serif')
        .text(`◆ ${feature}`);
    });

    // Animated data flow dots (Agentic)
    const agenticFlowData = [
      { x: centerX + gap + 60, y1: 170, y2: 230 },
      { x: centerX + gap + 60, y1: 270, y2: 330 },
    ];

    agenticFlowData.forEach((flow, i) => {
      const dot = agenticGroup.append('circle')
        .attr('cx', flow.x)
        .attr('cy', flow.y1)
        .attr('r', 4)
        .attr('fill', '#FFA500')
        .attr('filter', 'url(#agenticGlow)');

      // Animate with easing
      function animateAgenticDot() {
        dot
          .attr('cy', flow.y1)
          .transition()
          .duration(2000)
          .ease(d3.easeCubicInOut)
          .attr('cy', flow.y2)
          .transition()
          .duration(500)
          .ease(d3.easeCubicInOut)
          .attr('cy', flow.y1)
          .on('end', animateAgenticDot);
      }
      
      setTimeout(animateAgenticDot, i * 1000);
    });

  }, [activeSide]);

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
          <div className="p-3 rounded-xl bg-midnight/20 border border-midnight/30">
            <Network className="w-6 h-6 text-starlight" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-moonlight">
              Architecture Under the Hood
            </h2>
            <p className="text-moonlight-dim font-body">
              Deterministic vs Probabilistic approaches to code intelligence
            </p>
          </div>
        </div>
      </motion.div>

      {/* Architecture Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-6 overflow-hidden"
      >
        <svg 
          ref={svgRef} 
          className="w-full"
          style={{ minHeight: '500px' }}
        />
      </motion.div>

      {/* Comparison Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LSP Card */}
        <div 
          className={`
            glass-card rounded-xl p-6 transition-all duration-300
            ${activeSide === 'lsp' ? 'border-glow-cyan shadow-glow-cyan' : ''}
          `}
          onMouseEnter={() => setActiveSide('lsp')}
          onMouseLeave={() => setActiveSide(null)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Code className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-display text-xl text-cyan-400">LSP-Driven</h3>
          </div>
          <p className="text-moonlight-dim text-sm font-body mb-4">
            Direct integration with Language Server Protocol enables surgical precision 
            through Abstract Syntax Tree manipulation and compiler-grade accuracy.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Claude Code', 'OpenCode', 'KiloCode'].map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Agentic Card */}
        <div 
          className={`
            glass-card rounded-xl p-6 transition-all duration-300
            ${activeSide === 'agentic' ? 'border-orange-400/50 shadow-[0_0_20px_rgba(255,165,0,0.2)]' : ''}
          `}
          onMouseEnter={() => setActiveSide('agentic')}
          onMouseLeave={() => setActiveSide(null)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <Search className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="font-display text-xl text-orange-400">Agentic Search</h3>
          </div>
          <p className="text-moonlight-dim text-sm font-body mb-4">
            ReAct loop execution with shell commands mimics human navigation, 
            enabling discovery across large codebases through iterative exploration.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Gemini CLI', 'Cline'].map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <Zap className="w-4 h-4 text-starlight" />
          <span className="text-moonlight-dim text-sm font-body">
            The architectural choice determines accuracy, speed, and scalability
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ArchitectureSection;
