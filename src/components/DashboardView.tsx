import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Users, 
  Cpu, 
  Activity, 
  ArrowUpRight,
  Plus,
  Shield,
  Clock,
  Sparkles,
  Microscope,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

export default function DashboardView() {
  const stats = [
    { label: 'Deployed Agents', value: '12', icon: Users, color: 'text-cyan-400' },
    { label: 'Active Skills', value: '48', icon: Zap, color: 'text-emerald-400' },
    { label: 'Task Runs', value: '12.4k', icon: Activity, color: 'text-cyan-400' },
    { label: 'Neural Load', value: '64%', icon: Cpu, color: 'text-cyan-400' },
  ];

  const recentAgents = [
    { name: 'Research Architect', role: 'Advanced RAG', status: 'Optimal', uptime: '99.9%', icon: Microscope },
    { name: 'Security Sentinel', role: 'Anomaly Detection', status: 'Optimal', uptime: '100%', icon: ShieldCheck },
    { name: 'Market Intel Core', role: 'Trend Manifestation', status: 'Optimal', uptime: '98.4%', icon: Globe },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <section className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">
            Systems Online, <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">AETHER</span> CORTEX
          </h1>
          <p className="text-white/40 max-w-lg">
            Welcome back, Architect. AETHER Neural Agents are processing 1,420 requests per minute with an efficiency rate of 94.2%.
          </p>
        </div>
        
        <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
          <Plus className="w-5 h-5" />
          Manifest New Agent
        </button>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-6 h-full flex flex-col justify-between group">
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  +12%
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Agents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-white">Active Wolf-Class Agents</h3>
            <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentAgents.map((agent, i) => (
              <motion.div 
                key={agent.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <GlassCard className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                    <agent.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                    <p className="text-xs text-slate-500">{agent.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-slate-300">{agent.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">UPTIME: {agent.uptime}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: System Integrity */}
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold text-white">System Integrity</h3>
          <GlassCard className="p-6 space-y-6 bg-cyan-600/[0.03]">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-slate-300">Security Protocols</span>
                    </div>
                    <span className="text-xs font-bold text-green-400">SECURE</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-slate-300">Sandbox TTL</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">4h 12m</span>
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] leading-relaxed text-slate-500 uppercase font-mono tracking-wide">
                    ALL AGENTS ARE HARDCODED WITH IDENTIFIER <span className="text-slate-300 font-bold">BW-MEDIA-AI-PROD-001</span> FOR REAL-TIME AUDIT PURPOSES. NO ANONYMOUS MANIFESTATIONS PERMITTED.
                </p>
            </div>

            <button className="w-full py-4 rounded-xl liquid-glass bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" />
                REBOOT CORE INSTRUCTIONS
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
