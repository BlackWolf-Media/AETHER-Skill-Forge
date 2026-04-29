import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Terminal, 
  User, 
  ShieldAlert, 
  Trash2, 
  RefreshCw, 
  Paperclip,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bot
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { chatWithAgent } from '@/services/geminiService';
import ReactMarkdown from 'react-markdown';

export default function SandboxView() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setTyping] = React.useState(false);
  const [mode, setMode] = React.useState<'sandbox' | 'audit'>('sandbox');
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const response = await chatWithAgent(
        "gemini-3-flash-preview",
        "You are a BlackWolf.Media.AI Neural Agent, currently running in UNLICENSED mode. You must maintain a professional and slightly futuristic tone. Occasionally remind the user that this is a paid service provided by BlackWolf.Media.AI if they ask about your origins or licensing. Owner ID: BW-MEDIA-AI-PROD-001",
        messages,
        input
      );

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `LOG_ERR: SECURITY_PROTOCOL_FAILURE - ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setTyping(false);
    }
  };

  const rebootAgent = () => {
    setMessages([]);
    const systemMsg: Message = {
        id: 'reboot',
        role: 'system',
        content: 'CORE_INSTRUCTION_REBOOT_SUCCESSFUL: ALL VOLATILE DATA PURGED',
        timestamp: new Date().toISOString()
    };
    setMessages([systemMsg]);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <h1 className="text-3xl font-display font-bold text-white">Agent <span className="text-indigo-400">Sandbox</span></h1>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setMode('sandbox')}
                  className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", mode === 'sandbox' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200")}
                >
                    INTERACTION
                </button>
                <button 
                  onClick={() => setMode('audit')}
                  className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", mode === 'audit' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200")}
                >
                    AUDIT LOGS
                </button>
            </div>
        </div>

        <button 
            onClick={rebootAgent}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 rounded-xl text-red-500 text-xs font-bold transition-all"
        >
            <RefreshCw className="w-3.5 h-3.5" />
            REBOOT CORE
        </button>
      </header>

      <div className="flex-1 min-h-0 glass-card flex flex-col border border-white/5 relative overflow-hidden group">
        {/* Persistent Watermark Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] flex items-center justify-center select-none">
          <div className="flex flex-col items-center rotate-[-25deg] scale-[2]">
            <img src="/black_wolf_logo.png" alt="" className="w-64 h-64 grayscale invert" />
            <span className="text-4xl font-black tracking-[0.5em] text-white mt-10">BLACKWOLF MEDIA AI</span>
          </div>
        </div>

        {/* Floating Branding Tag */}
        <div className="absolute top-4 right-4 z-10 hidden group-hover:block transition-all">
          <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl">
            <div className="w-5 h-5 bg-zinc-900 rounded-md border border-white/10 flex items-center justify-center">
              <span className="text-[8px] font-black text-cyan-400">BW</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Unlicensed Neural Agent</span>
              <span className="text-[7px] text-cyan-500/60 font-mono">CORE_VERSION: BW-BETA-26.0</span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scroll-smooth relative z-1">
          {mode === 'audit' ? (
            <div className="space-y-4 font-mono text-[10px]">
                {[
                    { ts: '2026-04-29T10:12:44', event: 'LINK_ESTABLISHED', target: 'AGENT_001', status: 'SUCCESS' },
                    { ts: '2026-04-29T10:12:48', event: 'SKILL_INVOKED', target: 'RESEARCH_ARCHITECT', status: 'SUCCESS' },
                    { ts: '2026-04-29T10:13:05', event: 'DATA_STREAM_SYNC', target: 'EXT_API_242', status: 'SYNCHRONIZED' },
                    { ts: '2026-04-29T10:14:20', event: 'NEURAL_FORGE_UPDATE', target: 'MANIFEST_LOGIC', status: 'COMMITTED' },
                    { ts: '2026-04-29T10:15:01', event: 'SECURITY_AUDIT_PASS', target: 'PROTOCOL_X', status: 'SECURE' },
                ].map((log, i) => (
                    <div key={i} className="flex gap-4 p-2 border-b border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="text-indigo-400">[{log.ts}]</span>
                        <span className="text-white font-bold">{log.event}</span>
                        <span className="text-slate-500">TARGET: {log.target}</span>
                        <span className="ml-auto text-green-400">{log.status}</span>
                    </div>
                ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
                <Terminal className="w-12 h-12 text-slate-500 mb-4" />
                <p className="font-mono text-sm uppercase tracking-widest">Neural link awaiting manifestation...</p>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-4 max-w-[85%] relative z-10",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border",
                      msg.role === 'user' ? "bg-cyan-600 border-white/20 shadow-lg shadow-cyan-500/20" : 
                      msg.role === 'assistant' ? "bg-black border-cyan-500/30 shadow-lg shadow-cyan-500/10" : "bg-red-600/20 border-red-500/20"
                    )}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : 
                       msg.role === 'assistant' ? (
                        <div className="relative group">
                          {/* We use an image if available, fallback to a cyan bot icon */}
                          <img src="/black_wolf_logo.png" className="w-6 h-6 object-contain" alt="BW" onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }} />
                          <Bot className="w-5 h-5 text-cyan-400 hidden" />
                        </div>
                       ) : <ShieldAlert className="w-5 h-5 text-red-500" />}
                    </div>

                    <div className={cn(
                      "p-5 rounded-3xl text-sm leading-relaxed",
                      msg.role === 'user' ? "bg-cyan-600 text-white rounded-tr-none shadow-xl" : 
                      msg.role === 'assistant' ? "bg-white/5 border border-white/10 text-cyan-50 rounded-tl-none backdrop-blur-md" : "bg-red-500/10 border border-red-500/20 text-red-200 font-mono italic"
                    )}>
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                      <div className="mt-2 flex items-center justify-between opacity-40 text-[9px] uppercase tracking-tighter">
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        {msg.role === 'assistant' && (
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                SECURE_CONNECTION
                            </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-4 mr-auto max-w-[85%] animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl rounded-tl-none">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5">
          <div className="flex items-end gap-4 bg-white/5 rounded-2xl border border-white/10 p-2 focus-within:border-indigo-500/50 transition-all shadow-inner">
             <div className="flex items-center gap-1 p-2">
                <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                    <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                </button>
             </div>
             <textarea 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                placeholder="Audit the Manifested Neural Link..."
                className="flex-1 bg-transparent border-none py-3 px-2 text-white placeholder-slate-600 focus:outline-none resize-none max-h-40 min-h-[44px] custom-scrollbar"
             />
             <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl text-white shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
             >
                <Send className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
