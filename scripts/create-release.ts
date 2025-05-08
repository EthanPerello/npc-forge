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
  
  for (const line of lines) {
    const categoryMatch = line.match(/^###\s+(.*)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
      categories[currentCategory] = [];
    } else if (line.startsWith('- ')) {
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
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
    // Also update the name entry in packages section if it exists
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
    // Use regex.exec() in a loop instead of matchAll with spread operator
    const versionRegex = /\[(\d+\.\d+\.\d+)\]:/g;
    let lastVersion = '0.0.0';
    let versionMatch;
    
    // Find the last version mentioned
    while ((versionMatch = versionRegex.exec(linkBlockMatch[0])) !== null) {
      lastVersion = versionMatch[1];
    }
    
    const newLinks = `[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v${lastVersion}...v${version}\n`;
    changelog = changelog.replace(linkBlockMatch[0], newLinks);
  }

  fs.writeFileSync('CHANGELOG.md', changelog);
  console.log(`✅ CHANGELOG.md updated with version ${version}`);
}

async function run() {
  const version = await prompt('Enter the new version (e.g., 1.2.3): ');
  const title = await prompt('Enter the release title: ');
  const summary = await prompt('Enter a short summary of this release: ');
  const dayInput = await prompt('Enter release day of this month (1–31, leave blank for today): ');
  
  // Determine the release date
  const today = new Date();
  const defaultDay = today.getDate();
  const releaseDay = dayInput ? parseInt(dayInput, 10) : defaultDay;
  
  // Create a new date with the specified day
  const releaseDate = new Date(today);
  if (!isNaN(releaseDay) && releaseDay >= 1 && releaseDay <= 31) {
    releaseDate.setDate(releaseDay);
  } else {
    console.warn(`⚠️ Using current day (${defaultDay}) for the release date.`);
  }
  
  const tag = `v${version}`;
  const formattedDate = formatDate(releaseDate);
  const isoDate = releaseDate.toISOString().split('T')[0]; // For links and filenames
  const releaseNotePath = `release-notes/${tag}.md`;

  // Extract unreleased changes
  const { changes, categories } = extractUnreleasedChanges();
  
  // Build release note content in exact format matching previous releases
  let releaseNoteContent = `# NPC Forge ${tag} – ${title}\n\n**Release Date:** ${formattedDate}\n\n${summary}\n\n`;

  // Ensure we always include the standard categories in the right order for the release notes
  const standardCategories = ["Added", "Changed", "Fixed"];
  
  // First add the standard categories in the correct order
  for (const category of standardCategories) {
    if (categories[category] && categories[category].length > 0) {
      releaseNoteContent += `## ${category}\n${categories[category].join('\n')}\n\n`;
    } else {
      // Add placeholder if this standard category doesn't have items
      releaseNoteContent += `## ${category}\n- _No changes in this category_\n\n`;
    }
  }
  
  // Then add any other categories that might exist
  const otherCategories = Object.keys(categories).filter(cat => !standardCategories.includes(cat));
  for (const category of otherCategories) {
    releaseNoteContent += `## ${category}\n${categories[category].join('\n')}\n\n`;
  }
  
  // Remove trailing newlines
  releaseNoteContent = releaseNoteContent.trim();
  
  // Write release note
  fs.writeFileSync(releaseNotePath, releaseNoteContent);
  console.log(`✅ Release note created at: ${releaseNotePath}`);
  
  // Log release note content for verification
  console.log('\n📝 RELEASE NOTE CONTENT:\n');
  console.log(releaseNoteContent);
  console.log('\nPlease verify this content appears correctly and includes all sections.\n');
  
  // Update changelog by moving unreleased changes to the new version
  updateChangelog(version, isoDate, title);
  console.log(`✅ CHANGELOG.md updated`);
  
  // Update package.json with the new version
  updatePackageJson(version);
  
  // Update package-lock.json with the new version
  updatePackageLockJson(version);
  
  // Git commit, tag & push
  try {
    // Explicitly add the changelog, package.json, package-lock.json, and release notes file
    execSync(`git add CHANGELOG.md package.json package-lock.json "${releaseNotePath}"`);
    console.log(`✅ Added CHANGELOG.md, package.json, package-lock.json, and ${releaseNotePath} to git staging`);
    
    // Commit the changes
    execSync(`git commit -m "chore: release ${tag}"`);
    console.log(`✅ Changes committed`);
  } catch (error) {
    console.warn('⚠️ Git commit failed:', error);
    console.log('Try committing manually:');
    console.log(`git add CHANGELOG.md package.json package-lock.json "${releaseNotePath}" && git commit -m "chore: release ${tag}"`);
  }

  // Push to repository
  try {
    execSync(`git push origin main`);
    console.log(`✅ Changes pushed to main branch`);
    
    // Delete remote tag if it exists and push the new tag
    execSync(`git push origin :${tag} 2>/dev/null || true`);
    execSync(`git push origin ${tag}`);
    console.log(`✅ Tag ${tag} pushed to origin`);
  } catch (error) {
    console.error('❌ Failed to push changes:', error);
    console.log('Try pushing manually:');
    console.log(`git push origin main && git push origin ${tag}`);
  }

  // GitHub Release
  try {
    // Delete existing release if it exists
    try {
      execSync(`gh release delete ${tag} --yes 2>/dev/null`);
    } catch {}
    
    // Create new release with a simpler title but full content
    execSync(`gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag}"`, { stdio: 'inherit' });
    console.log('🎉 GitHub release published!');
  } catch (error) {
    console.error('❌ Failed to create GitHub release:', error);
    console.log('You can manually create a release using:');
    console.log(`gh release create ${tag} -F "${releaseNotePath}" -t "NPC Forge ${tag}"`);
  }
}

run().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
