import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  FileCheck2,
  CheckSquare,
  Clock,
  Award,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { AssessmentType, Assessment, ProficiencyLevel } from '../types';

export const AssessmentsPage: React.FC = () => {
  const {
    assessments,
    courses,
    competencies,
    learningOutcomes,
    submitEvidence,
    currentUser
  } = useAppStore();

  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const [selectedAsmForSubmission, setSelectedAsmForSubmission] = useState<Assessment | null>(null);
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [evidenceType, setEvidenceType] = useState<any>('github');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [targetCompId, setTargetCompId] = useState('');

  const filteredAssessments = assessments.filter((a) => {
    const matchesCourse = courseFilter === 'all' || a.courseId === courseFilter;
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    return matchesCourse && matchesType;
  });

  const handleOpenSubmission = (asm: Assessment) => {
    setSelectedAsmForSubmission(asm);
    setEvidenceTitle(`Submission: ${asm.title}`);
    setEvidenceDesc('');
    setEvidenceUrl('');
    setTargetCompId(asm.targetCompetencyIds[0] || competencies[0]?.id || '');
  };

  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsmForSubmission) return;

    submitEvidence({
      studentId: currentUser.id,
      title: evidenceTitle,
      description: evidenceDesc,
      competencyId: targetCompId || selectedAsmForSubmission.targetCompetencyIds[0],
      learningOutcomeId: selectedAsmForSubmission.learningOutcomeIds[0],
      courseId: selectedAsmForSubmission.courseId,
      assessmentId: selectedAsmForSubmission.id,
      evidenceType: evidenceType,
      urlOrContent: evidenceUrl || 'https://github.com/student/evidence-repo'
    });

    alert('Evidence successfully submitted! Faculty Dr. Evelyn Vance has been notified to evaluate against rubric criteria.');
    setSelectedAsmForSubmission(null);
  };

  return (
    <div className="space-y-6">
      <Header
        title="Coursework Assessments & Rubrics"
        subtitle="Transparent evaluation rubrics connecting exams, coding practicals, and projects to competencies."
        badge={`${assessments.length} Active Assessments`}
      />

      <div className="px-6 space-y-6">
        {/* Filter bar */}
        <div className="p-3 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
              <Filter className="w-3.5 h-3.5 text-forest" />
              <span>Filter:</span>
            </div>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Assessment Types</option>
              <option value="written_exam">Written Exam</option>
              <option value="programming_assignment">Programming Assignment</option>
              <option value="lab_practical">Lab Practical</option>
              <option value="project">Project Deliverable</option>
              <option value="viva">Viva Voce</option>
            </select>
          </div>

          <div className="text-xs font-mono text-tx-secondary">
            Showing {filteredAssessments.length} assessment records
          </div>
        </div>

        {/* Assessments List */}
        <div className="space-y-4">
          {filteredAssessments.map((asm) => {
            const course = courses.find((c) => c.id === asm.courseId);
            const targetComps = competencies.filter((c) => asm.targetCompetencyIds.includes(c.id));
            const outcomes = learningOutcomes.filter((lo) => asm.learningOutcomeIds.includes(lo.id));

            return (
              <div
                key={asm.id}
                className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle hover:border-forest/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-forest-soft text-forest-dark">
                        {course?.code}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-softYellow text-amber-900 font-bold">
                        {asm.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono text-tx-secondary">
                        Due: {asm.deadline}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-tx-primary mt-1">
                      {asm.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                      <span className="text-tx-muted font-mono">Assesses:</span>
                      {targetComps.map((comp) => (
                        <span key={comp.id} className="font-mono text-[11px] font-semibold text-forest flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {comp.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-start flex-shrink-0">
                    <div className="text-right font-mono text-xs">
                      <span className="text-tx-muted block text-[10px]">MAX MARKS</span>
                      <span className="font-bold text-tx-primary">{asm.maxScore}</span>
                    </div>
                    <button
                      onClick={() => handleOpenSubmission(asm)}
                      className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Submit Artifact</span>
                    </button>
                  </div>
                </div>

                {/* Rubric Criteria Grid */}
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="text-xs font-mono uppercase text-tx-muted mb-2 font-medium">
                    Grading Rubric Criteria ({asm.rubric.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {asm.rubric.map((r) => (
                      <div key={r.id} className="p-3 bg-bg-main border border-border rounded-lg text-xs">
                        <div className="flex items-center justify-between font-semibold text-tx-primary mb-1">
                          <span>{r.criterion}</span>
                          <span className="font-mono text-forest">{r.weight}%</span>
                        </div>
                        <p className="text-[11px] text-tx-secondary leading-snug">
                          {r.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Submit Evidence Artifact */}
        {selectedAsmForSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-primary/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div
              className="w-full max-w-lg bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-[10px] uppercase font-mono text-forest font-bold">
                    Submit Evidence for
                  </span>
                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    {selectedAsmForSubmission.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAsmForSubmission(null)}
                  className="text-tx-secondary hover:text-tx-primary"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEvidenceSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Artifact / Evidence Title
                  </label>
                  <input
                    type="text"
                    required
                    value={evidenceTitle}
                    onChange={(e) => setEvidenceTitle(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">
                      Evidence Type
                    </label>
                    <select
                      value={evidenceType}
                      onChange={(e) => setEvidenceType(e.target.value)}
                      className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                    >
                      <option value="github">GitHub Repository</option>
                      <option value="live_demo">Live Deployment Link</option>
                      <option value="report_pdf">Engineering Report (PDF)</option>
                      <option value="presentation">Presentation Slides</option>
                      <option value="lab_record">Lab Execution Log</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">
                      Primary Competency
                    </label>
                    <select
                      value={targetCompId}
                      onChange={(e) => setTargetCompId(e.target.value)}
                      className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                    >
                      {competencies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Repository URL / Storage Link
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-username/project-repository"
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Executive Summary of Demonstration
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explain how your project fulfills the rubric criteria and proves your mastery..."
                    value={evidenceDesc}
                    onChange={(e) => setEvidenceDesc(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAsmForSubmission(null)}
                    className="px-4 py-2 rounded-md bg-bg-main hover:bg-border text-tx-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-forest hover:bg-forest-dark text-white font-semibold"
                  >
                    Submit for Evaluation
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

