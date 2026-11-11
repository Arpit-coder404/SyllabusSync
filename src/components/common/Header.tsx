import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, RotateCcw, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface HeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  badge,
  actions
}) => {
  const {
    currentRole,
    currentUser,
    notifications,
    setSearchOpen,
    resetToDefaultData
  } = useAppStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleReset = () => {
    if (window.confirm('Reset SyllabusSync back to the initial demo curriculum state? All changes and uploaded evidence will reset.')) {
      resetToDefaultData();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-bg-surface/90 backdrop-blur-md border-b border-border px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Title & Metadata */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-tx-primary tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-forest-soft text-forest-dark border border-forest/20 font-medium">
              {badge}
            </span>
          )}
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main text-tx-secondary border border-border capitalize">
            Role: {currentRole}
          </span>
        </div>
        {subtitle && (
          <p className="text-xs md:text-sm text-tx-secondary mt-0.5 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {actions}

        {/* Global Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-tx-secondary bg-bg-main hover:bg-forest-soft/60 border border-border rounded-md transition-colors"
          title="Search anything (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-tx-muted" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="font-mono text-[10px] bg-bg-surface px-1 py-0.2 rounded border border-border ml-1">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <NavLink
          to="/notifications"
          className="relative p-2 text-tx-secondary hover:text-tx-primary hover:bg-bg-main rounded-md border border-border transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-mono font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </NavLink>

        {/* Landing Page link */}
        <NavLink
          to="/"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-tx-secondary hover:text-tx-primary hover:bg-bg-main rounded-md border border-border transition-colors"
          title="Open Landing Page"
        >
          <ExternalLink className="w-3.5 h-3.5 text-tx-muted" />
          <span className="hidden sm:inline">Landing</span>
        </NavLink>

        {/* Reset Demo Data Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-tx-muted hover:text-tx-secondary hover:bg-bg-main rounded-md border border-border transition-colors"
          title="Reset demonstration data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};

