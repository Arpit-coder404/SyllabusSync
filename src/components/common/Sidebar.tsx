import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  LayoutDashboard,
  Compass,
  Zap,
  Target,
  BarChart3,
  Award,
  FileCheck2,
  GitBranch,
  Settings2,
  Bell,
  Search,
  ChevronDown,
  Layers,
  GraduationCap,
  Sparkles,
  School,
  History,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { UserRole } from '../../types';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const {
    currentRole,
    currentUser,
    switchRole,
    selectedSemesterId,
    selectSemester,
    semesters,
    programs,
    selectedProgramId,
    notifications,
    setSearchOpen
  } = useAppStore();

  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const activeProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const activeSemester = semesters.find((s) => s.id === selectedSemesterId) || semesters[0];

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    if (newRole === 'faculty' && location.pathname === '/overview') {
      navigate('/faculty');
    } else if (newRole === 'admin' && location.pathname === '/overview') {
      navigate('/admin');
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
      isActive
        ? 'bg-forest text-white shadow-subtle'
        : 'text-tx-secondary hover:text-tx-primary hover:bg-forest-soft/60'
    }`;

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col justify-between border-r border-border bg-bg-sidebar transition-all duration-200 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header / Branding */}
      <div className="p-4 border-b border-border/80 bg-bg-surface/80">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white font-serif font-bold text-base shadow-subtle group-hover:scale-105 transition-transform">
              S
            </div>
            {!collapsed && (
              <div>
                <div className="font-heading font-bold text-sm tracking-tight text-tx-primary flex items-center gap-1.5">
                  SyllabusSync
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-forest-soft text-forest-dark border border-forest/20">
                    v1.0
                  </span>
                </div>
                <div className="text-[11px] text-tx-secondary font-sans leading-tight truncate">
                  Curriculum Intelligence
                </div>
              </div>
            )}
          </NavLink>
        </div>

        {/* Global Search Button */}
        {!collapsed && (
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full mt-3 flex items-center justify-between px-2.5 py-1.5 text-xs text-tx-secondary bg-bg-main border border-border rounded-md hover:border-forest/50 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Search platform...</span>
            </span>
            <kbd className="font-mono text-[10px] bg-bg-surface px-1.5 py-0.5 rounded border border-border">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Academic Program & Semester Selector */}
        {!collapsed && (
          <div className="mt-3 pt-2.5 border-t border-border/60">
            <div className="text-[10px] uppercase tracking-wider font-mono text-tx-muted mb-1 flex items-center justify-between">
              <span>Program Context</span>
              <span className="text-forest font-semibold">ABET Aligned</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-tx-primary truncate">
                {activeProgram?.code} · B.Tech CSE
              </div>
              <div className="relative">
                <select
                  value={selectedSemesterId}
                  onChange={(e) => selectSemester(e.target.value)}
                  className="w-full text-xs bg-bg-main border border-border rounded px-2 py-1 text-tx-primary pr-6 appearance-none cursor-pointer focus:outline-none focus:border-forest"
                >
                  {semesters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-tx-muted absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Section: My Learning */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-tx-muted font-medium">
              My Learning
            </div>
          )}
          <nav className="space-y-0.5">
            <NavLink to="/overview" className={navLinkClasses}>
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Overview</span>}
            </NavLink>
            <NavLink to="/curriculum" className={navLinkClasses}>
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>My Curriculum</span>}
            </NavLink>
            <NavLink to="/competencies" className={navLinkClasses}>
              <Award className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>My Competencies</span>}
            </NavLink>
            <NavLink to="/pathways" className={navLinkClasses}>
              <GitBranch className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Learning Pathways</span>}
            </NavLink>
          </nav>
        </div>

        {/* Section: Academic Structure */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-tx-muted font-medium">
              Academic Structure
            </div>
          )}
          <nav className="space-y-0.5">
            <NavLink to="/programs" className={navLinkClasses}>
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Programs</span>}
            </NavLink>
            <NavLink to="/courses" className={navLinkClasses}>
              <Layers className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Courses & Subjects</span>}
            </NavLink>
            <NavLink to="/syllabus" className={navLinkClasses}>
              <FileText className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Syllabus Explorer</span>}
            </NavLink>
            <NavLink to="/outcomes" className={navLinkClasses}>
              <Target className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Learning Outcomes</span>}
            </NavLink>
          </nav>
        </div>

        {/* Section: Intelligence */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-tx-muted font-medium">
              Intelligence
            </div>
          )}
          <nav className="space-y-0.5">
            <NavLink to="/graph" className={navLinkClasses}>
              <Compass className="w-4 h-4 flex-shrink-0 text-forest" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Competency Graph</span>
                  <span className="text-[9px] font-mono font-bold uppercase bg-forest-soft text-forest-dark px-1.5 py-0.2 rounded border border-forest/20">
                    Interactive
                  </span>
                </div>
              )}
            </NavLink>
            <NavLink to="/skill-gap" className={navLinkClasses}>
              <Zap className="w-4 h-4 flex-shrink-0 text-terracotta" />
              {!collapsed && <span>Skill Gap Analysis</span>}
            </NavLink>
            <NavLink to="/analytics" className={navLinkClasses}>
              <BarChart3 className="w-4 h-4 flex-shrink-0 text-infoBlue" />
              {!collapsed && <span>Curriculum Analytics</span>}
            </NavLink>
          </nav>
        </div>

        {/* Section: Assessment & Evidence */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-tx-muted font-medium">
              Assessment
            </div>
          )}
          <nav className="space-y-0.5">
            <NavLink to="/assessments" className={navLinkClasses}>
              <FileCheck2 className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Assessments</span>}
            </NavLink>
            <NavLink to="/evidence" className={navLinkClasses}>
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Evidence Portfolio</span>}
            </NavLink>
            <NavLink to="/history" className={navLinkClasses}>
              <History className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Progress History</span>}
            </NavLink>
          </nav>
        </div>

        {/* Section: Management & Faculty */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-tx-muted font-medium">
              Management
            </div>
          )}
          <nav className="space-y-0.5">
            <NavLink to="/faculty" className={navLinkClasses}>
              <School className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Faculty Workspace</span>}
            </NavLink>
            <NavLink to="/curriculum-builder" className={navLinkClasses}>
              <Building2 className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Curriculum Builder</span>}
            </NavLink>
            <NavLink to="/admin" className={navLinkClasses}>
              <Settings2 className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Administration</span>}
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Bottom User & Role Switcher Bar */}
      <div className="p-3 border-t border-border bg-bg-surface">
        {!collapsed ? (
          <div>
            {/* Interactive Demo Role Switcher */}
            <div className="mb-2.5 p-2 rounded-lg bg-bg-main border border-border">
              <div className="text-[10px] uppercase font-mono tracking-wider text-tx-muted mb-1.5 flex items-center justify-between">
                <span>Demo Role Switcher</span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`py-1 text-[11px] font-medium capitalize rounded transition-all ${
                      currentRole === r
                        ? 'bg-forest text-white shadow-xs font-semibold'
                        : 'bg-bg-surface hover:bg-forest-soft text-tx-secondary'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* User Profile Block */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-border object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-tx-primary truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-tx-secondary capitalize truncate font-mono">
                    {currentRole === 'student' ? `${currentUser.studentIdNumber}` : currentUser.facultyTitle?.split('&')[0]}
                  </div>
                </div>
              </div>

              {/* Notification Pill */}
              <NavLink
                to="/notifications"
                className="relative p-1.5 hover:bg-bg-main rounded-md text-tx-secondary hover:text-tx-primary"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-terracotta" />
                )}
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-border"
            />
          </div>
        )}
      </div>
    </aside>
  );
};

