import { INTERVIEW_HUB_QUESTIONS } from './src/utils/interviewHubData.js';

console.log("Checking all questions for required properties...");
for (const q of INTERVIEW_HUB_QUESTIONS) {
  if (!q.companyTags || !Array.isArray(q.companyTags)) {
    console.error(`ERROR: Question id ${q.id} has invalid companyTags!`, q.companyTags);
  }
  if (!q.followUps || !Array.isArray(q.followUps)) {
    console.error(`ERROR: Question id ${q.id} has invalid followUps!`, q.followUps);
  }
  if (!q.relatedConcepts || !Array.isArray(q.relatedConcepts)) {
    console.error(`ERROR: Question id ${q.id} has invalid relatedConcepts!`, q.relatedConcepts);
  }
}
console.log("Validation complete.");
