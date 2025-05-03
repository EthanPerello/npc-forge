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
      // Preserve the entire content including nested bullets and indentation
      // Split by lines that start with -, not just any line
      const categoryContent = match[2].trim();
      const itemBlocks: string[] = [];
      
      // Split the content by top-level bullet points
      let currentItem = '';
      const lines = categoryContent.split('\n');
      
      for (const line of lines) {
        if (line.trim().startsWith('-')) {
          // If we already have content and find a new bullet, save the previous item
          if (currentItem) {
            itemBlocks.push(currentItem);
            currentItem = '';
          }
          currentItem = line;
        } else if (line.trim() && currentItem) {
          // Add to current item if it's not empty (preserves indentation)
          currentItem += '\n' + line;
        }
      }
      
      // Add the last item if it exists
      if (currentItem) {
        itemBlocks.push(currentItem);
      }
      
      if (itemBlocks.length > 0) {
        categories[category] = itemBlocks;
      }
    }
  }
  
  return { changes, categories };
}

// Update changelog by moving unreleased changes to a new version
function updateChangelog(version: string, date: string, title: string): void {
  let changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');

  // Extract the entire Unreleased section
  const unreleasedMatch = changelog.match(/## \[Unreleased\]\s*\n([\s\S]*?)(?=\n## \[\d|$)/);
  if (!unreleasedMatch) {
    console.error('❌ Failed to find [Unreleased] section in CHANGELOG.md');
    return;
  }

  const unreleasedContent = unreleasedMatch[1].trim();
  const newVersionHeader = `## [${version}] - ${date}`;
  const versionBlock = `${newVersionHeader}\n\n${unreleasedContent}\n`;

  // Insert the new version section after [Unreleased]
  changelog = changelog.replace(
    /## \[Unreleased\]\s*\n[\s\S]*?(?=\n## \[\d|$)/,
    `## [Unreleased]\n\n${versionBlock}`
  );

  // Update version links at the bottom
  const linkBlockMatch = changelog.match(/\[Unreleased\]: .*?\n(?:\[\d+\.\d+\.\d+\]: .*?\n)+/);
  if (linkBlockMatch) {
    const latestTagMatch = [...linkBlockMatch[0].matchAll(/\[(\d+\.\d+\.\d+)\]:/g)];
    const lastVersion = latestTagMatch.at(-1)?.[1] || '0.0.0';
    const newLinks = `[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v${version}...HEAD\n[${version}]: https://github.com/EthanPerello/npc-forge/compare/v${lastVersion}...v${version}\n`;
    changelog = changelog.replace(linkBlockMatch[0], newLinks);
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
  
  // Build release note content in exact format matching previous releases
  let releaseNoteContent = `# NPC Forge ${tag} – ${title}\n\n**Release Date:** ${today}\n\n${summary}\n\n`;
  
  // Add categories from changelog, preserving structure and formatting
  if (Object.keys(categories).length > 0) {
    // Get array of category names to determine the last one
    const categoryNames = Object.keys(categories);
    
    for (let i = 0; i < categoryNames.length; i++) {
      const category = categoryNames[i];
      const items = categories[category];
      
      releaseNoteContent += `## ${category}\n${items.join('\n')}\n`;
      
      // Add extra newline between categories (but not after the last one)
      if (i < categoryNames.length - 1) {
        releaseNoteContent += "\n";
      }
    }
  } else {
    // Add placeholder sections if no changes were found, matching format of previous releases
    releaseNoteContent += `## Added\n- _TBD_\n\n## Changed\n- _TBD_\n\n## Fixed\n- _TBD_`;
  }

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