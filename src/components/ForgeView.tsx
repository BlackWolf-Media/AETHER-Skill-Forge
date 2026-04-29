import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Save, 
  ArrowRight, 
  Wand2, 
  List, 
  Plus,
  Trash2,
  Code2,
  CheckCircle2,
  Info,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Database,
  Server,
  ShieldAlert,
  Globe,
  Layers,
  Zap,
  Tag,
  Monitor,
  MessageSquare,
  Shield,
  HardDrive,
  Terminal,
  Calculator,
  Eye,
  Megaphone,
  Briefcase,
  TrendingUp,
  Settings,
  Cpu
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { Skill } from '@/types';
import { generateSkillInstructions } from '@/services/geminiService';

interface AttachedFile {
  name: string;
  type: string;
  data: string;
  preview?: string;
}

interface MCPConfig {
  id: string;
  name: string;
  url: string;
  type: string;
  category: string;
}

interface SkillTemplate {
  id: string;
  name: string;
  description: string;
  instructions: string;
  icon: any;
  category: string;
}

const CATEGORIES = [
  'All', 'AI', 'Analytics', 'Communication', 'Cybersecurity', 'Data & Storage', 
  'Developer Tools', 'Development', 'Finance & Accounting', 'HITL', 'Marketing', 
  'Miscellaneous', 'Productivity', 'Sales', 'Utility'
];

const TEMPLATES: SkillTemplate[] = [
    {
        id: 'fin-analyst',
        name: 'Financial Oracle',
        description: 'Advanced market analysis and portfolio optimization logic.',
        instructions: '# Financial Oracle Skill\n\n1. TRIGGER: When user asks about market trends, ticker symbols, or portfolio health.\n2. LOGIC: Analyze historical data vs real-time signals.\n3. CONSTRAINTS: Never give financial advice without a disclaimer.',
        icon: Calculator,
        category: 'Finance & Accounting'
    },
    {
        id: 'sec-researcher',
        name: 'Vulnerability Sentinel',
        description: 'Deep security auditing and threat manifestation logic.',
        instructions: '# Vulnerability Sentinel\n\n1. TRIGGER: Code review requests or architecture audits.\n2. LOGIC: Match patterns against known CVE database.\n3. CONSTRAINTS: Focus on prevention over exploitation.',
        icon: Shield,
        category: 'Cybersecurity'
    },
    {
        id: 'ai-optimizer',
        name: 'Neural Optimizer',
        description: 'Hyperparameter tuning and model performance monitoring.',
        instructions: '# Neural Optimizer\n\n1. TRIGGER: Performance logs or training feedback.\n2. LOGIC: Gradient ascent on quality metrics.\n3. CONSTRAINTS: Respect token limits.',
        icon: Cpu,
        category: 'AI'
    }
];

export default function ForgeView() {
  const [skill, setSkill] = React.useState<Partial<Skill & { customCode: string; category: string }>>({
    name: '',
    description: '',
    instructions: '',
    examples: [],
    customCode: '',
    category: 'Miscellaneous'
  });
  const [mcpServers, setMcpServers] = React.useState<MCPConfig[]>([]);
  const [showMcpModal, setShowMcpModal] = React.useState(false);
  const [newMcp, setNewMcp] = React.useState<Partial<MCPConfig>>({ name: '', url: '', type: 'custom', category: 'Utility' });
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  // Mock skill count for limit enforcement
  const existingSkillsCount = 1; 
  const isSkillLimitReached = existingSkillsCount >= 2;
  const isMcpLimitReached = mcpServers.length >= 4;

  const [attachedFiles, setAttachedFiles] = React.useState<AttachedFile[]>([]);
  const [isGenerating, setGenerating] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        const newFile: AttachedFile = {
            name: file.name,
            type: file.type,
            data: base64Data,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
        setAttachedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!skill.name || !skill.description) return;
    setGenerating(true);
    try {
      const geminiFiles = attachedFiles.map(f => ({
          data: f.data,
          mimeType: f.type
      }));
      const instructions = await generateSkillInstructions(
          skill.name || '', 
          skill.description || '',
          geminiFiles
      );
      setSkill(prev => ({ ...prev, instructions }));
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 pb-12">
      <header className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">The Neural <span className="text-indigo-400">Forge</span></h1>
          <p className="text-slate-400">Architect refined behaviors and manifest logic into autonomous agent skills.</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Sidebar */}
        <div className="space-y-4">
            {[
                { id: 1, label: 'Identity', desc: 'Define name & purpose', icon: Info },
                { id: 2, label: 'Cortex Design', desc: 'Auto-generate instructions', icon: Wand2 },
                { id: 3, label: 'Refinement', desc: 'Review & strict constraints', icon: List },
                { id: 4, label: 'Manifest', desc: 'Deploy to agent network', icon: CheckCircle2 },
            ].map(s => (
                <div 
                    key={s.id}
                    className={cn(
                        "p-4 rounded-2xl flex items-center gap-4 transition-all border",
                        step === s.id ? "bg-indigo-600/20 border-indigo-500/50" : "bg-white/5 border-transparent opacity-60"
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        step === s.id ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-500"
                    )}>
                        <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{s.label}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{s.desc}</div>
                    </div>
                </div>
            ))}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-6 relative group overflow-hidden rounded-3xl">
            {/* Watermark Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02] flex items-center justify-center select-none z-0">
                <div className="flex flex-col items-center rotate-[-25deg] scale-[1.5]">
                    <img src="/black_wolf_logo.png" alt="" className="w-64 h-64 grayscale invert" />
                    <span className="text-4xl font-black tracking-[0.5em] text-white mt-10">BLACKWOLF MEDIA AI</span>
                </div>
            </div>

            {step === 1 && (
                <GlassCard className="p-8 space-y-8 h-full relative z-1 bg-transparent overflow-y-auto max-h-[80vh] custom-scrollbar">
                    {/* Free Tier Warning */}
                    {isSkillLimitReached && (
                        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3 text-amber-200 text-xs">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <span>Free Tier Alert: You have reached the maximum of 2 neural skills. Upgrade to PRO to manifest unlimited logic.</span>
                        </div>
                    )}

                    {/* Template Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Neural Templates</label>
                            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 max-w-[70%]">
                                {CATEGORIES.slice(0, 8).map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border",
                                            selectedCategory === cat ? "bg-cyan-500 text-black border-cyan-400" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TEMPLATES.filter(t => selectedCategory === 'All' || t.category === selectedCategory).map(t => (
                                <button 
                                    key={t.id}
                                    onClick={() => setSkill({
                                        ...skill,
                                        name: t.name,
                                        description: t.description,
                                        instructions: t.instructions,
                                        category: t.category
                                    })}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                                            <t.icon className="w-4 h-4 text-cyan-400" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-bold text-white text-sm block">{t.name}</span>
                                            <span className="text-[8px] text-cyan-500 font-mono uppercase tracking-tighter">{t.category}</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">{t.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Skill Identifier</label>
                                <input 
                                    value={skill.name}
                                    onChange={e => setSkill({...skill, name: e.target.value})}
                                    placeholder="e.g., Financial Analysis Architect"
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 text-white focus:outline-none focus:border-cyan-500 transition-all font-display text-lg"
                                />
                            </div>
                            <div className="w-1/3 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category</label>
                                <select 
                                    value={skill.category}
                                    onChange={e => setSkill({...skill, category: e.target.value})}
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-4 text-white focus:outline-none focus:border-cyan-500 transition-all text-sm appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                                >
                                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Functional Purpose</label>
                            <textarea 
                                value={skill.description}
                                onChange={e => setSkill({...skill, description: e.target.value})}
                                placeholder="Describe exactly what this skill should accomplish and when it should trigger..."
                                className="w-full h-32 bg-white/5 rounded-2xl border border-white/10 p-6 text-white focus:outline-none focus:border-cyan-500 transition-all text-sm leading-relaxed resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Neural Script (Custom Code)</label>
                            <div className="relative group">
                                <div className="absolute top-4 left-4">
                                    <Terminal className="w-4 h-4 text-cyan-400" />
                                </div>
                                <textarea 
                                    value={skill.customCode}
                                    onChange={e => setSkill({...skill, customCode: e.target.value})}
                                    placeholder="// Manifest custom node-logic or neural transformations here.
// Example: (input) => { return input.processNeural(); }"
                                    className="w-full h-40 bg-black/40 rounded-2xl border border-white/10 p-6 pl-12 text-cyan-100/70 font-mono text-xs leading-relaxed focus:outline-none focus:border-cyan-500 transition-all resize-none shadow-inner"
                                />
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Knowledge Manifestation (Multimodal)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {attachedFiles.map((file, i) => (
                                    <div key={i} className="relative group aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-2">
                                        <button 
                                            onClick={() => removeFile(i)}
                                            className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        {file.preview ? (
                                            <img src={file.preview} className="w-full h-full object-cover rounded-lg" alt={file.name} />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="w-8 h-8 text-indigo-400" />
                                                <span className="text-[10px] text-slate-400 truncate w-full text-center px-2">{file.name}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-400"
                                >
                                    <Plus className="w-6 h-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Add Logic Source</span>
                                </button>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                multiple 
                                accept="image/*,.pdf,.txt,.md"
                            />
                            <p className="text-[10px] text-slate-500">Supported: Images, PDF, Text, Markdown. These files provide deep context for neural synthesis.</p>
                        </div>

                        {/* MCP Integration */}
                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Neural Integration Nexus</label>
                                    <p className="text-[10px] text-slate-500 italic">Bind custom MCP nodes or submit proprietary business tools.</p>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                                    isMcpLimitReached ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                                )}>
                                    {mcpServers.length}/4 NODES MANIFESTED
                                </span>
                            </div>

                            {/* Integration Registry (Business & Node Tools) */}
                            <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-4">
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-cyan-400" />
                                    Global Integration Registry
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-[10px] text-slate-300">
                                        <span className="flex items-center gap-2"><Layers className="w-3 h-3" /> Stripe Nexus (Node)</span>
                                        <Plus className="w-3 h-3" />
                                    </button>
                                    <button className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-[10px] text-slate-300">
                                        <span className="flex items-center gap-2"><Database className="w-3 h-3" /> Postgres MCP</span>
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {mcpServers.map((mcp, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group">
                                        <div className="flex items-center gap-3">
                                            <Server className="w-4 h-4 text-cyan-400" />
                                            <div>
                                                <div className="text-xs font-bold text-white uppercase tracking-tight">{mcp.name}</div>
                                                <div className="text-[9px] text-slate-500 font-mono truncate max-w-[200px]">{mcp.url}</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setMcpServers(prev => prev.filter((_, idx) => idx !== i))}
                                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}

                                {!isMcpLimitReached && (
                                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-dashed border-cyan-500/30 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-cyan-400 uppercase">Bind New Neural Node</span>
                                            <button className="text-[9px] text-cyan-500/60 hover:text-cyan-400 underline uppercase font-bold">Business Submission Portal</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-bold text-slate-500 uppercase">Provider Name</div>
                                                <input 
                                                    value={newMcp.name}
                                                    onChange={e => setNewMcp({...newMcp, name: e.target.value})}
                                                    placeholder="e.g., Wolf-Media-DB"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-bold text-slate-500 uppercase">Protocol URI</div>
                                                <input 
                                                    value={newMcp.url}
                                                    onChange={e => setNewMcp({...newMcp, url: e.target.value})}
                                                    placeholder="wss://..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1 col-span-2">
                                                <div className="text-[9px] font-bold text-slate-500 uppercase">Integration Category</div>
                                                <select 
                                                    value={newMcp.category}
                                                    onChange={e => setNewMcp({...newMcp, category: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
                                                >
                                                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                                                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <button 
                                                onClick={() => {
                                                    if (newMcp.name && newMcp.url) {
                                                        setMcpServers([...mcpServers, { ...newMcp as MCPConfig, id: Date.now().toString() }]);
                                                        setNewMcp({ name: '', url: '', type: 'custom' });
                                                    }
                                                }}
                                                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold transition-all shadow-lg shadow-cyan-500/20"
                                            >
                                                <Zap className="w-3 h-3" />
                                                ESTABLISH CONNECTION
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            onClick={handleGenerate}
                            disabled={!skill.name || !skill.description || isGenerating}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-indigo-500/20"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Synthesizing Cortex...
                                </>
                            ) : (
                                <>
                                    Forge Instructions
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </GlassCard>
            )}

            {step === 3 && (
                <div className="h-full flex flex-col gap-6">
                    <div className="flex-1 min-h-0 bg-slate-950/50 rounded-3xl border border-white/10 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <Code2 className="w-5 h-5 text-indigo-400" />
                                <span className="font-display font-medium text-white">Generated Logical Framework</span>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300">
                                <Wand2 className="w-4 h-4" />
                                RE-SYNTHESIZE
                            </button>
                        </div>
                        <textarea 
                            value={skill.instructions}
                            onChange={e => setSkill({...skill, instructions: e.target.value})}
                            className="flex-1 w-full bg-transparent p-8 text-indigo-100/90 font-mono text-sm leading-relaxed focus:outline-none custom-scrollbar resize-none"
                        />
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button 
                            onClick={() => setStep(1)}
                            className="px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                        >
                            Back
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all">
                            <Save className="w-5 h-5" />
                            Finalize Manifest
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
