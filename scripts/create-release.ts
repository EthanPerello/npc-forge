import { execSync } from 'child_process';
import * as fs from 'fs';
import * as readline from 'readline';

// Helper for input prompts
function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer.trim());
  }));
}

// Function to format date as "Month Day, Year"
function formatDate(date: Date): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

// Format date as YYYY-MM-DD for changelog
function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
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
  
  const content = unreleasedMatch[1].trim();
  const lines = content.split('\n');
  const categories: { [key: string]: string[] } = {};
  let currentCategory = 'Uncategorized';
  let currentLine = '';
  let indentLevel = 0;
  
  for (const line of lines) {
    // Check if it's a category header
    const categoryMatch = line.match(/^###\s+(.*)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
      continue;
    }
    
    // Handle list items
    if (line.match(/^-\s+/)) {
      // This is a top-level list item
      if (currentLine) {
        // If we have a pending line, save it first
        categories[currentCategory].push(currentLine);
      }
      currentLine = line;
      indentLevel = 0;
    } else if (line.match(/^\s+-\s+/)) {
      // This is a nested list item
      // If it's a new indent level, add the parent line first
      if (indentLevel === 0 && currentLine) {
        categories[currentCategory].push(currentLine);
        currentLine = '';
      }
      // Add this nested item with proper indentation preserved
      categories[currentCategory].push(line);
      indentLevel = line.match(/^\s+/)?.[0].length || 2;
    } else if (line.trim() === '') {
      // Empty line - if we have a pending line, save it
      if (currentLine) {
        categories[currentCategory].push(currentLine);
        currentLine = '';
      }
      indentLevel = 0;
    } else if (indentLevel > 0 || currentLine) {
      // Line is part of a previous list item, merge them
      currentLine += '\n' + line;
    }
  }
  
  // Add any pending line
  if (currentLine) {
    categories[currentCategory].push(currentLine);
  }
  
  return { changes: content, categories };
}

// Update package.json with the new version
function updatePackageJson(version: string): void {
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.version = version;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✅ ${packageJsonPath} updated with version ${version}`);
}

// Update package-lock.json with the new version
function updatePackageLockJson(version: string): void {
  const packageLockPath = 'package-lock.json';
  
  if (!fs.existsSync(packageLockPath)) {
    console.warn(`⚠️ ${packageLockPath} not found, skipping version update`);
    return;
  }
  
  try {
    const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf-8'));
    packageLock.version = version;
    if (packageLock.packages && packageLock.packages['']) {
      packageLock.packages[''].version = version;
    }
    fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2) + '\n');
    console.log(`✅ ${packageLockPath} updated with version ${version}`);
  } catch (error) {
    console.error(`❌ Failed to update ${packageLockPath}:`, error);
  }
}

// Update changelog by moving unreleased changes to a new version
function updateChangelog(version: string, dateStr: string): void {
  let changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');

  const unreleasedMatch = changelog.match(/## \[Unreleased\]\s*\n([\s\S]*?)(?=\n## \[\d|$)/);
  if (!unreleasedMatch) {
    console.error('❌ Failed to find [Unreleased] section in CHANGELOG.md');
    return;
  }

  const unreleasedContent = unreleasedMatch[1].trim();
  const newVersionHeader = `## [${version}] - ${dateStr}`;
  const versionBlock = `${newVersionHeader}\n\n${unreleasedContent}\n`;

  changelog = changelog.replace(
    /## \[Unreleased\]\s*\n[\s\S]*?(?=\n## \[\d|$)/,
    `## [Unreleased]\n\n${versionBlock}`
  );

  // Update the comparison links at the bottom of the file
  const latestVersion = version;
  const compareUrl = (v1: string, v2: string) => 
    `[${v1}]: https://github.com/EthanPerello/npc-forge/compare/v${v2}...v${latestVersion}`;
  
  // Find the previous version to create proper comparison links
  const versionRegex = /## \[(\d+\.\d+\.\d+)\]/g;
  let versions: string[] = [];
  let match;
  
  while ((match = versionRegex.exec(changelog)) !== null) {
    if (match[1] !== version) {
      versions.push(match[1]);
    }
  }
  
  // Sort versions in descending order
  versions.sort((a, b) => {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);
    
    for (let i = 0; i < 3; i++) {
      if (aParts[i] !== bParts[i]) {
        return bParts[i] - aParts[i];
      }
    }
    
    return 0;
  });
  
  const previousVersion = versions[0] || '0.0.0';
  
  // Update the link section at the bottom
  const linkSection = `[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v${latestVersion}...HEAD\n${compareUrl(latestVersion, previousVersion)}`;
  
  // Replace the first link line (unreleased)
  changelog = changelog.replace(
    /\[Unreleased\]: .*$/m,
    linkSection
  );

  fs.writeFileSync('CHANGELOG.md', changelog);
  console.log(`✅ CHANGELOG.md updated with version ${version} and date ${dateStr}`);
}

async function run() {
  const version = await prompt('Enter the new version (e.g., 1.2.3): ');
  const title = await prompt('Enter the release title: ');
  const summary = await prompt('Enter a short summary of this release: ');
  
  // More detailed date input
  const dayInput = await prompt('Enter release day (1–31, leave blank for today): ');
  const monthInput = await prompt('Enter release month (1-12, leave blank for current month): ');
  const yearInput = await prompt('Enter release year (YYYY, leave blank for current year): ');

  const today = new Date();
  const releaseDate = new Date(today);

  // Set year if provided
  if (yearInput && !isNaN(parseInt(yearInput))) {
    releaseDate.setFullYear(parseInt(yearInput));
  }
  
  // Set month if provided (0-based index in JS Date)
  if (monthInput && !isNaN(parseInt(monthInput))) {
    const month = parseInt(monthInput) - 1; // Convert to 0-indexed
    if (month >= 0 && month < 12) {
      releaseDate.setMonth(month);
    } else {
      console.warn('⚠️ Invalid month, using current month.');
    }
  }
  
  // Set day if provided
  if (dayInput && !isNaN(parseInt(dayInput))) {
    const day = parseInt(dayInput);
    // Check if the day is valid for the selected month
    const maxDaysInMonth = new Date(
      releaseDate.getFullYear(), 
      releaseDate.getMonth() + 1, 
      0
    ).getDate();
    
    if (day >= 1 && day <= maxDaysInMonth) {
      releaseDate.setDate(day);
    } else {
      console.warn(`⚠️ Invalid day for selected month (max: ${maxDaysInMonth}), using current day.`);
    }
  }

  const tag = `v${version}`;
  const formattedDate = formatDate(releaseDate);
  const isoDate = formatISODate(releaseDate);
  const releaseNotePath = `release-notes/${tag}.md`;

  console.log(`📅 Using release date: ${formattedDate} (${isoDate} in changelog)`);

  const { categories } = extractUnreleasedChanges();

  let releaseNoteContent = `# NPC Forge ${tag} – ${title}\n\n**Release Date:** ${formattedDate}\n\n${summary}\n\n`;
  const standardCategories = ["Added", "Changed", "Fixed", "Removed", "Security"];

  for (const category of standardCategories) {
    if (categories[category] && categories[category].length > 0) {
      releaseNoteContent += `## ${category}\n${categories[category].join('\n')}\n\n`;
    } else {
      releaseNoteContent += `## ${category}\n- _No changes in this category_\n\n`;
    }
  }

  const otherCategories = Object.keys(categories).filter(cat => !standardCategories.includes(cat) && cat !== 'Uncategorized');
  for (const category of otherCategories) {
    releaseNoteContent += `## ${category}\n${categories[category].join('\n')}\n\n`;
  }

  // Add any uncategorized items at the end
  if (categories['Uncategorized'] && categories['Uncategorized'].length > 0) {
    releaseNoteContent += `## Other\n${categories['Uncategorized'].join('\n')}\n\n`;
  }

  releaseNoteContent = releaseNoteContent.trim();
  fs.writeFileSync(releaseNotePath, releaseNoteContent);
  console.log(`✅ Release note created at: ${releaseNotePath}\n`);
  console.log('📝 RELEASE NOTE CONTENT:\n');
  console.log(releaseNoteContent + '\nPlease verify this content appears correctly and includes all sections.\n');

  // Update CHANGELOG, package files - now using the ISO date format for changelog
  updateChangelog(version, isoDate);
  updatePackageJson(version);
  updatePackageLockJson(version);

  // Git commit, tag & push
  try {
    execSync(`git add CHANGELOG.md package.json package-lock.json "${releaseNotePath}"`);
    console.log('✅ Staged CHANGELOG.md, package.json, package-lock.json, and release note');

    execSync(`git commit -m "chore: release ${tag}"`);
    console.log('✅ Changes committed');

    // Create the local tag
    execSync(`git tag ${tag}`);
    console.log(`✅ Local tag ${tag} created`);
  } catch (error) {
    console.warn('⚠️ Git staging/commit/tag failed:', error);
    console.log('Try doing these steps manually:');
    console.log(`  git add CHANGELOG.md package.json package-lock.json "${releaseNotePath}"`);
    console.log(`  git commit -m "chore: release ${tag}"`);
    console.log(`  git tag ${tag}`);
  }

  // Push to remote
  try {
    execSync(`git push origin main`);
    console.log('✅ Pushed main branch');

    // Delete existing remote tag if present, then push the new tag
    execSync(`git push origin :${tag} 2>/dev/null || true`);
    execSync(`git push origin ${tag}`);
    console.log(`✅ Pushed tag ${tag}`);
  } catch (error) {
    console.error('❌ Failed to push branches or tags:', error);
    console.log('Please push manually:');
    console.log(`  git push origin main`);
    console.log(`  git push origin ${tag}`);
  }

  // Create GitHub release
  try {
    execSync(`gh release delete ${tag} --yes 2>/dev/null || true`);
    execSync(`gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag}"`, { stdio: 'inherit' });
    console.log('🎉 GitHub release published!');
  } catch (error) {
    console.error('❌ Failed to create GitHub release:', error);
    console.log('You can try manually:');
    console.log(`  gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag}"`);
  }
}

run().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});