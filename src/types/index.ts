export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  programId: string;
  currentSemesterNumber: number;
  studentIdNumber?: string;
  facultyTitle?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  headOfDepartment: string;
  facultyCount: number;
  coursesCount: number;
}

export interface AcademicProgram {
  id: string;
  code: string;
  name: string;
  degree: string;
  departmentId: string;
  durationYears: number;
  totalSemesters: number;
  creditsRequired: number;
  description: string;
  accreditationStatus: string;
}

export interface Semester {
  id: string;
  programId: string;
  semesterNumber: number;
  academicYear: string;
  label: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
}

export interface Course {
  id: string;
  semesterId: string;
  code: string;
  name: string;
  credits: number;
  departmentId: string;
  description: string;
  prerequisiteCourseIds: string[];
  facultyId: string;
  facultyName: string;
  syllabusDocumentUrl?: string;
  isPublished: boolean;
  color?: string;
}

export interface SyllabusUnit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
}

export type TopicDifficulty = 'introductory' | 'intermediate' | 'advanced';

export interface SyllabusTopic {
  id: string;
  unitId: string;
  courseId: string;
  title: string;
  description: string;
  hours: number;
  difficulty: TopicDifficulty;
  prerequisiteTopicIds: string[];
  isMapped: boolean;
}

export type BloomsTaxonomy = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export interface LearningOutcome {
  id: string;
  courseId: string;
  code: string; // e.g. "CO1", "CO2"
  statement: string;
  bloomsLevel: BloomsTaxonomy;
}

export type CompetencyCategory = 'technical' | 'analytical' | 'professional' | 'creative';

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export const PROFICIENCY_NAMES: Record<ProficiencyLevel, string> = {
  1: 'Awareness',
  2: 'Foundational',
  3: 'Developing',
  4: 'Proficient',
  5: 'Advanced'
};

export const PROFICIENCY_COLORS: Record<ProficiencyLevel, { bg: string; text: string; border: string }> = {
  1: { bg: '#F5F5F0', text: '#747B73', border: '#E4E5DE' },
  2: { bg: '#EBF1F6', text: '#4B6B85', border: '#BDD2E1' },
  3: { bg: '#FDF6E2', text: '#A27315', border: '#F0E9D4' },
  4: { bg: '#E4ECE4', text: '#315C46', border: '#C8D8C8' },
  5: { bg: '#315C46', text: '#FFFFFF', border: '#254736' }
};

export interface Competency {
  id: string;
  name: string;
  category: CompetencyCategory;
  description: string;
  levels: Record<ProficiencyLevel, string>;
  prerequisiteCompetencyIds: string[];
  targetLevel: ProficiencyLevel;
  industryDemandRank?: 'high' | 'very_high' | 'critical';
}

export type MappingRelationship = 'introduces' | 'develops' | 'reinforces' | 'assesses';

export interface CurriculumMapping {
  id: string;
  courseId: string;
  unitId: string;
  topicId: string;
  learningOutcomeId: string;
  competencyId: string;
  relationship: MappingRelationship;
  expectedProficiency: ProficiencyLevel;
  rationale: string;
  reviewStatus: 'approved' | 'in_review' | 'draft';
  reviewerNotes?: string;
  updatedAt: string;
}

export type AssessmentType = 
  | 'written_exam'
  | 'programming_assignment'
  | 'lab_practical'
  | 'research_report'
  | 'project'
  | 'presentation'
  | 'viva'
  | 'faculty_eval';

export interface AssessmentRubricCriterion {
  id: string;
  criterion: string;
  weight: number; // percentage
  targetLevel: ProficiencyLevel;
  description: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  unitId?: string;
  title: string;
  type: AssessmentType;
  learningOutcomeIds: string[];
  targetCompetencyIds: string[];
  maxScore: number;
  deadline: string;
  status: 'upcoming' | 'open' | 'submitted' | 'graded';
  rubric: AssessmentRubricCriterion[];
}

export type EvidenceType = 
  | 'github'
  | 'live_demo'
  | 'report_pdf'
  | 'presentation'
  | 'lab_record'
  | 'certificate';

export interface StudentEvidence {
  id: string;
  studentId: string;
  title: string;
  description: string;
  competencyId: string;
  learningOutcomeId?: string;
  courseId: string;
  assessmentId?: string;
  evidenceType: EvidenceType;
  urlOrContent: string;
  submittedAt: string;
  reviewStatus: 'pending' | 'verified' | 'revision_requested';
  score?: number;
  feedback?: string;
  reviewerName?: string;
  verifiedLevel?: ProficiencyLevel;
}

export type CompetencyStatus = 'unassessed' | 'attention_required' | 'developing' | 'proficient' | 'advanced';

export interface StudentCompetencyRecord {
  competencyId: string;
  studentId: string;
  expectedLevel: ProficiencyLevel;
  currentDemonstratedLevel: ProficiencyLevel;
  status: CompetencyStatus;
  lastEvaluatedAt?: string;
  evidenceCount: number;
  coverageInCurriculum: 'core' | 'elective' | 'prerequisite_chain';
}

export type SkillGapCategory = 
  | 'not_introduced'
  | 'introduced_not_assessed'
  | 'below_expected'
  | 'developing'
  | 'meets_expected'
  | 'exceeds_expected';

export interface SkillGapItem {
  competencyId: string;
  competencyName: string;
  category: CompetencyCategory;
  expectedLevel: ProficiencyLevel;
  demonstratedLevel: ProficiencyLevel;
  gapCategory: SkillGapCategory;
  relatedCourseCodes: string[];
  recommendation: string;
  prerequisitesMet: boolean;
}

export interface PathwayStep {
  id: string;
  title: string;
  conceptTopicId?: string;
  courseId?: string;
  description: string;
  activityType: 'reading' | 'lab_exercise' | 'project_milestone' | 'assessment_prep';
  status: 'completed' | 'available' | 'locked';
  prerequisites: string[]; // step IDs
  estimatedHours: number;
  evidenceId?: string;
  deliverable: string;
}

export interface LearningPathway {
  id: string;
  studentId: string;
  targetCompetencyId: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed' | 'paused';
  createdAt: string;
  targetDate: string;
  steps: PathwayStep[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'mapping_update' | 'assessment_graded' | 'evidence_reviewed' | 'gap_alert' | 'curriculum_published';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface ActivityLog {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetName: string;
  timestamp: string;
  category: 'curriculum' | 'assessment' | 'competency' | 'evidence';
}

