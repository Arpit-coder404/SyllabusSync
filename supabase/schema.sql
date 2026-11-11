-- ====================================================================
-- SyllabusSync Production PostgreSQL Database Schema (Supabase Aligned)
-- Curriculum Intelligence & Competency Mapping Platform
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Departments
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    head_of_department VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Profiles (Extending auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
    department_id UUID REFERENCES departments(id),
    student_id_number VARCHAR(64),
    faculty_title VARCHAR(128),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Academic Programs
CREATE TABLE IF NOT EXISTS academic_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    degree VARCHAR(128) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    duration_years INT NOT NULL DEFAULT 4,
    total_semesters INT NOT NULL DEFAULT 8,
    credits_required INT NOT NULL DEFAULT 160,
    description TEXT,
    accreditation_status VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academic Years & Semesters
CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_label VARCHAR(32) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES academic_programs(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_number INT NOT NULL CHECK (semester_number >= 1 AND semester_number <= 12),
    label VARCHAR(64) NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Courses & Subjects
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    code VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    description TEXT,
    faculty_id UUID REFERENCES user_profiles(id),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_prerequisites (
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    prerequisite_course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, prerequisite_course_id)
);

-- 6. Syllabus Documents, Units & Topics
CREATE TABLE IF NOT EXISTS syllabus_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    extracted_text TEXT,
    uploaded_by UUID REFERENCES user_profiles(id),
    version INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS syllabus_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_hours INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS syllabus_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES syllabus_units(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    hours INT NOT NULL DEFAULT 2,
    difficulty VARCHAR(32) NOT NULL DEFAULT 'intermediate' CHECK (difficulty IN ('introductory', 'intermediate', 'advanced')),
    is_mapped BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Learning Outcomes
CREATE TABLE IF NOT EXISTS learning_outcomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    code VARCHAR(32) NOT NULL, -- e.g. CO1, CO2
    statement TEXT NOT NULL,
    blooms_level VARCHAR(32) NOT NULL CHECK (blooms_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Competencies & Progression Levels
CREATE TABLE IF NOT EXISTS competency_categories (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    category_id VARCHAR(32) NOT NULL REFERENCES competency_categories(id),
    description TEXT NOT NULL,
    target_level INT NOT NULL DEFAULT 4 CHECK (target_level >= 1 AND target_level <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS competency_levels (
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    level INT NOT NULL CHECK (level >= 1 AND level <= 5),
    descriptor TEXT NOT NULL,
    PRIMARY KEY (competency_id, level)
);

CREATE TABLE IF NOT EXISTS competency_prerequisites (
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    prerequisite_competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    PRIMARY KEY (competency_id, prerequisite_competency_id)
);

-- 9. Curriculum Mappings
CREATE TABLE IF NOT EXISTS curriculum_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    unit_id UUID NOT NULL REFERENCES syllabus_units(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES syllabus_topics(id) ON DELETE CASCADE,
    learning_outcome_id UUID NOT NULL REFERENCES learning_outcomes(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    relationship VARCHAR(32) NOT NULL CHECK (relationship IN ('introduces', 'develops', 'reinforces', 'assesses')),
    expected_proficiency INT NOT NULL DEFAULT 3 CHECK (expected_proficiency >= 1 AND expected_proficiency <= 5),
    rationale TEXT,
    review_status VARCHAR(32) NOT NULL DEFAULT 'approved' CHECK (review_status IN ('approved', 'in_review', 'draft')),
    reviewer_notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (topic_id, competencyId)
);

-- 10. Assessments & Rubrics
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES syllabus_units(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL CHECK (type IN ('written_exam', 'programming_assignment', 'lab_practical', 'research_report', 'project', 'presentation', 'viva', 'faculty_eval')),
    max_score NUMERIC(5, 2) NOT NULL DEFAULT 100.00,
    deadline TIMESTAMPTZ,
    status VARCHAR(32) DEFAULT 'open' CHECK (status IN ('upcoming', 'open', 'submitted', 'graded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_rubrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    criterion VARCHAR(255) NOT NULL,
    weight INT NOT NULL CHECK (weight >= 0 AND weight <= 100),
    target_level INT NOT NULL DEFAULT 3 CHECK (target_level >= 1 AND target_level <= 5),
    description TEXT
);

-- 11. Student Enrollments & Competency Records
CREATE TABLE IF NOT EXISTS student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

CREATE TABLE IF NOT EXISTS student_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    expected_level INT NOT NULL DEFAULT 4,
    current_demonstrated_level INT NOT NULL DEFAULT 1 CHECK (current_demonstrated_level >= 1 AND current_demonstrated_level <= 5),
    status VARCHAR(32) NOT NULL DEFAULT 'unassessed' CHECK (status IN ('unassessed', 'attention_required', 'developing', 'proficient', 'advanced')),
    last_evaluated_at TIMESTAMPTZ,
    evidence_count INT DEFAULT 0,
    UNIQUE (student_id, competency_id)
);

-- 12. Student Evidence & Reviews
CREATE TABLE IF NOT EXISTS student_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    learning_outcome_id UUID REFERENCES learning_outcomes(id) ON DELETE SET NULL,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    evidence_type VARCHAR(64) NOT NULL CHECK (evidence_type IN ('github', 'live_demo', 'report_pdf', 'presentation', 'lab_record', 'certificate')),
    url_or_content TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    review_status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'verified', 'revision_requested')),
    score NUMERIC(5, 2),
    feedback TEXT,
    reviewer_id UUID REFERENCES user_profiles(id),
    verified_level INT CHECK (verified_level >= 1 AND verified_level <= 5)
);

-- 13. Personalized Learning Pathways
CREATE TABLE IF NOT EXISTS learning_pathways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    target_competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'paused')),
    target_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pathway_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pathway_id UUID NOT NULL REFERENCES learning_pathways(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    concept_topic_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    description TEXT,
    activity_type VARCHAR(64) NOT NULL CHECK (activity_type IN ('reading', 'lab_exercise', 'project_milestone', 'assessment_prep')),
    status VARCHAR(32) NOT NULL DEFAULT 'locked' CHECK (status IN ('completed', 'available', 'locked')),
    sequence_order INT NOT NULL DEFAULT 1,
    estimated_hours INT DEFAULT 4,
    deliverable TEXT
);

-- 14. Notifications & Activity Logs
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(64) NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    actor_name VARCHAR(255) NOT NULL,
    actor_role VARCHAR(32) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- Performance Indexes
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_courses_semester ON courses(semester_id);
CREATE INDEX IF NOT EXISTS idx_syllabus_topics_unit ON syllabus_topics(unit_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_course ON curriculum_mappings(course_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_comp ON curriculum_mappings(competency_id);
CREATE INDEX IF NOT EXISTS idx_student_competencies_student ON student_competencies(student_id);
CREATE INDEX IF NOT EXISTS idx_student_evidence_student ON student_evidence(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id) WHERE is_read = FALSE;

-- ====================================================================
-- Supabase Row Level Security (RLS) Policies
-- ====================================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Students view & manage their own evidence
CREATE POLICY "Students manage own evidence"
    ON student_evidence
    FOR ALL
    USING (auth.uid() = student_id);

-- Faculty can read and update all evidence for grading
CREATE POLICY "Faculty can grade evidence"
    ON student_evidence
    FOR UPDATE
    USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('faculty', 'admin')));

-- Everyone can view published curriculum
ALTER TABLE academic_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read academic programs" ON academic_programs FOR SELECT USING (true);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published courses" ON courses FOR SELECT USING (is_published = true);

ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read competencies" ON competencies FOR SELECT USING (true);

ALTER TABLE curriculum_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mappings" ON curriculum_mappings FOR SELECT USING (review_status = 'approved');

