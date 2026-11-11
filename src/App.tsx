import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { CompetenciesPage } from './pages/CompetenciesPage';
import { GraphPage } from './pages/GraphPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { PathwaysPage } from './pages/PathwaysPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { EvidencePage } from './pages/EvidencePage';
import { HistoryPage } from './pages/HistoryPage';
import { OutcomesPage } from './pages/OutcomesPage';
import { FacultyWorkspacePage } from './pages/FacultyWorkspacePage';
import { SyllabusBuilderPage } from './pages/SyllabusBuilderPage';
import { AdministrationPage } from './pages/AdministrationPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected App Workspace inside persistent AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/programs" element={<CurriculumPage />} />
          <Route path="/courses" element={<CurriculumPage />} />
          <Route path="/courses/:id" element={<SubjectDetailPage />} />
          <Route path="/syllabus" element={<CurriculumPage />} />
          <Route path="/outcomes" element={<OutcomesPage />} />
          <Route path="/competencies" element={<CompetenciesPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/pathways" element={<PathwaysPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/faculty" element={<FacultyWorkspacePage />} />
          <Route path="/curriculum-builder" element={<SyllabusBuilderPage />} />
          <Route path="/admin" element={<AdministrationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

