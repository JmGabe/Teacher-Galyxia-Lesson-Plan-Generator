import { GoogleGenAI, Type } from '@google/genai';
import { LessonPlanFormInput, LessonPlanOutput } from '../types';

interface GenerateLessonPlanResponse {
  lessonPlan: LessonPlanOutput;
}

export const generateLessonPlan = async (
  formData: LessonPlanFormInput,
): Promise<LessonPlanOutput> => {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY is not defined in the environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview'; // Suitable for complex structured text generation

  const prompt = `Generate a detailed lesson plan in the DepEd MATATAG format for a ${formData.gradeLevel}th Grade ${formData.subject} class.
  The lesson is for the ${formData.quarter}, Week ${formData.week}, with the topic: "${formData.lessonTopic}".
  The duration of the lesson is ${formData.duration}.
  The lesson plan should be in ${formData.language}.

  Strictly adhere to the following structure and fill in all sections comprehensively based on the provided details.
  Ensure all content is relevant and appropriate for the specified grade level, subject, and topic according to the DepEd MATATAG curriculum.
  For sections requiring multiple points (e.g., Learning Competencies), generate several relevant points.
  For 'References' under 'Learning Resources', provide realistic placeholders or relevant categories of resources.
  The output MUST be a JSON object conforming to the LessonPlanOutput interface.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      objectives: {
        type: Type.OBJECT,
        properties: {
          contentStandards: {
            type: Type.STRING,
            description: 'DepEd Content Standards for the lesson.',
          },
          performanceStandards: {
            type: Type.STRING,
            description: 'DepEd Performance Standards for the lesson.',
          },
          learningCompetencies: {
            type: Type.STRING,
            description: 'Specific learning competencies/objectives for the lesson.',
          },
        },
        required: ['contentStandards', 'performanceStandards', 'learningCompetencies'],
      },
      contentTopic: {
        type: Type.STRING,
        description: 'The main content/topic of the lesson.',
      },
      learningResources: {
        type: Type.OBJECT,
        properties: {
          references: {
            type: Type.OBJECT,
            properties: {
              teachersGuidePages: {
                type: Type.STRING,
                description: 'Relevant Teacher’s Guide pages.',
              },
              learnersMaterialsPages: {
                type: Type.STRING,
                description: 'Relevant Learner’s Materials pages.',
              },
              textbookPages: {
                type: Type.STRING,
                description: 'Relevant Textbook pages.',
              },
              additionalMaterials: {
                type: Type.STRING,
                description: 'Additional materials from LRMDS portal.',
              },
            },
            required: [
              'teachersGuidePages',
              'learnersMaterialsPages',
              'textbookPages',
              'additionalMaterials',
            ],
          },
          otherMaterials: {
            type: Type.STRING,
            description: 'Other learning materials used.',
          },
        },
        required: ['references', 'otherMaterials'],
      },
      procedures: {
        type: Type.OBJECT,
        properties: {
          reviewingPreviousLesson: {
            type: Type.STRING,
            description: 'Activities for reviewing previous lesson or presenting the new lesson.',
          },
          establishingPurpose: {
            type: Type.STRING,
            description: 'Activities for establishing a purpose for the lesson.',
          },
          presentingExamples: {
            type: Type.STRING,
            description: 'Activities for presenting examples/instances of the new lesson.',
          },
          discussingConcepts1: {
            type: Type.STRING,
            description: 'Activities for discussing new concepts and practicing new skills #1.',
          },
          discussingConcepts2: {
            type: Type.STRING,
            description: 'Activities for discussing new concepts and practicing new skills #2.',
          },
          developingMastery: {
            type: Type.STRING,
            description: 'Activities for developing mastery (leads to formative assessment).',
          },
          findingPracticalApplications: {
            type: Type.STRING,
            description: 'Activities for finding practical applications of concepts and skills in daily living.',
          },
          makingGeneralization: {
            type: Type.STRING,
            description: 'Activities for making generalization and abstraction about the lesson.',
          },
          evaluatingLearning: {
            type: Type.STRING,
            description: 'Activities for evaluating learning.',
          },
        },
        required: [
          'reviewingPreviousLesson',
          'establishingPurpose',
          'presentingExamples',
          'discussingConcepts1',
          'discussingConcepts2',
          'developingMastery',
          'findingPracticalApplications',
          'makingGeneralization',
          'evaluatingLearning',
        ],
      },
    },
    required: ['objectives', 'contentTopic', 'learningResources', 'procedures'],
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error('Empty or invalid JSON response from the model.');
    }
    const result: LessonPlanOutput = JSON.parse(jsonStr);
    return result;
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw new Error(
      `Failed to generate lesson plan. Please try again. Details: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
};
