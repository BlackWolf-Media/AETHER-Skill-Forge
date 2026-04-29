import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { getTemplateByType } from '../constants/nodes';

export type CortexNodeData = {
  label: string;
  type: string;
  parameters: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'error';
};

export function CortexNode({ data, selected }: NodeProps<Node<CortexNodeData>>) {
  const template = getTemplateByType(data.type);
  const Icon = template?.icon || null;

  return (
    <div className={cn(
      "min-w-[200px] bg-black/80 rounded-2xl border transition-all duration-500 overflow-hidden",
      selected ? "border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.2)]" : "border-white/10",
      data.status === 'running' && "ring-2 ring-cyan-500/50 animate-pulse"
    )}>
      {/* Category Accent Bar */}
      <div 
        className="h-1 w-full" 
        style={{ backgroundColor: template?.color || '#6366f1' }} 
      />
      
      <div className="p-4 flex flex-col gap-3">
        <header className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
            style={{ backgroundColor: `${template?.color}20` }}
          >
            {Icon && <Icon className="w-5 h-5" style={{ color: template?.color }} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate uppercase tracking-tighter">
              {data.label || template?.name}
            </h4>
            <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-widest">
              {template?.category}
            </span>
          </div>
        </header>

        {/* Input/Output Sockets Display */}
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col gap-1">
            <div className="text-[7px] text-slate-600 font-bold uppercase">Input</div>
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-500/50" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[7px] text-slate-600 font-bold uppercase">Output</div>
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-slate-700 !border-2 !border-black hover:!bg-cyan-500 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-cyan-500 !border-2 !border-black hover:!bg-cyan-400 transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      />
    </div>
  );
}
