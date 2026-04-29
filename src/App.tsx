import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  LayoutDashboard, 
  Wand2, 
  FlaskConical, 
  LineChart, 
  Settings, 
  Search,
  Bell,
  Menu,
  ChevronRight,
  ShieldCheck,
  Brain,
  Sparkles,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skill, Message } from '@/types';

// Components
import DashboardView from './components/DashboardView';
import ForgeView from './components/ForgeView';
import SandboxView from './components/SandboxView';
import WorkflowsView from './components/WorkflowsView';
import AnalyticsView from './components/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  
  // Mock State for now
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const ownerId = "BW-MEDIA-AI-PROD-001"; // Hardcoded identifier for accountability

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'forge', label: 'Skill Forge', icon: Wand2 },
    { id: 'sandbox', label: 'Sandbox', icon: FlaskConical },
    { id: 'workflows', label: 'Workflows', icon: Cpu },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
  ];

  return (
    <div className="flex h-screen w-full mesh-gradient overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="h-full bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col z-20"
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="font-display font-black text-lg tracking-tight text-white leading-none uppercase">AETHER</span>
              <span className="text-[8px] text-zinc-500 font-sans font-bold tracking-[0.1em] leading-none mt-1.5 uppercase">SKILL-FORGE by BlackWolf.Media.AI</span>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                activeTab === item.id 
                  ? "bg-white/10 text-white border border-white/20 shadow-xl" 
                  : "text-white/40 hover:bg-white/5 hover:text-white/60"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-cyan-400" : "")} />
              {isSidebarOpen && (
                <span className="font-medium text-xs tracking-wide uppercase">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info / Owner ID */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <div className={cn(
            "flex items-center gap-3 p-3 transition-all",
            !isSidebarOpen && "justify-center"
          )}>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Verified Owner</span>
                <span className="text-xs font-mono text-white/80 truncate">BW-AI-992-ALPHA</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-white/10 backdrop-blur-xl bg-black/40 z-20">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
             >
                <Menu className="w-5 h-5 text-white/40" />
             </button>
             <div className="h-4 w-[1px] bg-white/10 " />
             <h2 className="text-xl font-semibold tracking-tight text-white">
                {activeTab}
             </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-medium text-emerald-400">System Ready</span>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="p-2 text-white/20 hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent p-1">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=BlackWolf" alt="Avatar" className="w-full h-full" />
                    </div>
                </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full"
                >
                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'forge' && <ForgeView />}
                    {activeTab === 'sandbox' && <SandboxView />}
                    {activeTab === 'workflows' && <WorkflowsView />}
                    {activeTab === 'analytics' && <AnalyticsView />}
                </motion.div>
            </AnimatePresence>
        </div>
      </main>

      {/* Decorative Floating Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
