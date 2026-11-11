import React from 'react';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import { History, Clock, User, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { activityLogs } = useAppStore();

  return (
    <div className="space-y-6">
      <Header
        title="Progress History & Audit Log"
        subtitle="Chronological audit trail of verified competency evaluations, curriculum updates, and student milestones."
        badge={`${activityLogs.length} Events Logged`}
      />

      <div className="px-6 space-y-4 max-w-4xl">
        <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border">
            {activityLogs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4 text-xs">
                <div className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 shadow-xs">
                  ✓
                </div>
                <div className="flex-1 p-3.5 bg-bg-main border border-border rounded-lg shadow-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-heading font-bold text-sm text-tx-primary">
                      {log.action}
                    </span>
                    <span className="font-mono text-[11px] text-tx-muted">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-tx-secondary font-medium">
                    {log.targetName}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-tx-muted pt-1 border-t border-border/60">
                    <span className="capitalize">Actor: {log.actorName} ({log.actorRole})</span>
                    <span>·</span>
                    <span className="capitalize">Category: {log.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

