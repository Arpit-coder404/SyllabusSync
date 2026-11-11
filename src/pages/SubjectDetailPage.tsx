import React, { useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  BookOpen,
  Layers,
  Award,
  Target,
  CheckSquare,
  FileText,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  GraduationCap
} from 'lucide-react';

export const SubjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    courses,
    units,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    assessments,
    studentEvidence
  } = useAppStore();

  const course = courses.find((c) => c.id === id) || courses[6]; // default to CS301 Database Systems

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'concepts' | 'competencies' | 'assessments' | 'resources'>('overview');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-cs301-u1': true,
    'unit-cs301-u3': true
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  // Associated entities for this course
  const courseUnits = units.filter((u) => u.courseId === course.id);
  const courseTopics = topics.filter((t) => t.courseId === course.id);
  const courseOutcomes = learningOutcomes.filter((lo) => lo.courseId === course.id);
  const courseMappings = mappings.filter((m) => m.courseId === course.id);
  const courseAssessments = assessments.filter((a) => a.courseId === course.id);
  const courseEvidence = studentEvidence.filter((e) => e.courseId === course.id);

  const compIds = Array.from(new Set(courseMappings.map((m) => m.competencyId)));
  const courseCompetencies = competencies.filter((c) => compIds.includes(c.id));

  // Prerequisite course objects
  const prereqCourses = courses.filter((c) => course.prerequisiteCourseIds.includes(c.id));

  return (
    <div className="space-y-6">
      <Header
        title={`${course.code} — ${course.name}`}
        subtitle={`${course.credits} Credits · Department of Computer Science & Engineering · Faculty: ${course.facultyName}`}
        badge={`Semester ${course.semesterId === 'sem-1' ? 1 : course.semesterId === 'sem-2' ? 2 : course.semesterId === 'sem-3' ? 3 : 4}`}
        actions={
          <button
            onClick={() => navigate(`/graph?course=${course.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>View in Graph</span>
          </button>
        }
      />

      <div className="px-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border overflow-x-auto pb-0 text-xs font-medium">
          {[
            { key: 'overview', label: '1. Overview', icon: BookOpen },
            { key: 'syllabus', label: `2. Syllabus & Units (${courseUnits.length})`, icon: Layers },
            { key: 'concepts', label: `3. Concepts & Topics (${courseTopics.length})`, icon: FileText },
            { key: 'competencies', label: `4. Competencies (${courseCompetencies.length})`, icon: Award },
            { key: 'assessments', label: `5. Assessments (${courseAssessments.length})`, icon: CheckSquare },
            { key: 'resources', label: `6. Evidence & Resources (${courseEvidence.length})`, icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-forest text-forest font-bold bg-forest-soft/30'
                    : 'border-transparent text-tx-secondary hover:text-tx-primary hover:border-border'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8 cols): Subject Summary */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
                  <h3 className="font-heading font-bold text-base text-tx-primary mb-2">
                    Subject Overview & Objectives
                  </h3>
                  <p className="text-xs sm:text-sm text-tx-secondary leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-border text-xs">
                    <div className="p-3 bg-bg-main rounded-lg border border-border">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">Credits</span>
                      <span className="font-bold text-tx-primary">{course.credits} Academic Credits</span>
                    </div>
                    <div className="p-3 bg-bg-main rounded-lg border border-border">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">Units</span>
                      <span className="font-bold text-tx-primary">{courseUnits.length} Structured Units</span>
                    </div>
                    <div className="p-3 bg-bg-main rounded-lg border border-border">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">Contact Hours</span>
                      <span className="font-bold text-tx-primary">48 Lecture / Lab Hours</span>
                    </div>
                    <div className="p-3 bg-bg-main rounded-lg border border-border">
                      <span className="text-[10px] text-tx-muted uppercase font-mono block">Accreditation</span>
                      <span className="font-bold text-forest">Tier-1 NBA / ABET</span>
                    </div>
                  </div>
                </div>

                {/* Course Learning Outcomes (COs) */}
                <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-base text-tx-primary">
                      Course Learning Outcomes (CLOs)
                    </h3>
                    <span className="text-xs font-mono text-tx-secondary">
                      {courseOutcomes.length} Defined Outcomes
                    </span>
                  </div>

                  <div className="space-y-3">
                    {courseOutcomes.map((co) => (
                      <div key={co.id} className="p-4 bg-bg-main border border-border rounded-lg text-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono font-bold text-forest text-sm">
                            {co.code}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-infoBlue-soft text-infoBlue-dark font-medium border border-infoBlue/20">
                            Bloom: {co.bloomsLevel}
                          </span>
                        </div>
                        <p className="text-tx-primary text-xs leading-relaxed font-medium">
                          {co.statement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Prerequisites & Faculty Info */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                  <h3 className="font-heading font-bold text-sm text-tx-primary mb-3">
                    Prerequisites & Progression Chain
                  </h3>
                  {prereqCourses.length === 0 ? (
                    <div className="text-xs text-tx-muted">No prior formal course prerequisites required.</div>
                  ) : (
                    <div className="space-y-2">
                      {prereqCourses.map((pr) => (
                        <NavLink
                          key={pr.id}
                          to={`/courses/${pr.id}`}
                          className="p-3 bg-bg-main hover:bg-forest-soft/50 border border-border rounded-lg flex items-center justify-between transition-colors block text-xs"
                        >
                          <div>
                            <span className="font-mono font-bold text-forest">{pr.code}</span>
                            <div className="font-medium text-tx-primary">{pr.name}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-tx-muted" />
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                  <h3 className="font-heading font-bold text-sm text-tx-primary mb-3">
                    Course Faculty & Coordination
                  </h3>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                      alt={course.facultyName}
                      className="w-10 h-10 rounded-full border border-border object-cover"
                    />
                    <div>
                      <div className="font-heading font-bold text-xs text-tx-primary">
                        {course.facultyName}
                      </div>
                      <div className="text-[11px] text-tx-secondary">
                        Associate Professor, CSE
                      </div>
                      <div className="text-[10px] font-mono text-forest mt-0.5">
                        Office: Turing Hall Room 304
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SYLLABUS & UNITS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-tx-primary">
                  Syllabus Units & Module Breakdown
                </h3>
                <p className="text-xs text-tx-secondary">
                  Each unit details estimated teaching hours, core concepts, prerequisites, and competency linkages.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {courseUnits.map((unit) => {
                const unitTopics = topics.filter((t) => t.unitId === unit.id);
                const isExpanded = Boolean(expandedUnits[unit.id]);
                const totalHours = unitTopics.reduce((acc, t) => acc + t.hours, 0);

                return (
                  <div
                    key={unit.id}
                    className="bg-bg-surface border border-border rounded-xl shadow-subtle overflow-hidden"
                  >
                    <div
                      onClick={() => toggleUnit(unit.id)}
                      className="p-4 cursor-pointer hover:bg-bg-main/50 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-md bg-forest text-white font-mono font-bold text-xs flex items-center justify-center">
                          U{unit.unitNumber}
                        </span>
                        <div>
                          <h4 className="font-heading font-bold text-sm text-tx-primary">
                            Unit {unit.unitNumber}: {unit.title}
                          </h4>
                          <span className="text-[11px] font-mono text-tx-secondary">
                            {unit.estimatedHours} Lecture Hours · {unitTopics.length} Syllabus Topics
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-tx-muted" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-tx-muted" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 border-t border-border bg-bg-main/30 space-y-4">
                        <p className="text-xs text-tx-secondary leading-relaxed">
                          {unit.description}
                        </p>

                        <div className="space-y-2">
                          <div className="text-[11px] font-mono uppercase text-tx-muted font-medium">
                            Topics & Practical Exercises:
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {unitTopics.map((topic) => (
                              <div
                                key={topic.id}
                                className="p-3 bg-bg-surface border border-border rounded-lg text-xs"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-tx-primary">{topic.title}</span>
                                  <span className="font-mono text-[10px] text-tx-secondary">{topic.hours} hrs</span>
                                </div>
                                <p className="text-[11px] text-tx-secondary leading-tight line-clamp-2">
                                  {topic.description}
                                </p>
                                <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                                  <span className="text-tx-muted capitalize">Diff: {topic.difficulty}</span>
                                  <span className={topic.isMapped ? 'text-forest font-semibold' : 'text-terracotta font-bold'}>
                                    {topic.isMapped ? '✓ Competency Linked' : '⚠ Unmapped Gap'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CONCEPTS & TOPICS */}
        {activeTab === 'concepts' && (
          <div className="bg-bg-surface border border-border rounded-xl shadow-subtle overflow-hidden p-5">
            <h3 className="font-heading font-bold text-base text-tx-primary mb-1">
              Curriculum Concepts & Topics Index
            </h3>
            <p className="text-xs text-tx-secondary mb-4">
              All concepts taught in {course.code} with estimated teaching hours, difficulty ratings, and mapping status.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-bg-main text-tx-secondary font-mono uppercase text-[10px] border-b border-border">
                  <tr>
                    <th className="py-2.5 px-3">Topic Title</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Hours</th>
                    <th className="py-2.5 px-3">Difficulty</th>
                    <th className="py-2.5 px-3">Mapping Status</th>
                    <th className="py-2.5 px-3">Linked Competency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {courseTopics.map((topic) => {
                    const unit = units.find((u) => u.id === topic.unitId);
                    const mapping = mappings.find((m) => m.topicId === topic.id);
                    const comp = mapping ? competencies.find((c) => c.id === mapping.competencyId) : null;

                    return (
                      <tr key={topic.id} className="hover:bg-bg-main/50">
                        <td className="py-3 px-3 font-medium text-tx-primary">{topic.title}</td>
                        <td className="py-3 px-3 font-mono text-tx-secondary">Unit {unit?.unitNumber}</td>
                        <td className="py-3 px-3 font-mono text-tx-secondary">{topic.hours}h</td>
                        <td className="py-3 px-3 font-mono capitalize">{topic.difficulty}</td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            topic.isMapped ? 'bg-forest-soft text-forest-dark font-medium' : 'bg-terracotta-soft text-terracotta font-bold'
                          }`}>
                            {topic.isMapped ? 'Mapped' : 'Unmapped'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-forest">
                          {comp ? comp.name : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COMPETENCIES DEVELOPED */}
        {activeTab === 'competencies' && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-tx-primary">
              Competencies Cultivated by {course.code}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseCompetencies.map((comp) => {
                const mapForThis = courseMappings.find((m) => m.competencyId === comp.id);
                return (
                  <div key={comp.id} className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                          {mapForThis?.relationship.toUpperCase()}
                        </span>
                        <ProficiencyBadge level={mapForThis?.expectedProficiency || comp.targetLevel} />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-tx-primary">
                        {comp.name}
                      </h4>
                      <p className="text-xs text-tx-secondary mt-1 leading-relaxed">
                        {comp.description}
                      </p>
                      <div className="p-2.5 bg-bg-main border border-border rounded-lg mt-3 text-xs">
                        <span className="text-[10px] font-mono uppercase text-tx-muted block">Mapping Rationale:</span>
                        <span className="text-tx-primary text-[11px] leading-tight block mt-0.5">
                          {mapForThis?.rationale || 'Direct curriculum requirement.'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <NavLink
                        to={`/competencies?id=${comp.id}`}
                        className="text-xs font-semibold text-forest hover:underline flex items-center gap-1"
                      >
                        <span>View Competency Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: ASSESSMENTS */}
        {activeTab === 'assessments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-tx-primary">
                  Evaluations & Assessment Rubrics
                </h3>
                <p className="text-xs text-tx-secondary">
                  How skills in {course.code} are demonstrated through practical examinations, projects, and viva voce.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {courseAssessments.map((asm) => (
                <div key={asm.id} className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-softYellow text-amber-900 font-bold">
                        {asm.type.replace('_', ' ')}
                      </span>
                      <h4 className="font-heading font-bold text-base text-tx-primary mt-1.5">
                        {asm.title}
                      </h4>
                      <div className="text-xs font-mono text-tx-secondary mt-1">
                        Max Score: {asm.maxScore} · Due: {asm.deadline} · Status: <span className="font-bold text-forest capitalize">{asm.status}</span>
                      </div>
                    </div>
                    <NavLink
                      to="/assessments"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white shadow-subtle"
                    >
                      Submit Evidence
                    </NavLink>
                  </div>

                  {/* Rubric Table */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="text-xs font-mono uppercase text-tx-muted mb-2 font-medium">
                      Grading Rubric Criteria ({asm.rubric.length})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {asm.rubric.map((r) => (
                        <div key={r.id} className="p-3 bg-bg-main border border-border rounded-lg text-xs">
                          <div className="flex items-center justify-between font-semibold text-tx-primary">
                            <span>{r.criterion}</span>
                            <span className="font-mono text-forest">{r.weight}%</span>
                          </div>
                          <p className="text-[11px] text-tx-secondary mt-1 leading-snug">
                            {r.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: RESOURCES & EVIDENCE */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-tx-primary">
              Student Evidence & Practical Artifacts for {course.code}
            </h3>
            {courseEvidence.length === 0 ? (
              <div className="p-8 text-center bg-bg-surface border border-border rounded-xl text-xs text-tx-secondary">
                No verified practical evidence records submitted yet for this course.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseEvidence.map((evi) => (
                  <div key={evi.id} className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                        {evi.evidenceType.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono font-bold text-forest">
                        Score: {evi.score}/100
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-tx-primary">
                      {evi.title}
                    </h4>
                    <p className="text-xs text-tx-secondary mt-1 leading-relaxed">
                      {evi.description}
                    </p>
                    {evi.feedback && (
                      <div className="mt-3 p-2.5 bg-bg-main border border-border rounded-lg text-[11px] text-tx-primary">
                        <span className="font-semibold text-forest block">Faculty Feedback:</span>
                        "{evi.feedback}"
                      </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-mono text-tx-muted">Verified by {evi.reviewerName}</span>
                      <a
                        href={evi.urlOrContent}
                        target="_blank"
                        rel="noreferrer"
                        className="text-forest hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>Open Artifact</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

