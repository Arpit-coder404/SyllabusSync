import React from 'react';
import { Header } from '../components/common/Header';
import { CompetencyGraph } from '../components/graph/CompetencyGraph';

export const GraphPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <Header
        title="Interactive Curriculum & Competency Graph"
        subtitle="Explore real relational graphs connecting academic programs, courses, units, topics, learning outcomes, competencies, and practical assessments."
        badge="Signature Visual Architecture"
      />
      <div className="px-6">
        <div className="border border-border rounded-xl shadow-subtle overflow-hidden">
          <CompetencyGraph />
        </div>
      </div>
    </div>
  );
};

