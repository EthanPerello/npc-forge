import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Helper for input prompts
function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer.trim());
  }));
}

async function run() {
  const version = process.argv[2] || await prompt('🔢 Enter version (e.g., 0.2.1): ');
  const title = process.argv[3] || await prompt('📝 Enter title (e.g., UI Polish and Fixes): ');
  const summary = await prompt('📄 Enter summary (Markdown, one paragraph): ');

  const tag = `v${version}`;
  const today = new Date().toISOString().split('T')[0];
  const releaseNotePath = `release-notes/${tag}.md`;

  // Compose release note
  const note = `# NPC Forge ${tag} – ${title}

**Release Date:** ${today}

${summary}

## Added
- _TBD_

## Changed
- _TBD_

## Fixed
- _TBD_

---

## Removed
None.
`;

  // Write release note
  fs.writeFileSync(releaseNotePath, note);
  console.log(`✅ Release note created at: ${releaseNotePath}`);

  // Append to changelog
  fs.appendFileSync('CHANGELOG.md', `\n## [${tag}] - ${today}\n- ${title}\n`);
  console.log(`✅ CHANGELOG.md updated`);

  // Git tag & push
  try {
    execSync(`git add . && git commit -m "chore: release ${tag}"`);
  } catch {
    console.warn('⚠️ Git commit skipped (nothing new to commit?)');
  }

  try {
    execSync(`git tag ${tag}`);
  } catch {
    console.warn(`⚠️ Tag ${tag} already exists. Skipping tag creation.`);
  }

  execSync(`git push origin main --tags`);

  // GitHub Release
  try {
    execSync(`gh release create ${tag} -F ${releaseNotePath} -t "NPC Forge ${tag} – ${title}"`, { stdio: 'inherit' });
    console.log('🎉 GitHub release published!');
  } catch {
    console.error('❌ Failed to create GitHub release. Is the tag already released?');
  }
}

run();
