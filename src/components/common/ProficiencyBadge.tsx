import React from 'react';
import { ProficiencyLevel, PROFICIENCY_NAMES, PROFICIENCY_COLORS } from '../../types';

interface ProficiencyBadgeProps {
  level: ProficiencyLevel;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProficiencyBadge: React.FC<ProficiencyBadgeProps> = ({
  level,
  showNumber = true,
  size = 'md'
}) => {
  const name = PROFICIENCY_NAMES[level] || 'Awareness';
  const colors = PROFICIENCY_COLORS[level] || PROFICIENCY_COLORS[1];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all ${sizeClasses}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors.text }}
      />
      {showNumber ? `L${level} · ${name}` : name}
    </span>
  );
};

