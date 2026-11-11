import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Award,
  Layers,
  Target,
  CheckCircle2,
  BookOpen,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAppStore();

  return (
    <div className="min-h-screen bg-bg-main text-tx-primary font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-bg-surface/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-white font-serif font-bold text-lg shadow-subtle">
            S
          </div>
          <div>
            <div className="font-heading font-bold text-base tracking-tight text-tx-primary">
              SyllabusSync
            </div>
            <div className="text-[11px] font-mono text-tx-secondary hidden sm:block">
              Curriculum Intelligence & Competency Platform
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-tx-secondary">
          <a href="#disconnect" className="hover:text-tx-primary transition-colors">The Disconnect</a>
          <a href="#solution" className="hover:text-tx-primary transition-colors">The Solution</a>
          <a href="#preview" className="hover:text-tx-primary transition-colors">Interactive Engine</a>
          <a href="#institutional" className="hover:text-tx-primary transition-colors">For Universities</a>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/overview"
            onClick={() => switchRole('student')}
            className="px-4 py-2 text-xs font-semibold rounded-md border border-border bg-bg-surface hover:bg-bg-main text-tx-primary transition-all shadow-subtle"
          >
            Launch Platform
          </NavLink>
          <NavLink
            to="/graph"
            onClick={() => switchRole('student')}
            className="px-4 py-2 text-xs font-semibold rounded-md bg-forest hover:bg-forest-dark text-white transition-all shadow-subtle flex items-center gap-1.5"
          >
            <span>Explore Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-soft text-forest-dark border border-forest/20 text-xs font-mono font-medium mb-6">
          <Compass className="w-3.5 h-3.5" />
          <span>Curriculum-to-Competency Intelligence System</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-tx-primary font-bold tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Your syllabus tells you what to study. <br className="hidden sm:inline" />
          <span className="text-forest italic">We show you what you're becoming.</span>
        </h1>

        <p className="text-base sm:text-lg text-tx-secondary max-w-2xl mx-auto mt-6 leading-relaxed">
          Connect academic subjects to practical competencies, understand your genuine learning progress,
          and discover the real-world engineering skills your curriculum is designed to cultivate.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <NavLink
            to="/overview"
            className="px-6 py-3 rounded-lg bg-forest hover:bg-forest-dark text-white font-medium text-sm transition-all shadow-elevated flex items-center gap-2"
          >
            <span>Explore Your Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
          <NavLink
            to="/graph"
            className="px-6 py-3 rounded-lg bg-bg-surface hover:bg-bg-main border border-border text-tx-primary font-medium text-sm transition-all shadow-subtle flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-forest" />
            <span>Interactive Competency Graph</span>
          </NavLink>
        </div>

        {/* Live Product Preview Widget */}
        <div id="preview" className="mt-14 p-4 sm:p-6 bg-bg-surface border border-border rounded-2xl shadow-modal text-left">
          <div className="flex items-center justify-between pb-4 border-b border-border/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-terracotta/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-forest/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-tx-secondary">
                Apex Institute of Technology · B.Tech Computer Science & Engineering (Semester 3)
              </span>
            </div>
            <span className="text-xs font-mono font-medium text-forest px-2 py-0.5 rounded bg-forest-soft">
              Live Interactive Engine
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Interactive Graph Simulation Preview */}
            <div className="lg:col-span-8 p-6 bg-bg-main rounded-xl border border-border relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              <div className="text-xs font-mono uppercase text-tx-muted mb-4 flex items-center justify-between">
                <span>Curriculum Relationship Flow</span>
                <span className="text-forest font-semibold">12 Subjects · 35 Competencies</span>
              </div>

              {/* Graphic Flow Nodes */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3 bg-forest text-white rounded-lg font-heading text-xs font-bold shadow-subtle">
                    B.Tech Computer Science
                  </div>
                  <ArrowRight className="w-4 h-4 text-tx-muted" />
                  <div className="p-3 bg-bg-surface border-2 border-forest rounded-lg font-heading text-xs font-semibold text-tx-primary shadow-subtle">
                    CS301 Database Systems
                  </div>
                  <ArrowRight className="w-4 h-4 text-tx-muted" />
                  <div className="p-3 bg-bg-surface border border-border rounded-lg text-xs font-medium text-tx-primary">
                    Unit 3: Normalization
                  </div>
                </div>

                <div className="ml-12 pl-4 border-l-2 border-forest-soft space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="p-2.5 bg-infoBlue-soft border border-infoBlue/40 text-infoBlue-dark rounded-md text-xs font-mono">
                      Outcome CO3: Decompose into 3NF & BCNF
                    </div>
                    <ArrowRight className="w-4 h-4 text-forest" />
                    <div className="p-3 bg-bg-surface border-2 border-forest rounded-xl shadow-elevated">
                      <div className="text-[10px] uppercase font-mono text-forest font-semibold">
                        Competency
                      </div>
                      <div className="text-xs font-bold text-tx-primary">
                        Relational Database Design (Level 4)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-tx-secondary pl-6">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Evidence: Hospital Management BCNF Schema (Score: 94/100 · Verified by Faculty)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-tx-secondary">
                <span>Distinguishes curriculum exposure from verified student competency.</span>
                <NavLink to="/graph" className="text-forest font-semibold hover:underline flex items-center gap-1">
                  Launch full canvas <ArrowRight className="w-3 h-3" />
                </NavLink>
              </div>
            </div>

            {/* Competency Snapshot Preview */}
            <div className="lg:col-span-4 p-5 bg-bg-surface border border-border rounded-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-tx-muted mb-2 font-medium">
                  Student Competency Audit
                </div>
                <div className="font-heading font-bold text-base text-tx-primary mb-1">
                  Aarav Sharma
                </div>
                <div className="text-xs text-tx-secondary font-mono mb-4">
                  22BCSE104 · Semester 3
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-bg-main border border-border">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>SQL Query Engineering</span>
                      <span className="text-forest font-bold font-mono">L4 · Proficient</span>
                    </div>
                    <div className="w-full bg-border h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-forest h-full rounded-full w-[80%]" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-bg-main border border-border">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>Database Design</span>
                      <span className="text-amber-700 font-bold font-mono">L3 · Developing</span>
                    </div>
                    <div className="w-full bg-border h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber h-full rounded-full w-[60%]" />
                    </div>
                    <div className="text-[10px] text-terracotta mt-1 font-mono">
                      Gap: Lacks practical BCNF project evidence
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-bg-main border border-border">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>Algorithm Optimization</span>
                      <span className="text-forest font-bold font-mono">L4 · Proficient</span>
                    </div>
                    <div className="w-full bg-border h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-forest h-full rounded-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>

              <NavLink
                to="/skill-gap"
                className="mt-4 w-full py-2 bg-bg-main hover:bg-forest-soft/70 border border-border text-tx-primary text-xs font-medium rounded-lg text-center transition-colors block"
              >
                View Skill Gap Analysis
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Disconnect */}
      <section id="disconnect" className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
        <div className="text-xs font-mono uppercase tracking-wider text-terracotta font-semibold mb-2">
          01. The Academic Disconnect
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-tx-primary">
          Studying subjects does not make skill development visible.
        </h2>
        <p className="text-base text-tx-secondary mt-4 max-w-3xl leading-relaxed">
          Universities publish exhaustive syllabi filled with textbook citations, credit formulas, and exam codes.
          Yet students frequently graduate unable to articulate what they can actually build or solve, and employers
          struggle to decipher what a course code represents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-5 bg-bg-surface border border-border rounded-xl">
            <div className="text-terracotta font-mono text-xs uppercase font-bold mb-2">Traditional Syllabus</div>
            <p className="text-xs text-tx-secondary leading-relaxed">
              Treated as a disconnected legal contract or static PDF of topics to finish before final examinations.
            </p>
          </div>
          <div className="p-5 bg-bg-surface border border-border rounded-xl">
            <div className="text-terracotta font-mono text-xs uppercase font-bold mb-2">Generic LMS</div>
            <p className="text-xs text-tx-secondary leading-relaxed">
              Acts as a file locker for slides and homework dropboxes without understanding competency relationships.
            </p>
          </div>
          <div className="p-5 bg-forest-soft border border-forest/30 rounded-xl">
            <div className="text-forest-dark font-mono text-xs uppercase font-bold mb-2">SyllabusSync Intelligence</div>
            <p className="text-xs text-forest-dark leading-relaxed font-medium">
              Maps every lecture topic to practical competencies, evaluation rubrics, and real verified artifacts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Five Core Questions */}
      <section id="solution" className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
        <div className="text-xs font-mono uppercase tracking-wider text-forest font-semibold mb-2">
          02. The Core Solution
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-tx-primary">
          Five essential questions every curriculum must answer.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            {
              q: '1. What am I expected to learn in my degree?',
              ans: 'Navigate complete multi-year program architectures with transparent credit allocations and learning outcomes.'
            },
            {
              q: '2. Which concepts and skills does each subject develop?',
              ans: 'Understand the exact relationship strength: does a course Introduce, Develop, Reinforce, or Formally Assess a skill?'
            },
            {
              q: '3. How are those skills demonstrated through practical work?',
              ans: 'Connect learning outcomes with programming assignments, lab practicals, viva voce examinations, and student GitHub repositories.'
            },
            {
              q: '4. Which competencies have I actually developed?',
              ans: 'Track your personal proficiency against clear 5-level rubrics, separating passive lecture attendance from verified evidence.'
            },
            {
              q: '5. What should I learn next to bridge my skill gaps?',
              ans: 'Generate personalized learning pathways that recommend prerequisite concepts and projects to reach your target mastery.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-bg-surface border border-border rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-tx-primary mb-2">
                  {item.q}
                </h3>
                <p className="text-xs text-tx-secondary leading-relaxed">
                  {item.ans}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: For Universities */}
      <section id="institutional" className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
        <div className="text-xs font-mono uppercase tracking-wider text-infoBlue font-semibold mb-2">
          03. For Academic Institutions
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-tx-primary">
          Accreditation, mapping completeness, and curriculum gap detection.
        </h2>
        <p className="text-base text-tx-secondary mt-4 max-w-3xl leading-relaxed">
          Faculty and academic deans can audit their entire syllabus matrix in real-time. Detect topics with no competency mapping,
          identify course outcomes lacking assessment evidence, and align with ABET and NBA criteria.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-5 bg-bg-surface border border-border rounded-xl">
            <div className="text-2xl font-serif font-bold text-tx-primary">94.2%</div>
            <div className="text-xs text-tx-secondary font-mono mt-1">Topic Mapping Coverage</div>
            <p className="text-xs text-tx-muted mt-2">Explicitly flags unmapped curriculum topics for faculty review.</p>
          </div>
          <div className="p-5 bg-bg-surface border border-border rounded-xl">
            <div className="text-2xl font-serif font-bold text-tx-primary">100%</div>
            <div className="text-xs text-tx-secondary font-mono mt-1">Outcome-to-Assessment Traceability</div>
            <p className="text-xs text-tx-muted mt-2">Every learning outcome is linked to a concrete evaluation rubric.</p>
          </div>
          <div className="p-5 bg-bg-surface border border-border rounded-xl">
            <div className="text-2xl font-serif font-bold text-tx-primary">Tier-1</div>
            <div className="text-xs text-tx-secondary font-mono mt-1">Accreditation Readiness</div>
            <p className="text-xs text-tx-muted mt-2">Exports programmatic matrices directly for accreditation review boards.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-6 bg-forest-dark text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            "Make every subject count. <br /> Make every skill visible."
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-6 max-w-xl mx-auto">
            Experience the Curriculum-to-Competency intelligence platform designed for forward-thinking engineering education.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <NavLink
              to="/overview"
              onClick={() => switchRole('student')}
              className="px-6 py-3 rounded-lg bg-white text-forest-dark font-medium text-sm hover:bg-forest-soft transition-colors shadow-elevated"
            >
              Enter Student Workspace
            </NavLink>
            <NavLink
              to="/faculty"
              onClick={() => switchRole('faculty')}
              className="px-6 py-3 rounded-lg bg-forest text-white border border-white/20 font-medium text-sm hover:bg-forest-light transition-colors"
            >
              Enter Faculty Workspace
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

