import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const presetsContent = fs.readFileSync(path.join(__dirname, '../config/presets.ts'), 'utf8');
const PRESETS = presetsContent.match(/id: '([^']+)'/g).map(s => s.replace(/id: '|'/g, ''));

const targetDir = path.join(__dirname, '../public/presets');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const CATEGORY_COLORS = {
  shot: '#38bdf8', style: '#a78bfa', light: '#fbbf24', color: '#f472b6',
  comp: '#34d399', cloth: '#fb923c', mood: '#c084fc', tech: '#2dd4bf',
  persp: '#60a5fa', tex: '#a3a3a3', subj: '#f87171', env: '#4ade80',
};

PRESETS.forEach((id) => {
  const filePath = path.join(targetDir, `${id}.svg`);
  if (!fs.existsSync(filePath)) {
    const prefix = id.split('_')[0];
    const label = id.replace(/^[a-z]+_/, '').replace(/_/g, ' ');
    const color = CATEGORY_COLORS[prefix] || '#38bdf8';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="#0f172a">
  <rect x="0" y="0" width="512" height="512" rx="24" fill="#1e293b" stroke="#334155" stroke-width="4"/>
  <circle cx="256" cy="200" r="60" fill="${color}" opacity="0.15"/>
  <text x="256" y="195" font-family="sans-serif" font-size="28" fill="${color}" text-anchor="middle" font-weight="bold">${prefix.toUpperCase()}</text>
  <text x="256" y="290" font-family="sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">${label}</text>
  <text x="256" y="330" font-family="sans-serif" font-size="16" fill="#475569" text-anchor="middle">${id}</text>
</svg>`;

    fs.writeFileSync(filePath, svg);
    console.log(`[Created] ${id}.svg`);
  } else {
    console.log(`[Exists] ${id}.svg`);
  }
});

console.log(`\nAll ${PRESETS.length} preset assets verified.`);
