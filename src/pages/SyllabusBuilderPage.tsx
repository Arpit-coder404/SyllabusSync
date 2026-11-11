import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { useAppStore } from '../store/useAppStore';
import {
  UploadCloud,
  FileText,
  FileUp,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Target
} from 'lucide-react';

interface ExtractedStructure {
  code: string;
  name: string;
  credits: number;
  semesterNumber: number;
  description: string;
  units: Array<{
    unitNumber: number;
    title: string;
    hours: number;
    topics: Array<{
      title: string;
      hours: number;
      difficulty: 'introductory' | 'intermediate' | 'advanced';
    }>;
  }>;
  outcomes: Array<{
    code: string;
    statement: string;
    bloomsLevel: 'apply' | 'create' | 'analyze' | 'understand';
  }>;
}

export const SyllabusBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCourse, addUnit, addTopic, addLearningOutcome } = useAppStore();

  const [activeMode, setActiveMode] = useState<'upload' | 'manual'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedStructure | null>(null);

  // Manual course creation form
  const [manualCode, setManualCode] = useState('CS404');
  const [manualName, setManualName] = useState('Distributed Cloud Systems');
  const [manualCredits, setManualCredits] = useState(4);
  const [manualSem, setManualSem] = useState(4);
  const [manualDesc, setManualDesc] = useState('Principles of distributed consensus (Raft/Paxos), fault tolerance, CAP theorem, and containerized microservice architectures.');

  // Pre-load realistic sample syllabus text
  const handleLoadSampleSyllabus = () => {
    const sample = `COURSE SYLLABUS: APEX INSTITUTE OF TECHNOLOGY
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
COURSE CODE: CS404
COURSE TITLE: Distributed Cloud Systems & Infrastructure
ACADEMIC CREDITS: 4
SEMESTER: 4 (Spring)

COURSE DESCRIPTION:
Comprehensive exploration of distributed computing architectures, consistency models, network partitions, consensus protocols, and scalable cloud storage engines.

UNIT 1: Distributed Architectures & Remote Communication (10 Hours)
- Remote Procedure Calls (RPC) and Protocol Buffers (3 hrs, introductory)
- Clock Synchronization & Vector Clocks (4 hrs, intermediate)
- Lamport Timestamps & Total Order Broadcast (3 hrs, intermediate)

UNIT 2: Consensus, Quorums & Fault Tolerance (14 Hours)
- Byzantine Faults & Two Generals Problem (4 hrs, intermediate)
- Raft Consensus State Machine Replication (6 hrs, advanced)
- Quorum Reads and Writes in Dynamo-style Stores (4 hrs, advanced)

UNIT 3: Cloud Storage & Distributed File Systems (12 Hours)
- Google File System (GFS) & HDFS Architecture (4 hrs, intermediate)
- Consistent Hashing & Virtual Nodes (4 hrs, intermediate)
- Distributed Transactions & Multi-Version Concurrency (4 hrs, advanced)

COURSE LEARNING OUTCOMES:
CO1: Synthesize remote procedure call protocols and analyze vector clock partial orders in distributed systems. (Bloom: apply)
CO2: Implement the Raft consensus algorithm and verify leader election and log replication guarantees. (Bloom: create)
CO3: Evaluate consistency vs availability tradeoffs under the CAP theorem for distributed key-value storage. (Bloom: analyze)`;

    setRawText(sample);
    simulateExtraction(sample);
  };

  const simulateExtraction = (textToParse: string) => {
    setIsExtracting(true);
    setTimeout(() => {
      setExtractedData({
        code: 'CS404',
        name: 'Distributed Cloud Systems & Infrastructure',
        credits: 4,
        semesterNumber: 4,
        description: 'Comprehensive exploration of distributed computing architectures, consistency models, network partitions, consensus protocols, and scalable cloud storage engines.',
        units: [
          {
            unitNumber: 1,
            title: 'Distributed Architectures & Remote Communication',
            hours: 10,
            topics: [
              { title: 'Remote Procedure Calls (RPC) and Protocol Buffers', hours: 3, difficulty: 'introductory' },
              { title: 'Clock Synchronization & Vector Clocks', hours: 4, difficulty: 'intermediate' },
              { title: 'Lamport Timestamps & Total Order Broadcast', hours: 3, difficulty: 'intermediate' }
            ]
          },
          {
            unitNumber: 2,
            title: 'Consensus, Quorums & Fault Tolerance',
            hours: 14,
            topics: [
              { title: 'Byzantine Faults & Two Generals Problem', hours: 4, difficulty: 'intermediate' },
              { title: 'Raft Consensus State Machine Replication', hours: 6, difficulty: 'advanced' },
              { title: 'Quorum Reads and Writes in Dynamo-style Stores', hours: 4, difficulty: 'advanced' }
            ]
          },
          {
            unitNumber: 3,
            title: 'Cloud Storage & Distributed File Systems',
            hours: 12,
            topics: [
              { title: 'Google File System (GFS) & HDFS Architecture', hours: 4, difficulty: 'intermediate' },
              { title: 'Consistent Hashing & Virtual Nodes', hours: 4, difficulty: 'intermediate' },
              { title: 'Distributed Transactions & Multi-Version Concurrency', hours: 4, difficulty: 'advanced' }
            ]
          }
        ],
        outcomes: [
          { code: 'CO1', statement: 'Synthesize remote procedure call protocols and analyze vector clock partial orders in distributed systems.', bloomsLevel: 'apply' },
          { code: 'CO2', statement: 'Implement the Raft consensus algorithm and verify leader election and log replication guarantees.', bloomsLevel: 'create' },
          { code: 'CO3', statement: 'Evaluate consistency vs availability tradeoffs under the CAP theorem for distributed key-value storage.', bloomsLevel: 'analyze' }
        ]
      });
      setIsExtracting(false);
    }, 600);
  };

  const handleSaveExtractedToCurriculum = () => {
    if (!extractedData) return;

    // 1. Add course
    const newCourse = addCourse({
      semesterId: `sem-${extractedData.semesterNumber}`,
      code: extractedData.code,
      name: extractedData.name,
      credits: extractedData.credits,
      departmentId: 'dept-cse',
      description: extractedData.description,
      prerequisiteCourseIds: ['course-cs401', 'course-cs402'],
      facultyId: 'user-faculty-evelyn',
      facultyName: 'Dr. Evelyn Vance',
      isPublished: true,
      color: '#315C46'
    });

    // 2. Add units and topics
    extractedData.units.forEach((u) => {
      const newUnit = addUnit({
        courseId: newCourse.id,
        unitNumber: u.unitNumber,
        title: u.title,
        description: `Syllabus Unit ${u.unitNumber} covering core foundations.`,
        estimatedHours: u.hours
      });

      u.topics.forEach((t) => {
        addTopic({
          unitId: newUnit.id,
          courseId: newCourse.id,
          title: t.title,
          description: `Detailed study of ${t.title}.`,
          hours: t.hours,
          difficulty: t.difficulty,
          prerequisiteTopicIds: []
        });
      });
    });

    // 3. Add outcomes
    extractedData.outcomes.forEach((o) => {
      addLearningOutcome({
        courseId: newCourse.id,
        code: o.code,
        statement: o.statement,
        bloomsLevel: o.bloomsLevel
      });
    });

    alert(`Curriculum for ${newCourse.code} successfully saved and published! Navigating to Course detail.`);
    navigate(`/courses/${newCourse.id}`);
  };

  return (
    <div className="space-y-6">
      <Header
        title="Curriculum Setup & Syllabus Extraction"
        subtitle="Ingest academic syllabi via PDF/DOCX or manual entry with structured validation before publishing."
        badge="Accreditation Ingestion"
      />

      <div className="px-6 space-y-6">
        {/* Ingestion Mode Switcher */}
        <div className="flex items-center gap-2 border-b border-border text-xs font-semibold">
          <button
            onClick={() => setActiveMode('upload')}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-1.5 transition-all ${
              activeMode === 'upload'
                ? 'border-forest text-forest bg-forest-soft/30'
                : 'border-transparent text-tx-secondary hover:text-tx-primary'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>1. Document Extraction (PDF / DOCX / Text)</span>
          </button>
          <button
            onClick={() => setActiveMode('manual')}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-1.5 transition-all ${
              activeMode === 'manual'
                ? 'border-forest text-forest bg-forest-soft/30'
                : 'border-transparent text-tx-secondary hover:text-tx-primary'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>2. Manual Course & Syllabus Entry</span>
          </button>
        </div>

        {/* MODE 1: UPLOAD & EXTRACTION WORKFLOW */}
        {activeMode === 'upload' && (
          <div className="space-y-6">
            <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-tx-primary">
                    Upload Syllabus Document
                  </h3>
                  <p className="text-xs text-tx-secondary">
                    Supports academic PDF, DOCX, or direct textual syllabus inputs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleSyllabus}
                  className="px-3 py-1.5 text-xs font-semibold bg-forest-soft hover:bg-forest-soft/80 text-forest-dark border border-forest/30 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-forest" />
                  <span>Load Sample University Syllabus (PDF Format)</span>
                </button>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-forest/50 transition-colors bg-bg-main/40">
                <FileUp className="w-8 h-8 text-tx-muted mx-auto mb-2" />
                <div className="text-xs font-semibold text-tx-primary">
                  Drag and drop academic syllabus file here, or click to browse
                </div>
                <p className="text-[11px] text-tx-muted mt-1">
                  Supported: PDF, DOCX, TXT (Maximum file size: 25MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFile(file);
                      handleLoadSampleSyllabus();
                    }
                  }}
                  className="hidden"
                  id="syllabus-file-input"
                />
                <label
                  htmlFor="syllabus-file-input"
                  className="mt-3 inline-block px-4 py-1.5 bg-bg-surface hover:bg-bg-main border border-border rounded-md text-xs font-medium cursor-pointer text-tx-primary"
                >
                  Select Syllabus File
                </label>
              </div>

              {/* Text Area for raw or pasted content */}
              <div className="mt-4">
                <label className="block text-xs font-mono uppercase text-tx-muted mb-1 font-medium">
                  Or Paste Raw Syllabus Content:
                </label>
                <textarea
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste raw university syllabus text here..."
                  className="w-full p-3 bg-bg-main border border-border rounded-lg text-xs font-mono text-tx-primary focus:outline-none focus:border-forest"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => simulateExtraction(rawText)}
                    disabled={!rawText.trim() || isExtracting}
                    className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    {isExtracting ? 'Analyzing Structure...' : 'Extract & Parse Academic Structure'}
                  </button>
                </div>
              </div>
            </div>

            {/* Structured Review Interface (Section 7. Extraction Workflow Step 5 & 6) */}
            {extractedData && (
              <div className="p-6 bg-bg-surface border border-forest/40 rounded-xl shadow-modal space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forest-soft text-forest-dark font-bold">
                        Extraction Review
                      </span>
                      <span className="text-xs font-mono text-forest">
                        Parsed 3 Units · 9 Topics · 3 Outcomes
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-tx-primary">
                      Review & Correct Extracted Curriculum Structure
                    </h3>
                    <p className="text-xs text-tx-secondary">
                      Verify course attributes, unit titles, hours, and outcome formulations before saving to the live database.
                    </p>
                  </div>

                  <button
                    onClick={handleSaveExtractedToCurriculum}
                    className="px-5 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs font-bold shadow-elevated flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Publish Curriculum</span>
                  </button>
                </div>

                {/* Course Metadata Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-tx-muted uppercase mb-1">
                      Course Code
                    </label>
                    <input
                      type="text"
                      value={extractedData.code}
                      onChange={(e) => setExtractedData({ ...extractedData, code: e.target.value })}
                      className="w-full p-2 bg-bg-main border border-border rounded font-mono font-bold text-tx-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-tx-muted uppercase mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={extractedData.name}
                      onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
                      className="w-full p-2 bg-bg-main border border-border rounded font-bold text-tx-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-tx-muted uppercase mb-1">
                      Academic Credits
                    </label>
                    <input
                      type="number"
                      value={extractedData.credits}
                      onChange={(e) => setExtractedData({ ...extractedData, credits: Number(e.target.value) })}
                      className="w-full p-2 bg-bg-main border border-border rounded font-mono font-bold text-tx-primary"
                    />
                  </div>
                </div>

                {/* Extracted Units & Topics */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase text-tx-muted font-bold">
                    Extracted Units & Topics ({extractedData.units.length} Modules)
                  </h4>
                  {extractedData.units.map((unit, uIdx) => (
                    <div key={uIdx} className="p-4 bg-bg-main border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-xs text-tx-primary">
                          Unit {unit.unitNumber}: {unit.title} ({unit.hours} hrs)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {unit.topics.map((topic, tIdx) => (
                          <div
                            key={tIdx}
                            className="p-2.5 bg-bg-surface border border-border rounded flex items-center justify-between text-xs"
                          >
                            <span className="font-medium text-tx-primary">{topic.title}</span>
                            <div className="flex items-center gap-3 font-mono text-[11px] text-tx-secondary">
                              <span>{topic.hours} hrs</span>
                              <span className="capitalize">{topic.difficulty}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extracted Outcomes */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-tx-muted font-bold">
                    Course Learning Outcomes ({extractedData.outcomes.length})
                  </h4>
                  {extractedData.outcomes.map((co, oIdx) => (
                    <div key={oIdx} className="p-3 bg-bg-main border border-border rounded-lg text-xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-forest">{co.code}</span>
                        <span className="text-tx-primary">{co.statement}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-infoBlue-soft text-infoBlue-dark font-medium flex-shrink-0">
                        {co.bloomsLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: MANUAL COURSE CREATION */}
        {activeMode === 'manual' && (
          <div className="p-6 bg-bg-surface border border-border rounded-xl shadow-subtle max-w-2xl space-y-4">
            <h3 className="font-heading font-bold text-base text-tx-primary">
              Manual Course & Syllabus Entry
            </h3>
            <p className="text-xs text-tx-secondary">
              Directly author a new subject without document parsing.
            </p>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-tx-primary mb-1">Course Code</label>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="w-full p-2 bg-bg-main border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-tx-primary mb-1">Credits</label>
                  <input
                    type="number"
                    value={manualCredits}
                    onChange={(e) => setManualCredits(Number(e.target.value))}
                    className="w-full p-2 bg-bg-main border border-border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-tx-primary mb-1">Subject Name</label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full p-2 bg-bg-main border border-border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-tx-primary mb-1">Description</label>
                <textarea
                  rows={3}
                  value={manualDesc}
                  onChange={(e) => setManualDesc(e.target.value)}
                  className="w-full p-2 bg-bg-main border border-border rounded"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const c = addCourse({
                      semesterId: `sem-${manualSem}`,
                      code: manualCode,
                      name: manualName,
                      credits: manualCredits,
                      departmentId: 'dept-cse',
                      description: manualDesc,
                      prerequisiteCourseIds: [],
                      facultyId: 'user-faculty-evelyn',
                      facultyName: 'Dr. Evelyn Vance',
                      isPublished: true,
                      color: '#BD7458'
                    });
                    alert(`Created ${manualCode}!`);
                    navigate(`/courses/${c.id}`);
                  }}
                  className="px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-md font-semibold"
                >
                  Create & Open Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

