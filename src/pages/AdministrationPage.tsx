import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  Settings2,
  Building2,
  GraduationCap,
  Calendar,
  Users,
  Award,
  Plus,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CompetencyCategory, ProficiencyLevel } from '../types';

export const AdministrationPage: React.FC = () => {
  const {
    department,
    programs,
    semesters,
    competencies,
    currentUser,
    addCompetency,
    resetToDefaultData
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'programs' | 'framework' | 'departments' | 'export'>('programs');

  // New competency form state
  const [newCompName, setNewCompName] = useState('');
  const [newCompCategory, setNewCompCategory] = useState<CompetencyCategory>('technical');
  const [newCompDesc, setNewCompDesc] = useState('');
  const [newCompTarget, setNewCompTarget] = useState<ProficiencyLevel>(4);

  const handleAddCompetency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    addCompetency({
      name: newCompName,
      category: newCompCategory,
      description: newCompDesc || `Competency in ${newCompName}`,
      levels: {
        1: `Basic awareness and terminology of ${newCompName}.`,
        2: `Foundational practical execution under direct guidance.`,
        3: `Autonomous application in standard engineering scenarios.`,
        4: `Complex optimization, architectural evaluation, and tradeoffs.`,
        5: `Expert leadership, novel synthesis, and industry-grade standards.`
      },
      prerequisiteCompetencyIds: [],
      targetLevel: newCompTarget
    });

    alert(`Competency "${newCompName}" successfully added to the institutional framework!`);
    setNewCompName('');
    setNewCompDesc('');
  };

  const handleExportAccreditationJson = () => {
    const data = {
      institution: 'Apex Institute of Technology',
      department,
      programs,
      semesters,
      competencies,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SyllabusSync-Accreditation-Export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Header
        title="Institutional Administration & Governance"
        subtitle="Configure academic programs, departmental structure, and institutional competency frameworks."
        badge="Accreditation Chair"
      />

      <div className="px-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border text-xs font-semibold">
          {[
            { key: 'programs', label: 'Academic Programs & Semesters', icon: GraduationCap },
            { key: 'framework', label: `Competency Framework (${competencies.length})`, icon: Award },
            { key: 'departments', label: 'Department & Faculty Roster', icon: Building2 },
            { key: 'export', label: 'Accreditation Export & Backup', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2.5 border-b-2 flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'border-forest text-forest bg-forest-soft/30'
                    : 'border-transparent text-tx-secondary hover:text-tx-primary'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="space-y-4">
            {programs.map((prog) => (
              <div key={prog.id} className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                      {prog.code}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-tx-primary mt-1">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-tx-secondary mt-1">{prog.description}</p>
                  </div>
                  <div className="text-xs font-mono text-right flex-shrink-0">
                    <span className="text-forest font-bold block">{prog.accreditationStatus}</span>
                    <span className="text-tx-secondary">{prog.creditsRequired} Total Credits</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <h4 className="text-xs font-mono uppercase text-tx-muted mb-2 font-medium">
                    Program Semesters ({semesters.length} Active Cohorts)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {semesters.map((s) => (
                      <div key={s.id} className="p-3 bg-bg-main border border-border rounded-lg text-xs">
                        <div className="flex items-center justify-between font-bold text-tx-primary">
                          <span>Semester {s.semesterNumber}</span>
                          {s.isCurrent && <span className="text-[9px] bg-forest text-white px-1 rounded">Active</span>}
                        </div>
                        <div className="text-[11px] text-tx-secondary font-mono mt-0.5">
                          {s.academicYear}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COMPETENCY FRAMEWORK */}
        {activeTab === 'framework' && (
          <div className="space-y-6">
            <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle max-w-2xl">
              <h3 className="font-heading font-bold text-base text-tx-primary mb-1">
                Define New Institutional Competency
              </h3>
              <p className="text-xs text-tx-secondary mb-4">
                Adds a structured competency to the university framework with automated 5-tier progression levels.
              </p>

              <form onSubmit={handleAddCompetency} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-tx-primary mb-1">Competency Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Consensus & Raft Architecture"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">Category</label>
                    <select
                      value={newCompCategory}
                      onChange={(e) => setNewCompCategory(e.target.value as any)}
                      className="w-full p-2 bg-bg-main border border-border rounded"
                    >
                      <option value="technical">Technical</option>
                      <option value="analytical">Analytical</option>
                      <option value="professional">Professional</option>
                      <option value="creative">Creative</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-tx-primary mb-1">Curriculum Target Level</label>
                    <select
                      value={newCompTarget}
                      onChange={(e) => setNewCompTarget(Number(e.target.value) as any)}
                      className="w-full p-2 bg-bg-main border border-border rounded"
                    >
                      <option value={3}>Level 3: Developing</option>
                      <option value={4}>Level 4: Proficient (Standard)</option>
                      <option value={5}>Level 5: Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-tx-primary mb-1">Description & Scope</label>
                  <textarea
                    rows={2}
                    placeholder="Describe expected capabilities and engineering demonstrations..."
                    value={newCompDesc}
                    onChange={(e) => setNewCompDesc(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Register Competency</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: DEPARTMENTS */}
        {activeTab === 'departments' && (
          <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle space-y-4">
            <h3 className="font-heading font-bold text-base text-tx-primary">
              {department.name}
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-bg-main border border-border rounded-lg">
                <span className="text-tx-muted block text-[10px]">HEAD OF DEPT</span>
                <span className="font-bold text-tx-primary">{department.headOfDepartment}</span>
              </div>
              <div className="p-3 bg-bg-main border border-border rounded-lg">
                <span className="text-tx-muted block text-[10px]">FACULTY COUNT</span>
                <span className="font-bold text-tx-primary">{department.facultyCount} Members</span>
              </div>
              <div className="p-3 bg-bg-main border border-border rounded-lg">
                <span className="text-tx-muted block text-[10px]">ACTIVE COURSES</span>
                <span className="font-bold text-tx-primary">{department.coursesCount} Subjects</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPORT & DEMO RESET */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle space-y-3">
              <h3 className="font-heading font-bold text-base text-tx-primary">
                Export Accreditation Report (JSON / ABET Self-Study)
              </h3>
              <p className="text-xs text-tx-secondary">
                Generate an institutional snapshot including all course outcomes, competency mappings, and rubric matrices.
              </p>
              <button
                onClick={handleExportAccreditationJson}
                className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Accreditation Data (JSON)</span>
              </button>
            </div>

            <div className="p-6 bg-bg-surface border border-terracotta/40 rounded-xl shadow-subtle space-y-3 bg-terracotta-soft/10">
              <h3 className="font-heading font-bold text-base text-terracotta">
                Reset Platform Demo Data
              </h3>
              <p className="text-xs text-tx-secondary">
                Restores the B.Tech Computer Science and Engineering demonstration dataset to its default state.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all curriculum and student evidence data back to defaults?')) {
                    resetToDefaultData();
                    alert('Platform reset to default state.');
                  }
                }}
                className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

