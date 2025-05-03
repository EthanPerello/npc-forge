import { execSync } from 'child_process';
import fs from 'fs';
import readline from 'readline';

// Helper for input prompts
function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer.trim());
  }));
}

// Helper to extract unreleased changes from changelog
function extractUnreleasedChanges(): { changes: string, categories: { [key: string]: string[] } } {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
  
  // Find the unreleased section
  const unreleasedMatch = changelog.match(/## \[Unreleased\]\s*\n([\s\S]*?)(?=\n## \[\d|$)/);
  
  if (!unreleasedMatch || !unreleasedMatch[1]) {
    console.warn('⚠️ No unreleased changes found in CHANGELOG.md');
    return { changes: '', categories: {} };
  }
  
  // Extract the changes
  const changes = unreleasedMatch[1].trim();
  
  // Parse categories (Added, Changed, Fixed, etc.)
  const categories: { [key: string]: string[] } = {};
  const categoryMatches = [...changes.matchAll(/### (\w+)\s*\n([\s\S]*?)(?=\n### |\n## |\n$)/g)];
  
  if (categoryMatches.length === 0) {
    // If no categories are found, try to extract bullet points directly
    const items = changes.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim());
    
    if (items.length > 0) {
      categories['General'] = items;
    }
  } else {
    // Process each category
    for (const match of categoryMatches) {
      const category = match[1];
      const items = match[2].split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim());
      
      if (items.length > 0) {
        categories[category] = items;
      }
    }
  }
  
  return { changes, categories };
}

// Update changelog by moving unreleased changes to a new version
function updateChangelog(version: string, date: string, title: string): void {
  let changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');

  // Extract unreleased section
  const unreleasedMatch = changelog.match(/## \[Unreleased\]\s*\n([\s\S]*?)(?=\n## \[\d|\n*$)/);
  const unreleasedBody = unreleasedMatch?.[1]?.trim() || '';

  // Clean empty categories (e.g. ### Changed with no items)
  const cleanedBody = unreleasedBody.replace(/### (\w+)\s*\n(?:- \s*\n?)*/g, '').trim();

  // Create new section
  const newVersionHeader = `## [${version}] - ${date}`;
  const versionEntry = `${newVersionHeader}\n\n${cleanedBody}\n`;

  // Replace [Unreleased] section and inject new version
  changelog = changelog.replace(
    /## \[Unreleased\]\s*\n[\s\S]*?(?=\n## \[\d|\n*$)/,
    `## [Unreleased]\n\n${versionEntry}`
  );

  // Update comparison links
  const linkBlockMatch = changelog.match(/\[Unreleased\]: .*\n(?:\[\d+\.\d+\.\d+\]: .*\n)+/);
  if (linkBlockMatch) {
    const latestVersionMatch = linkBlockMatch[0].match(/\[(\d+\.\d+\.\d+)\]:/g);
    const lastVersion = latestVersionMatch?.at(-1)?.match(/(\d+\.\d+\.\d+)/)?.[1] || '0.0.0';
    const newLinks = `[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v${version}...HEAD\n[${version}]: https://github.com/EthanPerello/npc-forge/compare/v${lastVersion}...v${version}\n`;
    changelog = changelog.replace(/\[Unreleased\]: .*\n(?:\[\d+\.\d+\.\d+\]: .*\n)+/, newLinks);
  }

  fs.writeFileSync('CHANGELOG.md', changelog);
  console.log(`✅ CHANGELOG.md updated with version ${version}`);
}


async function run() {
  const version = process.argv[2] || await prompt('🔢 Enter version (e.g., 0.2.1): ');
  const title = process.argv[3] || await prompt('📝 Enter title (e.g., UI Polish and Fixes): ');
  const summary = await prompt('📄 Enter summary (Markdown, one paragraph): ');

  const tag = `v${version}`;
  const today = new Date().toISOString().split('T')[0];
  const releaseNotePath = `release-notes/${tag}.md`;

  // Extract unreleased changes
  const { changes, categories } = extractUnreleasedChanges();
  
  // Build release note content
  let releaseNoteContent = `# NPC Forge ${tag} – ${title}\n\n**Release Date:** ${today}\n\n${summary}\n\n`;
  
  // Add categories from changelog
  if (Object.keys(categories).length > 0) {
    for (const [category, items] of Object.entries(categories)) {
      releaseNoteContent += `## ${category}\n${items.join('\n')}\n\n`;
    }
  } else {
    // Add placeholder sections if no changes were found
    releaseNoteContent += `## Added\n- _TBD_\n\n## Changed\n- _TBD_\n\n## Fixed\n- _TBD_\n\n`;
  }
  
  releaseNoteContent += `---\n\n## Removed\nNone.\n`;

  // Write release note
  fs.writeFileSync(releaseNotePath, releaseNoteContent);
  console.log(`✅ Release note created at: ${releaseNotePath}`);

  // Update changelog by moving unreleased changes to the new version
  updateChangelog(version, today, title);
  console.log(`✅ CHANGELOG.md updated`);

  // Git commit, tag & push
  try {
    // Explicitly add the changelog and release notes file
    execSync(`git add CHANGELOG.md "${releaseNotePath}"`);
    console.log(`✅ Added CHANGELOG.md and ${releaseNotePath} to git staging`);
    
    // Add any other changes that might be part of the release
    execSync(`git add .`);
    
    // Commit the changes
    execSync(`git commit -m "chore: release ${tag}"`);
    console.log(`✅ Changes committed`);
  } catch (error) {
    console.warn('⚠️ Git commit failed:', error);
    console.log('Try committing manually:');
    console.log(`git add CHANGELOG.md "${releaseNotePath}" && git commit -m "chore: release ${tag}"`);
  }

  try {
    execSync(`git tag ${tag}`);
    console.log(`✅ Tag ${tag} created`);
  } catch (error) {
    console.warn(`⚠️ Tag ${tag} creation failed:`, error);
  }

  try {
    // Push both the main branch and the tags to ensure everything is updated
    execSync(`git push origin main`);
    console.log(`✅ Changes pushed to main branch`);
    
    execSync(`git push origin ${tag}`);
    console.log(`✅ Tag ${tag} pushed to origin`);
  } catch (error) {
    console.error('❌ Failed to push changes:', error);
    console.log('Try pushing manually:');
    console.log(`git push origin main && git push origin ${tag}`);
  }

  // GitHub Release
  try {
    execSync(`gh release create ${tag} -F ${releaseNotePath} -t "NPC Forge ${tag} – ${title}"`, { stdio: 'inherit' });
    console.log('🎉 GitHub release published!');
  } catch (error) {
    console.error('❌ Failed to create GitHub release:', error);
    console.log('You can manually create a release using:');
    console.log(`gh release create ${tag} -F ${releaseNotePath} -t "NPC Forge ${tag} – ${title}"`);
  }
}

run().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});