import React, { useState } from 'react';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  GitBranch,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  BookOpen,
  FileCheck2,
  Zap,
  Target
} from 'lucide-react';

export const PathwaysPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const newTarget = searchParams.get('newTarget');
  const navigate = useNavigate();

  const {
    pathways,
    competencies,
    topics,
    courses,
    togglePathwayStep,
    createPathway
  } = useAppStore();

  const [activePathwayId, setActivePathwayId] = useState<string>(
    pathways[0]?.id || ''
  );

  const [isModalOpen, setIsModalOpen] = useState(Boolean(newTarget));
  const [targetCompId, setTargetCompId] = useState(newTarget || competencies[0]?.id || '');
  const [pathwayTitle, setPathwayTitle] = useState('');
  const [pathwayDesc, setPathwayDesc] = useState('');

  const activePathway = pathways.find((p) => p.id === activePathwayId) || pathways[0];
  const targetCompetency = competencies.find((c) => c.id === activePathway?.targetCompetencyId);

  const handleCreateNewPathway = (e: React.FormEvent) => {
    e.preventDefault();
    const comp = competencies.find((c) => c.id === targetCompId);
    if (!comp) return;

    const title = pathwayTitle || `Mastery Pathway: ${comp.name}`;
    const desc = pathwayDesc || `Curriculum-aligned milestone sequence to achieve Level ${comp.targetLevel} in ${comp.name}.`;

    const steps = [
      {
        title: `1. Review Foundational Principles of ${comp.name}`,
        description: `Deep conceptual study of key axioms and theoretical invariants.`,
        activityType: 'reading' as const,
        prerequisites: [],
        estimatedHours: 4,
        deliverable: `Annotated study synthesis notes and proofs.`
      },
      {
        title: `2. Guided Laboratory Implementations & Edge Case Analysis`,
        description: `Construct test fixtures and implement algorithms handling non-trivial inputs.`,
        activityType: 'lab_exercise' as const,
        prerequisites: [],
        estimatedHours: 6,
        deliverable: `Executable code repository with automated unit tests.`
      },
      {
        title: `3. Capstone Engineering Deliverable & Documentation`,
        description: `Design and submit an end-to-end practical project linked to curriculum outcomes.`,
        activityType: 'project_milestone' as const,
        prerequisites: [],
        estimatedHours: 10,
        deliverable: `Public GitHub repository with README and rubric evidence.`
      }
    ];

    const created = createPathway(targetCompId, title, desc, steps);
    setActivePathwayId(created.id);
    setIsModalOpen(false);
    setPathwayTitle('');
    setPathwayDesc('');
  };

  return (
    <div className="space-y-6">
      <Header
        title="Personalized Learning Pathways"
        subtitle="Step-by-step milestone sequences turning diagnosed curriculum gaps into verified competencies."
        badge={`${pathways.length} Active Roadmaps`}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Learning Pathway</span>
          </button>
        }
      />

      <div className="px-6 space-y-6">
        {/* Pathway Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border">
          {pathways.map((p) => {
            const isActive = p.id === activePathway?.id;
            const completed = p.steps.filter((s) => s.status === 'completed').length;
            return (
              <button
                key={p.id}
                onClick={() => setActivePathwayId(p.id)}
                className={`px-4 py-2 rounded-lg border text-xs text-left transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-forest text-white border-forest shadow-xs'
                    : 'bg-bg-surface border-border text-tx-primary hover:border-forest/40'
                }`}
              >
                <div className="font-heading font-bold text-xs truncate max-w-[200px]">{p.title}</div>
                <div className="text-[10px] opacity-80 font-mono mt-0.5">
                  {completed}/{p.steps.length} Steps · {p.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Details & Visual Roadmap */}
        {activePathway && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Roadmap (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                        Target: {targetCompetency?.name}
                      </span>
                      <span className="text-xs font-mono text-tx-secondary">
                        Target Date: {activePathway.targetDate}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-tx-primary">
                      {activePathway.title}
                    </h3>
                    <p className="text-xs text-tx-secondary mt-1 max-w-2xl leading-relaxed">
                      {activePathway.description}
                    </p>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <span className="text-xs text-tx-muted block">PROGRESS</span>
                    <span className="text-xl font-bold text-forest">
                      {Math.round((activePathway.steps.filter((s) => s.status === 'completed').length / Math.max(activePathway.steps.length, 1)) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Milestone Steps Timeline */}
                <div className="mt-6 space-y-4">
                  {activePathway.steps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isAvailable = step.status === 'available';
                    const isLocked = step.status === 'locked';

                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                          isCompleted
                            ? 'bg-forest-soft/40 border-forest/30'
                            : isAvailable
                            ? 'bg-bg-surface border-forest ring-1 ring-forest/30 shadow-subtle'
                            : 'bg-bg-main/50 border-border opacity-70'
                        }`}
                      >
                        {/* Status Checkbox / Icon Button */}
                        <button
                          onClick={() => !isLocked && togglePathwayStep(activePathway.id, step.id)}
                          disabled={isLocked}
                          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                            isCompleted
                              ? 'bg-forest text-white'
                              : isAvailable
                              ? 'border-2 border-forest text-forest hover:bg-forest hover:text-white cursor-pointer'
                              : 'border border-border text-tx-muted cursor-not-allowed bg-bg-main'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isLocked ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <span className="text-xs font-mono font-bold">{idx + 1}</span>
                          )}
                        </button>

                        {/* Step Content */}
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-heading font-bold text-sm text-tx-primary">
                              {step.title}
                            </span>
                            <span className="text-[11px] font-mono text-tx-secondary flex items-center gap-1">
                              <Clock className="w-3 h-3 text-tx-muted" />
                              {step.estimatedHours} hrs effort
                            </span>
                          </div>

                          <p className="text-xs text-tx-secondary leading-relaxed">
                            {step.description}
                          </p>

                          <div className="mt-2 pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-mono text-[11px] text-forest font-medium">
                              Deliverable: {step.deliverable}
                            </span>
                            {isAvailable && (
                              <button
                                onClick={() => togglePathwayStep(activePathway.id, step.id)}
                                className="px-2.5 py-1 text-[11px] font-semibold bg-forest text-white rounded hover:bg-forest-dark transition-colors"
                              >
                                Mark Step Complete
                              </button>
                            )}
                            {isCompleted && (
                              <span className="text-forest text-[11px] font-mono font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Milestone Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Context Panel (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                <h4 className="font-heading font-bold text-sm text-tx-primary mb-2">
                  Target Competency Goal
                </h4>
                {targetCompetency && (
                  <div>
                    <span className="text-xs font-bold text-forest">{targetCompetency.name}</span>
                    <p className="text-xs text-tx-secondary mt-1 leading-relaxed">
                      {targetCompetency.description}
                    </p>
                    <div className="mt-3 p-3 bg-bg-main border border-border rounded-lg text-xs font-mono">
                      <span className="text-tx-muted block">TARGET LEVEL:</span>
                      <span className="font-bold text-tx-primary">Level {targetCompetency.targetLevel} · Proficient</span>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-3 border-t border-border">
                  <NavLink
                    to="/evidence"
                    className="w-full py-2 bg-bg-main hover:bg-forest-soft border border-border text-tx-primary text-xs font-semibold rounded-lg text-center block transition-colors"
                  >
                    Upload Completed Project Evidence
                  </NavLink>
                </div>
              </div>

              <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                <h4 className="font-heading font-bold text-sm text-tx-primary mb-2">
                  Prerequisites Grounding
                </h4>
                <p className="text-xs text-tx-secondary leading-relaxed">
                  Pathway steps are strictly sequenced according to academic prerequisite trees and concept dependencies.
                  Each completed milestone automatically unlocks subsequent advanced units.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create New Pathway */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-primary/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div
              className="w-full max-w-lg bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-heading font-bold text-base text-tx-primary">
                  Create Personal Learning Pathway
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-tx-secondary hover:text-tx-primary">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateNewPathway} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Select Target Competency
                  </label>
                  <select
                    value={targetCompId}
                    onChange={(e) => setTargetCompId(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  >
                    {competencies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.category} · Target L{c.targetLevel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Custom Pathway Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={pathwayTitle}
                    onChange={(e) => setPathwayTitle(e.target.value)}
                    placeholder="e.g., Mastery of Normalized Relational Database Design"
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Learning Goal Rationale
                  </label>
                  <textarea
                    rows={3}
                    value={pathwayDesc}
                    onChange={(e) => setPathwayDesc(e.target.value)}
                    placeholder="Describe what practical capabilities you are aiming to demonstrate..."
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-bg-main hover:bg-border text-tx-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-forest hover:bg-forest-dark text-white font-semibold"
                  >
                    Generate Structured Pathway
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
