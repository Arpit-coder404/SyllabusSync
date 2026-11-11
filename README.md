# SyllabusSync
### Curriculum Intelligence & Competency Mapping Platform

> **"Connect what you study with what you can actually do."**

SyllabusSync is a modern academic intelligence platform that bridges university syllabi, academic subjects, learning outcomes, concepts, practical skills, assessments, and real-world competencies.

It helps engineering students and universities understand what a curriculum actually teaches, what practical skills it develops, how those skills are assessed, and where learning gaps exist.

---

## 🎯 The Five Core Questions

1. **What am I expected to learn in my degree?**
   Multi-year degree structure, semester milestones, contact hours, and ABET/NBA alignment.
2. **Which concepts and skills does each subject develop?**
   Formal relationship strengths: whether a course **Introduces**, **Develops**, **Reinforces**, or **Assesses** a competency.
3. **How are those skills demonstrated through practical work?**
   Connecting course outcomes to programming assignments, laboratory practicals, viva voce examinations, and student GitHub repositories.
4. **Which competencies have I actually developed?**
   Transparent 5-level proficiency progression, distinguishing passive lecture exposure from verified evidence.
5. **What should I learn next to bridge my skill gaps?**
   Grounded personalized learning pathways with milestone prerequisites and practical deliverables.

---

## 🎨 Visual Identity & Design System

Crafted with an academic editorial style inspired by modern research workspaces and knowledge graph platforms:

- **Style:** Modern academic editorial + intelligent knowledge workspace.
- **Main Background:** `#F5F5F0`
- **Main Surface:** `#FFFFFF`
- **Primary Text:** `#222923`
- **Secondary Text:** `#747B73`
- **Deep Forest:** `#315C46` (Established competencies & completed learning)
- **Muted Sage:** `#E4ECE4`
- **Soft Yellow / Amber:** `#F0E9D4` / `#D99B26` (Developing competencies & rubrics)
- **Accent Terracotta:** `#BD7458` (Prerequisite gaps & attention-required areas)
- **Information Blue:** `#6689A5` (Outcomes & academic relationships)
- **Border:** `#E4E5DE`
- **Sidebar:** `#ECEFE8`
- **Typography:** Manrope (Headings), Inter (Body), IBM Plex Mono (Technical labels).

*Strictly avoids AI clichés: No purple neon gradients, no glassmorphism, no floating decorative blobs, no robot illustrations, and no arbitrary percentages.*

---

## 🧭 Navigation Structure

- **MY LEARNING**
  - **Overview (`/overview`):** Key indicators from real records, subjects in current term, competency snapshot, learning pathways, and attention alerts.
  - **My Curriculum (`/curriculum`):** Program progression, semester timeline, accredited courses.
  - **My Competencies (`/competencies`):** 5-tier proficiency profile, rubric definitions, and project evidence.
  - **Learning Pathways (`/pathways`):** Milestone sequence generator bridging diagnosed gaps.
- **ACADEMIC STRUCTURE**
  - **Programs (`/programs`):** Degree metadata, duration, credits, and accreditation status.
  - **Courses & Subjects (`/courses`):** Complete course catalogue with prerequisites.
  - **Subject Detail (`/courses/:id`):** 6-tab deep dive (Overview, Syllabus, Concepts, Competencies, Assessments, Evidence).
  - **Learning Outcomes (`/outcomes`):** Course outcomes classified by Bloom's Taxonomy.
- **INTELLIGENCE**
  - **Competency Graph (`/graph`):** Signature interactive node graph connecting Programs → Courses → Units → Topics → Outcomes → Competencies → Assessments with zoom, pan, minimap, filters, and inspector drawer.
  - **Skill Gap Analysis (`/skill-gap`):** Diagnostic engine comparing expected vs demonstrated proficiency.
  - **Curriculum Analytics (`/analytics`):** Institutional audit with topic mapping coverage, outcome traceability, category distribution charts, and gap reports.
- **ASSESSMENT & EVIDENCE**
  - **Assessments (`/assessments`):** Coursework evaluations with multi-criterion rubrics and artifact submission modal.
  - **Evidence Portfolio (`/evidence`):** Student code repositories, reports, and faculty evaluation scores.
  - **Progress History (`/history`):** Complete chronological audit trail.
- **MANAGEMENT**
  - **Faculty Workspace (`/faculty`):** Editable Course-to-Competency Mapping Matrix, curriculum validation checklist, and pending student evidence evaluation queue.
  - **Curriculum Builder (`/curriculum-builder`):** Document ingestion workflow (PDF/DOCX/text parser with sample loader) + structured review & correction before publishing.
  - **Administration (`/admin`):** Institutional program configuration, framework editor, and JSON export.

---

## 👥 User Roles & Demo Switcher

The application includes an instant **Demo Role Switcher** in the bottom sidebar and top navigation banner:

1. **Student (Aarav Sharma):** B.Tech CSE, Semester 3 (Roll: `22BCSE104`). Explores subjects, tracks competencies, views skill gaps, manages pathways, and submits project evidence.
2. **Faculty (Dr. Evelyn Vance):** Associate Professor & Course Coordinator for CS301. Edits mapping matrices, audits unmapped syllabus topics, and grades evidence submissions against rubrics.
3. **Administrator (Prof. Rajeshwar Kulkarni):** Dean of Academic Affairs & Accreditation Chair. Manages degree structures, institutional competency frameworks, and exports accreditation reports.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Execution

```bash
# Clone or navigate to the directory
cd SyllabusSync

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
# TypeScript verification & Vite build
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Complete End-to-End Test Workflow

### 1. Student Journey: Bridging a Competency Gap
1. Open the platform as **Student**.
2. Go to **Overview** (`/overview`) and note the **Attention Required** alert: *Relational Database Design lacks practical BCNF project evidence*.
3. Click **Competency Graph** (`/graph`) in the sidebar.
4. Select the **Relational Database Design** node to open the inspector drawer; observe the 5-tier progression levels.
5. Navigate to **Skill Gap Analysis** (`/skill-gap`) and click **Bridge Gap via Pathway**.
6. On **Learning Pathways** (`/pathways`), review the milestone steps and check off Step 3: *Decompose Schema into Boyce-Codd Normal Form*.
7. Go to **Assessments** (`/assessments`), find *Hospital Management BCNF Schema Project*, and click **Submit Artifact**.
8. Fill in the GitHub repository URL and submit.

### 2. Faculty Journey: Evaluation & Matrix Mapping
1. Switch to **Faculty** using the Demo Role Switcher.
2. Open **Faculty Workspace** (`/faculty`).
3. Under *Student Evidence Submissions Awaiting Evaluation*, find Aarav Sharma's project.
4. Click **Evaluate Rubric**, assign score `96/100`, select **Level 4: Proficient**, write constructive feedback, and click **Submit & Update Competency Record**.
5. Switch back to **Student** role: Notice that **Relational Database Design** is now updated to **Level 4 (Proficient)** in both the Student Competency Profile and the Overview snapshot!
6. In **Faculty Workspace**, interact with the **Course Mapping Matrix** to adjust topic-to-competency relationships in real-time.

---

## 🗄️ Database Architecture (PostgreSQL / Supabase)

A production-grade schema is available in `supabase/schema.sql` covering:
- 15 relational tables: `user_profiles`, `departments`, `academic_programs`, `semesters`, `courses`, `syllabus_units`, `syllabus_topics`, `learning_outcomes`, `competencies`, `curriculum_mappings`, `assessments`, `student_competencies`, `student_evidence`, `learning_pathways`, `activity_logs`.
- Foreign key constraints, compound primary keys, indexes, and Row Level Security (RLS) policies.

---

## 📄 License

MIT License. Designed with precision for engineering and academic institutions.

