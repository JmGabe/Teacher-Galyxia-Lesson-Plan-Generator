import React from 'react';
import { LessonPlanOutput } from '../types';

interface LessonPlanDisplayProps {
  lessonPlan: LessonPlanOutput;
}

const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ lessonPlan }) => {
  if (!lessonPlan) {
    return null;
  }

  const renderSection = (title: string, content: string | string[]) => {
    if (!content) return null;
    return (
      <div className="mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        {Array.isArray(content) ? (
          <ul className="list-disc pl-5 text-gray-700">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        )}
      </div>
    );
  };

  const renderSubSection = (title: string, content: string | string[]) => {
    if (!content) return null;
    return (
      <div className="mb-2 ml-4">
        <h4 className="font-medium text-md text-gray-800">{title}</h4>
        {Array.isArray(content) ? (
          <ul className="list-disc pl-5 text-gray-700">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-indigo-200 mt-8 text-left max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 text-center">Generated Lesson Plan</h2>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">I. OBJECTIVE/S</h2>
        {renderSubSection('A. Content Standards', lessonPlan.objectives.contentStandards)}
        {renderSubSection('B. Performance Standards', lessonPlan.objectives.performanceStandards)}
        {renderSubSection('C. Learning Competencies/Objectives', lessonPlan.objectives.learningCompetencies)}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">II. CONTENT / TOPIC</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{lessonPlan.contentTopic}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">III. LEARNING RESOURCES</h2>
        <h3 className="font-semibold text-lg text-gray-800 ml-4">A. References</h3>
        {renderSubSection('1. Teacher’s Guide pages', lessonPlan.learningResources.references.teachersGuidePages)}
        {renderSubSection('2. Learner’s Materials pages', lessonPlan.learningResources.references.learnersMaterialsPages)}
        {renderSubSection('3. Textbook pages', lessonPlan.learningResources.references.textbookPages)}
        {renderSubSection('4. Additional materials from LRMDS portal', lessonPlan.learningResources.references.additionalMaterials)}
        {renderSubSection('B. Other Materials', lessonPlan.learningResources.otherMaterials)}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">IV. PROCEDURES</h2>
        {renderSubSection('A. Reviewing previous lesson or presenting the new lesson', lessonPlan.procedures.reviewingPreviousLesson)}
        {renderSubSection('B. Establishing a purpose for the lesson', lessonPlan.procedures.establishingPurpose)}
        {renderSubSection('C. Presenting examples/ instances of the new lesson', lessonPlan.procedures.presentingExamples)}
        {renderSubSection('D. Discussing new concepts and practicing new skills #1', lessonPlan.procedures.discussingConcepts1)}
        {renderSubSection('E. Discussing new concepts and practicing new skills #2', lessonPlan.procedures.discussingConcepts2)}
        {renderSubSection('F. Developing mastery (leads to formative assessment )', lessonPlan.procedures.developingMastery)}
        {renderSubSection('G. Finding practical applications of concepts and skills in daily living', lessonPlan.procedures.findingPracticalApplications)}
        {renderSubSection('H. Making generalization and abstraction about the lesson', lessonPlan.procedures.makingGeneralization)}
        {renderSubSection('I. Evaluating learning', lessonPlan.procedures.evaluatingLearning)}
      </div>
    </div>
  );
};

export default LessonPlanDisplay;
