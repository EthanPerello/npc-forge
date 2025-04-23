#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var version = process.argv[2];
if (!version) {
    console.error('❌ Usage: npm run release <version>');
    process.exit(1);
}
var tagName = "v".concat(version);
var today = new Date().toISOString().split('T')[0];
var changelogPath = path_1.default.join(process.cwd(), 'CHANGELOG.md');
var templatePath = path_1.default.join(process.cwd(), 'release-notes/RELEASE_TEMPLATE.md');
var releaseNotePath = path_1.default.join(process.cwd(), "release-notes/".concat(tagName, ".md"));
var updateChangelog = function (version, date) {
    var changelog = fs_1.default.readFileSync(changelogPath, 'utf8');
    var unreleasedPattern = /## \[Unreleased\]\s*/;
    var unreleasedMatch = changelog.match(unreleasedPattern);
    if (!unreleasedMatch) {
        console.error('❌ No [Unreleased] section found in CHANGELOG.md');
        process.exit(1);
    }
    var parts = changelog.split(unreleasedPattern);
    var unreleasedContent = parts[1].split(/^## \[/m)[0].trim();
    var newVersionBlock = "## [".concat(version, "] - ").concat(date, "\n\n").concat(unreleasedContent, "\n");
    var remainingChangelog = parts[1].replace(unreleasedContent, '').trimStart();
    var updatedChangelog = [
        '## [Unreleased]',
        '',
        newVersionBlock,
        remainingChangelog,
    ].join('\n\n');
    fs_1.default.writeFileSync(changelogPath, updatedChangelog);
    console.log('✅ CHANGELOG.md updated');
    return unreleasedContent;
};
var generateReleaseNote = function (version, date, content) {
    var template = fs_1.default.readFileSync(templatePath, 'utf8');
    template = template
        .replace(/vX\.Y\.Z/g, "v".concat(version))
        .replace(/YYYY-MM-DD/g, date);
    // Simple placeholder replacement for each section
    var sections = {
        Added: '',
        Changed: '',
        Fixed: '',
        Removed: '',
    };
    var currentSection = null;
    for (var _i = 0, _a = content.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        var match = line.match(/^### (Added|Changed|Fixed|Removed)/);
        if (match) {
            currentSection = match[1];
            continue;
        }
        if (currentSection && line.trim().startsWith('-')) {
            sections[currentSection] += line + '\n';
        }
    }
    for (var key in sections) {
        var value = sections[key].trim() || 'None.';
        template = template.replace("{{".concat(key, "}}"), value);
    }
    fs_1.default.writeFileSync(releaseNotePath, template);
    console.log("\u2705 Release note created at: ".concat(releaseNotePath));
};
var commitAndTag = function (version) {
    (0, child_process_1.execSync)('git add .', { stdio: 'inherit' });
    (0, child_process_1.execSync)("git commit -m \"chore: release v".concat(version, "\""), { stdio: 'inherit' });
    (0, child_process_1.execSync)("git tag v".concat(version), { stdio: 'inherit' });
    (0, child_process_1.execSync)("git push origin main", { stdio: 'inherit' });
    (0, child_process_1.execSync)("git push origin v".concat(version), { stdio: 'inherit' });
    console.log('✅ Git commit, tag, and push completed');
};
var createGithubRelease = function (version) {
    (0, child_process_1.execSync)("gh release create v".concat(version, " --title \"NPC Forge v").concat(version, "\" --notes-file ").concat(releaseNotePath), {
        stdio: 'inherit',
    });
    console.log('🚀 GitHub release created');
};
var run = function () {
    console.log("\uD83D\uDCE6 Releasing v".concat(version, "..."));
    var unreleasedContent = updateChangelog(version, today);
    generateReleaseNote(version, today, unreleasedContent);
    commitAndTag(version);
    createGithubRelease(version);
};
run();
