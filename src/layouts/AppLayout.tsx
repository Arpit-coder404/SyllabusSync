import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';
import { useAppStore } from '../store/useAppStore';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { currentRole, switchRole } = useAppStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-main text-tx-primary font-sans antialiased">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        {/* Subtle Role Banner */}
        <div className="bg-forest-dark text-white px-4 py-1 text-xs font-mono flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-forest-soft animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Active Role: {currentRole.toUpperCase()}
            </span>
            <span className="text-white/70 hidden md:inline">
              · All curriculum data, evidence, and competency mappings persist in real-time.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/60 hidden sm:inline">Quick switch:</span>
            <button
              onClick={() => switchRole(currentRole === 'student' ? 'faculty' : currentRole === 'faculty' ? 'admin' : 'student')}
              className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded font-mono transition-colors flex items-center gap-1"
            >
              Next Role ({currentRole === 'student' ? 'Faculty' : currentRole === 'faculty' ? 'Admin' : 'Student'})
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Page Content View */}
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearchModal />
    </div>
  );
};

