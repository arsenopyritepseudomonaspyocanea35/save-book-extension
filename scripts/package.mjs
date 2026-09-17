import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const releaseDir = join(root, 'release');
const builtManifest = join(dist, 'manifest.json');

if (!existsSync(builtManifest)) {
  console.error('dist/manifest.json not found — run `bun run build` first.');
  process.exit(1);
}

const { name, version } = JSON.parse(readFileSync(builtManifest, 'utf8'));
const slug = String(name)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const artifact = join(releaseDir, `${slug}-${version}.zip`);

mkdirSync(releaseDir, { recursive: true });
for (const entry of readdirSync(releaseDir)) {
  if (entry.endsWith('.zip')) rmSync(join(releaseDir, entry));
}

execFileSync('zip', ['-r', '-X', '-q', artifact, '.', '-x', '*.DS_Store', '-x', '__MACOSX/*'], {
  cwd: dist,
});

const entries = execFileSync('unzip', ['-Z1', artifact], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

if (!entries.includes('manifest.json')) {
  console.error('manifest.json is not at the root of the zip — the Chrome Web Store will reject it.');
  process.exit(1);
}

const maps = entries.filter((entry) => entry.endsWith('.map'));
if (maps.length) console.warn(`warning: ${maps.length} source map(s) shipped (${maps.join(', ')})`);

const relative = artifact.slice(root.length + 1);
const kilobytes = (statSync(artifact).size / 1024).toFixed(1);
console.log(`${relative}  ${kilobytes} kB  ${entries.length} files  ${name} ${version}`);
console.log('manifest.json at zip root: yes');
