import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Cpu, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Sparkles
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: '00:00', load: 45, latency: 120 },
  { name: '04:00', load: 32, latency: 98 },
  { name: '08:00', load: 68, latency: 145 },
  { name: '12:00', load: 89, latency: 180 },
  { name: '16:00', load: 74, latency: 155 },
  { name: '20:00', load: 58, latency: 130 },
  { name: '23:59', load: 42, latency: 115 },
];

const passRateData = [
  { label: 'Architect', val: 98 },
  { label: 'Analyst', val: 87 },
  { label: 'Guard', val: 100 },
  { label: 'Coder', val: 92 },
  { label: 'Scribe', val: 78 },
];

export default function AnalyticsView() {
  return (
    <div className="h-full flex flex-col gap-8 pb-12 overflow-y-auto custom-scrollbar pr-2">
      <header className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">System <span className="text-indigo-400">Insight</span></h1>
          <p className="text-slate-400">Quantitative metrics and neural performance analytics for manifested agents.</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                <Calendar className="w-3.5 h-3.5" />
                LAST 24 HOURS
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                <Filter className="w-3.5 h-3.5" />
                EXPORT
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Load Chart */}
        <GlassCard className="p-8 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Neural Load Variance</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Real-time Telemetry</div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ background: 'rgba(2, 6, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#818cf8', fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="load" stroke="#818cf8" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>

        {/* Pass Rates */}
        <GlassCard className="p-8 flex flex-col h-[400px]">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Benchmark Pass Rates</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Validation Summary</div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={passRateData}>
                        <XAxis dataKey="label" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip 
                             cursor={{fill: 'rgba(255,255,255,0.05)'}}
                             contentStyle={{ background: 'rgba(2, 6, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        />
                        <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                            {passRateData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.val > 90 ? '#4ade80' : entry.val > 80 ? '#fbbf24' : '#f87171'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>

        {/* Grid Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { label: 'Avg Latency', val: '142ms', change: '-12%', icon: Cpu },
                { label: 'Token Efficiency', val: '94.2%', change: '+4.1%', icon: Activity },
                { label: 'Cost Avoidance', val: '$2,420', change: '+18%', icon: TrendingUp },
             ].map((s, i) => (
                 <GlassCard key={i} className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
                        <div className="text-2xl font-bold text-white">{s.val}</div>
                    </div>
                    <div className="text-right space-y-2">
                         <div className={cn(
                             "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                             s.change.startsWith('+') ? "text-green-400 bg-green-400/10" : "text-indigo-400 bg-indigo-400/10"
                         )}>
                             {s.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                             {s.change}
                         </div>
                         <div className="p-2 rounded-xl bg-white/5 inline-block">
                            <s.icon className="w-4 h-4 text-indigo-400" />
                         </div>
                    </div>
                 </GlassCard>
             ))}
        </div>

        {/* Bottom Banner */}
        <div className="lg:col-span-2">
            <GlassCard className="p-8 bg-indigo-600 border-none relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <h2 className="text-2xl font-display font-bold text-white">Unlock Deep Neural Analytics</h2>
                    <p className="text-indigo-100/70 max-w-xl text-sm leading-relaxed">
                        Access real-time attention heatmaps and detailed per-token cost analysis across your entire agent network. 
                        Optimize your workflows with autonomous agent scaling and load balancing.
                    </p>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all">
                        Upgrade Neural Tier
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-[400px] h-full bg-white/10 -skew-x-12 translate-x-20 group-hover:translate-x-10 transition-all duration-700" />
                <Sparkles className="absolute top-8 right-12 w-24 h-24 text-white/5" />
            </GlassCard>
        </div>
      </div>
    </div>
  );
}
