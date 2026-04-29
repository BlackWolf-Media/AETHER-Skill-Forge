import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  Plus, 
  ArrowRight, 
  Settings as SettingsIcon, 
  Search, 
  MoreVertical, 
  Zap, 
  Globe, 
  Save, 
  Play,
  Terminal,
  X,
  Code,
  Info,
  ChevronDown,
  LayoutGrid,
  Layers,
  Activity
} from 'lucide-react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { CortexNode, CortexNodeData } from './CortexNode';
import { NODE_TEMPLATES, CATEGORIES, getTemplateByType } from '../constants/nodes';

const nodeTypes = {
  cortex: CortexNode,
};

const initialNodes: any[] = [
  { 
    id: 're-node-trigger', 
    type: 'cortex',
    position: { x: 50, y: 250 }, 
    data: { 
      label: 'Intake Trigger', 
      type: 'data-gsheets',
      parameters: { documentId: 'sheet_11186', mode: 'watchRows' }
    }
  },
  { 
    id: 're-node-sanitize', 
    type: 'cortex',
    position: { x: 300, y: 250 }, 
    data: { 
      label: 'Sanitize Name', 
      type: 'logic-sanitize',
      parameters: { format: '{LastName}_{FirstName}_{PropertyID}' }
    }
  },
  { 
    id: 're-node-create', 
    type: 'cortex',
    position: { x: 550, y: 250 }, 
    data: { 
      label: 'Create Directory', 
      type: 'data-gdrive',
      parameters: { action: 'createHierarchy', subfolders: ['Contracts', 'Inspections', 'Financing'] }
    }
  },
  { 
    id: 're-node-perms', 
    type: 'cortex',
    position: { x: 800, y: 150 }, 
    data: { 
      label: 'Secure Access', 
      type: 'logic-permissions',
      parameters: { roles: { 'broker@nexus.com': 'writer', 'client@email.com': 'viewer' } }
    }
  },
  { 
    id: 're-node-writeback', 
    type: 'cortex',
    position: { x: 800, y: 350 }, 
    data: { 
      label: 'Log Meta', 
      type: 'data-gsheets',
      parameters: { mode: 'update', columns: ['Folder_URL', 'Status'] }
    }
  }
];

const initialEdges: any[] = [
  { id: 're-e1', source: 're-node-trigger', target: 're-node-sanitize', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' }, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 're-e2', source: 're-node-sanitize', target: 're-node-create', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' }, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 're-e3', source: 're-node-create', target: 're-node-perms', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' }, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 're-e4', source: 're-node-create', target: 're-node-writeback', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' }, style: { stroke: '#22d3ee', strokeWidth: 2 } },
];

export default function WorkflowsView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditorOpen, setEditorOpen] = React.useState(false);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
        ...params, 
        animated: true, 
        markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' },
        style: { stroke: '#22d3ee', strokeWidth: 2 }
    }, eds)),
    [setEdges],
  );

  const addNodeFromTemplate = (template: typeof NODE_TEMPLATES[0]) => {
    const newNode = {
      id: crypto.randomUUID(),
      type: 'cortex',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data: { 
        label: template.name, 
        type: template.type,
        parameters: { ...template.parameters }
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const updateNodeParameter = (key: string, value: any) => {
    if (!selectedNodeId) return;
    setNodes(nds => nds.map(n => {
        if (n.id === selectedNodeId) {
            return {
                ...n,
                data: {
                    ...n.data,
                    parameters: {
                        ...n.data.parameters,
                        [key]: value
                    }
                }
            };
        }
        return n;
    }));
  };

  if (isEditorOpen) {
    return (
        <div className="h-full flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setEditorOpen(false)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                        <h2 className="text-xl font-display font-bold text-white tracking-widest uppercase">Neural Manifestation Pipeline</h2>
                        <p className="text-[10px] text-cyan-500 font-mono font-bold tracking-widest">ACTIVE SESSION | V2.6.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest">
                        <Save className="w-4 h-4" />
                        SUBMIT ARCHIVE
                    </button>
                    <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-[10px] uppercase tracking-widest">
                        <Play className="w-4 h-4" />
                        INVOKE STREAM
                    </button>
                </div>
            </header>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Node Library Sidebar */}
                <aside className="w-72 bg-black/40 border border-white/10 rounded-3xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/10 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search nodes..." 
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {['All', ...CATEGORIES].map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap transition-all border",
                                        activeCategory === cat ? "bg-cyan-500 text-black border-cyan-400" : "bg-white/5 text-slate-500 border-white/10 hover:border-white/20"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
                        {NODE_TEMPLATES
                            .filter(t => (activeCategory === 'All' || t.category === activeCategory) && (searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase())))
                            .map(template => (
                            <button 
                                key={template.type}
                                onClick={() => addNodeFromTemplate(template)}
                                className="w-full group p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left flex items-start gap-3"
                            >
                                <div 
                                    className="p-2 rounded-xl border border-white/10 shrink-0"
                                    style={{ backgroundColor: `${template.color}20` }}
                                >
                                    <template.icon className="w-4 h-4" style={{ color: template.color }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight truncate">{template.name}</div>
                                    <div className="text-[9px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5 uppercase tracking-tighter">{template.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ReactFlow Canvas */}
                <div className="flex-1 bg-black/60 rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                        onPaneClick={() => setSelectedNodeId(null)}
                        nodeTypes={nodeTypes}
                        fitView
                        colorMode="dark"
                    >
                        <Background color="rgba(255,255,255,0.03)" gap={20} />
                        <Controls />
                        <MiniMap 
                            nodeStrokeColor={(n: any) => getTemplateByType(n.data.type)?.color || '#fff'}
                            nodeColor={(n: any) => `${getTemplateByType(n.data.type)?.color}20` || '#111'}
                            style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            maskColor="rgba(0,0,0,0.5)"
                        />
                    </ReactFlow>
                </div>

                {/* Property Editor Sidebar */}
                <AnimatePresence>
                    {selectedNodeId && (
                        <motion.aside 
                            initial={{ x: 400 }}
                            animate={{ x: 0 }}
                            exit={{ x: 400 }}
                            className="w-96 bg-black/90 border-l border-white/10 flex flex-col shadow-2xl relative z-10"
                        >
                            {selectedNode ? (
                                <>
                                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                                                style={{ backgroundColor: `${getTemplateByType(selectedNode.data.type)?.color}20` }}
                                            >
                                                {getTemplateByType(selectedNode.data.type)?.icon && React.createElement(getTemplateByType(selectedNode.data.type)!.icon, { 
                                                    className: "w-5 h-5", 
                                                    style: { color: getTemplateByType(selectedNode.data.type)?.color } 
                                                })}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white uppercase tracking-tighter">{selectedNode.data.label}</h3>
                                                <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest">{getTemplateByType(selectedNode.data.type)?.category}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedNodeId(null)}
                                            className="p-2 text-slate-500 hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                <SettingsIcon className="w-3.5 h-3.5" />
                                                Node Parameters
                                            </div>

                                            {Object.entries(selectedNode.data.parameters).map(([key, val]) => (
                                                <div key={key} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{key}</label>
                                                        <button 
                                                            className="text-[9px] font-mono text-cyan-500 hover:text-cyan-400 font-bold"
                                                            onClick={() => updateNodeParameter(key, typeof val === 'string' && val.startsWith('={{') ? '' : '={{ $json.' + key + ' }}')}
                                                        >
                                                            {typeof val === 'string' && val.startsWith('={{') ? 'Expression' : 'Fixed'}
                                                        </button>
                                                    </div>
                                                    
                                                    {typeof val === 'string' && val.startsWith('={{') ? (
                                                        <div className="relative">
                                                            <div className="absolute top-3 left-3">
                                                                <Code className="w-3 h-3 text-cyan-500" />
                                                            </div>
                                                            <textarea 
                                                                value={val}
                                                                onChange={e => updateNodeParameter(key, e.target.value)}
                                                                className="w-full h-24 bg-black/60 rounded-xl border border-cyan-500/30 p-3 pl-9 text-[11px] font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-all resize-none shadow-inner"
                                                            />
                                                        </div>
                                                    ) : typeof val === 'object' ? (
                                                        <textarea 
                                                            value={JSON.stringify(val, null, 2)}
                                                            onChange={e => {
                                                                try { updateNodeParameter(key, JSON.parse(e.target.value)); } catch (e) {}
                                                            }}
                                                            className="w-full h-32 bg-white/5 rounded-xl border border-white/10 p-4 text-[11px] font-mono text-white focus:outline-none focus:border-cyan-500 transition-all resize-none shadow-inner"
                                                        />
                                                    ) : (
                                                        <input 
                                                            type={typeof val === 'number' ? 'number' : 'text'}
                                                            value={val as any}
                                                            onChange={e => updateNodeParameter(key, typeof val === 'number' ? Number(e.target.value) : e.target.value)}
                                                            className="w-full h-11 bg-white/5 rounded-xl border border-white/10 px-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-medium"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                <Info className="w-3.5 h-3.5" />
                                                Output Manifest
                                            </div>
                                            <div className="bg-black/60 rounded-xl border border-white/10 p-4 font-mono text-[10px] text-cyan-100/50 leading-relaxed shadow-inner">
                                                <pre>
{`{
  "status": "idle",
  "data": {
    "node_id": "${selectedNode.id}",
    "timestamp": "${new Date().toISOString()}",
    "payload": {}
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t border-white/10 flex gap-3">
                                        <button 
                                            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-[10px] hover:bg-white/10 transition-all uppercase tracking-widest"
                                            onClick={() => {
                                                setNodes(nds => nds.filter(n => n.id !== selectedNodeId));
                                                setSelectedNodeId(null);
                                            }}
                                        >
                                            DESTRUCT NODE
                                        </button>
                                        <button className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-[10px] transition-all uppercase tracking-widest">
                                            SYNC STATE
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <LayoutGrid className="w-8 h-8 text-slate-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">No Selection</h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter">Select a node on the canvas to manifest its internal parameters.</p>
                                    </div>
                                </div>
                            )}
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
  }

  const workflows = [
    {
      id: 'agent_11184_airtable_inventory_po',
      name: 'Airtable Inventory PO Agent',
      description: 'Deterministic specialist. Monitors stock thresholds, generates POs, and notifies procurement via Slack.',
      category: 'Inventory & Supply Chain',
      status: 'Active',
      lastRun: '12m ago',
      steps: 8,
      type: 'Deterministic',
      color: '#18bfff'
    },
    {
      id: 'agent_11186_gdrive_sheets_client_folders',
      name: 'Nexus Client Folder Agent',
      description: 'Operations specialist. Streamlines client onboarding by auto-creating standardized Drive hierarchies with zero-trust permissions.',
      category: 'Real Estate & Operations',
      status: 'Active',
      lastRun: '2h ago',
      steps: 7,
      type: 'Deterministic',
      color: '#10b981'
    },
    {
      id: '11188',
      name: 'WhatsApp Neural Scheduler',
      description: 'GPT-4 powered booking. Converses via WhatsApp and coordinates with Cal.com.',
      category: 'Scheduling & Messaging',
      status: 'Paused',
      lastRun: '1d ago',
      steps: 7,
      type: 'Agentic',
      color: '#25d366'
    },
    {
      id: '11189',
      name: 'LinkedIn Lead Architect',
      description: 'Extracts and scores LinkedIn leads using GPT-4o. Exports high-intent profiles.',
      category: 'Lead Generation',
      status: 'Active',
      lastRun: '5m ago',
      steps: 5,
      type: 'Searcher',
      color: '#0077b5'
    },
    {
      id: '11194',
      name: 'Cortex Prompt Hub',
      description: 'Knowledge management using vector embeddings. Semantic search in Notion.',
      category: 'AI Knowledge',
      status: 'Active',
      lastRun: '45m ago',
      steps: 5,
      type: 'Vector',
      color: '#ffffff'
    },
    {
      id: '11195',
      name: 'Cyber-Sentinel Recon',
      description: 'Automated vulnerability reconnaissance via Google Dorks and SerpAPI.',
      category: 'Cybersecurity',
      status: 'Active',
      lastRun: '3h ago',
      steps: 8,
      type: 'Recon',
      color: '#ef4444'
    }
  ];

  return (
    <div className="h-full flex flex-col gap-8 pb-12 overflow-y-auto custom-scrollbar pr-4">
      <header className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight uppercase tracking-widest">Cortex <span className="text-cyan-400">Streams</span></h1>
          <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Architect complex BlackWolf-class agent behaviors via visual manifestation.</p>
        </div>
        <button 
            onClick={() => setEditorOpen(true)}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-cyan-500/20 text-xs uppercase tracking-widest"
        >
            <Plus className="w-5 h-5" />
            Build New Flow
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                    <Search className="w-5 h-5 text-slate-500" />
                    <input className="bg-transparent border-none text-white focus:outline-none w-full py-2 uppercase text-xs tracking-widest" placeholder="Search flows..." />
                </div>
            </div>

            <div className="space-y-4">
                {workflows.map((flow, i) => (
                    <motion.div
                        key={flow.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setEditorOpen(true)}
                        className="cursor-pointer"
                    >
                        <GlassCard className="p-6 flex items-center gap-6 group hover:bg-white/5 transition-all">
                            <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                <div className="w-1 h-1 rounded-full bg-white" />
                                <div className="w-1 h-1 rounded-full bg-white" />
                            </div>
                            <div 
                                className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all text-white shrink-0"
                                style={{ 
                                    backgroundColor: `${flow.color}15`,
                                    borderColor: `${flow.color}30`
                                }}
                            >
                                <GitBranch className="w-7 h-7" style={{ color: flow.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-widest truncate">{flow.name}</h3>
                                    <span className="text-[9px] text-slate-500 font-mono mt-1 shrink-0">{flow.id}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-tighter line-clamp-1 mb-3 font-bold">{flow.description}</p>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> {flow.steps} Stages</span>
                                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> {flow.type} Pattern</span>
                                    <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> {flow.lastRun}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase",
                                    flow.status === 'Active' ? "bg-green-400/10 text-green-400" : 
                                    flow.status === 'Testing' ? "bg-cyan-400/10 text-cyan-400" : "bg-slate-400/10 text-slate-400"
                                )}>
                                    {flow.status}
                                </div>
                                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-white tracking-widest uppercase">Stream Guide</h3>
            <GlassCard className="p-8 space-y-6 bg-gradient-to-br from-cyan-600/[0.05] to-transparent">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-600/20">
                    <Globe className="text-white w-6 h-6" />
                </div>
                <div className="space-y-3">
                    <h4 className="font-bold text-white uppercase text-xs tracking-widest">Neural Integration</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-tighter">
                        Connect your workflows to over 2,000+ external APIs. Enable real-time data streaming to keep your agents updated with the latest context.
                    </p>
                </div>
                <div className="pt-4 space-y-2">
                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] transition-all border border-white/5 uppercase tracking-widest">
                        VIEW INTEGRATION DOCS
                    </button>
                    <button className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-[10px] transition-all uppercase tracking-widest">
                        UPGRADE ACCESS
                    </button>
                </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
}
