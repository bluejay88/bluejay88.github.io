import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
global.window = {};
['../JS/article-content-ai.js', '../JS/article-content-ops.js', '../JS/article-content-foundations.js', '../JS/article-content-early.js'].forEach(path => require(path));
const required = ['enduring-enterprise','digital-hospitality','prompt-to-product','content-system','project-management','measure-after-live','high-trust-ai','service-business-tools','automation-not-abdication','modern-concierge','responsible-ai-guide','pilots-that-learn','buy-configure-build','brand-voice-asset','education-program','boardroom-value','lead-qualification','prompt-library','useful-ai-agent','readiness-sprint','trained-host','human-signature','workflow-before-tool','prompt-business-writing','ai-readiness'];
const issues = window.AnchorNoteIssues || {};
const failures = [];
for (const slug of required) {
  const issue = issues[slug];
  if (!issue) { failures.push(`${slug}: missing authored issue`); continue; }
  const prose = [issue.title, issue.dek, ...(issue.sections || []).flatMap(section => [section.heading, section.body])].join(' ');
  const words = prose.trim().split(/\s+/).length;
  if (words < 1500) failures.push(`${slug}: ${words} words (minimum 1500)`);
  if ((issue.sections || []).length < 8) failures.push(`${slug}: fewer than eight sections`);
  if (!issue.sources?.length) failures.push(`${slug}: no sources`);
}
console.log(JSON.stringify({issues: Object.keys(issues).length, required: required.length, failures}, null, 2));
process.exitCode = failures.length ? 1 : 0;
