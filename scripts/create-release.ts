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

// Function to format date as "YYYY-MM-DD"
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Function to format date for display (e.g., "May 22, 2025")
function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Pre-flight checks
function performPreflightChecks(): void {
  console.log('🔍 Performing pre-flight checks...\n');

  // Check if we're on main branch
  try {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    if (currentBranch !== 'main') {
      console.error(`❌ You're on branch '${currentBranch}', not 'main'`);
      console.log('Switch to main branch before creating a release:');
      console.log('  git checkout main');
      process.exit(1);
    }
    console.log('✅ On main branch');
  } catch (error) {
    console.error('❌ Failed to check current branch:', error);
    process.exit(1);
  }

  // Check if working directory is clean
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
    if (status) {
      console.error('❌ Working directory is not clean. Uncommitted changes:');
      console.log(status);
      console.log('\nCommit or stash changes before creating a release.');
      process.exit(1);
    }
    console.log('✅ Working directory is clean');
  } catch (error) {
    console.error('❌ Failed to check working directory status:', error);
    process.exit(1);
  }

  // Check if we're up to date with remote
  try {
    execSync('git fetch origin main', { stdio: 'pipe' });
    const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf-8' }).trim();
    
    if (localCommit !== remoteCommit) {
      console.error('❌ Local main branch is not up to date with origin/main');
      console.log('Pull the latest changes:');
      console.log('  git pull origin main');
      process.exit(1);
    }
    console.log('✅ Up to date with origin/main');
  } catch (error) {
    console.error('❌ Failed to check remote sync status:', error);
    process.exit(1);
  }

  console.log();
}

// Check if tag exists locally or remotely
function checkTagExists(tag: string): { local: boolean, remote: boolean } {
  let localExists = false;
  let remoteExists = false;

  try {
    execSync(`git rev-parse ${tag}`, { stdio: 'pipe' });
    localExists = true;
  } catch {
    // Tag doesn't exist locally
  }

  try {
    execSync(`git ls-remote --tags origin ${tag}`, { stdio: 'pipe' });
    const output = execSync(`git ls-remote --tags origin ${tag}`, { encoding: 'utf-8' }).trim();
    remoteExists = output.length > 0;
  } catch {
    // Tag doesn't exist remotely
  }

  return { local: localExists, remote: remoteExists };
}

// Helper to extract unreleased changes from changelog
function extractUnreleasedChanges(): { changes: string, categories: { [key: string]: string[] } } {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
  
  const unreleasedMatch = changelog.match(/## \[Unreleased\]\s*\n([\s\S]*?)(?=\n## \[\d|$)/);
  
  if (!unreleasedMatch || !unreleasedMatch[1]) {
    console.warn('⚠️ No unreleased changes found in CHANGELOG.md');
    return { changes: '', categories: {} };
  }
  
  const content = unreleasedMatch[1].trim();
  if (!content || content === '') {
    console.error('❌ No changes found in [Unreleased] section of CHANGELOG.md');
    console.log('Add your changes to the [Unreleased] section before creating a release.');
    process.exit(1);
  }

  const lines = content.split('\n');
  const categories: { [key: string]: string[] } = {};
  let currentCategory = 'Uncategorized';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const categoryMatch = line.match(/^###\s+(.*)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
      continue;
    }
    
    if (line.trim() === '') {
      continue;
    }
    
    if (line.trim()) {
      categories[currentCategory].push(line);
    }
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

// Parse and validate date input
function parseDate(dayInput: string, monthInput: string, yearInput: string): Date {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 0-indexed
  let day = today.getDate();

  // Parse year
  if (yearInput) {
    const yearNum = parseInt(yearInput);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 3000) {
      console.warn(`⚠️ Invalid year "${yearInput}", using current year ${year}`);
    } else {
      year = yearNum;
    }
  }

  // Parse month  
  if (monthInput) {
    const monthNum = parseInt(monthInput);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      console.warn(`⚠️ Invalid month "${monthInput}", using current month ${month + 1}`);
    } else {
      month = monthNum - 1; // Convert to 0-indexed
    }
  }

  // Parse day
  if (dayInput) {
    const dayNum = parseInt(dayInput);
    // Get max days in the selected month/year
    const maxDays = new Date(year, month + 1, 0).getDate();
    
    if (isNaN(dayNum) || dayNum < 1 || dayNum > maxDays) {
      console.warn(`⚠️ Invalid day "${dayInput}" for ${year}-${month + 1} (max: ${maxDays}), using current day ${day}`);
    } else {
      day = dayNum;
    }
  }

  return new Date(year, month, day);
}

async function run() {
  // Perform pre-flight checks first
  performPreflightChecks();

  const version = await prompt('Enter the new version (e.g., 1.2.3): ');
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.2.3)');
    process.exit(1);
  }

  const tag = `v${version}`;

  // Check if tag already exists
  const tagStatus = checkTagExists(tag);
  if (tagStatus.local || tagStatus.remote) {
    console.error(`❌ Tag ${tag} already exists:`);
    if (tagStatus.local) console.log('  - Local tag exists');
    if (tagStatus.remote) console.log('  - Remote tag exists');
    console.log('\nDelete the existing tag first or use a different version number.');
    console.log(`To delete: git tag -d ${tag} && git push origin :${tag}`);
    process.exit(1);
  }

  const title = await prompt('Enter the release title: ');
  const summary = await prompt('Enter a short summary of this release: ');
  
  // Get date inputs
  const dayInput = await prompt('Enter release day (1–31, leave blank for today): ');
  const monthInput = await prompt('Enter release month (1-12, leave blank for current month): ');
  const yearInput = await prompt('Enter release year (YYYY, leave blank for current year): ');

  const releaseDate = parseDate(dayInput, monthInput, yearInput);
  const formattedDate = formatDate(releaseDate);
  const displayDate = formatDisplayDate(releaseDate);

  console.log(`📅 Using release date: ${displayDate} (${formattedDate})`);

  const releaseNotePath = `release-notes/${tag}.md`;

  const { categories } = extractUnreleasedChanges();

  // Create release note with the established format
  let releaseNoteContent = `# NPC Forge ${tag} – ${title}\n\n**Release Date:** ${displayDate}\n\n## Summary\n\n${summary}\n\n## Changes\n\n`;
  
  const standardCategories = ["Added", "Changed", "Fixed", "Removed"];

  for (const category of standardCategories) {
    if (categories[category] && categories[category].length > 0) {
      releaseNoteContent += `### ${category}\n${categories[category].join('\n')}\n\n`;
    }
  }

  // Handle any other categories that might exist
  const otherCategories = Object.keys(categories).filter(cat => !standardCategories.includes(cat) && cat !== 'Uncategorized');
  for (const category of otherCategories) {
    if (categories[category] && categories[category].length > 0) {
      releaseNoteContent += `### ${category}\n${categories[category].join('\n')}\n\n`;
    }
  }

  // Add any uncategorized items at the end
  if (categories['Uncategorized'] && categories['Uncategorized'].length > 0) {
    releaseNoteContent += `### Other\n${categories['Uncategorized'].join('\n')}\n\n`;
  }

  releaseNoteContent = releaseNoteContent.trim();
  fs.writeFileSync(releaseNotePath, releaseNoteContent);
  console.log(`✅ Release note created at: ${releaseNotePath}\n`);

  // Update files
  updateChangelog(version, formattedDate);
  updatePackageJson(version);
  updatePackageLockJson(version);

  // Update README version badge
  const readmePath = 'README.md';
  let readme = fs.readFileSync(readmePath, 'utf8');
  const originalReadme = readme;
  readme = readme.replace(/version-[0-9]+\.[0-9]+\.[0-9]+-blue\.svg/g, `version-${version}-blue.svg`);
  
  if (originalReadme === readme) {
    console.log('⚠️ No version badges found to update in README.md');
  } else {
    console.log('✅ README.md version badge updated');
  }
  
  fs.writeFileSync(readmePath, readme, 'utf8');

  // Git operations
  try {
    // Stage files
    execSync(`git add CHANGELOG.md package.json package-lock.json README.md "${releaseNotePath}"`);
    console.log('✅ Staged files for commit');

    // Commit changes
    execSync(`git commit -m "chore: release ${tag}"`);
    console.log('✅ Changes committed');

    // Create the local tag
    execSync(`git tag ${tag}`);
    console.log(`✅ Local tag ${tag} created`);

    // Push main branch
    execSync(`git push origin main`);
    console.log('✅ Pushed main branch');

    // Push the new tag
    execSync(`git push origin ${tag}`);
    console.log(`✅ Pushed tag ${tag}`);
  } catch (error) {
    console.error('❌ Git operations failed:', error);
    console.log('Manual steps required:');
    console.log(`  git add CHANGELOG.md package.json package-lock.json README.md "${releaseNotePath}"`);
    console.log(`  git commit -m "chore: release ${tag}"`);
    console.log(`  git tag ${tag}`);
    console.log(`  git push origin main`);
    console.log(`  git push origin ${tag}`);
    process.exit(1);
  }

  // Create GitHub release
  try {
    execSync(`gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag} – ${title}"`, { stdio: 'inherit' });
    console.log('🎉 GitHub release published!');
  } catch (error) {
    console.error('❌ Failed to create GitHub release:', error);
    console.log('Create it manually:');
    console.log(`  gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag} – ${title}"`);
    process.exit(1);
  }

  console.log(`\n✨ Release ${tag} completed successfully!`);
  console.log(`📝 Release notes: ${releaseNotePath}`);
  console.log(`🔗 GitHub: https://github.com/EthanPerello/npc-forge/releases/tag/${tag}`);
}

run().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});