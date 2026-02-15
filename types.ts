export interface LessonPlanFormInput {
  gradeLevel: number;
  subject: string;
  quarter: string;
  week: number;
  lessonTopic: string;
  duration: string;
  language: 'Filipino' | 'English';
}

export interface LessonPlanOutput {
  objectives: {
    contentStandards: string;
    performanceStandards: string;
    learningCompetencies: string;
  };
  contentTopic: string;
  learningResources: {
    references: {
      teachersGuidePages: string;
      learnersMaterialsPages: string;
      textbookPages: string;
      additionalMaterials: string;
    };
    otherMaterials: string;
  };
  procedures: {
    reviewingPreviousLesson: string;
    establishingPurpose: string;
    presentingExamples: string;
    discussingConcepts1: string;
    discussingConcepts2: string;
    developingMastery: string;
    findingPracticalApplications: string;
    makingGeneralization: string;
    evaluatingLearning: string;
  };
}

export interface SubjectOption {
  value: string;
  label: string;
}

export type GradeSubjectsMap = {
  [key: number]: SubjectOption[];
};
