import { create } from 'zustand';
import {
  UserProfile,
  UserRole,
  AcademicProgram,
  Semester,
  Course,
  SyllabusUnit,
  SyllabusTopic,
  LearningOutcome,
  Competency,
  CurriculumMapping,
  Assessment,
  StudentEvidence,
  StudentCompetencyRecord,
  LearningPathway,
  PathwayStep,
  AppNotification,
  ActivityLog,
  ProficiencyLevel,
  SkillGapItem,
  CompetencyCategory
} from '../types';
import {
  mockDepartment,
  mockProgram,
  mockUsers,
  mockSemesters,
  mockCourses,
  mockUnits,
  mockTopics,
  mockLearningOutcomes,
  mockCompetencies,
  mockCurriculumMappings,
  mockAssessments,
  mockStudentCompetencyRecords,
  mockStudentEvidence,
  mockLearningPathways,
  mockNotifications,
  mockActivityLogs
} from '../data/mockData';

const LOCAL_STORAGE_KEY = 'syllabussync_app_state_v1';

interface AppState {
  // Session & Role
  currentRole: UserRole;
  currentUser: UserProfile;
  selectedProgramId: string;
  selectedSemesterId: string;
  isSearchOpen: boolean;
  searchQuery: string;

  // Domain Entities
  department: typeof mockDepartment;
  programs: AcademicProgram[];
  semesters: Semester[];
  courses: Course[];
  units: SyllabusUnit[];
  topics: SyllabusTopic[];
  learningOutcomes: LearningOutcome[];
  competencies: Competency[];
  mappings: CurriculumMapping[];
  assessments: Assessment[];
  studentCompetencies: StudentCompetencyRecord[];
  studentEvidence: StudentEvidence[];
  pathways: LearningPathway[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];

  // Actions
  switchRole: (role: UserRole) => void;
  selectProgram: (id: string) => void;
  selectSemester: (id: string) => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  // Course & Curriculum Actions
  addCourse: (course: Omit<Course, 'id'>) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Syllabus Structure Actions
  addUnit: (unit: Omit<SyllabusUnit, 'id'>) => SyllabusUnit;
  addTopic: (topic: Omit<SyllabusTopic, 'id' | 'isMapped'>) => SyllabusTopic;
  updateTopic: (id: string, updates: Partial<SyllabusTopic>) => void;
  deleteTopic: (id: string) => void;

  // Learning Outcomes
  addLearningOutcome: (outcome: Omit<LearningOutcome, 'id'>) => LearningOutcome;
  updateLearningOutcome: (id: string, updates: Partial<LearningOutcome>) => void;
  deleteLearningOutcome: (id: string) => void;

  // Competency Actions
  addCompetency: (competency: Omit<Competency, 'id'>) => Competency;
  updateCompetency: (id: string, updates: Partial<Competency>) => void;

  // Mapping Actions
  addMapping: (mapping: Omit<CurriculumMapping, 'id' | 'updatedAt'>) => CurriculumMapping;
  updateMapping: (id: string, updates: Partial<CurriculumMapping>) => void;
  deleteMapping: (id: string) => void;
  batchSetMapping: (
    courseId: string,
    topicId: string,
    outcomeId: string,
    competencyId: string,
    relationship: CurriculumMapping['relationship'],
    expectedProficiency: ProficiencyLevel
  ) => void;

  // Assessment Actions
  addAssessment: (assessment: Omit<Assessment, 'id'>) => Assessment;
  updateAssessment: (id: string, updates: Partial<Assessment>) => void;

  // Student Evidence & Review Workflow
  submitEvidence: (evidence: Omit<StudentEvidence, 'id' | 'submittedAt' | 'reviewStatus'>) => StudentEvidence;
  reviewEvidence: (
    evidenceId: string,
    review: {
      reviewStatus: 'verified' | 'revision_requested';
      score?: number;
      feedback?: string;
      verifiedLevel?: ProficiencyLevel;
      reviewerName: string;
    }
  ) => void;

  // Pathway Actions
  createPathway: (
    targetCompetencyId: string,
    title: string,
    description: string,
    steps: Array<Omit<LearningPathway['steps'][0], 'id' | 'status'>>
  ) => LearningPathway;
  togglePathwayStep: (pathwayId: string, stepId: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Gap Analysis Helper
  getSkillGapAnalysis: () => SkillGapItem[];

  // Reset
  resetToDefaultData: () => void;
}

// Load from localStorage or use initial mock data
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        currentUser: mockUsers[parsed.currentRole || 'student'],
        isSearchOpen: false,
        searchQuery: ''
      };
    }
  } catch (e) {
    console.warn('Failed to parse saved state from localStorage', e);
  }

  return {
    currentRole: 'student' as UserRole,
    currentUser: mockUsers.student,
    selectedProgramId: 'prog-btech-cse',
    selectedSemesterId: 'sem-3',
    isSearchOpen: false,
    searchQuery: '',
    department: mockDepartment,
    programs: [mockProgram],
    semesters: mockSemesters,
    courses: mockCourses,
    units: mockUnits,
    topics: mockTopics,
    learningOutcomes: mockLearningOutcomes,
    competencies: mockCompetencies,
    mappings: mockCurriculumMappings,
    assessments: mockAssessments,
    studentCompetencies: mockStudentCompetencyRecords,
    studentEvidence: mockStudentEvidence,
    pathways: mockLearningPathways,
    notifications: mockNotifications,
    activityLogs: mockActivityLogs
  };
};

const initialState = loadInitialState();

export const useAppStore = create<AppState>((set, get) => {
  // Persist helper
  const persistState = (updater: (prev: AppState) => Partial<AppState>) => {
    set((state) => {
      const next = updater(state);
      const updated = { ...state, ...next };
      try {
        const toSave = {
          currentRole: updated.currentRole,
          selectedProgramId: updated.selectedProgramId,
          selectedSemesterId: updated.selectedSemesterId,
          programs: updated.programs,
          semesters: updated.semesters,
          courses: updated.courses,
          units: updated.units,
          topics: updated.topics,
          learningOutcomes: updated.learningOutcomes,
          competencies: updated.competencies,
          mappings: updated.mappings,
          assessments: updated.assessments,
          studentCompetencies: updated.studentCompetencies,
          studentEvidence: updated.studentEvidence,
          pathways: updated.pathways,
          notifications: updated.notifications,
          activityLogs: updated.activityLogs
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.error('Failed to save state to localStorage', e);
      }
      return next;
    });
  };

  return {
    ...initialState,

    switchRole: (role: UserRole) => {
      persistState(() => ({
        currentRole: role,
        currentUser: mockUsers[role]
      }));
    },

    selectProgram: (id: string) => {
      persistState(() => ({ selectedProgramId: id }));
    },

    selectSemester: (id: string) => {
      persistState(() => ({ selectedSemesterId: id }));
    },

    setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),

    // Course CRUD
    addCourse: (courseData) => {
      const newCourse: Course = {
        ...courseData,
        id: `course-${Date.now()}`
      };
      persistState((state) => ({
        courses: [...state.courses, newCourse],
        activityLogs: [
          {
            id: `act-${Date.now()}`,
            actorName: state.currentUser.name,
            actorRole: state.currentRole,
            action: 'Created new course',
            targetName: `${newCourse.code} — ${newCourse.name}`,
            timestamp: new Date().toISOString(),
            category: 'curriculum'
          },
          ...state.activityLogs
        ]
      }));
      return newCourse;
    },

    updateCourse: (id, updates) => {
      persistState((state) => ({
        courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c))
      }));
    },

    deleteCourse: (id) => {
      persistState((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
        units: state.units.filter((u) => u.courseId !== id),
        topics: state.topics.filter((t) => t.courseId !== id),
        learningOutcomes: state.learningOutcomes.filter((lo) => lo.courseId !== id),
        mappings: state.mappings.filter((m) => m.courseId !== id)
      }));
    },

    // Units & Topics
    addUnit: (unitData) => {
      const newUnit: SyllabusUnit = {
        ...unitData,
        id: `unit-${Date.now()}`
      };
      persistState((state) => ({
        units: [...state.units, newUnit]
      }));
      return newUnit;
    },

    addTopic: (topicData) => {
      const newTopic: SyllabusTopic = {
        ...topicData,
        id: `top-${Date.now()}`,
        isMapped: false
      };
      persistState((state) => ({
        topics: [...state.topics, newTopic]
      }));
      return newTopic;
    },

    updateTopic: (id, updates) => {
      persistState((state) => ({
        topics: state.topics.map((t) => (t.id === id ? { ...t, ...updates } : t))
      }));
    },

    deleteTopic: (id) => {
      persistState((state) => ({
        topics: state.topics.filter((t) => t.id !== id),
        mappings: state.mappings.filter((m) => m.topicId !== id)
      }));
    },

    // Learning Outcomes
    addLearningOutcome: (outcomeData) => {
      const newOutcome: LearningOutcome = {
        ...outcomeData,
        id: `lo-${Date.now()}`
      };
      persistState((state) => ({
        learningOutcomes: [...state.learningOutcomes, newOutcome]
      }));
      return newOutcome;
    },

    updateLearningOutcome: (id, updates) => {
      persistState((state) => ({
        learningOutcomes: state.learningOutcomes.map((lo) => (lo.id === id ? { ...lo, ...updates } : lo))
      }));
    },

    deleteLearningOutcome: (id) => {
      persistState((state) => ({
        learningOutcomes: state.learningOutcomes.filter((lo) => lo.id !== id),
        mappings: state.mappings.filter((m) => m.learningOutcomeId !== id)
      }));
    },

    // Competencies
    addCompetency: (compData) => {
      const newComp: Competency = {
        ...compData,
        id: `comp-${Date.now()}`
      };
      persistState((state) => ({
        competencies: [...state.competencies, newComp]
      }));
      return newComp;
    },

    updateCompetency: (id, updates) => {
      persistState((state) => ({
        competencies: state.competencies.map((c) => (c.id === id ? { ...c, ...updates } : c))
      }));
    },

    // Curriculum Mapping
    addMapping: (mappingData) => {
      const newMapping: CurriculumMapping = {
        ...mappingData,
        id: `map-${Date.now()}`,
        updatedAt: new Date().toISOString()
      };
      persistState((state) => {
        // Mark topic as mapped
        const updatedTopics = state.topics.map((t) =>
          t.id === mappingData.topicId ? { ...t, isMapped: true } : t
        );
        return {
          mappings: [...state.mappings, newMapping],
          topics: updatedTopics,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              actorName: state.currentUser.name,
              actorRole: state.currentRole,
              action: `Mapped topic to competency (${mappingData.relationship})`,
              targetName: `Topic ID: ${mappingData.topicId}`,
              timestamp: new Date().toISOString(),
              category: 'curriculum'
            },
            ...state.activityLogs
          ]
        };
      });
      return newMapping;
    },

    updateMapping: (id, updates) => {
      persistState((state) => ({
        mappings: state.mappings.map((m) =>
          m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
        )
      }));
    },

    deleteMapping: (id) => {
      persistState((state) => {
        const mappingToDelete = state.mappings.find((m) => m.id === id);
        const remainingMappings = state.mappings.filter((m) => m.id !== id);
        let updatedTopics = state.topics;
        if (mappingToDelete) {
          const hasOtherMappings = remainingMappings.some((m) => m.topicId === mappingToDelete.topicId);
          if (!hasOtherMappings) {
            updatedTopics = state.topics.map((t) =>
              t.id === mappingToDelete.topicId ? { ...t, isMapped: false } : t
            );
          }
        }
        return {
          mappings: remainingMappings,
          topics: updatedTopics
        };
      });
    },

    batchSetMapping: (courseId, topicId, outcomeId, competencyId, relationship, expectedProficiency) => {
      persistState((state) => {
        const existingIndex = state.mappings.findIndex(
          (m) => m.topicId === topicId && m.competencyId === competencyId
        );
        let newMappings = [...state.mappings];
        if (existingIndex >= 0) {
          newMappings[existingIndex] = {
            ...newMappings[existingIndex],
            relationship,
            expectedProficiency,
            learningOutcomeId: outcomeId,
            updatedAt: new Date().toISOString()
          };
        } else {
          const targetTopic = state.topics.find((t) => t.id === topicId);
          newMappings.push({
            id: `map-${Date.now()}`,
            courseId,
            unitId: targetTopic ? targetTopic.unitId : 'unit-cs301-u1',
            topicId,
            learningOutcomeId: outcomeId,
            competencyId,
            relationship,
            expectedProficiency,
            rationale: `Mapped via faculty curriculum matrix matrix for outcome ${outcomeId}`,
            reviewStatus: 'approved',
            updatedAt: new Date().toISOString()
          });
        }

        const updatedTopics = state.topics.map((t) =>
          t.id === topicId ? { ...t, isMapped: true } : t
        );

        return {
          mappings: newMappings,
          topics: updatedTopics
        };
      });
    },

    // Assessments
    addAssessment: (assessmentData) => {
      const newAsm: Assessment = {
        ...assessmentData,
        id: `asm-${Date.now()}`
      };
      persistState((state) => ({
        assessments: [...state.assessments, newAsm],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'New Assessment Added',
            message: `${newAsm.title} has been published with defined evaluation rubrics.`,
            type: 'assessment_graded',
            timestamp: new Date().toISOString(),
            isRead: false,
            link: '/assessments'
          },
          ...state.notifications
        ]
      }));
      return newAsm;
    },

    updateAssessment: (id, updates) => {
      persistState((state) => ({
        assessments: state.assessments.map((a) => (a.id === id ? { ...a, ...updates } : a))
      }));
    },

    // Evidence Submission & Review
    submitEvidence: (evidenceData) => {
      const newEvidence: StudentEvidence = {
        ...evidenceData,
        id: `evi-${Date.now()}`,
        submittedAt: new Date().toISOString().split('T')[0],
        reviewStatus: 'pending'
      };
      persistState((state) => ({
        studentEvidence: [newEvidence, ...state.studentEvidence],
        activityLogs: [
          {
            id: `act-${Date.now()}`,
            actorName: state.currentUser.name,
            actorRole: 'student',
            action: 'Submitted practical evidence',
            targetName: newEvidence.title,
            timestamp: new Date().toISOString(),
            category: 'evidence'
          },
          ...state.activityLogs
        ],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Evidence Awaiting Faculty Review',
            message: `Aarav Sharma submitted practical evidence: "${newEvidence.title}". Review against rubric.`,
            type: 'evidence_reviewed',
            timestamp: new Date().toISOString(),
            isRead: false,
            link: '/faculty'
          },
          ...state.notifications
        ]
      }));
      return newEvidence;
    },

    reviewEvidence: (evidenceId, review) => {
      persistState((state) => {
        const evidence = state.studentEvidence.find((e) => e.id === evidenceId);
        if (!evidence) return {};

        const updatedEvidenceList = state.studentEvidence.map((e) =>
          e.id === evidenceId
            ? {
                ...e,
                reviewStatus: review.reviewStatus,
                score: review.score,
                feedback: review.feedback,
                verifiedLevel: review.verifiedLevel,
                reviewerName: review.reviewerName
              }
            : e
        );

        // Update Student Competency Record
        let updatedCompetencies = [...state.studentCompetencies];
        if (review.reviewStatus === 'verified' && review.verifiedLevel) {
          const compIndex = updatedCompetencies.findIndex(
            (c) => c.competencyId === evidence.competencyId && c.studentId === evidence.studentId
          );

          if (compIndex >= 0) {
            const current = updatedCompetencies[compIndex];
            const newLevel = Math.max(current.currentDemonstratedLevel, review.verifiedLevel) as ProficiencyLevel;
            const newStatus =
              newLevel >= current.expectedLevel
                ? 'proficient'
                : newLevel > 1
                ? 'developing'
                : 'attention_required';

            updatedCompetencies[compIndex] = {
              ...current,
              currentDemonstratedLevel: newLevel,
              status: newStatus,
              lastEvaluatedAt: new Date().toISOString().split('T')[0],
              evidenceCount: current.evidenceCount + 1
            };
          } else {
            updatedCompetencies.push({
              competencyId: evidence.competencyId,
              studentId: evidence.studentId,
              expectedLevel: 4,
              currentDemonstratedLevel: review.verifiedLevel,
              status: review.verifiedLevel >= 4 ? 'proficient' : 'developing',
              lastEvaluatedAt: new Date().toISOString().split('T')[0],
              evidenceCount: 1,
              coverageInCurriculum: 'core'
            });
          }
        }

        const compName = state.competencies.find((c) => c.id === evidence.competencyId)?.name || 'Competency';

        return {
          studentEvidence: updatedEvidenceList,
          studentCompetencies: updatedCompetencies,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              actorName: review.reviewerName,
              actorRole: 'faculty',
              action: `Evaluated evidence (${review.reviewStatus})`,
              targetName: `${evidence.title} → ${compName}`,
              timestamp: new Date().toISOString(),
              category: 'assessment'
            },
            ...state.activityLogs
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: `Evidence ${review.reviewStatus === 'verified' ? 'Approved & Verified' : 'Revision Requested'}`,
              message: `${review.reviewerName} reviewed "${evidence.title}". ${
                review.score ? `Score: ${review.score}/100. ` : ''
              }${review.verifiedLevel ? `Verified Level: Level ${review.verifiedLevel}.` : ''}`,
              type: 'evidence_reviewed',
              timestamp: new Date().toISOString(),
              isRead: false,
              link: '/competencies'
            },
            ...state.notifications
          ]
        };
      });
    },

    // Learning Pathways
    createPathway: (targetCompetencyId, title, description, steps) => {
      const newPathway: LearningPathway = {
        id: `path-${Date.now()}`,
        studentId: get().currentUser.id,
        targetCompetencyId,
        title,
        description,
        status: 'in_progress',
        createdAt: new Date().toISOString().split('T')[0],
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        steps: steps.map((s, idx) => ({
          ...s,
          id: `step-${Date.now()}-${idx}`,
          status: idx === 0 ? 'available' : 'locked'
        }))
      };

      persistState((state) => ({
        pathways: [newPathway, ...state.pathways],
        activityLogs: [
          {
            id: `act-${Date.now()}`,
            actorName: state.currentUser.name,
            actorRole: 'student',
            action: 'Generated personal learning pathway',
            targetName: title,
            timestamp: new Date().toISOString(),
            category: 'competency'
          },
          ...state.activityLogs
        ],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'New Pathway Created',
            message: `Personal learning pathway "${title}" is ready with structured milestone steps.`,
            type: 'gap_alert',
            timestamp: new Date().toISOString(),
            isRead: false,
            link: '/pathways'
          },
          ...state.notifications
        ]
      }));

      return newPathway;
    },

    togglePathwayStep: (pathwayId, stepId) => {
      persistState((state) => {
        const updatedPathways = state.pathways.map((p) => {
          if (p.id !== pathwayId) return p;

          const stepIndex = p.steps.findIndex((s) => s.id === stepId);
          if (stepIndex < 0) return p;

          const currentStep = p.steps[stepIndex];
          const newStatus: PathwayStep['status'] = currentStep.status === 'completed' ? 'available' : 'completed';

          const updatedSteps: PathwayStep[] = p.steps.map((s, idx) => {
            if (idx === stepIndex) return { ...s, status: newStatus };
            // unlock next step if this step completed
            if (idx === stepIndex + 1 && newStatus === 'completed' && s.status === 'locked') {
              return { ...s, status: 'available' as const };
            }
            return s;
          });

          const allCompleted = updatedSteps.every((s) => s.status === 'completed');

          return {
            ...p,
            steps: updatedSteps,
            status: (allCompleted ? 'completed' : 'in_progress') as LearningPathway['status']
          };
        });

        return { pathways: updatedPathways };
      });
    },

    // Notifications
    markNotificationAsRead: (id) => {
      persistState((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      }));
    },

    markAllNotificationsRead: () => {
      persistState((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
      }));
    },

    // Gap Analysis Calculation
    getSkillGapAnalysis: () => {
      const { competencies, studentCompetencies, mappings, courses } = get();

      return competencies.map((comp) => {
        const record = studentCompetencies.find((sc) => sc.competencyId === comp.id);
        const compMappings = mappings.filter((m) => m.competencyId === comp.id);
        const relatedCourseIds = Array.from(new Set(compMappings.map((m) => m.courseId)));
        const relatedCourseCodes = relatedCourseIds.map((cid) => {
          const c = courses.find((course) => course.id === cid);
          return c ? c.code : cid;
        });

        const expectedLevel = record?.expectedLevel || comp.targetLevel || 3;
        const demonstratedLevel = record?.currentDemonstratedLevel || 1;

        let gapCategory: SkillGapItem['gapCategory'];
        let recommendation = '';

        if (compMappings.length === 0) {
          gapCategory = 'not_introduced';
          recommendation = 'Curriculum coverage gap: this competency is not yet introduced in currently mapped courses.';
        } else if (!record || record.evidenceCount === 0) {
          gapCategory = 'introduced_not_assessed';
          recommendation = `Covered in ${relatedCourseCodes.join(', ')}, but no formal evidence or assessment has been verified. Submit practical evidence.`;
        } else if (demonstratedLevel < expectedLevel) {
          gapCategory = 'below_expected';
          recommendation = `Currently at Level ${demonstratedLevel} (${
            comp.levels[demonstratedLevel] || 'Foundational'
          }). Needs targeted project work to reach Level ${expectedLevel}.`;
        } else if (demonstratedLevel === expectedLevel) {
          gapCategory = 'meets_expected';
          recommendation = `Meets target curriculum proficiency (Level ${expectedLevel}). Maintain through advanced projects.`;
        } else {
          gapCategory = 'exceeds_expected';
          recommendation = `Exceeds curriculum benchmark! Level ${demonstratedLevel} demonstrated.`;
        }

        // Check prerequisites
        const prerequisitesMet = comp.prerequisiteCompetencyIds.every((prereqId) => {
          const prereqRecord = studentCompetencies.find((sc) => sc.competencyId === prereqId);
          return prereqRecord && prereqRecord.currentDemonstratedLevel >= 2;
        });

        return {
          competencyId: comp.id,
          competencyName: comp.name,
          category: comp.category,
          expectedLevel,
          demonstratedLevel,
          gapCategory,
          relatedCourseCodes,
          recommendation,
          prerequisitesMet
        };
      });
    },

    // Reset
    resetToDefaultData: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({
        currentRole: 'student',
        currentUser: mockUsers.student,
        selectedProgramId: 'prog-btech-cse',
        selectedSemesterId: 'sem-3',
        department: mockDepartment,
        programs: [mockProgram],
        semesters: mockSemesters,
        courses: mockCourses,
        units: mockUnits,
        topics: mockTopics,
        learningOutcomes: mockLearningOutcomes,
        competencies: mockCompetencies,
        mappings: mockCurriculumMappings,
        assessments: mockAssessments,
        studentCompetencies: mockStudentCompetencyRecords,
        studentEvidence: mockStudentEvidence,
        pathways: mockLearningPathways,
        notifications: mockNotifications,
        activityLogs: mockActivityLogs,
        isSearchOpen: false,
        searchQuery: ''
      });
    }
  };
});
