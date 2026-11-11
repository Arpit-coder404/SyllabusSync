import React from 'react';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  Award,
  BookOpen,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  PieChart as PieIcon
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const {
    courses,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    assessments
  } = useAppStore();

  // 1. Coverage Calculations
  const totalTopics = topics.length;
  const mappedTopics = topics.filter((t) => t.isMapped).length;
  const topicCoveragePercent = Math.round((mappedTopics / Math.max(totalTopics, 1)) * 100);

  const totalOutcomes = learningOutcomes.length;
  const assessedOutcomes = learningOutcomes.filter((lo) =>
    assessments.some((a) => a.learningOutcomeIds.includes(lo.id))
  ).length;
  const outcomeCoveragePercent = Math.round((assessedOutcomes / Math.max(totalOutcomes, 1)) * 100);

  // 2. Competency Distribution
  const categoryCounts = {
    technical: competencies.filter((c) => c.category === 'technical').length,
    analytical: competencies.filter((c) => c.category === 'analytical').length,
    professional: competencies.filter((c) => c.category === 'professional').length,
    creative: competencies.filter((c) => c.category === 'creative').length
  };

  const distributionData = [
    { name: 'Technical', value: categoryCounts.technical, color: '#315C46' },
    { name: 'Analytical', value: categoryCounts.analytical, color: '#6689A5' },
    { name: 'Professional', value: categoryCounts.professional, color: '#D99B26' },
    { name: 'Creative', value: categoryCounts.creative, color: '#BD7458' }
  ];

  // 3. Course Contribution Chart
  const courseContributionData = courses.slice(0, 6).map((c) => {
    const courseMaps = mappings.filter((m) => m.courseId === c.id);
    return {
      code: c.code,
      name: c.name,
      introduces: courseMaps.filter((m) => m.relationship === 'introduces').length,
      develops: courseMaps.filter((m) => m.relationship === 'develops').length,
      reinforces: courseMaps.filter((m) => m.relationship === 'reinforces').length,
      assesses: courseMaps.filter((m) => m.relationship === 'assesses').length
    };
  });

  // 4. Curriculum Gaps
  const unmappedTopicsList = topics.filter((t) => !t.isMapped);
  const unassessedOutcomesList = learningOutcomes.filter(
    (lo) => !assessments.some((a) => a.learningOutcomeIds.includes(lo.id))
  );

  return (
    <div className="space-y-6">
      <Header
        title="Curriculum Analytics & Institutional Alignment"
        subtitle="Auditable metrics on curriculum coverage, competency distribution, and programmatic learning gaps for accreditation."
        badge="Accreditation Audit"
      />

      <div className="px-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono uppercase text-forest font-semibold">
              Topic Mapping Coverage
            </span>
            <div className="text-3xl font-serif font-bold text-forest mt-1">
              {topicCoveragePercent}%
            </div>
            <div className="text-[11px] text-tx-secondary mt-1 font-mono">
              {mappedTopics} of {totalTopics} syllabus concepts
            </div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono uppercase text-infoBlue font-semibold">
              Outcome Traceability
            </span>
            <div className="text-3xl font-serif font-bold text-infoBlue-dark mt-1">
              {outcomeCoveragePercent}%
            </div>
            <div className="text-[11px] text-tx-secondary mt-1 font-mono">
              {assessedOutcomes} of {totalOutcomes} CLOs benchmarked
            </div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <span className="text-[11px] font-mono uppercase text-amber-900 font-semibold">
              Framework Footprint
            </span>
            <div className="text-3xl font-serif font-bold text-amber-800 mt-1">
              {competencies.length}
            </div>
            <div className="text-[11px] text-tx-secondary mt-1 font-mono">
              Active engineering competencies
            </div>
          </div>

          <div className="p-4 bg-bg-surface border border-terracotta/40 rounded-xl shadow-subtle bg-terracotta-soft/20">
            <span className="text-[11px] font-mono uppercase text-terracotta font-semibold">
              Flagged Curriculum Gaps
            </span>
            <div className="text-3xl font-serif font-bold text-terracotta mt-1">
              {unmappedTopicsList.length}
            </div>
            <div className="text-[11px] text-terracotta font-mono mt-1">
              Topics requiring competency mapping
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart: Course Contribution Breakdown (8 cols) */}
          <div className="lg:col-span-8 p-6 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    Course Contribution to Competency Lifecycle
                  </h3>
                  <p className="text-xs text-tx-secondary">
                    Breakdown of whether courses Introduce, Develop, Reinforce, or Formally Assess skills.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#6689A5]" />Introduces</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#315C46]" />Develops</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#BD7458]" />Reinforces</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#D99B26]" />Assesses</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseContributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E5DE" />
                    <XAxis dataKey="code" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
                    <YAxis tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E5DE', fontSize: '11px' }}
                    />
                    <Bar dataKey="introduces" fill="#6689A5" stackId="a" />
                    <Bar dataKey="develops" fill="#315C46" stackId="a" />
                    <Bar dataKey="reinforces" fill="#BD7458" stackId="a" />
                    <Bar dataKey="assesses" fill="#D99B26" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="pt-3 border-t border-border text-[11px] font-mono text-tx-muted">
              Higher ratio of 'Assesses' and 'Develops' reflects strong practical capstone coverage.
            </div>
          </div>

          {/* Right Chart: Competency Category Distribution (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-tx-primary">
                Competency Domain Distribution
              </h3>
              <p className="text-xs text-tx-secondary mb-4">
                Balance between Technical, Analytical, Professional, and Creative competencies.
              </p>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      paddingAngle={3}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E5DE', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-2">
                {distributionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-tx-primary">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-mono text-tx-secondary font-bold">
                      {item.value} ({Math.round((item.value / competencies.length) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border text-[11px] font-mono text-tx-muted">
              Aligned with ABET Criterion 3 Student Outcomes.
            </div>
          </div>
        </div>

        {/* Actionable Curriculum Gaps Audit Table */}
        <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-tx-primary">
                Accreditation Gap Audit Findings
              </h3>
              <p className="text-xs text-tx-secondary">
                Action items required to achieve 100% curriculum mapping completeness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-terracotta-soft/30 border border-terracotta/30 rounded-lg text-xs space-y-2">
              <div className="font-bold text-terracotta-dark flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-terracotta" />
                <span>Unmapped Syllabus Topics ({unmappedTopicsList.length})</span>
              </div>
              <p className="text-tx-secondary text-[11px]">
                The following lecture topics do not currently develop or assess any mapped competency:
              </p>
              <div className="space-y-1">
                {unmappedTopicsList.map((t) => (
                  <div key={t.id} className="p-2 bg-bg-surface border border-border rounded flex items-center justify-between">
                    <span className="font-medium text-tx-primary">{t.title}</span>
                    <span className="font-mono text-[10px] text-terracotta font-bold">Unmapped</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-soft/30 border border-amber/30 rounded-lg text-xs space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Competencies with Limited Assessment Coverage</span>
              </div>
              <p className="text-tx-secondary text-[11px]">
                Competencies that are introduced in lectures but have only 1 supporting evaluation rubric:
              </p>
              <div className="space-y-1">
                <div className="p-2 bg-bg-surface border border-border rounded flex items-center justify-between">
                  <span className="font-medium text-tx-primary">Relational Database Design</span>
                  <span className="font-mono text-[10px] text-amber-800 font-bold">1 Project Assessment</span>
                </div>
                <div className="p-2 bg-bg-surface border border-border rounded flex items-center justify-between">
                  <span className="font-medium text-tx-primary">Technical Documentation</span>
                  <span className="font-mono text-[10px] text-amber-800 font-bold">1 Rubric Linked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

