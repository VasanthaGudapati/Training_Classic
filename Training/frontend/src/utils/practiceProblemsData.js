import { PRACTICE_PROBLEMS_DATABASE } from './practiceProblemsDatabase';

export const getPracticeProblems = (dayNum) => {
  return PRACTICE_PROBLEMS_DATABASE[dayNum] || [];
};
