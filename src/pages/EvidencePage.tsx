import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { ProficiencyBadge } from '../components/common/ProficiencyBadge';
import { useAppStore } from '../store/useAppStore';
import {
  ShieldCheck,
  Filter,
  ExternalLink,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus
} from 'lucide-react';

export const EvidencePage: React.FC = () => {
  const {
    studentEvidence,
    competencies,
    courses,
    learningOutcomes
  } = useAppStore();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredEvidence = studentEvidence.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.reviewStatus === statusFilter;
    const matchesType = typeFilter === 'all' || e.evidenceType === typeFilter;
    return matchesStatus && matchesType;
  });

  const verifiedCount = studentEvidence.filter((e) => e.reviewStatus === 'verified').length;
  const pendingCount = studentEvidence.filter((e) => e.reviewStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <Header
        title="Evidence Portfolio & Practical Artifacts"
        subtitle="Substantiate your academic learning with code repositories, architectural designs, and verified deliverables."
        badge={`${verifiedCount} Verified Records`}
        actions={
          <NavLink
            to="/assessments"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit New Evidence</span>
          </NavLink>
        }
      />

      <div className="px-6 space-y-6">
        {/* Verification Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-bg-surface border border-forest/30 rounded-xl shadow-subtle bg-forest-soft/20">
            <div className="text-xs font-mono uppercase text-forest font-semibold">Faculty Verified</div>
            <div className="text-2xl font-serif font-bold text-forest mt-1">{verifiedCount}</div>
            <div className="text-xs text-tx-secondary mt-1 font-mono">Rubric benchmarked & graded</div>
          </div>

          <div className="p-4 bg-bg-surface border border-amber/30 rounded-xl shadow-subtle bg-amber-soft/20">
            <div className="text-xs font-mono uppercase text-amber-900 font-semibold">Pending Review</div>
            <div className="text-2xl font-serif font-bold text-amber-800 mt-1">{pendingCount}</div>
            <div className="text-xs text-tx-secondary mt-1 font-mono">Awaiting faculty evaluation</div>
          </div>

          <div className="p-4 bg-bg-surface border border-border rounded-xl shadow-subtle">
            <div className="text-xs font-mono uppercase text-tx-secondary font-semibold">Total Submitted Artifacts</div>
            <div className="text-2xl font-serif font-bold text-tx-primary mt-1">{studentEvidence.length}</div>
            <div className="text-xs text-tx-muted font-mono mt-1">Across 3 academic terms</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
              <Filter className="w-3.5 h-3.5 text-forest" />
              <span>Filter:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified & Approved</option>
              <option value="pending">Pending Faculty Review</option>
              <option value="revision_requested">Revision Requested</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
            >
              <option value="all">All Media Types</option>
              <option value="github">GitHub Repositories</option>
              <option value="report_pdf">Engineering Reports (PDF)</option>
              <option value="live_demo">Live Deployment Demos</option>
            </select>
          </div>

          <div className="text-xs font-mono text-tx-secondary">
            Showing {filteredEvidence.length} evidence items
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvidence.map((evi) => {
            const comp = competencies.find((c) => c.id === evi.competencyId);
            const course = courses.find((c) => c.id === evi.courseId);
            const isVerified = evi.reviewStatus === 'verified';
            const isPending = evi.reviewStatus === 'pending';

            return (
              <div
                key={evi.id}
                className="p-5 bg-bg-surface border border-border rounded-xl shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-main border border-border font-bold text-tx-primary">
                      {evi.evidenceType.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isVerified
                        ? 'bg-forest-soft text-forest-dark border border-forest/20'
                        : isPending
                        ? 'bg-amber-soft text-amber-900 border border-amber/20'
                        : 'bg-terracotta-soft text-terracotta border border-terracotta/20'
                    }`}>
                      {evi.reviewStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    {evi.title}
                  </h3>

                  <p className="text-xs text-tx-secondary mt-1.5 leading-relaxed">
                    {evi.description}
                  </p>

                  <div className="mt-3 p-2.5 bg-bg-main border border-border rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-tx-muted font-mono text-[10px]">COMPETENCY:</span>
                      <span className="font-semibold text-forest">{comp?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-tx-muted font-mono text-[10px]">SUBJECT:</span>
                      <span className="text-tx-primary">{course?.code}: {course?.name}</span>
                    </div>
                  </div>

                  {/* Feedback Block */}
                  {evi.feedback && (
                    <div className="mt-3 p-3 bg-forest-soft/40 border border-forest/20 rounded-lg text-xs">
                      <div className="flex items-center justify-between font-semibold text-forest-dark mb-1">
                        <span>Faculty Evaluation ({evi.reviewerName})</span>
                        {evi.score && <span className="font-mono">{evi.score}/100</span>}
                      </div>
                      <p className="text-[11px] text-forest-dark italic">
                        "{evi.feedback}"
                      </p>
                      {evi.verifiedLevel && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono uppercase text-forest-dark font-bold">Verified Level:</span>
                          <ProficiencyBadge level={evi.verifiedLevel} size="sm" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-tx-muted font-mono text-[11px]">
                    Submitted: {evi.submittedAt}
                  </span>
                  <a
                    href={evi.urlOrContent}
                    target="_blank"
                    rel="noreferrer"
                    className="text-forest hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

