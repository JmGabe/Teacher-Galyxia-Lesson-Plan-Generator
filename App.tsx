import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import Input from './components/ui/Input';
import Select from './components/ui/Select';
import TextArea from './components/ui/TextArea';
import Button from './components/ui/Button';
import LessonPlanDisplay from './components/LessonPlanDisplay';
import {
  GRADE_LEVELS,
  SUBJECTS_BY_GRADE,
  QUARTERS,
  WEEKS,
  LANGUAGES,
} from './constants';
import { LessonPlanFormInput, LessonPlanOutput, SubjectOption } from './types';
import { generateLessonPlan } from './services/geminiService';

// Mock function for downloading DOCX (not fully functional without a library like html-docx-js-typescript)
const downloadDocx = (filename: string, content: string) => {
  // In a real application, you would use a library like 'html-docx-js-typescript' or 'mammoth.js'
  // along with 'file-saver' to generate and download a proper .docx file.
  // For this example, we'll create a simple text file with the content.
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' }); // Mocking as plain text
  element.href = URL.createObjectURL(file);
  element.download = `${filename}.txt`; // Changed to .txt for mock
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  alert('Downloading DOCX is mocked as a text file. In a real app, a library would generate a .docx file.');
};

// Mock function for downloading PDF (not fully functional without a library like jspdf)
const downloadPdf = (filename: string, content: string) => {
  // In a real application, you would use a library like 'jspdf'
  // to generate and download a proper .pdf file.
  // For this example, we'll create a simple text file with the content.
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' }); // Mocking as plain text
  element.href = URL.createObjectURL(file);
  element.download = `${filename}.txt`; // Changed to .txt for mock
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  alert('Downloading PDF is mocked as a text file. In a real app, a library would generate a .pdf file.');
};

const formatLessonPlanForDownload = (lessonPlan: LessonPlanOutput): string => {
  let formattedText = `
I. OBJECTIVE/S
A. Content Standards: ${lessonPlan.objectives.contentStandards}
B. Performance Standards: ${lessonPlan.objectives.performanceStandards}
C. Learning Competencies/Objectives: ${lessonPlan.objectives.learningCompetencies}

II. CONTENT / TOPIC: ${lessonPlan.contentTopic}

III. LEARNING RESOURCES
A. References
1. Teacher’s Guide pages: ${lessonPlan.learningResources.references.teachersGuidePages}
2. Learner’s Materials pages: ${lessonPlan.learningResources.references.learnersMaterialsPages}
3. Textbook pages: ${lessonPlan.learningResources.references.textbookPages}
4. Additional materials from LRMDS portal: ${lessonPlan.learningResources.references.additionalMaterials}
B. Other Materials: ${lessonPlan.learningResources.otherMaterials}

IV. PROCEDURES
A. Reviewing previous lesson or presenting the new lesson: ${lessonPlan.procedures.reviewingPreviousLesson}
B. Establishing a purpose for the lesson: ${lessonPlan.procedures.establishingPurpose}
C. Presenting examples/instances of the new lesson: ${lessonPlan.procedures.presentingExamples}
D. Discussing new concepts and practicing new skills #1: ${lessonPlan.procedures.discussingConcepts1}
E. Discussing new concepts and practicing new skills #2: ${lessonPlan.procedures.discussingConcepts2}
F. Developing mastery (leads to formative assessment): ${lessonPlan.procedures.developingMastery}
G. Finding practical applications of concepts and skills in daily living: ${lessonPlan.procedures.findingPracticalApplications}
H. Making generalization and abstraction about the lesson: ${lessonPlan.procedures.makingGeneralization}
I. Evaluating learning: ${lessonPlan.procedures.evaluatingLearning}
  `.trim();
  return formattedText;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<LessonPlanFormInput>({
    gradeLevel: 1,
    subject: SUBJECTS_BY_GRADE[1][0]?.value || '',
    quarter: QUARTERS[0],
    week: 1,
    lessonTopic: '',
    duration: '60 minutes',
    language: 'English',
  });
  const [lessonPlan, setLessonPlan] = useState<LessonPlanOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableSubjects: SubjectOption[] = useMemo(() => {
    return SUBJECTS_BY_GRADE[formData.gradeLevel] || [];
  }, [formData.gradeLevel]);

  // Update subject when grade level changes, if current subject is not available for new grade
  useEffect(() => {
    if (formData.gradeLevel && availableSubjects.length > 0) {
      const isCurrentSubjectAvailable = availableSubjects.some(
        (sub) => sub.value === formData.subject,
      );
      if (!isCurrentSubjectAvailable) {
        setFormData((prev) => ({ ...prev, subject: availableSubjects[0].value }));
      }
    } else if (availableSubjects.length === 0) {
      setFormData((prev) => ({ ...prev, subject: '' }));
    }
  }, [formData.gradeLevel, availableSubjects, formData.subject]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: id === 'gradeLevel' || id === 'week' ? Number(value) : value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setLessonPlan(null); // Clear previous lesson plan

      try {
        const generatedPlan = await generateLessonPlan(formData);
        setLessonPlan(generatedPlan);
      } catch (err: unknown) {
        let errorMessage = 'An unexpected error occurred.';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        setError(errorMessage);
        console.error('Submission error:', err);
      } finally {
        setLoading(false);
      }
    },
    [formData],
  );

  const handleDownload = (format: 'word' | 'pdf') => {
    if (lessonPlan) {
      const filename = `LessonPlan_${formData.gradeLevel}_${formData.subject}_${formData.quarter}_${formData.week}`;
      const content = formatLessonPlanForDownload(lessonPlan);
      if (format === 'word') {
        downloadDocx(filename, content);
      } else {
        downloadPdf(filename, content);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl text-center border-b-4 border-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-2 drop-shadow-lg">
          Teacher Galyxia Lesson Plan Generator
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 italic mb-6">“Sa Naawan! We Are One!”</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50 shadow-inner">
          <Select
            label="Grade Level"
            id="gradeLevel"
            value={formData.gradeLevel}
            options={GRADE_LEVELS.map((grade) => ({
              value: grade,
              label: `Grade ${grade}`,
            }))}
            onChange={handleChange}
            required
          />

          <Select
            label="Subject"
            id="subject"
            value={formData.subject}
            options={availableSubjects}
            onChange={handleChange}
            disabled={availableSubjects.length === 0}
            required
          />

          <Select
            label="Quarter"
            id="quarter"
            value={formData.quarter}
            options={QUARTERS.map((q) => ({ value: q, label: q }))}
            onChange={handleChange}
            required
          />

          <Select
            label="Week"
            id="week"
            value={formData.week}
            options={WEEKS.map((w) => ({ value: w, label: `Week ${w}` }))}
            onChange={handleChange}
            required
          />

          <TextArea
            label="Lesson Topic"
            id="lessonTopic"
            value={formData.lessonTopic}
            onChange={handleChange}
            placeholder="e.g., Understanding the Water Cycle"
            className="md:col-span-2"
            required
          />

          <Input
            label="Duration (e.g., 60 minutes)"
            id="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 60 minutes or 1 hour"
            required
          />

          <Select
            label="Language"
            id="language"
            value={formData.language}
            options={LANGUAGES.map((lang) => ({ value: lang, label: lang }))}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <Button type="submit" loading={loading} size="lg" className="w-full md:w-auto">
              Generate Lesson Plan
            </Button>
          </div>
        </form>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6 animate-pulse"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {lessonPlan && !loading && (
          <>
            <LessonPlanDisplay lessonPlan={lessonPlan} />
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sticky bottom-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-indigo-200">
              <Button onClick={() => handleDownload('word')} variant="outline">
                Download as DOCX (Mock)
              </Button>
              <Button onClick={() => handleDownload('pdf')} variant="outline">
                Download as PDF (Mock)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;