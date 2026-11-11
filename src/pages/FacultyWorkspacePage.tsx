import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  School,
  Layers,
  Award,
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import {
  CurriculumMapping,
  MappingRelationship,
  ProficiencyLevel,
  StudentEvidence
} from '../types';

export const FacultyWorkspacePage: React.FC = () => {
  const {
    courses,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    studentEvidence,
    batchSetMapping,
    reviewEvidence,
    currentUser
  } = useAppStore();

  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-cs301');
  const [evaluatingEvidence, setEvaluatingEvidence] = useState<StudentEvidence | null>(null);

  // Review modal state
  const [rubricScore, setRubricScore] = useState<number>(90);
  const [verifiedProficiency, setVerifiedProficiency] = useState<ProficiencyLevel>(4);
  const [facultyFeedback, setFacultyFeedback] = useState<string>(
    'Solid normalization proof. The lossless decomposition into BCNF satisfies the highest rigor.'
  );

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const courseTopics = topics.filter((t) => t.courseId === activeCourse.id);
  const courseOutcomes = learningOutcomes.filter((lo) => lo.courseId === activeCourse.id);
  const courseMappings = mappings.filter((m) => m.courseId === activeCourse.id);

  // Coverage statistics
  const totalTopics = courseTopics.length;
  const mappedTopics = courseTopics.filter((t) => t.isMapped).length;
  const unmappedTopics = totalTopics - mappedTopics;
  const coveragePercent = Math.round((mappedTopics / Math.max(totalTopics, 1)) * 100);

  // Pending evidence submissions across this course or all
  const pendingEvidence = studentEvidence.filter((e) => e.reviewStatus === 'pending');

  const handleCellChange = (
    topicId: string,
    outcomeId: string,
    competencyId: string,
    value: string
  ) => {
    if (value === 'none') return;
    const relationship = value as MappingRelationship;
    batchSetMapping(
      activeCourse.id,
      topicId,
      outcomeId,
      competencyId,
      relationship,
      4
    );
  };

  const handleGradeEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingEvidence) return;

    reviewEvidence(evaluatingEvidence.id, {
      reviewStatus: 'verified',
      score: rubricScore,
      feedback: facultyFeedback,
      verifiedLevel: verifiedProficiency,
      reviewerName: currentUser.name || 'Dr. Evelyn Vance'
    });

    alert(`Evidence verified! Aarav Sharma's demonstrated competency has been updated.`);
    setEvaluatingEvidence(null);
  };

  return (
    <div className="space-y-6">
      <Header
        title="Faculty Curriculum Workspace & Review"
        subtitle="Manage course-to-competency matrices, audit curriculum coverage, and evaluate student practical evidence against rubrics."
        badge={`${coveragePercent}% Mapped`}
        actions={
          <NavLink
            to="/curriculum-builder"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Syllabus Importer</span>
          </NavLink>
        }
      />

      <div className="px-6 space-y-6">
        {/* Coverage Analytics Overview Bar */}
        <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="text-xs font-mono uppercase text-forest font-semibold mb-1">
                Active Subject Under Review
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="font-heading font-bold text-base text-tx-primary bg-bg-main border border-border rounded-md px-3 py-1.5 focus:outline-none focus:border-forest"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}: {c.name} ({c.credits} Credits)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">TOTAL TOPICS</span>
                <span className="font-bold text-tx-primary">{totalTopics}</span>
              </div>
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">MAPPED</span>
                <span className="font-bold text-forest">{mappedTopics}</span>
              </div>
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">UNMAPPED GAPS</span>
                <span className="font-bold text-terracotta">{unmappedTopics}</span>
              </div>
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
            <span className="font-mono text-tx-muted text-[11px] uppercase font-medium">
              Accreditation Validation:
            </span>
            <span className="flex items-center gap-1 text-forest font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Course Outcomes Defined ({courseOutcomes.length})
            </span>
            <span className="flex items-center gap-1 text-forest font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Rubric Assessments Linked
            </span>
            {unmappedTopics > 0 ? (
              <span className="flex items-center gap-1 text-terracotta font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                {unmappedTopics} Syllabus topic without competency linkage
              </span>
            ) : (
              <span className="flex items-center gap-1 text-forest font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Topics Mapped
              </span>
            )}
          </div>
        </div>

        {/* Pending Evidence Review Queue */}
        <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-bold text-base text-tx-primary">
                Student Evidence Submissions Awaiting Evaluation
              </h3>
              <p className="text-xs text-tx-secondary">
                Grade student projects against rubrics to verify their demonstrated competency levels.
              </p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-soft text-amber-900 font-bold">
              {pendingEvidence.length} Pending Review
            </span>
          </div>

          {pendingEvidence.length === 0 ? (
            <div className="p-6 text-center text-xs text-tx-secondary bg-bg-main rounded-lg border border-border">
              All student evidence submissions have been reviewed and verified.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEvidence.map((evi) => {
                const comp = competencies.find((c) => c.id === evi.competencyId);
                return (
                  <div
                    key={evi.id}
                    className="p-4 bg-bg-main border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-amber text-white font-bold">
                          Pending Review
                        </span>
                        <span className="text-xs font-mono text-tx-secondary">
                          Student: Aarav Sharma (22BCSE104) · Submitted: {evi.submittedAt}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-tx-primary">
                        {evi.title}
                      </h4>
                      <p className="text-xs text-tx-secondary mt-1">
                        {evi.description}
                      </p>
                      <div className="text-xs font-mono text-forest mt-1">
                        Targeting Competency: {comp?.name} (Target Level {comp?.targetLevel})
                      </div>
                    </div>

                    <button
                      onClick={() => setEvaluatingEvidence(evi)}
                      className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-subtle flex-shrink-0"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Evaluate Rubric</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Course-to-Competency Mapping Matrix */}
        <div className="bg-bg-surface border border-border rounded-xl shadow-subtle p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base text-tx-primary">
                Interactive Curriculum Mapping Matrix
              </h3>
              <p className="text-xs text-tx-secondary">
                Directly map {activeCourse.code} topics (rows) to competency framework capabilities (columns).
              </p>
            </div>
            <span className="text-xs font-mono text-tx-secondary">
              Changes auto-persist to institutional records
            </span>
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-bg-main text-tx-secondary font-mono text-[10px] uppercase border-b border-border">
                <tr>
                  <th className="py-3 px-3 min-w-[200px]">Course Topic / Concept</th>
                  {competencies.slice(0, 6).map((c) => (
                    <th key={c.id} className="py-3 px-3 text-center min-w-[130px]">
                      <div className="truncate font-semibold text-tx-primary">{c.name}</div>
                      <div className="text-[9px] text-tx-muted font-normal lowercase">{c.category}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courseTopics.map((topic) => {
                  const defaultOutcome = courseOutcomes[0]?.id || 'lo-cs301-co1';
                  return (
                    <tr key={topic.id} className="hover:bg-bg-main/50">
                      <td className="py-3 px-3 font-medium text-tx-primary">
                        <div>{topic.title}</div>
                        <span className="text-[10px] text-tx-muted font-mono">{topic.hours} hrs · {topic.difficulty}</span>
                      </td>

                      {competencies.slice(0, 6).map((comp) => {
                        const existingMap = courseMappings.find(
                          (m) => m.topicId === topic.id && m.competencyId === comp.id
                        );
                        const rel = existingMap?.relationship || 'none';

                        return (
                          <td key={comp.id} className="py-3 px-2 text-center">
                            <select
                              value={rel}
                              onChange={(e) =>
                                handleCellChange(topic.id, defaultOutcome, comp.id, e.target.value)
                              }
                              className={`text-[10px] font-mono px-2 py-1 rounded border focus:outline-none ${
                                rel === 'assesses'
                                  ? 'bg-amber text-white font-bold border-amber-600'
                                  : rel === 'develops'
                                  ? 'bg-forest text-white font-bold border-forest-dark'
                                  : rel === 'introduces'
                                  ? 'bg-infoBlue text-white font-medium border-infoBlue-dark'
                                  : rel === 'reinforces'
                                  ? 'bg-terracotta text-white font-medium border-terracotta-dark'
                                  : 'bg-bg-main text-tx-muted border-border'
                              }`}
                            >
                              <option value="none">— None —</option>
                              <option value="introduces">Introduces</option>
                              <option value="develops">Develops</option>
                              <option value="reinforces">Reinforces</option>
                              <option value="assesses">Assesses</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Faculty Evidence Rubric Evaluation */}
        {evaluatingEvidence && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-primary/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div
              className="w-full max-w-lg bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-[10px] uppercase font-mono text-forest font-bold">
                    Faculty Evaluation Rubric
                  </span>
                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    {evaluatingEvidence.title}
                  </h3>
                </div>
                <button
                  onClick={() => setEvaluatingEvidence(null)}
                  className="text-tx-secondary hover:text-tx-primary"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleGradeEvidence} className="space-y-4 text-xs">
                <div className="p-3 bg-bg-main border border-border rounded-lg">
                  <div className="text-[10px] font-mono text-tx-muted uppercase">Student Description</div>
                  <p className="text-tx-primary mt-1">{evaluatingEvidence.description}</p>
                  <a
                    href={evaluatingEvidence.urlOrContent}
                    target="_blank"
                    rel="noreferrer"
                    className="text-forest hover:underline text-[11px] font-mono mt-2 block"
                  >
                    Open artifact repository ↗
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">
                      Assigned Score (Max 100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={rubricScore}
                      onChange={(e) => setRubricScore(Number(e.target.value))}
                      className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary font-mono focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">
                      Verified Proficiency Level
                    </label>
                    <select
                      value={verifiedProficiency}
                      onChange={(e) => setVerifiedProficiency(Number(e.target.value) as any)}
                      className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                    >
                      <option value={1}>Level 1: Awareness</option>
                      <option value={2}>Level 2: Foundational</option>
                      <option value={3}>Level 3: Developing</option>
                      <option value={4}>Level 4: Proficient</option>
                      <option value={5}>Level 5: Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">
                    Faculty Evaluation Feedback & Comments
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={facultyFeedback}
                    onChange={(e) => setFacultyFeedback(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded-md text-tx-primary focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEvaluatingEvidence(null)}
                    className="px-4 py-2 rounded-md bg-bg-main hover:bg-border text-tx-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-forest hover:bg-forest-dark text-white font-semibold"
                  >
                    Submit & Update Competency Record
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

