import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import { Target, Filter, BookOpen, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BloomsTaxonomy } from '../types';

export const OutcomesPage: React.FC = () => {
  const { learningOutcomes, courses, mappings, competencies, assessments } = useAppStore();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('all');
  const [selectedBloom, setSelectedBloom] = useState<string>('all');

  const filteredOutcomes = learningOutcomes.filter((lo) => {
    const matchesCourse = selectedCourseId === 'all' || lo.courseId === selectedCourseId;
    const matchesBloom = selectedBloom === 'all' || lo.bloomsLevel === selectedBloom;
    return matchesCourse && matchesBloom;
  });

  return (
    <div className="space-y-6">
      <Header
        title="Course Learning Outcomes (CLOs)"
        subtitle="Explore programmatic learning objectives classified across Bloom's Taxonomy and linked to real competencies."
        badge={`${learningOutcomes.length} Formulated Outcomes`}
      />

      <div className="px-6 space-y-6">
        {/* Filters */}
        <div className="p-3 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
              <Filter className="w-3.5 h-3.5 text-forest" />
              <span>Filters:</span>
            </div>

            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Subjects</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}: {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedBloom}
              onChange={(e) => setSelectedBloom(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Bloom's Taxonomy Levels</option>
              <option value="remember">Remember</option>
              <option value="understand">Understand</option>
              <option value="apply">Apply</option>
              <option value="analyze">Analyze</option>
              <option value="evaluate">Evaluate</option>
              <option value="create">Create</option>
            </select>
          </div>

          <div className="text-xs font-mono text-tx-secondary">
            Showing {filteredOutcomes.length} outcomes
          </div>
        </div>

        {/* Outcomes List */}
        <div className="space-y-3">
          {filteredOutcomes.map((outcome) => {
            const course = courses.find((c) => c.id === outcome.courseId);
            const outcomeMappings = mappings.filter((m) => m.learningOutcomeId === outcome.id);
            const compIds = Array.from(new Set(outcomeMappings.map((m) => m.competencyId)));
            const relatedComps = competencies.filter((c) => compIds.includes(c.id));
            const relatedAssessments = assessments.filter((a) => a.learningOutcomeIds.includes(outcome.id));

            return (
              <div
                key={outcome.id}
                className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle hover:border-forest/40 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-forest bg-forest-soft px-2 py-0.5 rounded">
                      {outcome.code}
                    </span>
                    <span className="text-xs font-mono text-tx-secondary">
                      {course?.code} — {course?.name}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-infoBlue-soft text-infoBlue-dark font-semibold border border-infoBlue/30 self-start sm:self-auto">
                    Bloom's Taxonomy: {outcome.bloomsLevel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-tx-primary leading-relaxed">
                  {outcome.statement}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-tx-muted uppercase block mb-1">
                      Targeted Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedComps.length === 0 ? (
                        <span className="text-tx-muted text-[11px] font-mono">No direct competency mappings</span>
                      ) : (
                        relatedComps.map((c) => (
                          <span key={c.id} className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-main border border-border text-tx-primary">
                            {c.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-tx-muted uppercase block mb-1">
                      Assessed Through:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedAssessments.length === 0 ? (
                        <span className="text-amber-700 text-[11px] font-mono font-semibold">
                          ⚠ Needs linked evaluation rubric
                        </span>
                      ) : (
                        relatedAssessments.map((a) => (
                          <span key={a.id} className="text-[10px] font-mono px-2 py-0.5 rounded bg-softYellow text-amber-900 border border-amber/30">
                            {a.title}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

