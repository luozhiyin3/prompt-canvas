import { PresetOption, DimensionCategory } from '@/types/prompt';

// 维度元数据
export const DIMENSION_META: Record<DimensionCategory, { labelZh: string; labelEn: string; icon: string }> = {
  shot_type: { labelZh: '景别', labelEn: 'Shot Type', icon: '📐' },
  art_style: { labelZh: '艺术风格', labelEn: 'Art Style', icon: '🎨' },
  lighting: { labelZh: '光影', labelEn: 'Lighting', icon: '💡' },
  color_mood: { labelZh: '色彩氛围', labelEn: 'Color Mood', icon: '🌈' },
  composition: { labelZh: '构图视角', labelEn: 'Composition', icon: '📷' },
  clothing: { labelZh: '服饰', labelEn: 'Clothing', icon: '👔' },
};

// 预置选项数据 (48个)
export const PRESET_OPTIONS: PresetOption[] = [
  // 1. 景别 (Shot Type - 8个)
  { id: 'shot_extreme_close_up', category: 'shot_type', labelZh: '特写/局部', labelEn: 'Extreme Close-Up', promptToken: 'extreme close-up shot of face, intricate details', previewImage: '/presets/shot_extreme_close_up.webp' },
  { id: 'shot_close_up', category: 'shot_type', labelZh: '近景肖像', labelEn: 'Close-Up', promptToken: 'close-up portrait, shallow depth of field', previewImage: '/presets/shot_close_up.webp' },
  { id: 'shot_medium', category: 'shot_type', labelZh: '半身/中景', labelEn: 'Medium Shot', promptToken: 'medium shot, waist-up composition', previewImage: '/presets/shot_medium.webp' },
  { id: 'shot_full_body', category: 'shot_type', labelZh: '全身像', labelEn: 'Full Body', promptToken: 'full body shot, complete figure view', previewImage: '/presets/shot_full_body.webp' },
  { id: 'shot_wide', category: 'shot_type', labelZh: '广角全景', labelEn: 'Wide Shot', promptToken: 'wide-angle panoramic view, expansive background', previewImage: '/presets/shot_wide.webp' },
  { id: 'shot_low_angle', category: 'shot_type', labelZh: '仰视视角', labelEn: 'Low Angle', promptToken: 'dramatic low-angle shot, heroic perspective', previewImage: '/presets/shot_low_angle.webp' },
  { id: 'shot_top_down', category: 'shot_type', labelZh: '俯视/顶视', labelEn: 'Top-Down', promptToken: 'overhead bird-eye view, top-down angle', previewImage: '/presets/shot_top_down.webp' },
  { id: 'shot_macro', category: 'shot_type', labelZh: '微距细节', labelEn: 'Macro Shot', promptToken: 'macro lens photography, hyper-focus texture', previewImage: '/presets/shot_macro.webp' },

  // 2. 艺术风格 (Art Style - 8个)
  { id: 'style_cyberpunk', category: 'art_style', labelZh: '赛博朋克', labelEn: 'Cyberpunk', promptToken: 'cyberpunk aesthetics, futuristic neon-lit city, high-tech gritty tone', previewImage: '/presets/style_cyberpunk.webp' },
  { id: 'style_oil_painting', category: 'art_style', labelZh: '古典油画', labelEn: 'Oil Painting', promptToken: 'classical oil painting style, visible textured brushstrokes, fine art canvas', previewImage: '/presets/style_oil_painting.webp' },
  { id: 'style_anime', category: 'art_style', labelZh: '日系插画', labelEn: 'Anime Makoto Shinkai', promptToken: 'Japanese anime aesthetic, Makoto Shinkai style, vibrant skies, crisp lineart', previewImage: '/presets/style_anime.webp' },
  { id: 'style_photorealism', category: 'art_style', labelZh: '写实摄影', labelEn: 'Photorealistic', promptToken: 'hyperrealistic 35mm film photograph, RAW photo, realistic skin texture', previewImage: '/presets/style_photorealism.webp' },
  { id: 'style_watercolor', category: 'art_style', labelZh: '水彩手绘', labelEn: 'Watercolor', promptToken: 'loose watercolor wash, bleeding pigment edges, delicate splatter art', previewImage: '/presets/style_watercolor.webp' },
  { id: 'style_claymation', category: 'art_style', labelZh: '定格黏土', labelEn: 'Claymation 3D', promptToken: '3D claymation plasticine texture, cute miniature stop-motion model', previewImage: '/presets/style_claymation.webp' },
  { id: 'style_synthwave', category: 'art_style', labelZh: '复古未来', labelEn: 'Synthwave', promptToken: '80s retro synthwave, chrome grid, magenta and cyan wireframe', previewImage: '/presets/style_synthwave.webp' },
  { id: 'style_ink_wash', category: 'art_style', labelZh: '新中式水墨', labelEn: 'Ink Wash', promptToken: 'traditional Chinese ink wash style, sumi-e minimalist negative space', previewImage: '/presets/style_ink_wash.webp' },

  // 3. 光影效果 (Lighting - 8个)
  { id: 'light_rim', category: 'lighting', labelZh: '轮廓逆光', labelEn: 'Rim Lighting', promptToken: 'crisp rim lighting, luminous silhouette glow, separated from background', previewImage: '/presets/light_rim.webp' },
  { id: 'light_golden_hour', category: 'lighting', labelZh: '黄金时刻', labelEn: 'Golden Hour', promptToken: 'golden hour sunset rays, warm haze, soft sunbeams', previewImage: '/presets/light_golden_hour.webp' },
  { id: 'light_volumetric', category: 'lighting', labelZh: '丁达尔光/圣光', labelEn: 'Tyndall Rays', promptToken: 'volumetric light rays breaking through clouds, foggy haze shafts', previewImage: '/presets/light_volumetric.webp' },
  { id: 'light_rembrandt', category: 'lighting', labelZh: '伦勃朗光', labelEn: 'Rembrandt Light', promptToken: 'classic Rembrandt lighting, triangle shadow on cheek, dramatic contrast', previewImage: '/presets/light_rembrandt.webp' },
  { id: 'light_neon_glow', category: 'lighting', labelZh: '霓虹暗调', labelEn: 'Neon Glow', promptToken: 'bi-color neon reflections, blue and purple dark studio lighting', previewImage: '/presets/light_neon_glow.webp' },
  { id: 'light_cinematic_soft', category: 'lighting', labelZh: '影视柔光', labelEn: 'Soft Diffused', promptToken: 'softbox studio diffusion, smooth neutral shadows, balanced illumination', previewImage: '/presets/light_cinematic_soft.webp' },
  { id: 'light_hard_shadow', category: 'lighting', labelZh: '顶光硬影', labelEn: 'Harsh Midday', promptToken: 'harsh direct sunlight, sharp distinct shadows, high key', previewImage: '/presets/light_hard_shadow.webp' },
  { id: 'light_bioluminescence', category: 'lighting', labelZh: '生物荧光', labelEn: 'Bioluminescent', promptToken: 'ambient bioluminescent blue and teal glow, self-illuminating particles', previewImage: '/presets/light_bioluminescence.webp' },

  // 4. 色彩氛围 (Color Mood - 8个)
  { id: 'color_monochrome', category: 'color_mood', labelZh: '黑白单色', labelEn: 'Monochrome', promptToken: 'noir monochrome black and white, deep tonal contrast', previewImage: '/presets/color_monochrome.webp' },
  { id: 'color_vibrant', category: 'color_mood', labelZh: '高饱和多色', labelEn: 'Vibrant Palette', promptToken: 'vivid saturated color palette, dynamic joyful tones', previewImage: '/presets/color_vibrant.webp' },
  { id: 'color_morandi', category: 'color_mood', labelZh: '莫兰迪低保和', labelEn: 'Muted Earthy', promptToken: 'muted earthy tones, low contrast Morandi color scheme, desaturated palette', previewImage: '/presets/color_morandi.webp' },
  { id: 'color_cyber_neon', category: 'color_mood', labelZh: '青橙撞色', labelEn: 'Teal & Orange', promptToken: 'cinematic teal and orange color grading, Hollywood color timing', previewImage: '/presets/color_cyber_neon.webp' },
  { id: 'color_pastel', category: 'color_mood', labelZh: '马卡龙粉彩', labelEn: 'Pastel Dream', promptToken: 'soft pastel hues, powdery pink, mint, pale lavender atmosphere', previewImage: '/presets/color_pastel.webp' },
  { id: 'color_dark_fantasy', category: 'color_mood', labelZh: '暗黑哥特', labelEn: 'Dark Moody', promptToken: 'dark moody atmosphere, desaturated charcoal, blood crimson accent', previewImage: '/presets/color_dark_fantasy.webp' },
  { id: 'color_golden_warm', category: 'color_mood', labelZh: '复古暖褐', labelEn: 'Vintage Sepia', promptToken: 'vintage sepia warm amber tint, nostalgic 1970s magazine grade', previewImage: '/presets/color_golden_warm.webp' },
  { id: 'color_polar_frost', category: 'color_mood', labelZh: '冷冽冰蓝', labelEn: 'Frozen Blue', promptToken: 'arctic cold blue gradient, frosty cyan highlights, crisp sterile whites', previewImage: '/presets/color_polar_frost.webp' },

  // 5. 构图方式 (Composition - 8个)
  { id: 'comp_thirds', category: 'composition', labelZh: '三分法则', labelEn: 'Rule of Thirds', promptToken: 'strict rule of thirds composition, subject placed off-center', previewImage: '/presets/comp_thirds.webp' },
  { id: 'comp_centered', category: 'composition', labelZh: '中心对称', labelEn: 'Center Symmetry', promptToken: 'wes anderson symmetrical framing, dead center alignment', previewImage: '/presets/comp_centered.webp' },
  { id: 'comp_leading_lines', category: 'composition', labelZh: '引导线透视', labelEn: 'Leading Lines', promptToken: 'strong geometric leading lines converging toward the subject', previewImage: '/presets/comp_leading_lines.webp' },
  { id: 'comp_dutch_angle', category: 'composition', labelZh: '荷兰倾斜角', labelEn: 'Dutch Angle', promptToken: 'tilted dutch angle, dynamic diagonal horizon line, sense of tension', previewImage: '/presets/comp_dutch_angle.webp' },
  { id: 'comp_golden_ratio', category: 'composition', labelZh: '黄金螺旋', labelEn: 'Golden Spiral', promptToken: 'Fibonacci golden spiral composition, fluid visual flow', previewImage: '/presets/comp_golden_ratio.webp' },
  { id: 'comp_framed', category: 'composition', labelZh: '画中画框架', labelEn: 'Framing', promptToken: 'frame within a frame, looking through an archway or doorway', previewImage: '/presets/comp_framed.webp' },
  { id: 'comp_minimalist', category: 'composition', labelZh: '留白极简', labelEn: 'Negative Space', promptToken: 'minimalist composition with abundant negative space, isolated subject', previewImage: '/presets/comp_minimalist.webp' },
  { id: 'comp_isometric', category: 'composition', labelZh: '等轴测视角', labelEn: 'Isometric 3D', promptToken: 'orthographic isometric projection, clean geometric diagram layout', previewImage: '/presets/comp_isometric.webp' },

  // 6. 服饰特征 (Clothing - 8个)
  { id: 'cloth_techwear', category: 'clothing', labelZh: '机能工装', labelEn: 'Techwear', promptToken: 'modern techwear jacket, tactical straps, waterproof modular fabric', previewImage: '/presets/cloth_techwear.webp' },
  { id: 'cloth_haute_couture', category: 'clothing', labelZh: '高定礼服', labelEn: 'Haute Couture', promptToken: 'avant-garde haute couture evening gown, silk embroidery, runway fashion', previewImage: '/presets/cloth_haute_couture.webp' },
  { id: 'cloth_hanfu', category: 'clothing', labelZh: '汉服襦裙', labelEn: 'Hanfu', promptToken: 'traditional Chinese flowing silk hanfu, wide sleeves, intricate sash patterns', previewImage: '/presets/cloth_hanfu.webp' },
  { id: 'cloth_cyber_armor', category: 'clothing', labelZh: '赛博机甲', labelEn: 'Cyber Armor', promptToken: 'futuristic carbon fiber exosuit, titanium plated joint armor', previewImage: '/presets/cloth_cyber_armor.webp' },
  { id: 'cloth_vintage_tweed', category: 'clothing', labelZh: '复古花呢', labelEn: 'Vintage Tweed', promptToken: 'British classic tweed blazer, wool vest, structured collar', previewImage: '/presets/cloth_vintage_tweed.webp' },
  { id: 'cloth_streetwear', category: 'clothing', labelZh: '街头潮流', labelEn: 'Streetwear', promptToken: 'oversized modern streetwear hoodie, distressed cargo jeans, sneakers', previewImage: '/presets/cloth_streetwear.webp' },
  { id: 'cloth_spacesuit', category: 'clothing', labelZh: '宇航科幻', labelEn: 'Astronaut Suit', promptToken: 'pressurized EVA deep-space suit, reflective tinted visor, mission patches', previewImage: '/presets/cloth_spacesuit.webp' },
  { id: 'cloth_bohemian', category: 'clothing', labelZh: '波西米亚', labelEn: 'Boho Linen', promptToken: 'relaxed bohemian linen tunic, woven macrame accents, tassel details', previewImage: '/presets/cloth_bohemian.webp' }
];

// 按类别获取选项
export function getOptionsByCategory(category: DimensionCategory): PresetOption[] {
  return PRESET_OPTIONS.filter(opt => opt.category === category);
}

// 根据 ID 获取选项
export function getOptionById(id: string): PresetOption | undefined {
  return PRESET_OPTIONS.find(opt => opt.id === id);
}

// 获取所有类别
export function getAllCategories(): DimensionCategory[] {
  return Object.keys(DIMENSION_META) as DimensionCategory[];
}
