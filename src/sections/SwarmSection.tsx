import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { GitBranch, Users, User } from 'lucide-react';

const SwarmSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeModel, setActiveModel] = useState<'orchestrator' | 'swarm' | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 500;

    svg.attr('height', height);

    // Gradient definitions
    const defs = svg.append('defs');

    // Orchestrator gradient
    const orchGradient = defs.append('linearGradient')
      .attr('id', 'orchGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    orchGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#2D5A3D')
      .attr('stop-opacity', 0.3);
    orchGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1E3A5F')
      .attr('stop-opacity', 0.1);

    // Swarm gradient
    const swarmGradient = defs.append('linearGradient')
      .attr('id', 'swarmGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    swarmGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFD700')
      .attr('stop-opacity', 0.2);
    swarmGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FF6B6B')
      .attr('stop-opacity', 0.1);

    // Glow filters
    const greenGlow = defs.append('filter')
      .attr('id', 'greenGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    greenGlow.append('feGaussianBlur')
      .attr('stdDeviation', '6')
      .attr('result', 'coloredBlur');
    greenGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');
    greenGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    const goldGlow = defs.append('filter')
      .attr('id', 'goldGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    goldGlow.append('feGaussianBlur')
      .attr('stdDeviation', '6')
      .attr('result', 'coloredBlur');
    goldGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');
    goldGlow.append('feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Left Side: Precise Orchestrator
    const orchGroup = svg.append('g')
      .attr('class', 'orchestrator')
      .style('cursor', 'pointer')
      .on('mouseenter', () => setActiveModel('orchestrator'))
      .on('mouseleave', () => setActiveModel(null));

    // Background
    orchGroup.append('rect')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', width / 2 - 40)
      .attr('height', height - 40)
      .attr('fill', 'url(#orchGradient)')
      .attr('rx', 16)
      .attr('stroke', activeModel === 'orchestrator' ? '#2D5A3D' : 'rgba(45,90,61,0.3)')
      .attr('stroke-width', activeModel === 'orchestrator' ? 2 : 1);

    // Title
    orchGroup.append('text')
      .attr('x', 50)
      .attr('y', 60)
      .attr('fill', '#2D5A3D')
      .attr('font-size', '22px')
      .attr('font-family', '"Cormorant Garamond", serif')
      .attr('font-weight', '600')
      .text('The Precise Orchestrator');

    orchGroup.append('text')
      .attr('x', 50)
      .attr('y', 80)
      .attr('fill', 'rgba(45,90,61,0.7)')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter, sans-serif')
      .text('Sequential • Controlled • Surgical');

    // Sequential workflow nodes
    const orchNodes = [
      { x: 80, y: 130, label: 'User Prompt', color: '#2D5A3D' },
      { x: 80, y: 190, label: 'Technical Plan', color: '#3D7A5D' },
      { x: 80, y: 250, label: 'Approval Gate', color: '#FFD700' },
      { x: 80, y: 310, label: 'Execution', color: '#3D7A5D' },
      { x: 80, y: 370, label: 'Feedback Loop', color: '#2D5A3D' },
    ];

    // Draw connections
    for (let i = 0; i < orchNodes.length - 1; i++) {
      orchGroup.append('line')
        .attr('x1', orchNodes[i].x)
        .attr('y1', orchNodes[i].y + 20)
        .attr('x2', orchNodes[i + 1].x)
        .attr('y2', orchNodes[i + 1].y - 20)
        .attr('stroke', '#2D5A3D')
        .attr('stroke-width', 2)
        .attr('opacity', 0.5)
        .attr('marker-end', 'url(#arrowGreen)');
    }

    // Draw nodes
    orchNodes.forEach((node, i) => {
      const nodeGroup = orchGroup.append('g')
        .attr('transform', `translate(${node.x}, ${node.y})`);

      // Circle
      nodeGroup.append('circle')
        .attr('r', 22)
        .attr('fill', 'rgba(45,90,61,0.2)')
        .attr('stroke', node.color)
        .attr('stroke-width', 2)
        .attr('filter', 'url(#greenGlow)');

      // Number
      nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '5')
        .attr('fill', node.color)
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text(i + 1);

      // Label
      nodeGroup.append('text')
        .attr('x', 35)
        .attr('dy', '5')
        .attr('fill', '#E8F1F2')
        .attr('font-size', '13px')
        .attr('font-family', 'Inter, sans-serif')
        .text(node.label);
    });

    // Characteristics
    const orchChars = [
      'Strict sequential flow',
      'Human approval gates',
      'Single execution path',
      'High precision control',
    ];

    orchChars.forEach((char, i) => {
      orchGroup.append('text')
        .attr('x', 250)
        .attr('y', 140 + i * 35)
        .attr('fill', 'rgba(232,241,242,0.7)')
        .attr('font-size', '12px')
        .attr('font-family', 'Inter, sans-serif')
        .text(`→ ${char}`);
    });

    // Right Side: Expert Swarm
    const swarmGroup = svg.append('g')
      .attr('class', 'swarm')
      .style('cursor', 'pointer')
      .on('mouseenter', () => setActiveModel('swarm'))
      .on('mouseleave', () => setActiveModel(null));

    const swarmX = width / 2 + 20;

    // Background
    swarmGroup.append('rect')
      .attr('x', swarmX)
      .attr('y', 20)
      .attr('width', width / 2 - 40)
      .attr('height', height - 40)
      .attr('fill', 'url(#swarmGradient)')
      .attr('rx', 16)
      .attr('stroke', activeModel === 'swarm' ? '#FFD700' : 'rgba(255,215,0,0.3)')
      .attr('stroke-width', activeModel === 'swarm' ? 2 : 1);

    // Title
    swarmGroup.append('text')
      .attr('x', swarmX + 30)
      .attr('y', 60)
      .attr('fill', '#FFD700')
      .attr('font-size', '22px')
      .attr('font-family', '"Cormorant Garamond", serif')
      .attr('font-weight', '600')
      .text('The Expert Swarm');

    swarmGroup.append('text')
      .attr('x', swarmX + 30)
      .attr('y', 80)
      .attr('fill', 'rgba(255,215,0,0.7)')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter, sans-serif')
      .text('Parallel • Distributed • Throughput');

    // Central orchestrator
    const centerX = swarmX + (width / 2 - 40) / 2;
    const centerOrbitY = 200;

    // Central node
    const centerGroup = swarmGroup.append('g')
      .attr('transform', `translate(${centerX}, ${centerOrbitY})`);

    centerGroup.append('circle')
      .attr('r', 35)
      .attr('fill', 'rgba(255,215,0,0.15)')
      .attr('stroke', '#FFD700')
      .attr('stroke-width', 3)
      .attr('filter', 'url(#goldGlow)');

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '5')
      .attr('fill', '#FFD700')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('Parent');

    // Orbital agents
    const agents = [
      { angle: 0, label: 'Testing', color: '#FF6B6B' },
      { angle: 72, label: 'Docs', color: '#4ECDC4' },
      { angle: 144, label: 'Backend 1', color: '#95E1D3' },
      { angle: 216, label: 'Backend 2', color: '#F38181' },
      { angle: 288, label: 'Frontend', color: '#AA96DA' },
    ];

    const orbitRadius = 100;

    // Orbit ring
    swarmGroup.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerOrbitY)
      .attr('r', orbitRadius)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,215,0,0.2)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,5');

    // Draw agents
    agents.forEach((agent) => {
      const angleRad = (agent.angle * Math.PI) / 180;
      const x = centerX + Math.cos(angleRad) * orbitRadius;
      const y = centerOrbitY + Math.sin(angleRad) * orbitRadius;

      const agentGroup = swarmGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`);

      // Agent circle
      agentGroup.append('circle')
        .attr('r', 25)
        .attr('fill', 'rgba(255,255,255,0.05)')
        .attr('stroke', agent.color)
        .attr('stroke-width', 2);

      // Agent label
      agentGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '4')
        .attr('fill', agent.color)
        .attr('font-size', '9px')
        .attr('font-weight', '500')
        .text(agent.label);

      // Connection to center
      swarmGroup.append('line')
        .attr('x1', centerX)
        .attr('y1', centerOrbitY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', agent.color)
        .attr('stroke-width', 1)
        .attr('opacity', 0.3);
    });

    // Reconciliation node
    const reconGroup = swarmGroup.append('g')
      .attr('transform', `translate(${centerX}, ${centerOrbitY + 180})`);

    reconGroup.append('rect')
      .attr('x', -50)
      .attr('y', -20)
      .attr('width', 100)
      .attr('height', 40)
      .attr('rx', 8)
      .attr('fill', 'rgba(255,215,0,0.1)')
      .attr('stroke', '#FFD700')
      .attr('stroke-width', 1);

    reconGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '5')
      .attr('fill', '#FFD700')
      .attr('font-size', '11px')
      .text('Reconciliation');

    // Arrows from agents to reconciliation
    agents.forEach((agent) => {
      const angleRad = (agent.angle * Math.PI) / 180;
      const x = centerX + Math.cos(angleRad) * orbitRadius;
      const y = centerOrbitY + Math.sin(angleRad) * orbitRadius;

      swarmGroup.append('line')
        .attr('x1', x)
        .attr('y1', y + 25)
        .attr('x2', centerX + (x - centerX) * 0.3)
        .attr('y2', centerOrbitY + 160)
        .attr('stroke', agent.color)
        .attr('stroke-width', 1)
        .attr('opacity', 0.3)
        .attr('stroke-dasharray', '3,3');
    });

    // Characteristics
    const swarmChars = [
      'Parallel execution',
      'Specialized agents',
      'Concurrent processing',
      'High throughput',
    ];

    swarmChars.forEach((char, i) => {
      swarmGroup.append('text')
        .attr('x', swarmX + 30)
        .attr('y', 420 + i * 20)
        .attr('fill', 'rgba(232,241,242,0.7)')
        .attr('font-size', '12px')
        .attr('font-family', 'Inter, sans-serif')
        .text(`◆ ${char}`);
    });

    // Animated orbit
    let orbitAngle = 0;
    function animateOrbit() {
      orbitAngle += 0.005;
      
      agents.forEach((agent, i) => {
        const baseAngle = (agent.angle * Math.PI) / 180;
        const currentAngle = baseAngle + orbitAngle;
        const x = centerX + Math.cos(currentAngle) * orbitRadius;
        const y = centerOrbitY + Math.sin(currentAngle) * orbitRadius;

        // Update agent position
        const agentGroups = swarmGroup.selectAll('g').nodes();
        const agentGroup = d3.select(agentGroups[i + 1]); // +1 to skip center
        agentGroup.attr('transform', `translate(${x}, ${y})`);
      });

      animationRef.current = requestAnimationFrame(animateOrbit);
    }

    animateOrbit();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };

  }, [activeModel]);

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
          <div className="p-3 rounded-xl bg-twilight/20 border border-twilight/30">
            <GitBranch className="w-6 h-6 text-starlight" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-moonlight">
              Scaling Intelligence
            </h2>
            <p className="text-moonlight-dim font-body">
              Single Agent vs Expert Swarms orchestration models
            </p>
          </div>
        </div>
      </motion.div>

      {/* Visualization */}
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

      {/* Model Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Orchestrator Card */}
        <div 
          className={`
            glass-card rounded-xl p-6 transition-all duration-300
            ${activeModel === 'orchestrator' ? 'border-forest shadow-[0_0_20px_rgba(45,90,61,0.3)]' : ''}
          `}
          onMouseEnter={() => setActiveModel('orchestrator')}
          onMouseLeave={() => setActiveModel(null)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-forest/20 border border-forest/30">
              <User className="w-5 h-5 text-forest" />
            </div>
            <h3 className="font-display text-xl text-forest">Precise Orchestrator</h3>
          </div>
          <p className="text-moonlight-dim text-sm font-body mb-4">
            Strict sequential loop with human approval gates. Ideal for precision tasks 
            requiring careful control and verification at each step.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Cline', 'Claude Code'].map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Swarm Card */}
        <div 
          className={`
            glass-card rounded-xl p-6 transition-all duration-300
            ${activeModel === 'swarm' ? 'border-starlight shadow-glow' : ''}
          `}
          onMouseEnter={() => setActiveModel('swarm')}
          onMouseLeave={() => setActiveModel(null)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-starlight/10 border border-starlight/30">
              <Users className="w-5 h-5 text-starlight" />
            </div>
            <h3 className="font-display text-xl text-starlight">Expert Swarm</h3>
          </div>
          <p className="text-moonlight-dim text-sm font-body mb-4">
            Parent task decomposed into parallel streams with specialized agents 
            working concurrently. Maximum throughput for large-scale operations.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Kimi Code', 'Codex'].map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1 rounded-full bg-starlight/10 border border-starlight/20 text-starlight text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Sequential', value: '1x', desc: 'Single thread' },
          { label: 'Parallel', value: '5-10x', desc: 'Concurrent agents' },
          { label: 'Control', value: 'High', desc: 'Approval gates' },
          { label: 'Throughput', value: 'Massive', desc: 'Distributed' },
        ].map((metric, i) => (
          <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-starlight font-display text-2xl mb-1">{metric.value}</div>
            <div className="text-moonlight text-sm font-body">{metric.label}</div>
            <div className="text-moonlight-dim/60 text-xs">{metric.desc}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SwarmSection;
