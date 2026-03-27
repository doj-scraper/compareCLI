import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { Cpu, Filter, ArrowUpDown } from 'lucide-react';

interface ToolData {
  name: string;
  environment: string;
  backend: string;
  context: string;
  useCase: string;
  color: string;
}

const toolsData: ToolData[] = [
  {
    name: 'Cline',
    environment: 'IDE Extension',
    backend: 'Agentic Search',
    context: 'Local files + grep',
    useCase: 'Scaffolding',
    color: '#2D5A3D',
  },
  {
    name: 'KiloCode',
    environment: 'IDE Extension',
    backend: 'LSP Integration',
    context: 'Local files + LSP',
    useCase: 'Surgical Edits',
    color: '#1E3A5F',
  },
  {
    name: 'OpenCode',
    environment: 'TUI',
    backend: 'LSP Integration',
    context: 'Local files + LSP',
    useCase: 'Surgical Edits',
    color: '#1E3A5F',
  },
  {
    name: 'Rovo Dev',
    environment: 'Cloud',
    backend: 'Graph-Based',
    context: 'Enterprise Graph',
    useCase: 'Enterprise Logic',
    color: '#5C4033',
  },
  {
    name: 'Claude Code',
    environment: 'TUI',
    backend: 'LSP Integration',
    context: 'Local files + LSP',
    useCase: 'Surgical Edits',
    color: '#1E3A5F',
  },
  {
    name: 'Gemini CLI',
    environment: 'TUI',
    backend: 'Agentic Search',
    context: 'Agentic Search',
    useCase: 'Scaffolding',
    color: '#2D5A3D',
  },
  {
    name: 'Kimi Code',
    environment: 'Cloud',
    backend: 'MoE Swarms',
    context: 'Parallel Agents',
    useCase: 'Mass Refactor',
    color: '#5C4033',
  },
  {
    name: 'Codex',
    environment: 'Cloud',
    backend: 'MoE Swarms',
    context: 'Parallel Agents',
    useCase: 'Mass Refactor',
    color: '#5C4033',
  },
];

const categories = [
  { key: 'environment', label: 'Environment', icon: '💻' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'context', label: 'Context Source', icon: '📂' },
  { key: 'useCase', label: 'Ideal Use Case', icon: '🎯' },
];

const MatrixSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 600;
    const margin = { top: 80, right: 40, bottom: 40, left: 120 };

    svg.attr('height', height);

    // Sort data if needed
    let displayData = [...toolsData];
    if (sortKey) {
      displayData.sort((a, b) => {
        const aVal = a[sortKey as keyof ToolData];
        const bVal = b[sortKey as keyof ToolData];
        return String(aVal).localeCompare(String(bVal));
      });
    }

    // Create scales
    const xScale = d3.scaleBand()
      .domain(categories.map(c => c.key))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(displayData.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.05);

    // Create color scale for values
    const valueColors: Record<string, string> = {
      'IDE Extension': '#2D5A3D',
      'TUI': '#1E3A5F',
      'Cloud': '#5C4033',
      'LSP Integration': '#00FFFF',
      'Agentic Search': '#FFA500',
      'Graph-Based': '#FFD700',
      'MoE Swarms': '#FF6B6B',
      'Local files + LSP': '#00FFFF',
      'Local files + grep': '#FFA500',
      'Enterprise Graph': '#FFD700',
      'Parallel Agents': '#FF6B6B',
      'Scaffolding': '#2D5A3D',
      'Surgical Edits': '#00FFFF',
      'Enterprise Logic': '#FFD700',
      'Mass Refactor': '#FF6B6B',
    };

    // Draw grid lines
    const gridGroup = svg.append('g').attr('class', 'grid');

    // Horizontal grid lines
    displayData.forEach((d) => {
      gridGroup.append('line')
        .attr('x1', margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', yScale(d.name)! + yScale.bandwidth())
        .attr('y2', yScale(d.name)! + yScale.bandwidth())
        .attr('stroke', 'rgba(255,255,255,0.05)')
        .attr('stroke-width', 1);
    });

    // Vertical grid lines
    categories.forEach((c) => {
      gridGroup.append('line')
        .attr('x1', xScale(c.key)!)
        .attr('x2', xScale(c.key)!)
        .attr('y1', margin.top)
        .attr('y2', height - margin.bottom)
        .attr('stroke', 'rgba(255,255,255,0.05)')
        .attr('stroke-width', 1);
    });

    // Draw header row
    const headerGroup = svg.append('g').attr('class', 'headers');

    categories.forEach((cat) => {
      const x = xScale(cat.key)!;
      const y = margin.top - 50;

      // Header background
      headerGroup.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', xScale.bandwidth())
        .attr('height', 40)
        .attr('fill', selectedCategory === cat.key ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.03)')
        .attr('rx', 8)
        .attr('stroke', selectedCategory === cat.key ? 'rgba(255,215,0,0.3)' : 'transparent')
        .style('cursor', 'pointer')
        .on('click', () => {
          setSortKey(sortKey === cat.key ? null : cat.key);
          setSelectedCategory(selectedCategory === cat.key ? null : cat.key);
        });

      // Header text
      headerGroup.append('text')
        .attr('x', x + xScale.bandwidth() / 2)
        .attr('y', y + 25)
        .attr('text-anchor', 'middle')
        .attr('fill', selectedCategory === cat.key ? '#FFD700' : '#A0B4C0')
        .attr('font-size', '12px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-weight', selectedCategory === cat.key ? '600' : '400')
        .text(cat.label)
        .style('cursor', 'pointer')
        .on('click', () => {
          setSortKey(sortKey === cat.key ? null : cat.key);
          setSelectedCategory(selectedCategory === cat.key ? null : cat.key);
        });
    });

    // Draw tool names (left column)
    const toolNamesGroup = svg.append('g').attr('class', 'tool-names');

    displayData.forEach((tool) => {
      const y = yScale(tool.name)! + yScale.bandwidth() / 2;

      // Tool name background (highlight on hover)
      toolNamesGroup.append('rect')
        .attr('x', 0)
        .attr('y', yScale(tool.name)!)
        .attr('width', margin.left - 10)
        .attr('height', yScale.bandwidth())
        .attr('fill', hoveredTool === tool.name ? 'rgba(255,215,0,0.05)' : 'transparent')
        .attr('rx', 4);

      // Tool name text
      toolNamesGroup.append('text')
        .attr('x', margin.left - 15)
        .attr('y', y + 5)
        .attr('text-anchor', 'end')
        .attr('fill', hoveredTool === tool.name ? '#FFD700' : '#E8F1F2')
        .attr('font-size', '14px')
        .attr('font-family', '"Cormorant Garamond", serif')
        .attr('font-weight', '500')
        .text(tool.name)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredTool(tool.name))
        .on('mouseleave', () => setHoveredTool(null));
    });

    // Draw data cells
    const cellsGroup = svg.append('g').attr('class', 'cells');

    displayData.forEach((tool, toolIndex) => {
      categories.forEach((cat, catIndex) => {
        const x = xScale(cat.key)!;
        const y = yScale(tool.name)!;
        const value = tool[cat.key as keyof ToolData] as string;
        const cellColor = valueColors[value] || '#A0B4C0';

        // Cell background
        const cell = cellsGroup.append('rect')
          .attr('x', x + 4)
          .attr('y', y + 4)
          .attr('width', xScale.bandwidth() - 8)
          .attr('height', yScale.bandwidth() - 8)
          .attr('fill', cellColor)
          .attr('rx', 6)
          .attr('opacity', hoveredTool === tool.name ? 0.3 : 0.15)
          .style('cursor', 'pointer')
          .on('mouseenter', () => setHoveredTool(tool.name))
          .on('mouseleave', () => setHoveredTool(null));

        // Animate cells on enter
        cell
          .attr('opacity', 0)
          .transition()
          .duration(500)
          .delay(toolIndex * 50 + catIndex * 30)
          .attr('opacity', hoveredTool === tool.name ? 0.3 : 0.15);

        // Cell text
        cellsGroup.append('text')
          .attr('x', x + xScale.bandwidth() / 2)
          .attr('y', y + yScale.bandwidth() / 2 + 5)
          .attr('text-anchor', 'middle')
          .attr('fill', cellColor)
          .attr('font-size', '11px')
          .attr('font-family', 'Inter, sans-serif')
          .attr('font-weight', '500')
          .text(value)
          .style('cursor', 'pointer')
          .on('mouseenter', () => setHoveredTool(tool.name))
          .on('mouseleave', () => setHoveredTool(null));
      });
    });

    // Draw connection lines (roots)
    const rootsGroup = svg.append('g').attr('class', 'roots');

    if (hoveredTool) {
      const tool = displayData.find(t => t.name === hoveredTool);
      if (tool) {
        const y = yScale(tool.name)! + yScale.bandwidth() / 2;

        categories.forEach((cat) => {
          const x = xScale(cat.key)!;
          const value = tool[cat.key as keyof ToolData] as string;
          const cellColor = valueColors[value] || '#A0B4C0';

          rootsGroup.append('line')
            .attr('x1', margin.left - 5)
            .attr('y1', y)
            .attr('x2', x + 10)
            .attr('y2', y)
            .attr('stroke', cellColor)
            .attr('stroke-width', 2)
            .attr('opacity', 0.4)
            .attr('stroke-dasharray', '4,4');
        });
      }
    }

  }, [sortKey, hoveredTool, selectedCategory]);

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
          <div className="p-3 rounded-xl bg-forest/20 border border-forest/30">
            <Cpu className="w-6 h-6 text-starlight" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-moonlight">
              The Spectrum of AI Coding Tools
            </h2>
            <p className="text-moonlight-dim font-body">
              Comprehensive comparison matrix across key functional categories
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Filter className="w-4 h-4 text-moonlight-dim" />
            <span className="text-sm text-moonlight-dim">Click headers to sort</span>
          </div>
          
          {sortKey && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setSortKey(null);
                setSelectedCategory(null);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-starlight/10 border border-starlight/30 text-starlight text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Clear sort</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Matrix Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-6 overflow-hidden"
      >
        <svg 
          ref={svgRef} 
          className="w-full"
          style={{ minHeight: '600px' }}
        />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'IDE Extension', color: '#2D5A3D' },
          { label: 'TUI', color: '#1E3A5F' },
          { label: 'Cloud', color: '#5C4033' },
          { label: 'LSP Integration', color: '#00FFFF' },
          { label: 'Agentic Search', color: '#FFA500' },
          { label: 'Graph-Based', color: '#FFD700' },
          { label: 'MoE Swarms', color: '#FF6B6B' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="text-sm text-moonlight-dim font-body">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Tool Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-moonlight-dim/60 font-body text-sm">
          Analyzing <span className="text-starlight font-display text-lg">{toolsData.length}</span> AI coding tools across <span className="text-starlight font-display text-lg">{categories.length}</span> dimensions
        </p>
      </motion.div>
    </div>
  );
};

export default MatrixSection;
