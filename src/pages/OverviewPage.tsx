import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  BookOpen,
  Award,
  Layers,
  Target,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  Clock,
  Compass,
  FileCheck2,
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react';
import { PROFICIENCY_NAMES } from '../types';

export const OverviewPage: React.FC = () => {
  const {
    currentUser,
    selectedProgramId,
    selectedSemesterId,
    programs,
    semesters,
    courses,
    units,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    assessments,
    studentCompetencies,
    studentEvidence,
    pathways,
    activityLogs,
    getSkillGapAnalysis
  } = useAppStore();

  const activeProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const activeSemester = semesters.find((s) => s.id === selectedSemesterId) || semesters[0];

  // Actual calculated metrics
  const semesterCourses = courses.filter((c) => c.semesterId === selectedSemesterId);
  const semesterCourseIds = new Set(semesterCourses.map((c) => c.id));
  
  const semesterUnits = units.filter((u) => semesterCourseIds.has(u.courseId));
  const semesterUnitIds = new Set(semesterUnits.map((u) => u.id));

  const semesterTopics = topics.filter((t) => semesterUnitIds.has(t.unitId));
  const mappedTopicsCount = semesterTopics.filter((t) => t.isMapped).length;

  // Competency counts
  const strongCompetencies = studentCompetencies.filter((sc) => sc.currentDemonstratedLevel >= 4);
  const developingCompetencies = studentCompetencies.filter((sc) => sc.currentDemonstratedLevel === 2 || sc.currentDemonstratedLevel === 3);
  const unassessedCompetencies = competencies.filter(
    (c) => !studentCompetencies.some((sc) => sc.competencyId === c.id) ||
           studentCompetencies.find((sc) => sc.competencyId === c.id)?.status === 'unassessed'
  );
  const evidenceSupportedCount = studentCompetencies.filter((sc) => sc.evidenceCount > 0).length;

  const gaps = getSkillGapAnalysis();
  const attentionGaps = gaps.filter((g) => g.gapCategory === 'below_expected' || g.gapCategory === 'introduced_not_assessed');

  const gradedAssessments = assessments.filter((a) => a.status === 'graded');

  return (
    <div className="space-y-6">
      <Header
        title="Your Learning Overview"
        subtitle="Understand your curriculum, track your competencies, and plan what comes next."
        badge={activeSemester.label}
        actions={
          <NavLink
            to="/graph"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Graph</span>
          </NavLink>
        }
      />

      <div className="px-6 space-y-6">
        {/* Academic Program Banner */}
        <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forest-soft border border-forest/20 text-forest-dark flex items-center justify-center font-serif font-bold text-lg">
              {activeProgram.code.split('-')[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-sm text-tx-primary">
                  {activeProgram.name}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-forest-soft text-forest-dark font-medium">
                  {activeProgram.accreditationStatus}
                </span>
              </div>
              <div className="text-xs text-tx-secondary mt-0.5 font-mono">
                Student: {currentUser.name} ({currentUser.studentIdNumber}) · Department: Computer Science & Engineering
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono">
            <div className="px-3 py-1 bg-bg-main border border-border rounded-md">
              <span className="text-tx-secondary">Duration: </span>
              <span className="font-bold text-tx-primary">4 Years (164 Credits)</span>
            </div>
            <div className="px-3 py-1 bg-bg-main border border-border rounded-md">
              <span className="text-tx-secondary">Active Term: </span>
              <span className="font-bold text-forest">Sem 3</span>
            </div>
          </div>
        </div>

        {/* 6 Key Indicators from Real Records */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-[11px] font-mono text-tx-secondary uppercase tracking-wider">
              Active Subjects
            </div>
            <div className="text-2xl font-serif font-bold text-tx-primary mt-1">
              {semesterCourses.length}
            </div>
            <div className="text-[11px] text-tx-muted mt-1 font-mono">
              In Semester 3
            </div>
          </div>

          <div className="p-3.5 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-[11px] font-mono text-tx-secondary uppercase tracking-wider">
              Concepts Mapped
            </div>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {mappedTopicsCount} <span className="text-xs font-normal text-tx-muted font-sans">/ {semesterTopics.length}</span>
            </div>
            <div className="text-[11px] text-forest font-mono mt-1">
              {Math.round((mappedTopicsCount / Math.max(semesterTopics.length, 1)) * 100)}% coverage
            </div>
          </div>

          <div className="p-3.5 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-[11px] font-mono text-tx-secondary uppercase tracking-wider">
              Competencies
            </div>
            <div className="text-2xl font-serif font-bold text-tx-primary mt-1">
              {competencies.length}
            </div>
            <div className="text-[11px] text-tx-muted mt-1 font-mono">
              4 Framework categories
            </div>
          </div>

          <div className="p-3.5 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-[11px] font-mono text-tx-secondary uppercase tracking-wider">
              Evidence Verified
            </div>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {evidenceSupportedCount}
            </div>
            <div className="text-[11px] text-tx-muted mt-1 font-mono">
              Practical artifacts
            </div>
          </div>

          <div className="p-3.5 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-[11px] font-mono text-tx-secondary uppercase tracking-wider">
              Assessments
            </div>
            <div className="text-2xl font-serif font-bold text-tx-primary mt-1">
              {gradedAssessments.length} <span className="text-xs font-normal text-tx-muted font-sans">/ {assessments.length}</span>
            </div>
            <div className="text-[11px] text-tx-muted mt-1 font-mono">
              Rubrics graded
            </div>
          </div>

          <div className="p-3.5 bg-bg-surface border border-terracotta/40 rounded-xl shadow-subtle bg-terracotta-soft/20">
            <div className="text-[11px] font-mono text-terracotta uppercase tracking-wider font-semibold">
              Gaps Requiring Focus
            </div>
            <div className="text-2xl font-serif font-bold text-terracotta mt-1">
              {attentionGaps.length}
            </div>
            <div className="text-[11px] text-terracotta font-mono mt-1">
              Actionable pathways
            </div>
          </div>
        </div>

        {/* Attention Required Alerts */}
        {attentionGaps.length > 0 && (
          <div className="p-4 bg-terracotta-soft/50 border border-terracotta/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-terracotta-dark font-bold">
              <AlertTriangle className="w-4 h-4 text-terracotta" />
              <span>Attention Required · Curriculum Gaps & Missing Evidence</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-bg-surface border border-border rounded-lg text-xs">
                <div className="font-semibold text-tx-primary flex items-center justify-between">
                  <span>Relational Database Design (Level 4 Target)</span>
                  <span className="text-[10px] font-mono text-terracotta font-bold">Gap</span>
                </div>
                <p className="text-tx-secondary mt-1">
                  Demonstrated at Level 3 (Developing). Lacks verified BCNF project evidence. Midterm examination only tested 3NF.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-forest">Recommended: Complete CS301 BCNF project</span>
                  <NavLink to="/pathways" className="text-forest font-semibold hover:underline flex items-center gap-1">
                    Open Pathway <ArrowRight className="w-3 h-3" />
                  </NavLink>
                </div>
              </div>

              <div className="p-3 bg-bg-surface border border-border rounded-lg text-xs">
                <div className="font-semibold text-tx-primary flex items-center justify-between">
                  <span>Technical Documentation & Specifications</span>
                  <span className="text-[10px] font-mono text-terracotta font-bold">Needs Evidence</span>
                </div>
                <p className="text-tx-secondary mt-1">
                  Expected level is Level 3, but currently supported by only 1 early lab report. Needs Architectural Decision Record.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-forest">Course: CS301 / CS403</span>
                  <NavLink to="/evidence" className="text-forest font-semibold hover:underline flex items-center gap-1">
                    Add Evidence <ArrowRight className="w-3 h-3" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Two-Column Main Layout: Continue Learning & Competency Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Continue Learning */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-tx-primary">
                    Continue Learning
                  </h3>
                  <p className="text-xs text-tx-secondary">
                    Subjects currently active in your academic progression.
                  </p>
                </div>
                <NavLink to="/curriculum" className="text-xs font-mono text-forest hover:underline flex items-center gap-1">
                  <span>View All Semesters</span>
                  <ArrowRight className="w-3 h-3" />
                </NavLink>
              </div>

              <div className="space-y-3">
                {semesterCourses.map((course) => {
                  const courseUnits = units.filter((u) => u.courseId === course.id);
                  const courseOutcomes = learningOutcomes.filter((lo) => lo.courseId === course.id);
                  const courseMappings = mappings.filter((m) => m.courseId === course.id);
                  const courseCompIds = Array.from(new Set(courseMappings.map((m) => m.competencyId)));
                  const courseCompetencies = competencies.filter((c) => courseCompIds.includes(c.id));

                  return (
                    <div
                      key={course.id}
                      className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle hover:border-forest/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                              style={{ backgroundColor: `${course.color || '#315C46'}18`, color: course.color || '#315C46' }}
                            >
                              {course.code}
                            </span>
                            <span className="text-xs font-mono text-tx-secondary">
                              {course.credits} Credits · Instructor: {course.facultyName}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-base text-tx-primary">
                            {course.name}
                          </h4>
                          <p className="text-xs text-tx-secondary mt-1 leading-relaxed line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        <NavLink
                          to={`/courses/${course.id}`}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-bg-main hover:bg-forest-soft border border-border text-tx-primary transition-colors flex items-center gap-1.5 flex-shrink-0"
                        >
                          <span>Explore Subject</span>
                          <ArrowRight className="w-3 h-3" />
                        </NavLink>
                      </div>

                      {/* Course Indicators */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-border/70 text-xs">
                        <div>
                          <span className="text-tx-muted block text-[10px] font-mono">UNITS</span>
                          <span className="font-medium text-tx-primary">{courseUnits.length} Units</span>
                        </div>
                        <div>
                          <span className="text-tx-muted block text-[10px] font-mono">OUTCOMES</span>
                          <span className="font-medium text-tx-primary">{courseOutcomes.length} Course Outcomes</span>
                        </div>
                        <div>
                          <span className="text-tx-muted block text-[10px] font-mono">COMPETENCIES</span>
                          <span className="font-medium text-forest font-semibold">{courseCompetencies.length} Developed</span>
                        </div>
                        <div>
                          <span className="text-tx-muted block text-[10px] font-mono">NEXT RECOMMENDATION</span>
                          <span className="font-medium text-tx-primary truncate block">
                            {course.code === 'CS301' ? 'BCNF Tableaux Proof' : course.code === 'CS303' ? 'Dynamic Programming Lab' : 'Cache Line Trace'}
                          </span>
                        </div>
                      </div>

                      {/* Competency Badges Developed by this Subject */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                        <span className="text-[10px] font-mono text-tx-muted mr-1">Cultivates:</span>
                        {courseCompetencies.slice(0, 4).map((comp) => (
                          <span
                            key={comp.id}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main text-tx-primary border border-border flex items-center gap-1"
                          >
                            <Zap className="w-3 h-3 text-forest" />
                            {comp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Learning Pathways */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-tx-primary">
                    Your Learning Pathways
                  </h3>
                  <p className="text-xs text-tx-secondary">
                    Actionable roadmaps bridging diagnosed skill gaps into verified proficiency.
                  </p>
                </div>
                <NavLink to="/pathways" className="text-xs font-mono text-forest hover:underline flex items-center gap-1">
                  <span>Manage Pathways</span>
                  <ArrowRight className="w-3 h-3" />
                </NavLink>
              </div>

              <div className="space-y-3">
                {pathways.slice(0, 2).map((pathway) => {
                  const targetComp = competencies.find((c) => c.id === pathway.targetCompetencyId);
                  const completedSteps = pathway.steps.filter((s) => s.status === 'completed').length;
                  const percent = Math.round((completedSteps / Math.max(pathway.steps.length, 1)) * 100);

                  return (
                    <div
                      key={pathway.id}
                      className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-forest-soft text-forest-dark font-semibold">
                              Target: {targetComp?.name}
                            </span>
                            <span className="text-xs font-mono text-tx-secondary">
                              Target Date: {pathway.targetDate}
                            </span>
                          </div>
                          <h4 className="font-heading font-semibold text-sm text-tx-primary">
                            {pathway.title}
                          </h4>
                          <p className="text-xs text-tx-secondary mt-1">
                            {pathway.description}
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-mono text-xs font-bold text-forest">
                            {completedSteps}/{pathway.steps.length} Steps
                          </div>
                          <div className="text-[10px] text-tx-muted font-mono">{percent}% complete</div>
                        </div>
                      </div>

                      {/* Step Progress Bar */}
                      <div className="w-full bg-border h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-forest h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                      </div>

                      {/* Milestone List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-border/60">
                        {pathway.steps.slice(0, 2).map((step) => (
                          <div key={step.id} className="flex items-center gap-2 text-xs">
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                              step.status === 'completed'
                                ? 'bg-forest text-white'
                                : 'border border-border text-tx-muted'
                            }`}>
                              {step.status === 'completed' ? '✓' : '•'}
                            </span>
                            <span className="text-tx-primary truncate font-medium">{step.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Competency Snapshot & Recent Academic Activity */}
          <div className="lg:col-span-4 space-y-6">
            {/* Competency Snapshot */}
            <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-tx-primary">
                  Competency Snapshot
                </h3>
                <NavLink to="/competencies" className="text-xs font-mono text-forest hover:underline">
                  View All
                </NavLink>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-forest-soft/60 border border-forest/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-forest-dark">
                      Strong Competencies (Level 4-5)
                    </span>
                    <span className="font-mono text-xs font-bold text-forest-dark">
                      {strongCompetencies.length}
                    </span>
                  </div>
                  <div className="text-[11px] text-forest-dark/80 mt-1">
                    SQL Query Engineering, Data Structures, Programming Fundamentals
                  </div>
                </div>

                <div className="p-3 bg-amber-soft/50 border border-amber/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-900">
                      Developing (Level 2-3)
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-900">
                      {developingCompetencies.length}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-900/80 mt-1">
                    Database Design, Algorithm Optimization, Problem Solving
                  </div>
                </div>

                <div className="p-3 bg-bg-main border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-tx-secondary">
                      Unassessed / Elective
                    </span>
                    <span className="font-mono text-xs font-bold text-tx-secondary">
                      {unassessedCompetencies.length}
                    </span>
                  </div>
                  <div className="text-[11px] text-tx-muted mt-1">
                    API Design, Cloud Infrastructure, Security
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <NavLink
                  to="/graph"
                  className="w-full py-2 bg-forest text-white hover:bg-forest-dark text-xs font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore in Competency Graph</span>
                </NavLink>
              </div>
            </div>

            {/* Academic Activity Timeline */}
            <div className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-tx-primary">
                  Academic Activity
                </h3>
                <NavLink to="/history" className="text-xs font-mono text-forest hover:underline">
                  Full Log
                </NavLink>
              </div>

              <div className="space-y-3.5">
                {activityLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-forest mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-tx-primary">
                        {log.action}
                      </div>
                      <div className="text-[11px] text-tx-secondary truncate max-w-[220px]">
                        {log.targetName}
                      </div>
                      <div className="text-[10px] text-tx-muted font-mono mt-0.5">
                        {new Date(log.timestamp).toLocaleDateString()} · {log.actorName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

