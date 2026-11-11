import React, { useState } from 'react';
import { useSearchParams, NavLink, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  Award,
  Zap,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  X,
  ExternalLink,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { CompetencyCategory, ProficiencyLevel, PROFICIENCY_NAMES, Competency } from '../types';

export const CompetenciesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');
  const navigate = useNavigate();

  const {
    competencies,
    studentCompetencies,
    studentEvidence,
    mappings,
    courses,
    topics,
    assessments,
    createPathway
  } = useAppStore();

  const [categoryFilter, setCategoryFilter] = useState<CompetencyCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedComp, setSelectedComp] = useState<Competency | null>(
    highlightedId ? competencies.find((c) => c.id === highlightedId) || null : null
  );

  // Filter competencies
  const filteredCompetencies = competencies.filter((c) => {
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    const record = studentCompetencies.find((sc) => sc.competencyId === c.id);
    const status = record?.status || 'unassessed';
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    return matchesCat && matchesStatus;
  });

  // Overview metrics
  const totalMapped = competencies.length;
  const withEvidence = studentCompetencies.filter((sc) => sc.evidenceCount > 0).length;
  const underDev = studentCompetencies.filter((sc) => sc.status === 'developing').length;
  const proficientCount = studentCompetencies.filter((sc) => sc.status === 'proficient' || sc.status === 'advanced').length;
  const unassessedCount = competencies.filter(
    (c) => !studentCompetencies.some((sc) => sc.competencyId === c.id) ||
           studentCompetencies.find((sc) => sc.competencyId === c.id)?.status === 'unassessed'
  ).length;

  return (
    <div className="space-y-6">
      <Header
        title="Student Competency Profile"
        subtitle="Transparent inventory of verified competencies, evidence-backed proficiency levels, and curriculum alignment."
        badge={`${proficientCount} Proficient`}
        actions={
          <NavLink
            to="/skill-gap"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Skill Gap Analysis</span>
          </NavLink>
        }
      />

      <div className="px-6 space-y-6">
        {/* Verification Distinction Card */}
        <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="text-xs font-mono uppercase tracking-wider text-tx-muted mb-2 font-medium">
            SyllabusSync 4-Tier Competency Distinction
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-bg-main border border-border rounded-lg">
              <span className="font-bold text-tx-primary block mb-0.5">1. Curriculum Coverage</span>
              <p className="text-tx-secondary text-[11px] leading-tight">
                Skill appears in approved university syllabus topics.
              </p>
            </div>
            <div className="p-3 bg-bg-main border border-border rounded-lg">
              <span className="font-bold text-tx-primary block mb-0.5">2. Learning Exposure</span>
              <p className="text-tx-secondary text-[11px] leading-tight">
                Student has enrolled in and attended lectures for the unit.
              </p>
            </div>
            <div className="p-3 bg-bg-main border border-border rounded-lg">
              <span className="font-bold text-amber-900 block mb-0.5">3. Assessment Evidence</span>
              <p className="text-tx-secondary text-[11px] leading-tight">
                Demonstrated in exam, lab practical, or project artifact.
              </p>
            </div>
            <div className="p-3 bg-forest-soft border border-forest/30 rounded-lg">
              <span className="font-bold text-forest-dark block mb-0.5">4. Verified Competency</span>
              <p className="text-forest-dark text-[11px] leading-tight font-medium">
                Reviewed against multi-criterion rubrics by faculty.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono text-tx-secondary uppercase">Total Framework</span>
            <div className="text-2xl font-serif font-bold text-tx-primary mt-1">{totalMapped}</div>
            <div className="text-[11px] text-tx-muted font-mono mt-1">Across degree syllabus</div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono text-forest uppercase">Evidence Backed</span>
            <div className="text-2xl font-serif font-bold text-forest mt-1">{withEvidence}</div>
            <div className="text-[11px] text-forest font-mono mt-1">Artifacts evaluated</div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono text-amber-800 uppercase">Under Development</span>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{underDev}</div>
            <div className="text-[11px] text-tx-muted font-mono mt-1">Level 2 to Level 3</div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono text-tx-secondary uppercase">Unassessed</span>
            <div className="text-2xl font-serif font-bold text-tx-secondary mt-1">{unassessedCount}</div>
            <div className="text-[11px] text-tx-muted font-mono mt-1">Pending coursework</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-3 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
              <Filter className="w-3.5 h-3.5 text-forest" />
              <span>Filters:</span>
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="analytical">Analytical</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Statuses</option>
              <option value="proficient">Proficient (Level 4-5)</option>
              <option value="developing">Developing (Level 2-3)</option>
              <option value="attention_required">Attention Required</option>
              <option value="unassessed">Unassessed</option>
            </select>
          </div>

          <div className="text-xs font-mono text-tx-secondary">
            Showing {filteredCompetencies.length} of {competencies.length} competencies
          </div>
        </div>

        {/* Competencies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompetencies.map((comp) => {
            const record = studentCompetencies.find((sc) => sc.competencyId === comp.id);
            const compMappings = mappings.filter((m) => m.competencyId === comp.id);
            const relatedCourses = courses.filter((c) =>
              compMappings.some((m) => m.courseId === c.id)
            );
            const evis = studentEvidence.filter((e) => e.competencyId === comp.id);

            const demonstratedLevel = record?.currentDemonstratedLevel || 1;
            const expectedLevel = record?.expectedLevel || comp.targetLevel || 3;
            const status = record?.status || 'unassessed';

            return (
              <div
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className={`p-5 bg-bg-surface border rounded-xl shadow-subtle hover:border-forest cursor-pointer transition-all flex flex-col justify-between ${
                  selectedComp?.id === comp.id ? 'border-forest ring-2 ring-forest/20' : 'border-border'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-main border border-border text-tx-secondary font-semibold">
                      {comp.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      status === 'proficient' ? 'bg-forest-soft text-forest-dark' :
                      status === 'developing' ? 'bg-amber-soft text-amber-900' :
                      status === 'attention_required' ? 'bg-terracotta-soft text-terracotta' :
                      'bg-bg-main text-tx-muted'
                    }`}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-tx-primary leading-snug">
                    {comp.name}
                  </h4>

                  <p className="text-xs text-tx-secondary mt-1.5 line-clamp-2 leading-relaxed">
                    {comp.description}
                  </p>

                  {/* Level Comparison */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-border text-xs">
                    <div className="p-2 bg-bg-main rounded-md">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">DEMONSTRATED</span>
                      <ProficiencyBadge level={demonstratedLevel} />
                    </div>
                    <div className="p-2 bg-bg-main rounded-md">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">TARGET</span>
                      <ProficiencyBadge level={expectedLevel} />
                    </div>
                  </div>

                  {/* Related Subjects */}
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap text-xs">
                    <span className="text-[10px] font-mono text-tx-muted">Subjects:</span>
                    {relatedCourses.length === 0 ? (
                      <span className="text-[10px] font-mono text-tx-muted">Elective</span>
                    ) : (
                      relatedCourses.map((c) => (
                        <span key={c.id} className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-bg-main border border-border text-tx-primary">
                          {c.code}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-tx-secondary font-mono text-[11px]">
                    {evis.length} Project Artifact{evis.length === 1 ? '' : 's'}
                  </span>
                  <span className="text-forest font-semibold flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Competency Detail Modal / Drawer */}
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-primary/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div
              className="w-full max-w-2xl max-h-[90vh] bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border bg-bg-main/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                      {selectedComp.category}
                    </span>
                    <ProficiencyBadge level={selectedComp.targetLevel} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-tx-primary">
                    {selectedComp.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedComp(null)}
                  className="p-1.5 hover:bg-bg-surface rounded-md text-tx-secondary hover:text-tx-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-tx-muted mb-1 font-semibold">
                    Description & Competency Scope
                  </h4>
                  <p className="text-xs sm:text-sm text-tx-secondary leading-relaxed">
                    {selectedComp.description}
                  </p>
                </div>

                {/* 5-Level Rubric */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-tx-muted mb-2 font-semibold">
                    5-Level Proficiency Progression Rubric
                  </h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((lvl) => {
                      const levelNum = lvl as ProficiencyLevel;
                      const isTarget = lvl === selectedComp.targetLevel;
                      return (
                        <div
                          key={lvl}
                          className={`p-3 rounded-lg border text-xs ${
                            isTarget
                              ? 'bg-forest-soft border-forest/30 font-medium'
                              : 'bg-bg-main border-border text-tx-secondary'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5 font-mono font-bold text-tx-primary">
                            <span>Level {lvl}: {PROFICIENCY_NAMES[levelNum]}</span>
                            {isTarget && (
                              <span className="text-[9px] uppercase px-1.5 rounded bg-forest text-white">
                                Target Level
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-tx-secondary leading-relaxed">
                            {selectedComp.levels[levelNum]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Verified Artifacts */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-tx-muted mb-2 font-semibold">
                    Submitted Evidence & Practical Artifacts
                  </h4>
                  {(() => {
                    const evis = studentEvidence.filter((e) => e.competencyId === selectedComp.id);
                    if (evis.length === 0) {
                      return (
                        <div className="p-4 bg-bg-main border border-border rounded-lg text-xs text-tx-secondary">
                          No evidence submitted yet. Submit an assignment or project repo to substantiate this skill.
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-2">
                        {evis.map((e) => (
                          <div key={e.id} className="p-3 bg-bg-main border border-border rounded-lg text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-tx-primary">{e.title}</span>
                              <span className="font-mono text-forest font-bold">Verified Level {e.verifiedLevel}</span>
                            </div>
                            <p className="text-[11px] text-tx-secondary">{e.description}</p>
                            {e.feedback && (
                              <div className="mt-1.5 text-[11px] text-forest italic">
                                Faculty: "{e.feedback}"
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="p-4 border-t border-border bg-bg-main/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    navigate(`/pathways?newTarget=${selectedComp.id}`);
                    setSelectedComp(null);
                  }}
                  className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-subtle"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Generate Personal Pathway</span>
                </button>
                <button
                  onClick={() => setSelectedComp(null)}
                  className="px-4 py-2 bg-bg-surface hover:bg-bg-main border border-border text-tx-primary rounded-md text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
