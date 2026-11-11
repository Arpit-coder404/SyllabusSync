import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  Zap,
  Filter,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  ShieldAlert,
  Info,
  BookOpen
} from 'lucide-react';
import { SkillGapCategory, SkillGapItem } from '../types';

export const SkillGapPage: React.FC = () => {
  const { getSkillGapAnalysis, createPathway } = useAppStore();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [gapFilter, setGapFilter] = useState<string>('all');

  const gaps = getSkillGapAnalysis();

  const filteredGaps = gaps.filter((g) => {
    const matchesCat = categoryFilter === 'all' || g.category === categoryFilter;
    const matchesGap = gapFilter === 'all' || g.gapCategory === gapFilter;
    return matchesCat && matchesGap;
  });

  const belowExpectedCount = gaps.filter((g) => g.gapCategory === 'below_expected').length;
  const introducedNotAssessedCount = gaps.filter((g) => g.gapCategory === 'introduced_not_assessed').length;
  const meetsCount = gaps.filter((g) => g.gapCategory === 'meets_expected' || g.gapCategory === 'exceeds_expected').length;

  const handleStartPathway = (gap: SkillGapItem) => {
    navigate(`/pathways?newTarget=${gap.competencyId}`);
  };

  const getBadgeStyle = (cat: SkillGapCategory) => {
    switch (cat) {
      case 'below_expected':
        return 'bg-terracotta-soft text-terracotta font-bold border-terracotta/30';
      case 'introduced_not_assessed':
        return 'bg-amber-soft text-amber-900 font-semibold border-amber/30';
      case 'meets_expected':
      case 'exceeds_expected':
        return 'bg-forest-soft text-forest-dark font-bold border-forest/30';
      case 'not_introduced':
        return 'bg-bg-main text-tx-muted font-mono border-border';
      default:
        return 'bg-bg-main text-tx-secondary border-border';
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Skill Gap Analysis"
        subtitle="Transparent evaluation of curriculum benchmarks versus verified student demonstration. No black-box scores."
        badge={`${belowExpectedCount + introducedNotAssessedCount} Gaps Diagnosed`}
      />

      <div className="px-6 space-y-6">
        {/* Rubric Transparency Notice */}
        <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle flex items-start gap-3">
          <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
          <div className="text-xs text-tx-secondary leading-relaxed">
            <span className="font-semibold text-tx-primary">Transparent Evaluation Rubric: </span>
            Skill gaps represent the delta between expected course learning outcomes and actual faculty-verified evidence artifacts.
            If assessment evidence is not yet submitted, it is classified as "Introduced but not assessed" rather than penalizing performance.
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-bg-surface border border-terracotta/40 rounded-xl shadow-subtle bg-terracotta-soft/10">
            <div className="text-xs font-mono uppercase text-terracotta font-semibold">Below Expected Target</div>
            <div className="text-3xl font-serif font-bold text-terracotta mt-1">{belowExpectedCount}</div>
            <div className="text-xs text-tx-secondary mt-1 font-mono">Requires targeted milestone pathways</div>
          </div>

          <div className="p-5 bg-bg-surface border border-amber/40 rounded-xl shadow-subtle bg-amber-soft/10">
            <div className="text-xs font-mono uppercase text-amber-900 font-semibold">Introduced, Lacks Evidence</div>
            <div className="text-3xl font-serif font-bold text-amber-800 mt-1">{introducedNotAssessedCount}</div>
            <div className="text-xs text-tx-secondary mt-1 font-mono">Taught in course, submit project work</div>
          </div>

          <div className="p-5 bg-bg-surface border border-forest/40 rounded-xl shadow-subtle bg-forest-soft/10">
            <div className="text-xs font-mono uppercase text-forest font-semibold">Meets or Exceeds Target</div>
            <div className="text-3xl font-serif font-bold text-forest mt-1">{meetsCount}</div>
            <div className="text-xs text-tx-secondary mt-1 font-mono">Substantiated by verified artifacts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
              <Filter className="w-3.5 h-3.5 text-forest" />
              <span>Filters:</span>
            </div>

            <select
              value={gapFilter}
              onChange={(e) => setGapFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Gap Categories</option>
              <option value="below_expected">Below Expected Target</option>
              <option value="introduced_not_assessed">Introduced but not assessed</option>
              <option value="meets_expected">Meets Target</option>
              <option value="not_introduced">Not Yet Introduced</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Competency Categories</option>
              <option value="technical">Technical</option>
              <option value="analytical">Analytical</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div className="text-xs font-mono text-tx-secondary">
            Showing {filteredGaps.length} items
          </div>
        </div>

        {/* Gap Analysis Table / Cards */}
        <div className="space-y-3">
          {filteredGaps.map((gap) => (
            <div
              key={gap.competencyId}
              className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle hover:border-forest/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${getBadgeStyle(gap.gapCategory)}`}>
                    {gap.gapCategory.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-mono text-tx-muted uppercase">
                    {gap.category}
                  </span>
                  {gap.relatedCourseCodes.length > 0 && (
                    <span className="text-xs font-mono text-tx-secondary">
                      · Taught in: {gap.relatedCourseCodes.join(', ')}
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-bold text-base text-tx-primary">
                  {gap.competencyName}
                </h4>

                <p className="text-xs text-tx-secondary leading-relaxed max-w-3xl">
                  {gap.recommendation}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono pt-1">
                  <div>
                    <span className="text-tx-muted mr-1.5">Expected:</span>
                    <ProficiencyBadge level={gap.expectedLevel} size="sm" />
                  </div>
                  <div>
                    <span className="text-tx-muted mr-1.5">Demonstrated:</span>
                    <ProficiencyBadge level={gap.demonstratedLevel} size="sm" />
                  </div>
                  {!gap.prerequisitesMet && (
                    <span className="text-terracotta text-[11px] font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Prerequisite competencies incomplete
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleStartPathway(gap)}
                  className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Bridge Gap via Pathway</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

