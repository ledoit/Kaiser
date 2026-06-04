#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function usage() {
  console.log('Usage: node scripts/convert-stems.js --project <project-id>');
  process.exit(1);
}

const args = process.argv.slice(2);
const projectIndex = args.indexOf('--project');
if (projectIndex === -1 || !args[projectIndex + 1]) usage();

const projectId = args[projectIndex + 1];
const rootDir = path.resolve(__dirname, '..');
const projectDir = path.join(rootDir, 'projects', projectId);
const configPath = path.join(projectDir, 'project.json');

if (!fs.existsSync(configPath)) {
  console.error(`Project config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const stemPrefix = config.stemPrefix;
const stems = config.stems || [];

if (!stemPrefix || stems.length === 0) {
  console.error('Invalid project.json: missing stemPrefix/stems');
  process.exit(1);
}

const inboxDir = path.join(projectDir, 'export', 'inbox');
const outOggDir = path.join(projectDir, 'export', 'out', 'ogg');
const outMp3Dir = path.join(projectDir, 'export', 'out', 'mp3');

fs.mkdirSync(inboxDir, { recursive: true });
fs.mkdirSync(outOggDir, { recursive: true });
fs.mkdirSync(outMp3Dir, { recursive: true });

const ffmpegCheck = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore', shell: process.platform === 'win32' });
if (ffmpegCheck.status !== 0) {
  console.error('ffmpeg not found in PATH. Install ffmpeg, then rerun.');
  process.exit(1);
}

for (const stem of stems) {
  const baseName = `${stemPrefix}_${stem}`;
  const inFile = path.join(inboxDir, `${baseName}.wav`);
  const outOgg = path.join(outOggDir, `${baseName}.ogg`);
  const outMp3 = path.join(outMp3Dir, `${baseName}.mp3`);

  if (!fs.existsSync(inFile)) {
    console.error(`Missing input: ${inFile}`);
    process.exit(1);
  }

  run('ffmpeg', ['-y', '-i', inFile, '-c:a', 'libvorbis', '-q:a', '5', outOgg]);
  run('ffmpeg', ['-y', '-i', inFile, '-c:a', 'libmp3lame', '-q:a', '2', outMp3]);
  console.log(`Built: ${baseName}.ogg + ${baseName}.mp3`);
}

console.log(`Done. Outputs: ${path.join(projectDir, 'export', 'out')}`);
console.log('Copy into each client app using that client’s sync script (see project.json → clients).');
