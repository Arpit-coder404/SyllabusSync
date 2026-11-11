import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './CustomNodes';
import { useAppStore } from '../../store/useAppStore';
import {
  Filter,
  Layers,
  Sparkles,
  X,
  Compass,
  ArrowRight,
  Award,
  BookOpen,
  Target,
  CheckSquare,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { ProficiencyBadge } from '../common/ProficiencyBadge';
import { CompetencyCategory, ProficiencyLevel, PROFICIENCY_NAMES } from '../../types';
import { useNavigate } from 'react-router-dom';

interface GraphFilters {
  category: CompetencyCategory | 'all';
  semesterId: string | 'all';
  courseId: string | 'all';
  assessedOnly: boolean;
  unmappedOnly: boolean;
  showPrereqs: boolean;
}

export const CompetencyGraph: React.FC = () => {
  const {
    programs,
    courses,
    units,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    assessments,
    studentCompetencies,
    studentEvidence,
    selectedProgramId
  } = useAppStore();

  const navigate = useNavigate();

  // Filters State
  const [filters, setFilters] = useState<GraphFilters>({
    category: 'all',
    semesterId: 'all',
    courseId: 'all',
    assessedOnly: false,
    unmappedOnly: false,
    showPrereqs: true
  });

  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    type: string;
    raw: any;
  } | null>(null);

  // Generate Nodes and Edges based on actual curriculum data and filters
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const activeProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];

    // Filter courses
    let filteredCourses = courses;
    if (filters.semesterId !== 'all') {
      filteredCourses = filteredCourses.filter((c) => c.semesterId === filters.semesterId);
    }
    if (filters.courseId !== 'all') {
      filteredCourses = filteredCourses.filter((c) => c.id === filters.courseId);
    }

    const filteredCourseIds = new Set(filteredCourses.map((c) => c.id));

    // Filter Units & Topics
    const filteredUnits = units.filter((u) => filteredCourseIds.has(u.courseId));
    const filteredUnitIds = new Set(filteredUnits.map((u) => u.id));

    let filteredTopics = topics.filter((t) => filteredUnitIds.has(t.unitId));
    if (filters.unmappedOnly) {
      filteredTopics = filteredTopics.filter((t) => !t.isMapped);
    }

    const filteredTopicIds = new Set(filteredTopics.map((t) => t.id));

    // Filter Outcomes
    const filteredOutcomes = learningOutcomes.filter((lo) => filteredCourseIds.has(lo.courseId));
    const filteredOutcomeIds = new Set(filteredOutcomes.map((lo) => lo.id));

    // Filter Mappings
    let filteredMappings = mappings.filter((m) =>
      filteredCourseIds.has(m.courseId) &&
      filteredTopicIds.has(m.topicId)
    );

    // Filter Competencies
    let filteredCompetencies = competencies;
    if (filters.category !== 'all') {
      filteredCompetencies = filteredCompetencies.filter((c) => c.category === filters.category);
    }
    if (filters.assessedOnly) {
      const assessedCompIds = new Set(
        assessments.flatMap((a) => a.targetCompetencyIds)
      );
      filteredCompetencies = filteredCompetencies.filter((c) => assessedCompIds.has(c.id));
    }

    const filteredCompetencyIds = new Set(filteredCompetencies.map((c) => c.id));
    filteredMappings = filteredMappings.filter((m) => filteredCompetencyIds.has(m.competencyId));

    // Filter Assessments
    const filteredAssessments = assessments.filter((a) =>
      filteredCourseIds.has(a.courseId) &&
      a.targetCompetencyIds.some((cid) => filteredCompetencyIds.has(cid))
    );

    // Layout configuration coordinates
    const COL_PROGRAM = 50;
    const COL_COURSE = 350;
    const COL_UNIT = 650;
    const COL_TOPIC = 950;
    const COL_OUTCOME = 1250;
    const COL_COMPETENCY = 1600;
    const COL_ASSESSMENT = 1950;

    // 1. Program Node
    nodes.push({
      id: `prog-${activeProgram.id}`,
      type: 'program',
      position: { x: COL_PROGRAM, y: 300 },
      data: {
        label: activeProgram.name,
        code: activeProgram.code,
        degree: activeProgram.degree,
        raw: activeProgram
      }
    });

    // 2. Course Nodes
    filteredCourses.forEach((course, idx) => {
      const yPos = 80 + idx * 160;
      const nodeId = `course-${course.id}`;
      nodes.push({
        id: nodeId,
        type: 'course',
        position: { x: COL_COURSE, y: yPos },
        data: {
          label: course.name,
          code: course.code,
          credits: course.credits,
          semesterNumber: course.semesterId === 'sem-1' ? 1 : course.semesterId === 'sem-2' ? 2 : course.semesterId === 'sem-3' ? 3 : 4,
          facultyName: course.facultyName,
          color: course.color,
          raw: course
        }
      });

      // Edge from Program to Course
      edges.push({
        id: `e-prog-${course.id}`,
        source: `prog-${activeProgram.id}`,
        target: nodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#315C46', strokeWidth: 2 }
      });
    });

    // 3. Unit Nodes
    filteredUnits.forEach((unit, idx) => {
      const yPos = 60 + idx * 120;
      const nodeId = `unit-${unit.id}`;
      nodes.push({
        id: nodeId,
        type: 'unit',
        position: { x: COL_UNIT, y: yPos },
        data: {
          label: unit.title,
          unitNumber: unit.unitNumber,
          raw: unit
        }
      });

      // Edge from Course to Unit
      edges.push({
        id: `e-c-${unit.courseId}-u-${unit.id}`,
        source: `course-${unit.courseId}`,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#747B73', strokeWidth: 1.5 }
      });
    });

    // 4. Topic Nodes
    filteredTopics.forEach((topic, idx) => {
      const yPos = 40 + idx * 85;
      const nodeId = `topic-${topic.id}`;
      nodes.push({
        id: nodeId,
        type: 'topic',
        position: { x: COL_TOPIC, y: yPos },
        data: {
          label: topic.title,
          hours: topic.hours,
          difficulty: topic.difficulty,
          isMapped: topic.isMapped,
          raw: topic
        }
      });

      // Edge from Unit to Topic
      edges.push({
        id: `e-u-${topic.unitId}-t-${topic.id}`,
        source: `unit-${topic.unitId}`,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#A5B5A5', strokeWidth: 1.2 }
      });
    });

    // 5. Outcome Nodes
    filteredOutcomes.forEach((outcome, idx) => {
      const yPos = 60 + idx * 130;
      const nodeId = `outcome-${outcome.id}`;
      nodes.push({
        id: nodeId,
        type: 'outcome',
        position: { x: COL_OUTCOME, y: yPos },
        data: {
          label: outcome.statement,
          code: outcome.code,
          bloomsLevel: outcome.bloomsLevel,
          raw: outcome
        }
      });
    });

    // 6. Competency Nodes
    filteredCompetencies.forEach((comp, idx) => {
      const yPos = 50 + idx * 150;
      const nodeId = `comp-${comp.id}`;
      const compMappingsCount = mappings.filter((m) => m.competencyId === comp.id).length;

      nodes.push({
        id: nodeId,
        type: 'competency',
        position: { x: COL_COMPETENCY, y: yPos },
        data: {
          label: comp.name,
          category: comp.category,
          targetLevel: comp.targetLevel,
          mappingCount: compMappingsCount,
          raw: comp
        }
      });
    });

    // 7. Mapping Edges (Topic -> Outcome, and Outcome -> Competency)
    filteredMappings.forEach((map) => {
      // Topic to Outcome
      if (filteredTopicIds.has(map.topicId) && filteredOutcomeIds.has(map.learningOutcomeId)) {
        edges.push({
          id: `e-t-${map.topicId}-lo-${map.learningOutcomeId}`,
          source: `topic-${map.topicId}`,
          target: `outcome-${map.learningOutcomeId}`,
          type: 'smoothstep',
          style: { stroke: '#6689A5', strokeWidth: 1.5 }
        });
      }

      // Outcome to Competency
      if (filteredOutcomeIds.has(map.learningOutcomeId) && filteredCompetencyIds.has(map.competencyId)) {
        const relationshipColors = {
          introduces: '#6689A5',
          develops: '#315C46',
          reinforces: '#BD7458',
          assesses: '#D99B26'
        };

        edges.push({
          id: `e-map-${map.id}`,
          source: `outcome-${map.learningOutcomeId}`,
          target: `comp-${map.competencyId}`,
          type: 'smoothstep',
          animated: map.relationship === 'assesses',
          label: map.relationship.toUpperCase(),
          labelStyle: { fill: '#222923', fontWeight: 600, fontSize: 9, fontFamily: 'IBM Plex Mono' },
          labelBgPadding: [4, 2],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: '#FFFFFF', stroke: '#E4E5DE', strokeWidth: 1 },
          style: {
            stroke: relationshipColors[map.relationship] || '#315C46',
            strokeWidth: map.relationship === 'assesses' ? 2.5 : 1.8
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: relationshipColors[map.relationship] || '#315C46'
          }
        });
      }
    });

    // 8. Assessment Nodes & Edges from Competency
    filteredAssessments.forEach((asm, idx) => {
      const yPos = 80 + idx * 130;
      const nodeId = `asm-${asm.id}`;
      nodes.push({
        id: nodeId,
        type: 'assessment',
        position: { x: COL_ASSESSMENT, y: yPos },
        data: {
          label: asm.title,
          type: asm.type.replace('_', ' '),
          maxScore: asm.maxScore,
          raw: asm
        }
      });

      // Link targeted competencies to this assessment
      asm.targetCompetencyIds.forEach((cid) => {
        if (filteredCompetencyIds.has(cid)) {
          edges.push({
            id: `e-c-${cid}-asm-${asm.id}`,
            source: `comp-${cid}`,
            target: nodeId,
            type: 'smoothstep',
            style: { stroke: '#D99B26', strokeDasharray: '4,4', strokeWidth: 1.8 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#D99B26'
            }
          });
        }
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [
    programs,
    courses,
    units,
    topics,
    learningOutcomes,
    competencies,
    mappings,
    assessments,
    selectedProgramId,
    filters
  ]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Handle node selection
  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode({
      id: node.id,
      type: node.type || 'unknown',
      raw: node.data.raw
    });
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-bg-main overflow-hidden flex flex-col">
      {/* Top Filter and Tool Header */}
      <div className="p-3 bg-bg-surface border-b border-border flex flex-wrap items-center justify-between gap-3 shadow-subtle z-10">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-main rounded border border-border text-xs font-mono text-tx-secondary">
            <Filter className="w-3.5 h-3.5 text-forest" />
            <span className="font-medium text-tx-primary">Graph Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
            className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
          >
            <option value="all">All Competency Categories</option>
            <option value="technical">Technical Only</option>
            <option value="analytical">Analytical Only</option>
            <option value="professional">Professional Only</option>
            <option value="creative">Creative Only</option>
          </select>

          {/* Semester Filter */}
          <select
            value={filters.semesterId}
            onChange={(e) => setFilters({ ...filters, semesterId: e.target.value })}
            className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
          >
            <option value="all">All Semesters (1-4)</option>
            <option value="sem-1">Semester 1</option>
            <option value="sem-2">Semester 2</option>
            <option value="sem-3">Semester 3 (Active)</option>
            <option value="sem-4">Semester 4</option>
          </select>

          {/* Course Filter */}
          <select
            value={filters.courseId}
            onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
            className="text-xs bg-bg-main border border-border rounded px-2.5 py-1 text-tx-primary focus:outline-none focus:border-forest"
          >
            <option value="all">All Subjects</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} · {c.name}
              </option>
            ))}
          </select>

          {/* Checkbox: Assessed Only */}
          <label className="flex items-center gap-1.5 text-xs text-tx-secondary cursor-pointer hover:text-tx-primary">
            <input
              type="checkbox"
              checked={filters.assessedOnly}
              onChange={(e) => setFilters({ ...filters, assessedOnly: e.target.checked })}
              className="rounded border-border text-forest focus:ring-forest"
            />
            <span>Assessed Only</span>
          </label>

          {/* Checkbox: Unmapped Topics */}
          <label className="flex items-center gap-1.5 text-xs text-tx-secondary cursor-pointer hover:text-tx-primary">
            <input
              type="checkbox"
              checked={filters.unmappedOnly}
              onChange={(e) => setFilters({ ...filters, unmappedOnly: e.target.checked })}
              className="rounded border-border text-terracotta focus:ring-terracotta"
            />
            <span className="text-terracotta font-medium">Unmapped Gaps</span>
          </label>
        </div>

        {/* Legend / Metrics summary */}
        <div className="flex items-center gap-3 text-xs font-mono text-tx-secondary">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-forest" />
            <span>{competencies.length} Competencies</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-infoBlue" />
            <span>{mappings.length} Active Mappings</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber" />
            <span>{assessments.length} Assessments</span>
          </div>
        </div>
      </div>

      {/* Main Interactive React Flow Area */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          attributionPosition="bottom-left"
          className="bg-bg-main"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#D0D2C8" />
          <Controls className="bg-bg-surface border-border shadow-subtle text-tx-primary" />
          <MiniMap
            nodeColor={(n) => {
              if (n.type === 'program') return '#315C46';
              if (n.type === 'course') return '#6689A5';
              if (n.type === 'competency') return '#315C46';
              if (n.type === 'assessment') return '#D99B26';
              return '#E4E5DE';
            }}
            className="border border-border bg-bg-surface/80 rounded-lg shadow-subtle overflow-hidden"
          />
        </ReactFlow>

        {/* Contextual Node Inspector Slide-over Panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bottom-4 w-96 bg-bg-surface border border-border rounded-xl shadow-modal z-20 flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border bg-bg-main/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark border border-forest/20 font-bold">
                  {selectedNode.type} Details
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-bg-surface rounded-md text-tx-secondary hover:text-tx-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* If Competency Node */}
              {selectedNode.type === 'competency' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase font-mono font-semibold text-forest">
                      {selectedNode.raw.category} Competency
                    </span>
                    <ProficiencyBadge level={selectedNode.raw.targetLevel} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-tx-primary leading-snug">
                    {selectedNode.raw.name}
                  </h3>
                  <p className="text-xs text-tx-secondary mt-2 leading-relaxed">
                    {selectedNode.raw.description}
                  </p>

                  {/* 5-Level Proficiency Progression Rubric */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-tx-muted mb-2 font-medium">
                      Curriculum Proficiency Framework
                    </h4>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((lvl) => {
                        const levelNum = lvl as ProficiencyLevel;
                        const isTarget = lvl === selectedNode.raw.targetLevel;
                        return (
                          <div
                            key={lvl}
                            className={`p-2.5 rounded-lg border text-xs transition-colors ${
                              isTarget
                                ? 'bg-forest-soft/70 border-forest/40 text-forest-dark font-medium'
                                : 'bg-bg-main/50 border-border text-tx-secondary'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-mono font-semibold">
                                Level {lvl}: {PROFICIENCY_NAMES[levelNum]}
                              </span>
                              {isTarget && (
                                <span className="text-[9px] uppercase font-mono bg-forest text-white px-1.5 py-0.2 rounded">
                                  Curriculum Target
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] leading-tight text-tx-primary/80">
                              {selectedNode.raw.levels[levelNum]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Student Demonstrated Status */}
                  <div className="mt-4 p-3 bg-bg-main border border-border rounded-lg">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-tx-muted mb-1">
                      Current Demonstrated Evidence
                    </div>
                    {(() => {
                      const rec = studentCompetencies.find((sc) => sc.competencyId === selectedNode.raw.id);
                      const evis = studentEvidence.filter((e) => e.competencyId === selectedNode.raw.id);
                      return (
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-tx-primary">
                              Demonstrated Level:
                            </span>
                            <ProficiencyBadge level={rec?.currentDemonstratedLevel || 1} />
                          </div>
                          <div className="text-xs text-tx-secondary mt-1">
                            {evis.length} verified project evidence submission(s) on file.
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 pt-3 border-t border-border flex gap-2">
                    <button
                      onClick={() => navigate(`/competencies?id=${selectedNode.raw.id}`)}
                      className="flex-1 py-2 px-3 text-xs bg-forest hover:bg-forest-dark text-white rounded-md font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Open Competency Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If Course Node */}
              {selectedNode.type === 'course' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-forest">
                      {selectedNode.raw.code}
                    </span>
                    <span className="text-xs font-mono text-tx-secondary">
                      {selectedNode.raw.credits} Academic Credits
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-tx-primary">
                    {selectedNode.raw.name}
                  </h3>
                  <p className="text-xs text-tx-secondary mt-2 leading-relaxed">
                    {selectedNode.raw.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border space-y-2">
                    <div className="text-xs flex items-center justify-between">
                      <span className="text-tx-secondary">Faculty Instructor:</span>
                      <span className="font-medium text-tx-primary">{selectedNode.raw.facultyName}</span>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                      <span className="text-tx-secondary">Accreditation Status:</span>
                      <span className="font-mono text-forest font-semibold">Approved Matrix</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => navigate(`/courses/${selectedNode.raw.id}`)}
                      className="w-full py-2 px-3 text-xs bg-forest hover:bg-forest-dark text-white rounded-md font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Subject Syllabus & Units</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If Topic Node */}
              {selectedNode.type === 'topic' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-tx-muted">
                      {selectedNode.raw.hours} Hours · {selectedNode.raw.difficulty}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        selectedNode.raw.isMapped
                          ? 'bg-forest-soft text-forest-dark'
                          : 'bg-terracotta-soft text-terracotta font-bold'
                      }`}
                    >
                      {selectedNode.raw.isMapped ? 'Competency Mapped' : 'Unmapped Gaps'}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    {selectedNode.raw.title}
                  </h3>
                  <p className="text-xs text-tx-secondary mt-2 leading-relaxed">
                    {selectedNode.raw.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => navigate(`/faculty?courseId=${selectedNode.raw.courseId}`)}
                      className="w-full py-2 px-3 text-xs bg-forest hover:bg-forest-dark text-white rounded-md font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Manage Mappings in Faculty Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If Assessment Node */}
              {selectedNode.type === 'assessment' && (
                <div>
                  <span className="text-xs font-mono uppercase text-amber-700 font-semibold">
                    {selectedNode.raw.type.replace('_', ' ')}
                  </span>
                  <h3 className="font-heading font-bold text-base text-tx-primary mt-1">
                    {selectedNode.raw.title}
                  </h3>
                  <div className="text-xs font-mono text-tx-secondary mt-1">
                    Max Marks: {selectedNode.raw.maxScore} · Due: {selectedNode.raw.deadline}
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-tx-muted mb-2 font-medium">
                      Evaluation Rubric Criteria ({selectedNode.raw.rubric.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedNode.raw.rubric.map((r: any) => (
                        <div key={r.id} className="p-2.5 rounded bg-bg-main border border-border text-xs">
                          <div className="flex items-center justify-between font-medium text-tx-primary">
                            <span>{r.criterion}</span>
                            <span className="font-mono text-forest">{r.weight}%</span>
                          </div>
                          <p className="text-[11px] text-tx-secondary mt-1">
                            {r.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => navigate('/assessments')}
                      className="w-full py-2 px-3 text-xs bg-forest hover:bg-forest-dark text-white rounded-md font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Submit or Grade Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If Outcome Node */}
              {selectedNode.type === 'outcome' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-infoBlue-dark">
                      {selectedNode.raw.code}
                    </span>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-infoBlue-soft text-infoBlue-dark">
                      Bloom: {selectedNode.raw.bloomsLevel}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-tx-primary mt-2">
                    {selectedNode.raw.statement}
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
