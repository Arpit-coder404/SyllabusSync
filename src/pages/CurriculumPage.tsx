import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  BookOpen,
  Layers,
  Award,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react';

export const CurriculumPage: React.FC = () => {
  const {
    programs,
    selectedProgramId,
    semesters,
    selectedSemesterId,
    selectSemester,
    courses,
    units,
    learningOutcomes,
    mappings,
    competencies
  } = useAppStore();

  const [activeSemFilter, setActiveSemFilter] = useState<string>(selectedSemesterId);
  const [searchTerm, setSearchTerm] = useState('');

  const activeProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];

  const filteredCourses = courses.filter((c) => {
    const matchesSem = activeSemFilter === 'all' || c.semesterId === activeSemFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Header
        title="Curriculum Explorer"
        subtitle="Browse your degree structure, semester subjects, unit syllabi, and competency connections."
        badge={`${courses.length} Accredited Subjects`}
        actions={
          <NavLink
            to="/curriculum-builder"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Builder</span>
          </NavLink>
        }
      />

      <div className="px-6 space-y-6">
        {/* Degree Program Meta Header */}
        <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-semibold">
                  {activeProgram.degree}
                </span>
                <span className="text-xs font-mono text-tx-secondary">
                  {activeProgram.accreditationStatus}
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl text-tx-primary">
                {activeProgram.name}
              </h2>
              <p className="text-xs text-tx-secondary mt-1 max-w-3xl leading-relaxed">
                {activeProgram.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 self-start md:self-auto text-xs font-mono">
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">DURATION</span>
                <span className="font-bold text-tx-primary">{activeProgram.durationYears} Years</span>
              </div>
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">SEMESTERS</span>
                <span className="font-bold text-tx-primary">{activeProgram.totalSemesters} Terms</span>
              </div>
              <div className="p-2.5 bg-bg-main border border-border rounded-lg text-center">
                <span className="text-tx-muted block text-[10px]">CREDITS</span>
                <span className="font-bold text-forest">{activeProgram.creditsRequired} Credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Semester Progression Navigation Timeline */}
        <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="text-xs font-mono uppercase tracking-wider text-tx-muted mb-3 font-medium flex items-center justify-between">
            <span>Academic Progression Timeline</span>
            <span className="text-forest font-semibold">Current Term: Semester 3</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => setActiveSemFilter('all')}
              className={`p-3 rounded-lg border text-left transition-all ${
                activeSemFilter === 'all'
                  ? 'bg-forest text-white border-forest shadow-xs'
                  : 'bg-bg-main border-border text-tx-primary hover:border-forest/40'
              }`}
            >
              <div className="text-[10px] uppercase font-mono opacity-80">All Semesters</div>
              <div className="font-heading font-bold text-xs mt-0.5">Complete Degree</div>
              <div className="text-[10px] opacity-80 mt-1 font-mono">{courses.length} Total Subjects</div>
            </button>

            {semesters.map((sem) => {
              const semCoursesCount = courses.filter((c) => c.semesterId === sem.id).length;
              const isSelected = activeSemFilter === sem.id;
              return (
                <button
                  key={sem.id}
                  onClick={() => {
                    setActiveSemFilter(sem.id);
                    selectSemester(sem.id);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-forest text-white border-forest shadow-xs'
                      : 'bg-bg-main border-border text-tx-primary hover:border-forest/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono opacity-80">
                      Term {sem.semesterNumber}
                    </span>
                    {sem.isCurrent && (
                      <span className={`text-[8px] uppercase font-mono px-1 rounded ${
                        isSelected ? 'bg-white text-forest font-bold' : 'bg-forest text-white'
                      }`}>
                        Active
                      </span>
                    )}
                  </div>
                  <div className="font-heading font-bold text-xs mt-0.5 truncate">
                    {sem.label.split('(')[0]}
                  </div>
                  <div className="text-[10px] opacity-80 mt-1 font-mono">
                    {semCoursesCount} Subjects · {sem.academicYear}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-tx-primary">
                {activeSemFilter === 'all' ? 'All Degree Courses' : semesters.find((s) => s.id === activeSemFilter)?.label}
              </h3>
              <p className="text-xs text-tx-secondary">
                Showing {filteredCourses.length} accredited subjects and their competency coverage.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search subject or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-bg-surface border border-border rounded-md text-tx-primary placeholder:text-tx-muted focus:outline-none focus:border-forest"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => {
              const courseUnits = units.filter((u) => u.courseId === course.id);
              const courseOutcomes = learningOutcomes.filter((lo) => lo.courseId === course.id);
              const courseMappings = mappings.filter((m) => m.courseId === course.id);
              const compIds = Array.from(new Set(courseMappings.map((m) => m.competencyId)));
              const courseComps = competencies.filter((c) => compIds.includes(c.id));

              return (
                <div
                  key={course.id}
                  className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle hover:border-forest/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${course.color || '#315C46'}18`, color: course.color || '#315C46' }}
                      >
                        {course.code}
                      </span>
                      <span className="text-xs font-mono text-tx-secondary">
                        {course.credits} Credits
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-tx-primary leading-snug">
                      {course.name}
                    </h4>

                    <p className="text-xs text-tx-secondary mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Metadata chips */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border/60 text-center text-xs">
                      <div className="bg-bg-main p-1.5 rounded">
                        <span className="text-[10px] text-tx-muted block font-mono">UNITS</span>
                        <span className="font-semibold text-tx-primary">{courseUnits.length}</span>
                      </div>
                      <div className="bg-bg-main p-1.5 rounded">
                        <span className="text-[10px] text-tx-muted block font-mono">OUTCOMES</span>
                        <span className="font-semibold text-tx-primary">{courseOutcomes.length}</span>
                      </div>
                      <div className="bg-bg-main p-1.5 rounded">
                        <span className="text-[10px] text-tx-muted block font-mono">SKILLS</span>
                        <span className="font-semibold text-forest">{courseComps.length}</span>
                      </div>
                    </div>

                    {/* Cultivates preview */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {courseComps.slice(0, 3).map((comp) => (
                        <span
                          key={comp.id}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark border border-forest/20"
                        >
                          {comp.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-tx-muted">
                      Faculty: {course.facultyName}
                    </span>
                    <NavLink
                      to={`/courses/${course.id}`}
                      className="text-xs font-medium text-forest hover:underline flex items-center gap-1"
                    >
                      <span>Explore Subject</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

