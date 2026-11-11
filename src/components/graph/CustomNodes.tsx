import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BookOpen, Award, Layers, Target, CheckSquare, GraduationCap, Zap } from 'lucide-react';
import { ProficiencyLevel, PROFICIENCY_NAMES } from '../../types';

// Program Node
export const ProgramNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-xl bg-forest-dark text-white border-2 shadow-elevated min-w-[220px] transition-all ${
        selected ? 'border-amber ring-2 ring-amber/50 scale-105' : 'border-forest'
      }`}
    >
      <Handle type="source" position={Position.Right} className="!bg-forest-light !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-1">
        <GraduationCap className="w-5 h-5 text-forest-soft" />
        <span className="text-[10px] font-mono tracking-wider uppercase text-forest-soft font-semibold">
          Academic Program
        </span>
      </div>
      <div className="font-heading font-bold text-sm tracking-tight leading-snug">
        {data.label as string}
      </div>
      <div className="text-[11px] text-white/70 font-mono mt-1">
        {data.code as string} · 8 Semesters · 164 Credits
      </div>
    </div>
  );
});

// Course Node
export const CourseNode = memo(({ data, selected }: NodeProps) => {
  const color = (data.color as string) || '#315C46';
  return (
    <div
      className={`px-3.5 py-2.5 rounded-lg bg-bg-surface border-2 shadow-subtle min-w-[190px] transition-all ${
        selected ? 'border-forest ring-2 ring-forest/30 scale-105' : 'border-border'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-forest !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} className="!bg-forest !w-2.5 !h-2.5" />
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[10px] font-mono px-1.5 py-0.2 rounded font-bold"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {data.code as string}
        </span>
        <span className="text-[10px] text-tx-secondary font-mono">
          Sem {data.semesterNumber as number}
        </span>
      </div>
      <div className="font-heading font-semibold text-xs text-tx-primary line-clamp-2">
        {data.label as string}
      </div>
      <div className="text-[10px] text-tx-secondary mt-1 flex items-center justify-between">
        <span>{data.credits as number} Credits</span>
        <span className="font-mono text-[9px] text-tx-muted">{data.facultyName as string}</span>
      </div>
    </div>
  );
});

// Unit Node
export const UnitNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-3 py-2 rounded-md bg-bg-main border shadow-xs min-w-[170px] transition-all ${
        selected ? 'border-forest ring-2 ring-forest/20' : 'border-border'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-tx-secondary !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-tx-secondary !w-2 !h-2" />
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-tx-secondary mb-0.5">
        <Layers className="w-3 h-3" />
        <span>Unit {data.unitNumber as number}</span>
      </div>
      <div className="text-xs font-medium text-tx-primary line-clamp-1">
        {data.label as string}
      </div>
    </div>
  );
});

// Topic Node
export const TopicNode = memo(({ data, selected }: NodeProps) => {
  const isMapped = data.isMapped as boolean;
  return (
    <div
      className={`px-2.5 py-1.5 rounded bg-bg-surface border text-left min-w-[150px] max-w-[200px] transition-all ${
        isMapped
          ? 'border-border'
          : 'border-dashed border-terracotta bg-terracotta-soft/30'
      } ${selected ? 'border-forest ring-2 ring-forest/20 shadow-xs' : ''}`}
    >
      <Handle type="target" position={Position.Left} className="!bg-tx-muted !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-tx-muted !w-1.5 !h-1.5" />
      <div className="flex items-center justify-between text-[9px] font-mono mb-0.5">
        <span className="text-tx-muted">{data.hours as number} hrs</span>
        <span
          className={`px-1 py-0.2 rounded text-[8px] uppercase ${
            isMapped
              ? 'text-forest font-semibold'
              : 'text-terracotta font-bold'
          }`}
        >
          {isMapped ? 'Mapped' : 'Unmapped'}
        </span>
      </div>
      <div className="text-[11px] font-medium text-tx-primary line-clamp-2 leading-tight">
        {data.label as string}
      </div>
    </div>
  );
});

// Learning Outcome Node
export const OutcomeNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-3 py-2 rounded-lg bg-infoBlue-soft/70 border border-infoBlue/40 min-w-[180px] max-w-[220px] shadow-xs transition-all ${
        selected ? 'border-infoBlue-dark ring-2 ring-infoBlue/40' : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-infoBlue !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-infoBlue !w-2 !h-2" />
      <div className="flex items-center justify-between text-[10px] font-mono text-infoBlue-dark font-semibold mb-1">
        <span className="flex items-center gap-1">
          <Target className="w-3 h-3" />
          {data.code as string}
        </span>
        <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-bg-surface text-tx-secondary border border-border">
          {data.bloomsLevel as string}
        </span>
      </div>
      <div className="text-[11px] text-tx-primary line-clamp-2 leading-snug">
        {data.label as string}
      </div>
    </div>
  );
});

// Competency Node
export const CompetencyNode = memo(({ data, selected }: NodeProps) => {
  const category = (data.category as string) || 'technical';
  const targetLevel = (data.targetLevel as ProficiencyLevel) || 4;

  const categoryBadgeColors: Record<string, string> = {
    technical: 'bg-forest-soft text-forest-dark border-forest/30',
    analytical: 'bg-infoBlue-soft text-infoBlue-dark border-infoBlue/30',
    professional: 'bg-softYellow text-amber-900 border-amber-300',
    creative: 'bg-terracotta-soft text-terracotta-dark border-terracotta/30'
  };

  return (
    <div
      className={`px-3.5 py-2.5 rounded-xl bg-bg-surface border-2 shadow-elevated min-w-[210px] max-w-[260px] transition-all ${
        selected ? 'border-forest ring-2 ring-forest/40 scale-105' : 'border-forest/70'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-forest !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} className="!bg-forest !w-2.5 !h-2.5" />
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border font-semibold ${
            categoryBadgeColors[category] || categoryBadgeColors.technical
          }`}
        >
          {category}
        </span>
        <span className="text-[10px] font-mono text-tx-secondary">
          Target: L{targetLevel}
        </span>
      </div>
      <div className="font-heading font-bold text-xs text-tx-primary mb-1">
        {data.label as string}
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono text-tx-secondary pt-1 border-t border-border/60">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-forest" />
          {PROFICIENCY_NAMES[targetLevel]}
        </span>
        <span className="text-forest font-semibold">{data.mappingCount as number} links</span>
      </div>
    </div>
  );
});

// Assessment Node
export const AssessmentNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-3 py-2 rounded-lg bg-softYellow/60 border border-softYellow-accent min-w-[170px] max-w-[210px] shadow-xs transition-all ${
        selected ? 'border-amber ring-2 ring-amber/40' : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-amber !w-2 !h-2" />
      <div className="flex items-center justify-between text-[9px] font-mono text-amber-900 font-semibold mb-1">
        <span className="flex items-center gap-1">
          <CheckSquare className="w-3 h-3 text-amber-700" />
          {data.type as string}
        </span>
        <span>Max {data.maxScore as number}</span>
      </div>
      <div className="text-[11px] font-medium text-tx-primary line-clamp-2 leading-snug">
        {data.label as string}
      </div>
    </div>
  );
});

export const nodeTypes = {
  program: ProgramNode,
  course: CourseNode,
  unit: UnitNode,
  topic: TopicNode,
  outcome: OutcomeNode,
  competency: CompetencyNode,
  assessment: AssessmentNode
};

