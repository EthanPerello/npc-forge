#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const version = process.argv[2];
if (!version) {
  console.error('❌ Usage: npm run release <version>');
  process.exit(1);
}

const tagName = `v${version}`;
const today = new Date().toISOString().split('T')[0];
const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
const templatePath = path.join(process.cwd(), 'release-notes/RELEASE_TEMPLATE.md');
const releaseNotePath = path.join(process.cwd(), `release-notes/${tagName}.md`);

const updateChangelog = (version: string, date: string): string => {
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const unreleasedPattern = /## \[Unreleased\]\s*/;
  const unreleasedMatch = changelog.match(unreleasedPattern);

  if (!unreleasedMatch) {
    console.error('❌ No [Unreleased] section found in CHANGELOG.md');
    process.exit(1);
  }

  const parts = changelog.split(unreleasedPattern);
  const unreleasedContent = parts[1].split(/^## \[/m)[0].trim();

  const newVersionBlock = `## [${version}] - ${date}\n\n${unreleasedContent}\n`;
  const remainingChangelog = parts[1].replace(unreleasedContent, '').trimStart();

  const updatedChangelog = [
    '## [Unreleased]',
    '',
    newVersionBlock,
    remainingChangelog,
  ].join('\n\n');

  fs.writeFileSync(changelogPath, updatedChangelog);
  console.log('✅ CHANGELOG.md updated');
  return unreleasedContent;
};

const generateReleaseNote = (version: string, date: string, content: string) => {
  let template = fs.readFileSync(templatePath, 'utf8');
  template = template
    .replace(/vX\.Y\.Z/g, `v${version}`)
    .replace(/YYYY-MM-DD/g, date);

  // Simple placeholder replacement for each section
  const sections = {
    Added: '',
    Changed: '',
    Fixed: '',
    Removed: '',
  };

  let currentSection: keyof typeof sections | null = null;
  for (const line of content.split('\n')) {
    const match = line.match(/^### (Added|Changed|Fixed|Removed)/);
    if (match) {
      currentSection = match[1] as keyof typeof sections;
      continue;
    }

    if (currentSection && line.trim().startsWith('-')) {
      sections[currentSection] += line + '\n';
    }
  }

  for (const key in sections) {
    const value = sections[key as keyof typeof sections].trim() || 'None.';
    template = template.replace(`{{${key}}}`, value);
  }

  fs.writeFileSync(releaseNotePath, template);
  console.log(`✅ Release note created at: ${releaseNotePath}`);
};

const commitAndTag = (version: string) => {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });
  execSync(`git tag v${version}`, { stdio: 'inherit' });
  execSync(`git push origin main`, { stdio: 'inherit' });
  execSync(`git push origin v${version}`, { stdio: 'inherit' });
  console.log('✅ Git commit, tag, and push completed');
};

const createGithubRelease = (version: string) => {
  execSync(`gh release create v${version} --title "NPC Forge v${version}" --notes-file ${releaseNotePath}`, {
    stdio: 'inherit',
  });
  console.log('🚀 GitHub release created');
};

const run = () => {
  console.log(`📦 Releasing v${version}...`);

  const unreleasedContent = updateChangelog(version, today);
  generateReleaseNote(version, today, unreleasedContent);
  commitAndTag(version);
  createGithubRelease(version);
};

run();
