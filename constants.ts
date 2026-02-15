import { GradeSubjectsMap, SubjectOption } from './types';

export const GRADE_LEVELS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const QUARTERS: string[] = [
  '1st Quarter',
  '2nd Quarter',
  '3rd Quarter',
  '4th Quarter',
];

export const WEEKS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const LANGUAGES: ('Filipino' | 'English')[] = ['Filipino', 'English'];

export const SUBJECTS_BY_GRADE: GradeSubjectsMap = {
  1: [
    { value: 'GMRC', label: 'GMRC' },
    { value: 'Language', label: 'Language' },
    { value: 'Makabansa', label: 'Makabansa' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Reading and Literacy', label: 'Reading and Literacy' },
  ],
  2: [
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'GMRC', label: 'GMRC' },
    { value: 'Makabansa', label: 'Makabansa' },
    { value: 'Mathematics', label: 'Mathematics' },
  ],
  3: [
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'GMRC', label: 'GMRC' },
    { value: 'Makabansa', label: 'Makabansa' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
  ],
  4: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'EPP', label: 'EPP' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'GMRC', label: 'GMRC' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
  ],
  5: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'EPP', label: 'EPP' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'GMRC', label: 'GMRC' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
  ],
  6: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'EPP', label: 'EPP' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'GMRC', label: 'GMRC' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
  ],
  7: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'TLE', label: 'TLE' },
    { value: 'Values Education', label: 'Values Education' },
  ],
  8: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'TLE', label: 'TLE' },
    { value: 'Values Education', label: 'Values Education' },
  ],
  9: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'TLE', label: 'TLE' },
    { value: 'Values Education', label: 'Values Education' },
  ],
  10: [
    { value: 'Araling Panlipunan', label: 'Araling Panlipunan' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'MAPEH', label: 'MAPEH' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'TLE', label: 'TLE' },
    { value: 'Values Education', label: 'Values Education' },
  ],
};
