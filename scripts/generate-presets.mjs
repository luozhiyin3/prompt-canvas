import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 48 个预置 ID
const PRESETS = [
  // shot_type
  'shot_extreme_close_up', 'shot_close_up', 'shot_medium', 'shot_full_body',
  'shot_wide', 'shot_low_angle', 'shot_top_down', 'shot_macro',
  // art_style
  'style_cyberpunk', 'style_oil_painting', 'style_anime', 'style_photorealism',
  'style_watercolor', 'style_claymation', 'style_synthwave', 'style_ink_wash',
  // lighting
  'light_rim', 'light_golden_hour', 'light_volumetric', 'light_rembrandt',
  'light_neon_glow', 'light_cinematic_soft', 'light_hard_shadow', 'light_bioluminescence',
  // color_mood
  'color_monochrome', 'color_vibrant', 'color_morandi', 'color_cyber_neon',
  'color_pastel', 'color_dark_fantasy', 'color_golden_warm', 'color_polar_frost',
  // composition
  'comp_thirds', 'comp_centered', 'comp_leading_lines', 'comp_dutch_angle',
  'comp_golden_ratio', 'comp_framed', 'comp_minimalist', 'comp_isometric',
  // clothing
  'cloth_techwear', 'cloth_haute_couture', 'cloth_hanfu', 'cloth_cyber_armor',
  'cloth_vintage_tweed', 'cloth_streetwear', 'cloth_spacesuit', 'cloth_bohemian'
];

const targetDir = path.join(__dirname, '../public/presets');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 生成轻量 SVG 占位图（部署前保证 0 个 404，上线后可平滑替换为真实 AI 生成图）
PRESETS.forEach((id) => {
  const filePath = path.join(targetDir, `${id}.webp`);
  if (!fs.existsSync(filePath)) {
    const category = id.split('_')[0].toUpperCase();
    const label = id.replace(/^(shot|style|light|color|comp|cloth)_/, '').replace(/_/g, ' ');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="#0f172a"/>
      <rect x="8" y="8" width="240" height="240" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <circle cx="128" cy="100" r="32" fill="#06b6d4" opacity="0.2"/>
      <text x="128" y="95" font-family="sans-serif" font-size="11" fill="#38bdf8" text-anchor="middle" font-weight="bold">${category}</text>
      <text x="128" y="160" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle" font-weight="500">${label}</text>
    </svg>`;

    fs.writeFileSync(filePath, svg);
    console.log(`[Created] ${id}.webp (Placeholder)`);
  } else {
    console.log(`[Exists] ${id}.webp`);
  }
});

console.log(`\nAll ${PRESETS.length} preset assets verified.`);
