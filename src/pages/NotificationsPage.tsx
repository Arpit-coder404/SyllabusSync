import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead
  } = useAppStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <Header
        title="Notifications & Academic Alerts"
        subtitle="Real-time updates regarding evidence evaluations, curriculum revisions, and diagnosed skill gaps."
        badge={`${unreadCount} Unread`}
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold px-3 py-1.5 rounded bg-bg-surface hover:bg-bg-main border border-border text-tx-primary transition-colors"
            >
              Mark All Read
            </button>
          ) : undefined
        }
      />

      <div className="px-6 space-y-3 max-w-4xl">
        {notifications.length === 0 ? (
          <div className="p-8 text-center bg-bg-surface border border-border rounded-xl text-xs text-tx-secondary">
            No notifications on file.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                n.isRead
                  ? 'bg-bg-surface border-border opacity-85'
                  : 'bg-forest-soft/30 border-forest/30 shadow-subtle'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${
                  n.isRead ? 'bg-bg-main text-tx-secondary' : 'bg-forest text-white'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-sm text-tx-primary">
                      {n.title}
                    </h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-forest flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-tx-secondary mt-1 leading-relaxed">
                    {n.message}
                  </p>
                  <div className="text-[10px] font-mono text-tx-muted mt-2">
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-center">
                {n.link && (
                  <NavLink
                    to={n.link}
                    onClick={() => markNotificationAsRead(n.id)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-forest text-white hover:bg-forest-dark transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </NavLink>
                )}
                {!n.isRead && (
                  <button
                    onClick={() => markNotificationAsRead(n.id)}
                    className="p-1 text-xs text-tx-muted hover:text-tx-primary"
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

