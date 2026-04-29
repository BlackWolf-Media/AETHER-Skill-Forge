import React from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  Plus, 
  ArrowRight, 
  Settings, 
  Cpu, 
  Layers,
  Search,
  MoreVertical,
  Zap,
  Globe,
  Save,
  Play
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
  Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 100, y: 100 }, 
    data: { label: 'Input Source' },
    style: { background: 'rgba(99, 102, 241, 0.1)', color: '#fff', border: '1px solid rgba(99, 102, 241, 0.5)', borderRadius: '12px', padding: '10px' }
  },
  { 
    id: '2', 
    position: { x: 400, y: 100 }, 
    data: { label: 'BW-Neural Analyst' },
    style: { background: 'rgba(34, 211, 238, 0.1)', color: '#fff', border: '1px solid rgba(34, 211, 238, 0.5)', borderRadius: '12px', padding: '10px' }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } }
];

export default function WorkflowsView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditorOpen, setEditorOpen] = React.useState(false);

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `New Agent Node ${nodes.length + 1}` },
      style: { background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '10px' }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  if (isEditorOpen) {
    return (
        <div className="h-full flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setEditorOpen(false)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                        <h2 className="text-xl font-display font-bold text-white">Market Analysis Pipeline</h2>
                        <p className="text-xs text-slate-500 font-medium tracking-wide">EDITION V1.0.4 - NEURAL NETWORK FLOW</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold transition-all">
                        <Save className="w-4 h-4" />
                        Save Manifest
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                        <Play className="w-4 h-4" />
                        Execute Flow
                    </button>
                </div>
            </header>

            <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 overflow-hidden relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    colorMode="dark"
                >
                    <Background color="rgba(255,255,255,0.05)" gap={20} />
                    <Controls />
                    <Panel position="top-right" className="flex flex-col gap-2">
                        <GlassCard className="p-4 flex flex-col gap-3 min-w-[200px]">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Architect Toolbox</h4>
                            <button 
                                onClick={addNode}
                                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition-all"
                            >
                                <span>Agent Instance</span>
                                <Plus className="w-3 h-3" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition-all">
                                <span>Logic Gate</span>
                                <Plus className="w-3 h-3" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition-all">
                                <span>Output Manifest</span>
                                <Plus className="w-3 h-3" />
                            </button>
                        </GlassCard>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
  }

  const workflows = [
    { id: 1, name: 'Automated Market Research', steps: 4, type: 'Sequential', status: 'Active' },
    { id: 2, name: 'Security Audit Pipeline', steps: 6, type: 'Parallel', status: 'Testing' },
    { id: 3, name: 'Customer Support Routing', steps: 3, type: 'Decision-Tree', status: 'Draft' },
  ];

  return (
    <div className="h-full flex flex-col gap-8 pb-12">
      <header className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Cortex <span className="text-cyan-400">Streams</span></h1>
          <p className="text-slate-400">Architect complex BlackWolf-class agent behaviors via visual manifestation.</p>
        </div>
        <button 
            onClick={() => setEditorOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
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
                    <input className="bg-transparent border-none text-white focus:outline-none w-full py-2" placeholder="Search flows..." />
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
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600/20 transition-all text-white">
                                <GitBranch className="w-7 h-7 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{flow.name}</h3>
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 capitalize">
                                    <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> {flow.steps} Neural Stages</span>
                                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> {flow.type} Pattern</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase",
                                    flow.status === 'Active' ? "bg-green-400/10 text-green-400" : 
                                    flow.status === 'Testing' ? "bg-yellow-400/10 text-yellow-400" : "bg-slate-400/10 text-slate-400"
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
            <h3 className="text-xl font-display font-bold text-white">Manifestation Guide</h3>
            <GlassCard className="p-8 space-y-6 bg-gradient-to-br from-indigo-600/[0.05] to-transparent">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Globe className="text-white w-6 h-6" />
                </div>
                <div className="space-y-3">
                    <h4 className="font-bold text-white uppercase text-xs tracking-wider">Global Integration</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        Connect your workflows to over 2,000+ external APIs. Enable real-time data streaming to keep your agents updated with the latest context.
                    </p>
                </div>
                <div className="pt-4 space-y-2">
                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all border border-white/5">
                        VIEW INTEGRATION DOCS
                    </button>
                    <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all">
                        UPGRADE ACCESS
                    </button>
                </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
}
