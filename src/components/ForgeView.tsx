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
  Image as ImageIcon
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

export default function ForgeView() {
  const [skill, setSkill] = React.useState<Partial<Skill>>({
    name: '',
    description: '',
    instructions: '',
    examples: [],
  });
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
                <GlassCard className="p-8 space-y-8 h-full relative z-1 bg-transparent">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Skill Identifier</label>
                            <input 
                                value={skill.name}
                                onChange={e => setSkill({...skill, name: e.target.value})}
                                placeholder="e.g., Financial Analysis Architect"
                                className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-display text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Functional Purpose</label>
                            <textarea 
                                value={skill.description}
                                onChange={e => setSkill({...skill, description: e.target.value})}
                                placeholder="Describe exactly what this skill should accomplish and when it should trigger..."
                                className="w-full h-40 bg-white/5 rounded-2xl border border-white/10 p-6 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm leading-relaxed resize-none"
                            />
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
