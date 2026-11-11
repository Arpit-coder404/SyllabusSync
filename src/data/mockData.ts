import {
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
  AppNotification,
  ActivityLog,
  UserProfile,
  Department
} from '../types';

export const mockDepartment: Department = {
  id: 'dept-cse',
  code: 'CSE',
  name: 'Department of Computer Science & Engineering',
  headOfDepartment: 'Dr. Evelyn Vance',
  facultyCount: 38,
  coursesCount: 42
};

export const mockProgram: AcademicProgram = {
  id: 'prog-btech-cse',
  code: 'BTECH-CSE',
  name: 'Bachelor of Technology in Computer Science & Engineering',
  degree: 'Bachelor of Technology (B.Tech)',
  departmentId: 'dept-cse',
  durationYears: 4,
  totalSemesters: 8,
  creditsRequired: 164,
  description: 'Comprehensive curriculum integrating foundational computing theory, systems architecture, algorithmic reasoning, software engineering, and industry-grade competencies.',
  accreditationStatus: 'Tier-1 NBA & ABET Aligned (Cycle 2024-2028)'
};

export const mockUsers: Record<string, UserProfile> = {
  student: {
    id: 'user-student-aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@apex.edu',
    role: 'student',
    department: 'Computer Science & Engineering',
    programId: 'prog-btech-cse',
    currentSemesterNumber: 3,
    studentIdNumber: '22BCSE104',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  faculty: {
    id: 'user-faculty-evelyn',
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@apex.edu',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    programId: 'prog-btech-cse',
    currentSemesterNumber: 3,
    facultyTitle: 'Associate Professor & Lead Curriculum Coordinator',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
  },
  admin: {
    id: 'user-admin-rajeshwar',
    name: 'Prof. Rajeshwar Kulkarni',
    email: 'dean.academics@apex.edu',
    role: 'admin',
    department: 'Dean of Academic Affairs',
    programId: 'prog-btech-cse',
    currentSemesterNumber: 3,
    facultyTitle: 'Dean of Academic Affairs & Accreditation Chair',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256'
  }
};

export const mockSemesters: Semester[] = [
  {
    id: 'sem-1',
    programId: 'prog-btech-cse',
    semesterNumber: 1,
    academicYear: '2023-2024',
    label: 'Semester 1 (Autumn)',
    startDate: '2023-08-01',
    endDate: '2023-12-15',
    isCurrent: false
  },
  {
    id: 'sem-2',
    programId: 'prog-btech-cse',
    semesterNumber: 2,
    academicYear: '2023-2024',
    label: 'Semester 2 (Spring)',
    startDate: '2024-01-10',
    endDate: '2024-05-20',
    isCurrent: false
  },
  {
    id: 'sem-3',
    programId: 'prog-btech-cse',
    semesterNumber: 3,
    academicYear: '2024-2025',
    label: 'Semester 3 (Autumn - Current)',
    startDate: '2024-08-05',
    endDate: '2024-12-18',
    isCurrent: true
  },
  {
    id: 'sem-4',
    programId: 'prog-btech-cse',
    semesterNumber: 4,
    academicYear: '2024-2025',
    label: 'Semester 4 (Spring - Upcoming)',
    startDate: '2025-01-15',
    endDate: '2025-05-25',
    isCurrent: false
  }
];

export const mockCourses: Course[] = [
  // Semester 1
  {
    id: 'course-cs101',
    semesterId: 'sem-1',
    code: 'CS101',
    name: 'Programming Fundamentals',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Procedural problem-solving, control flow, memory model, pointer arithmetic, and foundational C language implementations.',
    prerequisiteCourseIds: [],
    facultyId: 'user-faculty-evelyn',
    facultyName: 'Dr. Evelyn Vance',
    isPublished: true,
    color: '#315C46'
  },
  {
    id: 'course-ma101',
    semesterId: 'sem-1',
    code: 'MA101',
    name: 'Mathematics I: Linear Algebra & Calculus',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Vector spaces, matrix decompositions, eigenvalues, multivariate differentiation, and integration for computer engineering.',
    prerequisiteCourseIds: [],
    facultyId: 'user-faculty-math',
    facultyName: 'Dr. K. S. Raman',
    isPublished: true,
    color: '#6689A5'
  },
  {
    id: 'course-cs102',
    semesterId: 'sem-1',
    code: 'CS102',
    name: 'Digital Logic & Computer Design',
    credits: 3,
    departmentId: 'dept-cse',
    description: 'Boolean algebra, combinational logic design, sequential circuits, flip-flops, registers, finite state machines, and Verilog basics.',
    prerequisiteCourseIds: [],
    facultyId: 'user-faculty-hw',
    facultyName: 'Prof. Marcus Chen',
    isPublished: true,
    color: '#BD7458'
  },

  // Semester 2
  {
    id: 'course-cs201',
    semesterId: 'sem-2',
    code: 'CS201',
    name: 'Object-Oriented Programming & Systems',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Encapsulation, inheritance, polymorphism, abstract data types, generic templates, design patterns, and exception handling in modern C++ / Java.',
    prerequisiteCourseIds: ['course-cs101'],
    facultyId: 'user-faculty-evelyn',
    facultyName: 'Dr. Evelyn Vance',
    isPublished: true,
    color: '#315C46'
  },
  {
    id: 'course-ma201',
    semesterId: 'sem-2',
    code: 'MA201',
    name: 'Discrete Mathematical Structures',
    credits: 3,
    departmentId: 'dept-cse',
    description: 'Propositional & predicate logic, set theory, recurrence relations, combinatorics, graph theory foundations, and algebraic structures.',
    prerequisiteCourseIds: ['course-ma101'],
    facultyId: 'user-faculty-math',
    facultyName: 'Dr. K. S. Raman',
    isPublished: true,
    color: '#6689A5'
  },
  {
    id: 'course-cs202',
    semesterId: 'sem-2',
    code: 'CS202',
    name: 'Data Structures & Applications',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Linear lists, stacks, queues, binary search trees, AVL trees, heaps, hash tables, and asymptotic space/time complexity.',
    prerequisiteCourseIds: ['course-cs101'],
    facultyId: 'user-faculty-evelyn',
    facultyName: 'Dr. Evelyn Vance',
    isPublished: true,
    color: '#315C46'
  },

  // Semester 3 (Active Semester)
  {
    id: 'course-cs301',
    semesterId: 'sem-3',
    code: 'CS301',
    name: 'Database Management Systems',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Relational data model, relational algebra, SQL DDL/DML, normalization theory (1NF to BCNF), indexing (B+ trees), and ACID transaction concurrency.',
    prerequisiteCourseIds: ['course-cs202'],
    facultyId: 'user-faculty-evelyn',
    facultyName: 'Dr. Evelyn Vance',
    isPublished: true,
    color: '#315C46'
  },
  {
    id: 'course-cs302',
    semesterId: 'sem-3',
    code: 'CS302',
    name: 'Computer Organization & Architecture',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Instruction set architecture (RISC-V/MIPS), arithmetic logic unit, pipelining, hazards, memory hierarchy (cache design), and bus interconnects.',
    prerequisiteCourseIds: ['course-cs102'],
    facultyId: 'user-faculty-hw',
    facultyName: 'Prof. Marcus Chen',
    isPublished: true,
    color: '#BD7458'
  },
  {
    id: 'course-cs303',
    semesterId: 'sem-3',
    code: 'CS303',
    name: 'Design & Analysis of Algorithms',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Divide and conquer, greedy strategies, dynamic programming, graph traversals, shortest paths, minimum spanning trees, NP-completeness, and approximation algorithms.',
    prerequisiteCourseIds: ['course-cs202', 'course-ma201'],
    facultyId: 'user-faculty-algo',
    facultyName: 'Dr. Sunita Deshmukh',
    isPublished: true,
    color: '#315C46'
  },

  // Semester 4
  {
    id: 'course-cs401',
    semesterId: 'sem-4',
    code: 'CS401',
    name: 'Operating Systems & Concurrency',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'Process life-cycle, thread scheduling, synchronization primitives (mutex, semaphores), deadlocks, virtual memory management, and file systems.',
    prerequisiteCourseIds: ['course-cs302', 'course-cs202'],
    facultyId: 'user-faculty-evelyn',
    facultyName: 'Dr. Evelyn Vance',
    isPublished: true,
    color: '#315C46'
  },
  {
    id: 'course-cs402',
    semesterId: 'sem-4',
    code: 'CS402',
    name: 'Computer Networks & Internet Protocols',
    credits: 4,
    departmentId: 'dept-cse',
    description: 'OSI & TCP/IP stack, framing, flow control, routing algorithms (OSPF, BGP), transport protocol mechanisms (TCP Tahoe/Reno, flow/congestion control), and DNS/HTTP.',
    prerequisiteCourseIds: ['course-cs101'],
    facultyId: 'user-faculty-net',
    facultyName: 'Prof. Tariq Al-Mansoor',
    isPublished: true,
    color: '#6689A5'
  },
  {
    id: 'course-cs403',
    semesterId: 'sem-4',
    code: 'CS403',
    name: 'Software Engineering & Agile Lifecycle',
    credits: 3,
    departmentId: 'dept-cse',
    description: 'Software development lifecycles, Agile/Scrum methodologies, requirements engineering, UML modeling, automated unit testing, CI/CD, and code review standards.',
    prerequisiteCourseIds: ['course-cs201'],
    facultyId: 'user-faculty-se',
    facultyName: 'Dr. Sunita Deshmukh',
    isPublished: true,
    color: '#BD7458'
  }
];

export const mockUnits: SyllabusUnit[] = [
  // CS301 Database Management Systems
  {
    id: 'unit-cs301-u1',
    courseId: 'course-cs301',
    unitNumber: 1,
    title: 'Relational Model & Relational Algebra',
    description: 'Foundations of relational database design, tuples, relations, primary and foreign keys, relational calculus, and query algebra operators.',
    estimatedHours: 9
  },
  {
    id: 'unit-cs301-u2',
    courseId: 'course-cs301',
    unitNumber: 2,
    title: 'SQL DDL, DML & Advanced Queries',
    description: 'Standard SQL schemas, table constraints, joins, subqueries, group by, aggregation functions, views, and recursive CTEs.',
    estimatedHours: 12
  },
  {
    id: 'unit-cs301-u3',
    courseId: 'course-cs301',
    unitNumber: 3,
    title: 'Relational Database Design & Normalization',
    description: 'Functional dependencies, closure sets, canonical cover, 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF) decomposition.',
    estimatedHours: 14
  },
  {
    id: 'unit-cs301-u4',
    courseId: 'course-cs301',
    unitNumber: 4,
    title: 'Transactions, Concurrency & Storage Engine',
    description: 'ACID guarantees, conflict serializability, two-phase locking (2PL), deadlocks, B+ Tree indexing, and buffer pool caching.',
    estimatedHours: 11
  },

  // CS303 Design & Analysis of Algorithms
  {
    id: 'unit-cs303-u1',
    courseId: 'course-cs303',
    unitNumber: 1,
    title: 'Asymptotic Analysis & Divide-and-Conquer',
    description: 'Master theorem, recurrence relations, merge sort invariants, quicksort partition analysis, and randomized algorithms.',
    estimatedHours: 10
  },
  {
    id: 'unit-cs303-u2',
    courseId: 'course-cs303',
    unitNumber: 2,
    title: 'Dynamic Programming & Greedy Design',
    description: 'Optimal substructure, overlapping subproblems, memoization vs bottom-up tabulation, knapsack, and Huffman coding.',
    estimatedHours: 14
  },
  {
    id: 'unit-cs303-u3',
    courseId: 'course-cs303',
    unitNumber: 3,
    title: 'Graph Algorithms & Shortest Path Trees',
    description: 'BFS, DFS, topological sorting, Dijkstra single-source shortest path, Bellman-Ford, Kruskal and Prim minimum spanning trees.',
    estimatedHours: 12
  },
  {
    id: 'unit-cs303-u4',
    courseId: 'course-cs303',
    unitNumber: 4,
    title: 'Intractability, NP-Completeness & Reductions',
    description: 'P vs NP formulations, polynomial-time reductions, SAT, 3-SAT, Vertex Cover, and heuristic approximation bounds.',
    estimatedHours: 10
  },

  // CS202 Data Structures
  {
    id: 'unit-cs202-u1',
    courseId: 'course-cs202',
    unitNumber: 1,
    title: 'Linear Abstract Data Types',
    description: 'Singly and doubly linked lists, circular queues, stack memory invariants, and infix to postfix expression conversions.',
    estimatedHours: 8
  },
  {
    id: 'unit-cs202-u2',
    courseId: 'course-cs202',
    unitNumber: 2,
    title: 'Non-Linear Hierarchies & Balanced Trees',
    description: 'Binary trees, BST traversals, AVL rotations, red-black tree invariants, and binary priority queues (heaps).',
    estimatedHours: 14
  },
  {
    id: 'unit-cs202-u3',
    courseId: 'course-cs202',
    unitNumber: 3,
    title: 'Hashing, Collision Resolution & Graphs',
    description: 'Hash functions, separate chaining, open addressing with quadratic probing, and adjacency representation.',
    estimatedHours: 12
  }
];

export const mockTopics: SyllabusTopic[] = [
  // CS301 - Unit 1
  {
    id: 'top-cs301-t1',
    unitId: 'unit-cs301-u1',
    courseId: 'course-cs301',
    title: 'Entity-Relationship (ER) Modeling',
    description: 'Entities, weak entities, relationship cardinalities, participation constraints, and translating ER diagrams to relational schemas.',
    hours: 3,
    difficulty: 'introductory',
    prerequisiteTopicIds: [],
    isMapped: true
  },
  {
    id: 'top-cs301-t2',
    unitId: 'unit-cs301-u1',
    courseId: 'course-cs301',
    title: 'Relational Integrity Constraints & Keys',
    description: 'Candidate keys, primary keys, foreign key referential actions (cascade, set null), and domain integrity.',
    hours: 3,
    difficulty: 'introductory',
    prerequisiteTopicIds: ['top-cs301-t1'],
    isMapped: true
  },
  {
    id: 'top-cs301-t3',
    unitId: 'unit-cs301-u1',
    courseId: 'course-cs301',
    title: 'Relational Algebra Operators',
    description: 'Select, project, Cartesian product, theta joins, natural joins, division, and algebraic query equivalence.',
    hours: 3,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs301-t2'],
    isMapped: true
  },

  // CS301 - Unit 2
  {
    id: 'top-cs301-t4',
    unitId: 'unit-cs301-u2',
    courseId: 'course-cs301',
    title: 'Complex SQL Joins & Subqueries',
    description: 'Inner joins, left/right outer joins, full outer joins, correlated subqueries, and EXISTS clauses.',
    hours: 4,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs301-t2'],
    isMapped: true
  },
  {
    id: 'top-cs301-t5',
    unitId: 'unit-cs301-u2',
    courseId: 'course-cs301',
    title: 'Window Functions & Aggregation',
    description: 'PARTITION BY, ORDER BY, running totals, rank, dense_rank, and grouping sets.',
    hours: 4,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t4'],
    isMapped: true
  },
  {
    id: 'top-cs301-t6',
    unitId: 'unit-cs301-u2',
    courseId: 'course-cs301',
    title: 'Database Triggers & Stored Procedures',
    description: 'PL/pgSQL functions, BEFORE/AFTER row triggers, event handling, and auditing schema changes.',
    hours: 4,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t4'],
    isMapped: false // Deliberately unmapped topic for analytics demonstration!
  },

  // CS301 - Unit 3
  {
    id: 'top-cs301-t7',
    unitId: 'unit-cs301-u3',
    courseId: 'course-cs301',
    title: 'Functional Dependencies & Attribute Closure',
    description: 'Armstrong axioms, reflexivity, augmentation, transitivity, computing attribute closure F+, and canonical minimal covers.',
    hours: 4,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs301-t2'],
    isMapped: true
  },
  {
    id: 'top-cs301-t8',
    unitId: 'unit-cs301-u3',
    courseId: 'course-cs301',
    title: 'Third Normal Form (3NF) Synthesis',
    description: 'Prime attributes, dependency preservation, lossless join decomposition algorithms, and eliminating transitive dependencies.',
    hours: 5,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t7'],
    isMapped: true
  },
  {
    id: 'top-cs301-t9',
    unitId: 'unit-cs301-u3',
    courseId: 'course-cs301',
    title: 'Boyce-Codd Normal Form (BCNF) Decomposition',
    description: 'Superkey conditions, testing for BCNF violations, recursive decomposition, and assessing dependency preservation tradeoffs.',
    hours: 5,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t8'],
    isMapped: true
  },

  // CS301 - Unit 4
  {
    id: 'top-cs301-t10',
    unitId: 'unit-cs301-u4',
    courseId: 'course-cs301',
    title: 'B+ Tree Indexing & Physical Access Paths',
    description: 'Leaf node pointers, internal node search keys, fanout calculations, range scan efficiency, and clustered vs unclustered indexes.',
    hours: 5,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t4'],
    isMapped: true
  },
  {
    id: 'top-cs301-t11',
    unitId: 'unit-cs301-u4',
    courseId: 'course-cs301',
    title: 'ACID Transactions & 2-Phase Locking (2PL)',
    description: 'Atomicity, Isolation levels (Read Committed, Repeatable Read, Serializable), shared/exclusive locks, and strict 2PL.',
    hours: 6,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs301-t4'],
    isMapped: true
  },

  // CS303 - Algorithms Topics
  {
    id: 'top-cs303-t1',
    unitId: 'unit-cs303-u1',
    courseId: 'course-cs303',
    title: 'Master Theorem for Divide-and-Conquer',
    description: 'Case 1, 2, 3 formulations, asymptotic bounds on recursive algorithms, and recursion tree verification.',
    hours: 4,
    difficulty: 'intermediate',
    prerequisiteTopicIds: [],
    isMapped: true
  },
  {
    id: 'top-cs303-t2',
    unitId: 'unit-cs303-u2',
    courseId: 'course-cs303',
    title: 'Dynamic Programming Memoization vs Tabulation',
    description: 'Longest common subsequence, matrix chain multiplication, 0/1 knapsack state formulations, and space compression.',
    hours: 7,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs303-t1'],
    isMapped: true
  },
  {
    id: 'top-cs303-t3',
    unitId: 'unit-cs303-u3',
    courseId: 'course-cs303',
    title: 'Dijkstra Single-Source Shortest Path',
    description: 'Greedy choice property, priority queue implementation with min-heap, relaxation step, and handling non-negative edge weights.',
    hours: 4,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs303-t1'],
    isMapped: true
  },
  {
    id: 'top-cs303-t4',
    unitId: 'unit-cs303-u3',
    courseId: 'course-cs303',
    title: 'Minimum Spanning Trees (Kruskal & Prim)',
    description: 'Cut property, disjoint set union-find with path compression and union by rank, cycle detection in undirected graphs.',
    hours: 4,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs303-t3'],
    isMapped: true
  },
  {
    id: 'top-cs303-t5',
    unitId: 'unit-cs303-u4',
    courseId: 'course-cs303',
    title: 'Polynomial Time Reductions & 3-SAT',
    description: 'Cook-Levin theorem implications, polynomial certificates, reducing 3-SAT to Independent Set and Vertex Cover.',
    hours: 5,
    difficulty: 'advanced',
    prerequisiteTopicIds: ['top-cs303-t2', 'top-cs303-t4'],
    isMapped: true
  },

  // CS202 - Data Structures Topics
  {
    id: 'top-cs202-t1',
    unitId: 'unit-cs202-u1',
    courseId: 'course-cs202',
    title: 'Pointer Linked Lists & Invariants',
    description: 'Dynamic memory allocation, memory leaks, cycle detection via Floyd tortoise-and-hare algorithm.',
    hours: 4,
    difficulty: 'introductory',
    prerequisiteTopicIds: [],
    isMapped: true
  },
  {
    id: 'top-cs202-t2',
    unitId: 'unit-cs202-u2',
    courseId: 'course-cs202',
    title: 'AVL Balanced Search Trees',
    description: 'Balance factors, left and right rotations, double rotations (LR/RL), and O(log N) search guarantee.',
    hours: 6,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs202-t1'],
    isMapped: true
  },
  {
    id: 'top-cs202-t3',
    unitId: 'unit-cs202-u3',
    courseId: 'course-cs202',
    title: 'Hash Maps & Amortized Insertion',
    description: 'Load factor sizing, prime modulo hashing, Robin Hood hashing, open addressing, and constant time lookups.',
    hours: 5,
    difficulty: 'intermediate',
    prerequisiteTopicIds: ['top-cs202-t1'],
    isMapped: true
  }
];

export const mockLearningOutcomes: LearningOutcome[] = [
  // CS301 DBMS Outcomes
  {
    id: 'lo-cs301-co1',
    courseId: 'course-cs301',
    code: 'CO1',
    statement: 'Formulate formal relational algebra queries and design conceptual schemas using Entity-Relationship modeling.',
    bloomsLevel: 'create'
  },
  {
    id: 'lo-cs301-co2',
    courseId: 'course-cs301',
    code: 'CO2',
    statement: 'Construct optimized, multi-table SQL queries, views, and integrity assertions for enterprise data requirements.',
    bloomsLevel: 'apply'
  },
  {
    id: 'lo-cs301-co3',
    courseId: 'course-cs301',
    code: 'CO3',
    statement: 'Evaluate schema redundancies, compute canonical covers, and decompose tables into 3NF and BCNF without information loss.',
    bloomsLevel: 'evaluate'
  },
  {
    id: 'lo-cs301-co4',
    courseId: 'course-cs301',
    code: 'CO4',
    statement: 'Analyze concurrency conflicts, index physical disk access paths with B+ Trees, and configure serializable isolation.',
    bloomsLevel: 'analyze'
  },

  // CS303 Algorithms Outcomes
  {
    id: 'lo-cs303-co1',
    courseId: 'course-cs303',
    code: 'CO1',
    statement: 'Characterize time and space complexity of recursive and iterative algorithms using asymptotic notation and recurrence trees.',
    bloomsLevel: 'analyze'
  },
  {
    id: 'lo-cs303-co2',
    courseId: 'course-cs303',
    code: 'CO2',
    statement: 'Design and synthesize dynamic programming solutions with optimal subproblems and state-space tabulation.',
    bloomsLevel: 'create'
  },
  {
    id: 'lo-cs303-co3',
    courseId: 'course-cs303',
    code: 'CO3',
    statement: 'Implement graph traversal and greedy optimization algorithms to solve network connectivity and shortest-path topologies.',
    bloomsLevel: 'apply'
  },
  {
    id: 'lo-cs303-co4',
    courseId: 'course-cs303',
    code: 'CO4',
    statement: 'Formulate formal polynomial-time reductions to prove computational hardness and classify decision problems.',
    bloomsLevel: 'evaluate'
  },

  // CS202 Data Structures Outcomes
  {
    id: 'lo-cs202-co1',
    courseId: 'course-cs202',
    code: 'CO1',
    statement: 'Implement dynamic linear collections with rigorous boundary condition checks and zero memory leaks.',
    bloomsLevel: 'apply'
  },
  {
    id: 'lo-cs202-co2',
    courseId: 'course-cs202',
    code: 'CO2',
    statement: 'Construct self-balancing search trees and verify logarithmic search invariants during continuous mutations.',
    bloomsLevel: 'create'
  },
  {
    id: 'lo-cs202-co3',
    courseId: 'course-cs202',
    code: 'CO3',
    statement: 'Design high-throughput collision-resistant hash maps and analyze worst-case vs amortized execution times.',
    bloomsLevel: 'analyze'
  }
];

export const mockCompetencies: Competency[] = [
  // Technical Competencies
  {
    id: 'comp-db-design',
    name: 'Relational Database Design',
    category: 'technical',
    description: 'Ability to architect normalized, consistent, and scalable relational schemas from messy business requirements.',
    levels: {
      1: 'Recognizes tables, primary keys, and foreign keys in existing schemas.',
      2: 'Constructs basic ER diagrams and identifies 1NF and 2NF violations.',
      3: 'Synthesizes 3NF schemas, preserves functional dependencies, and avoids update anomalies.',
      4: 'Decomposes schemas into BCNF, evaluates denormalization tradeoffs, and models complex business invariants.',
      5: 'Architects multi-tenant enterprise schemas with partition pruning, zero-downtime migration strategies, and strict consistency.'
    },
    prerequisiteCompetencyIds: ['comp-data-modeling'],
    targetLevel: 4,
    industryDemandRank: 'critical'
  },
  {
    id: 'comp-sql-dev',
    name: 'SQL Query Engineering',
    category: 'technical',
    description: 'Constructing performant, declarative relational queries utilizing advanced joins, window calculations, and indexing insights.',
    levels: {
      1: 'Writes simple SELECT, WHERE, and single-table filter statements.',
      2: 'Executes standard INNER and LEFT joins, aggregate functions, and GROUP BY clauses.',
      3: 'Writes correlated subqueries, common table expressions (CTEs), and interprets EXPLAIN query plans.',
      4: 'Constructs analytical window queries (LEAD/LAG, PARTITION BY) and tunes multi-table join access paths with indexes.',
      5: 'Optimizes distributed database queries, partitions high-volume tables, and designs automated stored procedure routines.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 4,
    industryDemandRank: 'very_high'
  },
  {
    id: 'comp-algorithm-design',
    name: 'Algorithm Design & Optimization',
    category: 'technical',
    description: 'Formulating optimal algorithms for non-trivial computational problems using divide-and-conquer, dynamic programming, and greedy principles.',
    levels: {
      1: 'Identifies standard linear and binary search algorithms.',
      2: 'Implements standard sorting and elementary divide-and-conquer recurrences.',
      3: 'Synthesizes memoized dynamic programming solutions and applies greedy choice algorithms correctly.',
      4: 'Proves algorithm correctness with loop invariants and transforms polynomial state spaces with bitmasking/tabulation.',
      5: 'Designs novel approximation heuristics for NP-hard challenges and parallelizes algorithmic computations.'
    },
    prerequisiteCompetencyIds: ['comp-data-structures'],
    targetLevel: 4,
    industryDemandRank: 'critical'
  },
  {
    id: 'comp-data-structures',
    name: 'Data Structures Mastery',
    category: 'technical',
    description: 'Selecting and implementing memory-efficient concrete data structures tailored to strict computational and latency budgets.',
    levels: {
      1: 'Understands basic array and linked list traversals.',
      2: 'Implements stacks, queues, and standard binary search trees in code.',
      3: 'Implements self-balancing trees (AVL/Red-Black), binary heaps, and custom collision-resistant hash tables.',
      4: 'Synthesizes specialized structures (Tries, Segment Trees, Disjoint Set Union) and profiles cache-line locality.',
      5: 'Engineers lock-free, concurrent data structures for multi-core hardware and low-latency disk serialization.'
    },
    prerequisiteCompetencyIds: ['comp-programming'],
    targetLevel: 4,
    industryDemandRank: 'critical'
  },
  {
    id: 'comp-programming',
    name: 'Procedural & Systems Programming',
    category: 'technical',
    description: 'Fluency in memory management, pointer arithmetic, types, systems debugging, and robust program execution.',
    levels: {
      1: 'Writes sequential code with conditional branches and loops.',
      2: 'Organizes modular functions, structures, and performs manual memory allocation (malloc/free).',
      3: 'Debugs segmentation faults with GDB/Valgrind, manages bitwise flags, and handles POSIX system interfaces.',
      4: 'Writes clean, thread-safe systems code with custom allocators and RAII principles.',
      5: 'Audits assembly output, profiles CPU cache misses, and writes high-performance kernel/embedded drivers.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 4,
    industryDemandRank: 'very_high'
  },
  {
    id: 'comp-software-eng',
    name: 'Software Lifecycle & Architecture',
    category: 'technical',
    description: 'Designing maintainable modular software using clean architecture, automated testing, and CI/CD pipelines.',
    levels: {
      1: 'Navigates version control and edits existing modules.',
      2: 'Writes modular classes, configures unit tests, and uses Git branches for collaboration.',
      3: 'Constructs automated CI workflows, applies SOLID design patterns, and designs clean service interfaces.',
      4: 'Architects microservices/event-driven systems, enforces code coverage thresholds, and writes integration test suites.',
      5: 'Leads end-to-end distributed system refactors, establishes enterprise observability, and defines API governance.'
    },
    prerequisiteCompetencyIds: ['comp-programming'],
    targetLevel: 3,
    industryDemandRank: 'very_high'
  },
  {
    id: 'comp-computer-architecture',
    name: 'Computer Architecture & Memory Systems',
    category: 'technical',
    description: 'Grasping pipeline stages, branch prediction, hardware registers, cache coherency, and CPU-memory bottlenecks.',
    levels: {
      1: 'Identifies CPU, ALU, RAM, and registers in high-level block diagrams.',
      2: 'Traces simple assembly instructions and calculates memory access latency in clock cycles.',
      3: 'Analyzes pipeline hazards (data, control, structural) and designs direct-mapped vs set-associative cache mappings.',
      4: 'Profiles software cache-hit ratios and optimizes algorithms for L1/L2 data cache locality.',
      5: 'Designs custom hardware accelerators and custom instruction extensions in HDL.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 3,
    industryDemandRank: 'high'
  },

  // Analytical Competencies
  {
    id: 'comp-problem-solving',
    name: 'Analytical Problem Solving',
    category: 'analytical',
    description: 'Deconstructing ambiguous technical dilemmas into rigorously testable hypotheses and algorithmic solutions.',
    levels: {
      1: 'Restates a well-defined programming prompt in plain English.',
      2: 'Breaks down a multi-step task into input, transformation, and output phases.',
      3: 'Identifies hidden edge cases (overflow, null pointers, empty graphs) and formulates defensive logic.',
      4: 'Transforms unstructured real-world bottlenecks into formal mathematical representations.',
      5: 'Evaluates multi-variable systemic tradeoffs and discovers non-obvious algorithmic shortcuts.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 4,
    industryDemandRank: 'critical'
  },
  {
    id: 'comp-complexity-analysis',
    name: 'Asymptotic & Complexity Analysis',
    category: 'analytical',
    description: 'Rigorous calculation of asymptotic bounds, recurrence equations, and algorithmic resource limits.',
    levels: {
      1: 'Quotes standard Big-O complexities of common loops.',
      2: 'Calculates Big-O, Big-Omega, and Big-Theta for nested loops and linear scans.',
      3: 'Solves complex recurrence relations with the Master Theorem and recursion trees.',
      4: 'Analyzes amortized bounds using potential and accounting methods; categorizes problems in P vs NP.',
      5: 'Proves mathematical space/time lower bounds for computational classes.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 4,
    industryDemandRank: 'very_high'
  },
  {
    id: 'comp-data-modeling',
    name: 'Conceptual Data Modeling',
    category: 'analytical',
    description: 'Abstracting real-world entities, relationships, constraints, and operational workflows into conceptual diagrams.',
    levels: {
      1: 'Identifies entities and attributes in a written business brief.',
      2: 'Drafts ER diagrams indicating one-to-one, one-to-many, and many-to-many relationships.',
      3: 'Resolves complex many-to-many relationships with junction entities and enforces entity constraints.',
      4: 'Constructs enterprise domain models reconciling conflicting business stakeholder definitions.',
      5: 'Builds enterprise-wide semantic models unifying transactional (OLTP) and analytical (OLAP) schemas.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 4,
    industryDemandRank: 'high'
  },

  // Professional Competencies
  {
    id: 'comp-technical-docs',
    name: 'Technical Documentation & Specifications',
    category: 'professional',
    description: 'Authoring lucid technical design documents, API specifications, and architectural decision records (ADRs).',
    levels: {
      1: 'Writes clear inline code comments explaining complex functions.',
      2: 'Produces Markdown README files detailing setup, dependencies, and execution steps.',
      3: 'Authors comprehensive API specs (OpenAPI/Swagger) and documents database schema rationale.',
      4: 'Writes thorough Architectural Decision Records (ADRs) with measurable tradeoff evaluations.',
      5: 'Publishes white papers, engineering standards, and institutional developer documentation.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 3,
    industryDemandRank: 'very_high'
  },
  {
    id: 'comp-team-collab',
    name: 'Collaborative Engineering & Code Review',
    category: 'professional',
    description: 'Conducting constructive, rigorous peer reviews, branch workflows, and participating in agile ceremonies.',
    levels: {
      1: 'Opens pull requests with concise descriptions of bug fixes.',
      2: 'Navigates merge conflicts and incorporates reviewer feedback collaboratively.',
      3: 'Conducts thorough peer code reviews catching logic bugs, race conditions, and styling violations.',
      4: 'Mentors junior contributors on architectural best practices and guides sprint planning.',
      5: 'Cultivates team-wide engineering culture, automated review bots, and psychological safety.'
    },
    prerequisiteCompetencyIds: [],
    targetLevel: 3,
    industryDemandRank: 'very_high'
  },

  // Creative Competencies
  {
    id: 'comp-api-design',
    name: 'API Architecture & Interface Design',
    category: 'creative',
    description: 'Synthesizing intuitive, ergonomic, and future-proof software interfaces and REST/gRPC endpoints.',
    levels: {
      1: 'Recognizes HTTP status codes and basic URL path conventions.',
      2: 'Designs standard CRUD REST endpoints adhering to resource-oriented URI conventions.',
      3: 'Designs consistent pagination, idempotency keys, error payloads, and authentication headers.',
      4: 'Constructs backward-compatible API versions, GraphQL schemas, and streaming WebSocket protocols.',
      5: 'Engineers public developer platforms used by millions of developers with seamless SDK generation.'
    },
    prerequisiteCompetencyIds: ['comp-software-eng'],
    targetLevel: 3,
    industryDemandRank: 'high'
  }
];

export const mockCurriculumMappings: CurriculumMapping[] = [
  // CS301 DBMS Mappings
  {
    id: 'map-1',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u1',
    topicId: 'top-cs301-t1',
    learningOutcomeId: 'lo-cs301-co1',
    competencyId: 'comp-data-modeling',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Translating business rules into ER representations directly sharpens domain abstraction and conceptual data modeling.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-02'
  },
  {
    id: 'map-2',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u1',
    topicId: 'top-cs301-t2',
    learningOutcomeId: 'lo-cs301-co1',
    competencyId: 'comp-db-design',
    relationship: 'introduces',
    expectedProficiency: 2,
    rationale: 'Primary and foreign key constraint enforcement introduces relational integrity fundamentals.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-02'
  },
  {
    id: 'map-3',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u2',
    topicId: 'top-cs301-t4',
    learningOutcomeId: 'lo-cs301-co2',
    competencyId: 'comp-sql-dev',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Constructing multi-table joins and subqueries directly builds practical SQL query engineering.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-05'
  },
  {
    id: 'map-4',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u2',
    topicId: 'top-cs301-t5',
    learningOutcomeId: 'lo-cs301-co2',
    competencyId: 'comp-sql-dev',
    relationship: 'reinforces',
    expectedProficiency: 4,
    rationale: 'Window functions and aggregation push SQL querying into advanced analytical reporting.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-05'
  },
  {
    id: 'map-5',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u3',
    topicId: 'top-cs301-t7',
    learningOutcomeId: 'lo-cs301-co3',
    competencyId: 'comp-problem-solving',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Computing attribute closures and canonical covers requires rigorous mathematical deduplication.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-10'
  },
  {
    id: 'map-6',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u3',
    topicId: 'top-cs301-t8',
    learningOutcomeId: 'lo-cs301-co3',
    competencyId: 'comp-db-design',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: '3NF schema synthesis removes update anomalies and guarantees dependency preservation.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-10'
  },
  {
    id: 'map-7',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u3',
    topicId: 'top-cs301-t9',
    learningOutcomeId: 'lo-cs301-co3',
    competencyId: 'comp-db-design',
    relationship: 'assesses',
    expectedProficiency: 4,
    rationale: 'BCNF decomposition assessment proves deep mastery of relational schema design.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-12'
  },
  {
    id: 'map-8',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u4',
    topicId: 'top-cs301-t10',
    learningOutcomeId: 'lo-cs301-co4',
    competencyId: 'comp-data-structures',
    relationship: 'reinforces',
    expectedProficiency: 3,
    rationale: 'Applying B+ tree traversal in physical disk storage bridges tree algorithms into hardware persistence.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-15'
  },

  // CS303 Algorithms Mappings
  {
    id: 'map-9',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u1',
    topicId: 'top-cs303-t1',
    learningOutcomeId: 'lo-cs303-co1',
    competencyId: 'comp-complexity-analysis',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Master theorem analysis provides rigorous mathematical grounding in asymptotic evaluation.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-18'
  },
  {
    id: 'map-10',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u2',
    topicId: 'top-cs303-t2',
    learningOutcomeId: 'lo-cs303-co2',
    competencyId: 'comp-algorithm-design',
    relationship: 'develops',
    expectedProficiency: 4,
    rationale: 'Dynamic programming formulation requires identifying overlapping states and optimal substructure.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-22'
  },
  {
    id: 'map-11',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u3',
    topicId: 'top-cs303-t3',
    learningOutcomeId: 'lo-cs303-co3',
    competencyId: 'comp-algorithm-design',
    relationship: 'reinforces',
    expectedProficiency: 3,
    rationale: 'Dijkstra shortest path demonstrates optimal greedy decisions using heap data structures.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-25'
  },
  {
    id: 'map-12',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u3',
    topicId: 'top-cs303-t4',
    learningOutcomeId: 'lo-cs303-co3',
    competencyId: 'comp-data-structures',
    relationship: 'reinforces',
    expectedProficiency: 4,
    rationale: 'Kruskal algorithm exercises Disjoint Set Union (DSU) structures with rank and path compression.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-25'
  },
  {
    id: 'map-13',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u4',
    topicId: 'top-cs303-t5',
    learningOutcomeId: 'lo-cs303-co4',
    competencyId: 'comp-complexity-analysis',
    relationship: 'assesses',
    expectedProficiency: 4,
    rationale: 'Formal polynomial reductions prove student ability to analyze problem complexity and intractability.',
    reviewStatus: 'approved',
    updatedAt: '2024-09-28'
  },

  // CS202 Data Structures Mappings (Semester 2)
  {
    id: 'map-14',
    courseId: 'course-cs202',
    unitId: 'unit-cs202-u1',
    topicId: 'top-cs202-t1',
    learningOutcomeId: 'lo-cs202-co1',
    competencyId: 'comp-programming',
    relationship: 'reinforces',
    expectedProficiency: 3,
    rationale: 'Pointer-heavy linked lists reinforce defensive memory handling and cycle detection.',
    reviewStatus: 'approved',
    updatedAt: '2024-03-10'
  },
  {
    id: 'map-15',
    courseId: 'course-cs202',
    unitId: 'unit-cs202-u2',
    topicId: 'top-cs202-t2',
    learningOutcomeId: 'lo-cs202-co2',
    competencyId: 'comp-data-structures',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Implementing AVL rotation logic builds deep algorithmic intuition for tree invariants.',
    reviewStatus: 'approved',
    updatedAt: '2024-03-25'
  },
  {
    id: 'map-16',
    courseId: 'course-cs202',
    unitId: 'unit-cs202-u3',
    topicId: 'top-cs202-t3',
    learningOutcomeId: 'lo-cs202-co3',
    competencyId: 'comp-data-structures',
    relationship: 'develops',
    expectedProficiency: 3,
    rationale: 'Collision resolution engineering directly connects theoretical hash distribution with runtime latency.',
    reviewStatus: 'approved',
    updatedAt: '2024-04-12'
  }
];

export const mockAssessments: Assessment[] = [
  // CS301 Assessments
  {
    id: 'asm-cs301-lab1',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u2',
    title: 'SQL Complex Querying & Relational Schema Benchmark',
    type: 'programming_assignment',
    learningOutcomeIds: ['lo-cs301-co2'],
    targetCompetencyIds: ['comp-sql-dev'],
    maxScore: 100,
    deadline: '2024-09-30',
    status: 'graded',
    rubric: [
      {
        id: 'rub-1',
        criterion: 'Multi-table Join Correctness & Null Safety',
        weight: 35,
        targetLevel: 3,
        description: 'Queries correctly join 4+ tables and properly handle outer join edge cases.'
      },
      {
        id: 'rub-2',
        criterion: 'Analytical Window Expressions',
        weight: 35,
        targetLevel: 4,
        description: 'Demonstrates mastery of PARTITION BY and moving aggregate frames.'
      },
      {
        id: 'rub-3',
        criterion: 'Query Plan Efficiency & Index Utilization',
        weight: 30,
        targetLevel: 3,
        description: 'Avoids redundant sequential scans on high-cardinality tables.'
      }
    ]
  },
  {
    id: 'asm-cs301-proj',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u3',
    title: 'Hospital Management BCNF Schema & Implementation Project',
    type: 'project',
    learningOutcomeIds: ['lo-cs301-co1', 'lo-cs301-co3'],
    targetCompetencyIds: ['comp-db-design', 'comp-data-modeling', 'comp-technical-docs'],
    maxScore: 100,
    deadline: '2024-11-15',
    status: 'open',
    rubric: [
      {
        id: 'rub-4',
        criterion: 'Formal Dependency Extraction & Canonical Cover',
        weight: 30,
        targetLevel: 3,
        description: 'Rigorously derives all functional dependencies from real-world requirements.'
      },
      {
        id: 'rub-5',
        criterion: 'Lossless BCNF Decomposition Proof',
        weight: 40,
        targetLevel: 4,
        description: 'Decomposes tables into BCNF with mathematical proof of lossless join property.'
      },
      {
        id: 'rub-6',
        criterion: 'Technical Specification & DDL Schema Script',
        weight: 30,
        targetLevel: 3,
        description: 'Produces professional DDL scripts and comprehensive Architectural Decision Record.'
      }
    ]
  },
  {
    id: 'asm-cs301-midterm',
    courseId: 'course-cs301',
    unitId: 'unit-cs301-u1',
    title: 'DBMS Midterm Theory Examination',
    type: 'written_exam',
    learningOutcomeIds: ['lo-cs301-co1', 'lo-cs301-co2'],
    targetCompetencyIds: ['comp-db-design', 'comp-problem-solving'],
    maxScore: 60,
    deadline: '2024-10-14',
    status: 'graded',
    rubric: [
      {
        id: 'rub-7',
        criterion: 'Relational Algebra Query Translation',
        weight: 50,
        targetLevel: 3,
        description: 'Accurately converts English business requirements into algebraic expressions.'
      },
      {
        id: 'rub-8',
        criterion: 'ER Diagram Cardinality Constraints',
        weight: 50,
        targetLevel: 3,
        description: 'Correctly identifies total participation and entity keys.'
      }
    ]
  },

  // CS303 Algorithms Assessments
  {
    id: 'asm-cs303-lab1',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u2',
    title: 'Dynamic Programming State Compression Practical',
    type: 'programming_assignment',
    learningOutcomeIds: ['lo-cs303-co2'],
    targetCompetencyIds: ['comp-algorithm-design', 'comp-complexity-analysis'],
    maxScore: 100,
    deadline: '2024-10-25',
    status: 'graded',
    rubric: [
      {
        id: 'rub-9',
        criterion: 'Optimal Recurrence & Tabulation Structure',
        weight: 50,
        targetLevel: 4,
        description: 'Synthesizes correct state transition functions with minimal space overhead.'
      },
      {
        id: 'rub-10',
        criterion: 'Execution Runtime under High-Volume Test Harness',
        weight: 50,
        targetLevel: 4,
        description: 'All test cases pass within strict 150ms latency limit.'
      }
    ]
  },
  {
    id: 'asm-cs303-graph-viva',
    courseId: 'course-cs303',
    unitId: 'unit-cs303-u3',
    title: 'Graph Algorithms & Shortest Path Viva Voce',
    type: 'viva',
    learningOutcomeIds: ['lo-cs303-co3'],
    targetCompetencyIds: ['comp-algorithm-design', 'comp-problem-solving'],
    maxScore: 50,
    deadline: '2024-11-20',
    status: 'upcoming',
    rubric: [
      {
        id: 'rub-11',
        criterion: 'Greedy Choice Proof & Relaxation Correctness',
        weight: 50,
        targetLevel: 3,
        description: 'Verbal explanation of why Dijkstra fails on negative cycles.'
      },
      {
        id: 'rub-12',
        criterion: 'Data Structure Tradeoff Defense',
        weight: 50,
        targetLevel: 4,
        description: 'Articulates Fibonacci heap vs binary heap complexity differences.'
      }
    ]
  }
];

export const mockStudentCompetencyRecords: StudentCompetencyRecord[] = [
  {
    competencyId: 'comp-db-design',
    studentId: 'user-student-aarav',
    expectedLevel: 4, // Expected: Proficient (BCNF, schema tradeoffs)
    currentDemonstratedLevel: 3, // Demonstrated: Developing (Has 3NF, but lacks practical BCNF project evidence)
    status: 'developing',
    lastEvaluatedAt: '2024-10-18',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-sql-dev',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 4, // Demonstrated: Proficient (Passed lab 1 with 94/100, submitted GitHub analytics script)
    status: 'proficient',
    lastEvaluatedAt: '2024-10-02',
    evidenceCount: 3,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-algorithm-design',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 3,
    status: 'developing',
    lastEvaluatedAt: '2024-10-28',
    evidenceCount: 2,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-data-structures',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 4,
    status: 'proficient',
    lastEvaluatedAt: '2024-05-15',
    evidenceCount: 4,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-programming',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 4,
    status: 'proficient',
    lastEvaluatedAt: '2024-04-10',
    evidenceCount: 5,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-software-eng',
    studentId: 'user-student-aarav',
    expectedLevel: 3,
    currentDemonstratedLevel: 2,
    status: 'developing',
    lastEvaluatedAt: '2024-05-20',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-problem-solving',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 3,
    status: 'developing',
    lastEvaluatedAt: '2024-10-18',
    evidenceCount: 2,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-complexity-analysis',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 3,
    status: 'developing',
    lastEvaluatedAt: '2024-10-28',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-data-modeling',
    studentId: 'user-student-aarav',
    expectedLevel: 4,
    currentDemonstratedLevel: 3,
    status: 'developing',
    lastEvaluatedAt: '2024-10-18',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-technical-docs',
    studentId: 'user-student-aarav',
    expectedLevel: 3,
    currentDemonstratedLevel: 2,
    status: 'attention_required',
    lastEvaluatedAt: '2024-05-20',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-team-collab',
    studentId: 'user-student-aarav',
    expectedLevel: 3,
    currentDemonstratedLevel: 2,
    status: 'developing',
    lastEvaluatedAt: '2024-05-20',
    evidenceCount: 1,
    coverageInCurriculum: 'core'
  },
  {
    competencyId: 'comp-api-design',
    studentId: 'user-student-aarav',
    expectedLevel: 3,
    currentDemonstratedLevel: 1,
    status: 'unassessed',
    lastEvaluatedAt: undefined,
    evidenceCount: 0,
    coverageInCurriculum: 'elective'
  }
];

export const mockStudentEvidence: StudentEvidence[] = [
  {
    id: 'evi-1',
    studentId: 'user-student-aarav',
    title: 'E-Commerce Analytical SQL Pipeline with Window Partitions',
    description: 'PostgreSQL script executing complex cohort retention queries, running 30-day moving GMV aggregates, and index optimization benchmarks on 500,000 orders.',
    competencyId: 'comp-sql-dev',
    learningOutcomeId: 'lo-cs301-co2',
    courseId: 'course-cs301',
    assessmentId: 'asm-cs301-lab1',
    evidenceType: 'github',
    urlOrContent: 'https://github.com/aarav-sharma/ecommerce-sql-analytics-benchmark',
    submittedAt: '2024-09-28',
    reviewStatus: 'verified',
    score: 95,
    feedback: 'Exemplary query structure. The EXPLAIN ANALYZE comparison before and after creating the composite B+ tree index is well articulated.',
    reviewerName: 'Dr. Evelyn Vance',
    verifiedLevel: 4
  },
  {
    id: 'evi-2',
    studentId: 'user-student-aarav',
    title: 'Hospital Emergency Unit Relational ER Specification',
    description: 'ER diagram modeling doctors, duty rotations, admitted patients, prescription lines, and foreign key cascades to satisfy 3NF.',
    competencyId: 'comp-data-modeling',
    learningOutcomeId: 'lo-cs301-co1',
    courseId: 'course-cs301',
    evidenceType: 'report_pdf',
    urlOrContent: 'https://apex.edu/storage/evidence/aarav-er-hospital-design.pdf',
    submittedAt: '2024-10-12',
    reviewStatus: 'verified',
    score: 88,
    feedback: 'Good separation of duty shifts from doctor profiles. Make sure to specify check constraints on discharge dates.',
    reviewerName: 'Dr. Evelyn Vance',
    verifiedLevel: 3
  },
  {
    id: 'evi-3',
    studentId: 'user-student-aarav',
    title: 'Dynamic Programming Grid Path Optimization Benchmarks',
    description: 'C++ implementations comparing recursive memoization vs iterative state-space compression for obstacle grid traversals.',
    competencyId: 'comp-algorithm-design',
    learningOutcomeId: 'lo-cs303-co2',
    courseId: 'course-cs303',
    assessmentId: 'asm-cs303-lab1',
    evidenceType: 'github',
    urlOrContent: 'https://github.com/aarav-sharma/dp-state-compression-cpp',
    submittedAt: '2024-10-24',
    reviewStatus: 'verified',
    score: 92,
    feedback: 'Clear memory profile showing reduction from O(M*N) to O(N) space. Well done.',
    reviewerName: 'Dr. Sunita Deshmukh',
    verifiedLevel: 3
  },
  {
    id: 'evi-4',
    studentId: 'user-student-aarav',
    title: 'Red-Black Tree vs AVL Self-Balancing Invariants Visualizer',
    description: 'Interactive web-based visualization demonstrating rotational invariants during continuous random key insertion and deletion.',
    competencyId: 'comp-data-structures',
    learningOutcomeId: 'lo-cs202-co2',
    courseId: 'course-cs202',
    evidenceType: 'live_demo',
    urlOrContent: 'https://aarav-trees.demo.apex.edu',
    submittedAt: '2024-04-18',
    reviewStatus: 'verified',
    score: 96,
    feedback: 'Outstanding visual tool. The rotation step animation clearly shows tree rebalancing in real time.',
    reviewerName: 'Dr. Evelyn Vance',
    verifiedLevel: 4
  },
  {
    id: 'evi-5',
    studentId: 'user-student-aarav',
    title: 'Normalized Healthcare DB with Boyce-Codd Normal Form Audit',
    description: 'Submission for CS301 project with full DDL, sample seed data, and formal proofs of dependency preservation.',
    competencyId: 'comp-db-design',
    learningOutcomeId: 'lo-cs301-co3',
    courseId: 'course-cs301',
    assessmentId: 'asm-cs301-proj',
    evidenceType: 'github',
    urlOrContent: 'https://github.com/aarav-sharma/bcnf-hospital-management-db',
    submittedAt: '2024-11-10',
    reviewStatus: 'pending', // Pending review for Faculty review workflow!
    reviewerName: 'Dr. Evelyn Vance'
  }
];

export const mockLearningPathways: LearningPathway[] = [
  {
    id: 'path-db-normalization',
    studentId: 'user-student-aarav',
    targetCompetencyId: 'comp-db-design',
    title: 'Bridge Skill Gap: Boyce-Codd Normal Form & Schema Mastery',
    description: 'Step-by-step roadmap to transition your Database Design competency from Developing (Level 3) to Proficient (Level 4).',
    status: 'in_progress',
    createdAt: '2024-10-15',
    targetDate: '2024-11-30',
    steps: [
      {
        id: 'step-db-1',
        title: 'Review Armstrong Axioms & Compute Attribute Closures (F+)',
        conceptTopicId: 'top-cs301-t7',
        courseId: 'course-cs301',
        description: 'Practice calculating closure sets on non-trivial functional dependencies to identify candidate superkeys.',
        activityType: 'reading',
        status: 'completed',
        prerequisites: [],
        estimatedHours: 3,
        deliverable: 'Solved closure exercises on 5 complex schemas'
      },
      {
        id: 'step-db-2',
        title: 'Construct Minimal Canonical Covers for Functional Dependency Sets',
        conceptTopicId: 'top-cs301-t7',
        courseId: 'course-cs301',
        description: 'Eliminate extraneous attributes and redundant dependencies to produce irreducible minimal covers.',
        activityType: 'lab_exercise',
        status: 'completed',
        prerequisites: ['step-db-1'],
        estimatedHours: 4,
        deliverable: 'Canonical cover algorithmic script or proofs'
      },
      {
        id: 'step-db-3',
        title: 'Decompose Schema into Boyce-Codd Normal Form (BCNF)',
        conceptTopicId: 'top-cs301-t9',
        courseId: 'course-cs301',
        description: 'Apply the recursive BCNF decomposition algorithm and verify the lossless join property using tableaux tests.',
        activityType: 'project_milestone',
        status: 'available',
        prerequisites: ['step-db-2'],
        estimatedHours: 6,
        deliverable: 'Hospital schema BCNF decomposition proof'
      },
      {
        id: 'step-db-4',
        title: 'Evaluate Functional Dependency Preservation vs BCNF Tradeoffs',
        conceptTopicId: 'top-cs301-t9',
        courseId: 'course-cs301',
        description: 'Document case studies where BCNF forces dependency loss and explain when 3NF is preferable in industry systems.',
        activityType: 'project_milestone',
        status: 'available',
        prerequisites: ['step-db-3'],
        estimatedHours: 4,
        deliverable: 'Architectural Decision Record (ADR) on BCNF tradeoffs'
      },
      {
        id: 'step-db-5',
        title: 'Submit Working PostgreSQL DDL Project with Automated Verification',
        courseId: 'course-cs301',
        description: 'Implement the normalized schema with check constraints, foreign keys, and transaction tests.',
        activityType: 'assessment_prep',
        status: 'locked',
        prerequisites: ['step-db-4'],
        estimatedHours: 8,
        deliverable: 'Verified GitHub repository linked to CS301 project'
      }
    ]
  },
  {
    id: 'path-algo-dp',
    studentId: 'user-student-aarav',
    targetCompetencyId: 'comp-algorithm-design',
    title: 'Advanced Dynamic Programming State Space Exploration',
    description: 'Transition from basic memoization to advanced multi-dimensional state compression and interval DP.',
    status: 'in_progress',
    createdAt: '2024-10-01',
    targetDate: '2024-12-10',
    steps: [
      {
        id: 'step-algo-1',
        title: 'Master Theorem & Recurrence Equation Bounds',
        conceptTopicId: 'top-cs303-t1',
        courseId: 'course-cs303',
        description: 'Prove asymptotic bounds on divide-and-conquer runtime recurrences.',
        activityType: 'reading',
        status: 'completed',
        prerequisites: [],
        estimatedHours: 3,
        deliverable: 'Asymptotic proof document'
      },
      {
        id: 'step-algo-2',
        title: 'Implement 0/1 Knapsack Space Reduction from O(N*W) to O(W)',
        conceptTopicId: 'top-cs303-t2',
        courseId: 'course-cs303',
        description: 'Transform 2D matrix dynamic programming into single-array rolling backwards buffer.',
        activityType: 'lab_exercise',
        status: 'completed',
        prerequisites: ['step-algo-1'],
        estimatedHours: 5,
        deliverable: 'C++ space reduction code'
      },
      {
        id: 'step-algo-3',
        title: 'Synthesize Tree Dynamic Programming & Subtree Invariants',
        courseId: 'course-cs303',
        description: 'Formulate DP states where nodes aggregate child optimal solutions on undirected trees.',
        activityType: 'lab_exercise',
        status: 'available',
        prerequisites: ['step-algo-2'],
        estimatedHours: 8,
        deliverable: 'Tree re-rooting algorithm implementations'
      }
    ]
  }
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Evidence Evaluation Published',
    message: 'Dr. Evelyn Vance reviewed your "E-Commerce Analytical SQL Pipeline". Verified level: Proficient (Level 4). Score: 95/100.',
    type: 'evidence_reviewed',
    timestamp: '2024-10-02T14:30:00Z',
    isRead: false,
    link: '/evidence'
  },
  {
    id: 'notif-2',
    title: 'Skill Gap Identified: Relational Database Design',
    message: 'Your current demonstrated level in Database Design is Developing (Level 3), while expected course outcome is Proficient (Level 4). A personalized pathway is recommended.',
    type: 'gap_alert',
    timestamp: '2024-10-15T09:15:00Z',
    isRead: false,
    link: '/skill-gap'
  },
  {
    id: 'notif-3',
    title: 'Curriculum Mapping Update Published',
    message: 'CS301 unit "Database Design & Normalization" mappings were updated by Dr. Evelyn Vance with revised learning outcome linkages.',
    type: 'mapping_update',
    timestamp: '2024-10-20T11:00:00Z',
    isRead: true,
    link: '/courses/course-cs301'
  },
  {
    id: 'notif-4',
    title: 'Assessment Deadline Approaching',
    message: 'Hospital Management BCNF Schema & Implementation Project is due in 3 days. Ensure your GitHub repo is linked.',
    type: 'assessment_graded',
    timestamp: '2024-11-12T08:00:00Z',
    isRead: false,
    link: '/assessments'
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    actorName: 'Dr. Evelyn Vance',
    actorRole: 'faculty',
    action: 'Approved curriculum mapping',
    targetName: 'CS301: Boyce-Codd Normal Form → Database Design',
    timestamp: '2024-09-12T16:20:00Z',
    category: 'curriculum'
  },
  {
    id: 'act-2',
    actorName: 'Aarav Sharma',
    actorRole: 'student',
    action: 'Submitted evidence',
    targetName: 'Normalized Healthcare DB with BCNF Audit',
    timestamp: '2024-11-10T19:40:00Z',
    category: 'evidence'
  },
  {
    id: 'act-3',
    actorName: 'Dr. Evelyn Vance',
    actorRole: 'faculty',
    action: 'Evaluated assessment rubric',
    targetName: 'SQL Complex Querying Practical (Aarav Sharma: 95/100)',
    timestamp: '2024-10-02T14:28:00Z',
    category: 'assessment'
  },
  {
    id: 'act-4',
    actorName: 'Prof. Rajeshwar Kulkarni',
    actorRole: 'admin',
    action: 'Published program revision',
    targetName: 'B.Tech CSE Semester 3 Curriculum Accreditation Baseline',
    timestamp: '2024-08-01T10:00:00Z',
    category: 'curriculum'
  }
];

