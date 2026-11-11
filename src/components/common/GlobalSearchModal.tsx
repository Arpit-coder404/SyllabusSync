import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, CheckSquare, Compass, ArrowRight, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    courses,
    topics,
    competencies,
    learningOutcomes,
    assessments,
    pathways
  } = useAppStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const courseResults = courses
    .filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      title: `${c.code}: ${c.name}`,
      subtitle: `${c.credits} Credits · ${c.facultyName}`,
      type: 'Course',
      icon: BookOpen,
      action: () => {
        navigate(`/courses/${c.id}`);
        setSearchOpen(false);
      }
    }));

  const compResults = competencies
    .filter((comp) => comp.name.toLowerCase().includes(q) || comp.description.toLowerCase().includes(q) || comp.category.toLowerCase().includes(q))
    .slice(0, 4)
    .map((comp) => ({
      id: comp.id,
      title: comp.name,
      subtitle: `${comp.category.toUpperCase()} · Target: Level ${comp.targetLevel}`,
      type: 'Competency',
      icon: Zap,
      action: () => {
        navigate(`/competencies?id=${comp.id}`);
        setSearchOpen(false);
      }
    }));

  const topicResults = topics
    .filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    .slice(0, 3)
    .map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: `Syllabus Topic · ${t.hours} hrs · ${t.difficulty}`,
      type: 'Topic',
      icon: Layers,
      action: () => {
        navigate(`/courses/${t.courseId}?topic=${t.id}`);
        setSearchOpen(false);
      }
    }));

  const assessmentResults = assessments
    .filter((a) => a.title.toLowerCase().includes(q))
    .slice(0, 2)
    .map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: `Assessment (${a.type.replace('_', ' ')}) · Max: ${a.maxScore}`,
      type: 'Assessment',
      icon: CheckSquare,
      action: () => {
        navigate('/assessments');
        setSearchOpen(false);
      }
    }));

  const allResults = [...courseResults, ...compResults, ...topicResults, ...assessmentResults];

  const handleSelect = (idx: number) => {
    if (allResults[idx]) {
      allResults[idx].action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-tx-primary/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-bg-surface">
          <Search className="w-5 h-5 text-tx-secondary mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(allResults.length, 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + allResults.length) % Math.max(allResults.length, 1));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                handleSelect(selectedIndex);
              }
            }}
            placeholder="Search syllabi, courses, competencies, outcomes, or assessments... (Press Esc to exit)"
            className="w-full bg-transparent text-tx-primary placeholder:text-tx-muted text-base focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 hover:bg-bg-main rounded-md text-tx-secondary hover:text-tx-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Quicklinks if query is empty */}
        {q === '' ? (
          <div className="p-4 bg-bg-main/50 text-xs text-tx-secondary">
            <div className="font-mono uppercase tracking-wider text-tx-muted mb-2 font-medium">Quick Jumps</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { navigate('/graph'); setSearchOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg-surface border border-border hover:border-forest text-left text-tx-primary transition-colors"
              >
                <Compass className="w-4 h-4 text-forest" />
                <span>Interactive Competency Graph</span>
              </button>
              <button
                onClick={() => { navigate('/skill-gap'); setSearchOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg-surface border border-border hover:border-forest text-left text-tx-primary transition-colors"
              >
                <Zap className="w-4 h-4 text-terracotta" />
                <span>Skill Gap Analysis</span>
              </button>
              <button
                onClick={() => { navigate('/faculty'); setSearchOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg-surface border border-border hover:border-forest text-left text-tx-primary transition-colors"
              >
                <BookOpen className="w-4 h-4 text-infoBlue" />
                <span>Faculty Curriculum Builder</span>
              </button>
              <button
                onClick={() => { navigate('/analytics'); setSearchOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg-surface border border-border hover:border-forest text-left text-tx-primary transition-colors"
              >
                <Layers className="w-4 h-4 text-tx-secondary" />
                <span>Curriculum Analytics</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto divide-y divide-border/60">
            {allResults.length === 0 ? (
              <div className="p-8 text-center text-tx-secondary text-sm">
                No matching academic entities found for "{query}".
              </div>
            ) : (
              allResults.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}-${idx}`}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-forest-soft/70 text-forest-dark' : 'hover:bg-bg-main/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-md ${isSelected ? 'bg-forest text-white' : 'bg-bg-main text-tx-secondary'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-tx-primary truncate flex items-center gap-2">
                          {item.title}
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-bg-main border border-border text-tx-secondary">
                            {item.type}
                          </span>
                        </div>
                        <div className="text-xs text-tx-secondary truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ml-2 flex-shrink-0 ${isSelected ? 'text-forest' : 'text-tx-muted'}`} />
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border bg-bg-main/30 flex items-center justify-between text-[11px] font-mono text-tx-secondary">
          <div>Navigate: <kbd className="bg-bg-surface px-1 py-0.5 border border-border rounded">↑</kbd> <kbd className="bg-bg-surface px-1 py-0.5 border border-border rounded">↓</kbd></div>
          <div>Select: <kbd className="bg-bg-surface px-1.5 py-0.5 border border-border rounded">Enter</kbd></div>
          <div>Close: <kbd className="bg-bg-surface px-1 py-0.5 border border-border rounded">Esc</kbd></div>
        </div>
      </div>
    </div>
  );
};

