import { PresetOption, DimensionCategory } from '@/types/prompt';

export const DIMENSION_META: Record<DimensionCategory, { labelZh: string; labelEn: string; icon: string }> = {
  shot_type: { labelZh: '景别', labelEn: 'Shot Type', icon: '📐' },
  art_style: { labelZh: '艺术风格', labelEn: 'Art Style', icon: '🎨' },
  lighting: { labelZh: '光影', labelEn: 'Lighting', icon: '💡' },
  color_mood: { labelZh: '色彩氛围', labelEn: 'Color Mood', icon: '🌈' },
  composition: { labelZh: '构图视角', labelEn: 'Composition', icon: '📷' },
  clothing: { labelZh: '服饰', labelEn: 'Clothing', icon: '👔' },
  mood: { labelZh: '情绪氛围', labelEn: 'Mood', icon: '🎭' },
  technique: { labelZh: '绘画技法', labelEn: 'Technique', icon: '🖌️' },
  perspective: { labelZh: '透视', labelEn: 'Perspective', icon: '🔭' },
  texture: { labelZh: '材质纹理', labelEn: 'Texture', icon: '🪨' },
  subject: { labelZh: '主体类型', labelEn: 'Subject', icon: '🎯' },
  environment: { labelZh: '环境场景', labelEn: 'Environment', icon: '🌍' },
};

export const PRESET_OPTIONS: PresetOption[] = [
  // 1. 景别 (Shot Type - 8)
  { id: 'shot_extreme_close_up', category: 'shot_type', labelZh: '特写/局部', labelEn: 'Extreme Close-Up', promptToken: 'extreme close-up shot, intricate details', previewImage: '/presets/shot_extreme_close_up.svg' },
  { id: 'shot_close_up', category: 'shot_type', labelZh: '近景肖像', labelEn: 'Close-Up', promptToken: 'close-up portrait, shallow depth of field', previewImage: '/presets/shot_close_up.svg' },
  { id: 'shot_medium', category: 'shot_type', labelZh: '半身/中景', labelEn: 'Medium Shot', promptToken: 'medium shot, waist-up composition', previewImage: '/presets/shot_medium.svg' },
  { id: 'shot_full_body', category: 'shot_type', labelZh: '全身像', labelEn: 'Full Body', promptToken: 'full body shot, complete figure view', previewImage: '/presets/shot_full_body.svg' },
  { id: 'shot_wide', category: 'shot_type', labelZh: '广角全景', labelEn: 'Wide Shot', promptToken: 'wide-angle panoramic view, expansive background', previewImage: '/presets/shot_wide.svg' },
  { id: 'shot_low_angle', category: 'shot_type', labelZh: '仰视视角', labelEn: 'Low Angle', promptToken: 'dramatic low-angle shot, heroic perspective', previewImage: '/presets/shot_low_angle.svg' },
  { id: 'shot_top_down', category: 'shot_type', labelZh: '俯视/顶视', labelEn: 'Top-Down', promptToken: 'overhead bird-eye view, top-down angle', previewImage: '/presets/shot_top_down.svg' },
  { id: 'shot_macro', category: 'shot_type', labelZh: '微距细节', labelEn: 'Macro Shot', promptToken: 'macro lens photography, hyper-focus texture', previewImage: '/presets/shot_macro.svg' },

  // 2. 艺术风格 (Art Style - 8)
  { id: 'style_cyberpunk', category: 'art_style', labelZh: '赛博朋克', labelEn: 'Cyberpunk', promptToken: 'cyberpunk aesthetics, futuristic neon-lit city', previewImage: '/presets/style_cyberpunk.svg' },
  { id: 'style_oil_painting', category: 'art_style', labelZh: '古典油画', labelEn: 'Oil Painting', promptToken: 'classical oil painting style, visible textured brushstrokes', previewImage: '/presets/style_oil_painting.svg' },
  { id: 'style_anime', category: 'art_style', labelZh: '日系插画', labelEn: 'Anime', promptToken: 'Japanese anime aesthetic, vibrant colors, crisp lineart', previewImage: '/presets/style_anime.svg' },
  { id: 'style_photorealism', category: 'art_style', labelZh: '写实摄影', labelEn: 'Photorealistic', promptToken: 'hyperrealistic 35mm film photograph, RAW photo', previewImage: '/presets/style_photorealism.svg' },
  { id: 'style_watercolor', category: 'art_style', labelZh: '水彩手绘', labelEn: 'Watercolor', promptToken: 'loose watercolor wash, bleeding pigment edges', previewImage: '/presets/style_watercolor.svg' },
  { id: 'style_ink_wash', category: 'art_style', labelZh: '新中式水墨', labelEn: 'Ink Wash', promptToken: 'traditional Chinese ink wash style, sumi-e minimalist', previewImage: '/presets/style_ink_wash.svg' },
  { id: 'style_synthwave', category: 'art_style', labelZh: '复古未来', labelEn: 'Synthwave', promptToken: '80s retro synthwave, chrome grid, magenta and cyan', previewImage: '/presets/style_synthwave.svg' },
  { id: 'style_claymation', category: 'art_style', labelZh: '定格黏土', labelEn: 'Claymation', promptToken: '3D claymation plasticine texture, stop-motion model', previewImage: '/presets/style_claymation.svg' },

  // 3. 光影效果 (Lighting - 8)
  { id: 'light_rim', category: 'lighting', labelZh: '轮廓逆光', labelEn: 'Rim Lighting', promptToken: 'crisp rim lighting, luminous silhouette glow', previewImage: '/presets/light_rim.svg' },
  { id: 'light_golden_hour', category: 'lighting', labelZh: '黄金时刻', labelEn: 'Golden Hour', promptToken: 'golden hour sunset rays, warm haze', previewImage: '/presets/light_golden_hour.svg' },
  { id: 'light_volumetric', category: 'lighting', labelZh: '丁达尔光', labelEn: 'Tyndall Rays', promptToken: 'volumetric light rays breaking through clouds', previewImage: '/presets/light_volumetric.svg' },
  { id: 'light_rembrandt', category: 'lighting', labelZh: '伦勃朗光', labelEn: 'Rembrandt Light', promptToken: 'classic Rembrandt lighting, triangle shadow on cheek', previewImage: '/presets/light_rembrandt.svg' },
  { id: 'light_neon', category: 'lighting', labelZh: '霓虹暗调', labelEn: 'Neon Glow', promptToken: 'bi-color neon reflections, blue and purple dark studio', previewImage: '/presets/light_neon.svg' },
  { id: 'light_soft', category: 'lighting', labelZh: '影视柔光', labelEn: 'Soft Diffused', promptToken: 'softbox studio diffusion, smooth neutral shadows', previewImage: '/presets/light_soft.svg' },
  { id: 'light_hard', category: 'lighting', labelZh: '顶光硬影', labelEn: 'Harsh Midday', promptToken: 'harsh direct sunlight, sharp distinct shadows', previewImage: '/presets/light_hard.svg' },
  { id: 'light_bio', category: 'lighting', labelZh: '生物荧光', labelEn: 'Bioluminescent', promptToken: 'ambient bioluminescent blue and teal glow', previewImage: '/presets/light_bio.svg' },

  // 4. 色彩氛围 (Color Mood - 8)
  { id: 'color_monochrome', category: 'color_mood', labelZh: '黑白单色', labelEn: 'Monochrome', promptToken: 'noir monochrome black and white, deep tonal contrast', previewImage: '/presets/color_monochrome.svg' },
  { id: 'color_vibrant', category: 'color_mood', labelZh: '高饱和多色', labelEn: 'Vibrant Palette', promptToken: 'vivid saturated color palette, dynamic joyful tones', previewImage: '/presets/color_vibrant.svg' },
  { id: 'color_morandi', category: 'color_mood', labelZh: '莫兰迪低保和', labelEn: 'Muted Earthy', promptToken: 'muted earthy tones, low contrast Morandi color scheme', previewImage: '/presets/color_morandi.svg' },
  { id: 'color_teal_orange', category: 'color_mood', labelZh: '青橙撞色', labelEn: 'Teal & Orange', promptToken: 'cinematic teal and orange color grading', previewImage: '/presets/color_teal_orange.svg' },
  { id: 'color_pastel', category: 'color_mood', labelZh: '马卡龙粉彩', labelEn: 'Pastel Dream', promptToken: 'soft pastel hues, powdery pink, mint, pale lavender', previewImage: '/presets/color_pastel.svg' },
  { id: 'color_dark_fantasy', category: 'color_mood', labelZh: '暗黑奇幻', labelEn: 'Dark Fantasy', promptToken: 'dark gothic color palette, deep purples and blacks', previewImage: '/presets/color_dark_fantasy.svg' },
  { id: 'color_golden', category: 'color_mood', labelZh: '金色暖调', labelEn: 'Golden Warm', promptToken: 'rich golden amber tones, warm candlelight glow', previewImage: '/presets/color_golden.svg' },
  { id: 'color_frost', category: 'color_mood', labelZh: '极地冷调', labelEn: 'Polar Frost', promptToken: 'icy blue and white frost tones, cold winter palette', previewImage: '/presets/color_frost.svg' },

  // 5. 构图方式 (Composition - 8)
  { id: 'comp_thirds', category: 'composition', labelZh: '三分法则', labelEn: 'Rule of Thirds', promptToken: 'rule of thirds composition, balanced asymmetry', previewImage: '/presets/comp_thirds.svg' },
  { id: 'comp_centered', category: 'composition', labelZh: '中心对称', labelEn: 'Center Symmetry', promptToken: 'centered symmetrical composition, mirror balance', previewImage: '/presets/comp_centered.svg' },
  { id: 'comp_leading', category: 'composition', labelZh: '引导线透视', labelEn: 'Leading Lines', promptToken: 'strong leading lines converging toward the subject', previewImage: '/presets/comp_leading.svg' },
  { id: 'comp_dutch', category: 'composition', labelZh: '荷兰倾斜角', labelEn: 'Dutch Angle', promptToken: 'dutch angle tilted composition, dynamic unease', previewImage: '/presets/comp_dutch.svg' },
  { id: 'comp_golden', category: 'composition', labelZh: '黄金螺旋', labelEn: 'Golden Spiral', promptToken: 'golden ratio spiral composition, fibonacci sequence', previewImage: '/presets/comp_golden.svg' },
  { id: 'comp_framed', category: 'composition', labelZh: '画中画框架', labelEn: 'Framed', promptToken: 'natural frame within frame composition, depth layers', previewImage: '/presets/comp_framed.svg' },
  { id: 'comp_minimal', category: 'composition', labelZh: '留白极简', labelEn: 'Minimalist', promptToken: 'minimalist negative space, clean simple composition', previewImage: '/presets/comp_minimal.svg' },
  { id: 'comp_iso', category: 'composition', labelZh: '等轴测视角', labelEn: 'Isometric', promptToken: 'isometric 3D perspective, equal axis angles', previewImage: '/presets/comp_iso.svg' },

  // 6. 服饰特征 (Clothing - 8)
  { id: 'cloth_techwear', category: 'clothing', labelZh: '机能风', labelEn: 'Techwear', promptToken: 'futuristic techwear clothing, utility straps and buckles', previewImage: '/presets/cloth_techwear.svg' },
  { id: 'cloth_haute', category: 'clothing', labelZh: '高级定制', labelEn: 'Haute Couture', promptToken: 'haute couture fashion, elegant flowing fabric', previewImage: '/presets/cloth_haute.svg' },
  { id: 'cloth_hanfu', category: 'clothing', labelZh: '汉服', labelEn: 'Hanfu', promptToken: 'traditional Chinese hanfu, flowing silk robes', previewImage: '/presets/cloth_hanfu.svg' },
  { id: 'cloth_cyber', category: 'clothing', labelZh: '赛博装甲', labelEn: 'Cyber Armor', promptToken: 'cyberpunk mechanical armor, glowing circuit patterns', previewImage: '/presets/cloth_cyber.svg' },
  { id: 'cloth_vintage', category: 'clothing', labelZh: '复古粗花呢', labelEn: 'Vintage Tweed', promptToken: 'vintage tweed suit, classic British style', previewImage: '/presets/cloth_vintage.svg' },
  { id: 'cloth_street', category: 'clothing', labelZh: '街头潮流', labelEn: 'Streetwear', promptToken: 'urban streetwear fashion, oversized hoodie and sneakers', previewImage: '/presets/cloth_street.svg' },
  { id: 'cloth_space', category: 'clothing', labelZh: '宇航服', labelEn: 'Spacesuit', promptToken: 'futuristic spacesuit, sleek white and silver design', previewImage: '/presets/cloth_space.svg' },
  { id: 'cloth_boho', category: 'clothing', labelZh: '波西米亚', labelEn: 'Bohemian', promptToken: 'bohemian flowing dress, ethnic patterns and fringe', previewImage: '/presets/cloth_boho.svg' },

  // 7. 情绪氛围 (Mood - 8)
  { id: 'mood_mysterious', category: 'mood', labelZh: '神秘悬疑', labelEn: 'Mysterious', promptToken: 'mysterious atmospheric mood, fog and shadows', previewImage: '/presets/mood_mysterious.svg' },
  { id: 'mood_serene', category: 'mood', labelZh: '宁静祥和', labelEn: 'Serene', promptToken: 'serene peaceful atmosphere, calm tranquil mood', previewImage: '/presets/mood_serene.svg' },
  { id: 'mood_dramatic', category: 'mood', labelZh: '戏剧张力', labelEn: 'Dramatic', promptToken: 'dramatic intense mood, high contrast tension', previewImage: '/presets/mood_dramatic.svg' },
  { id: 'mood_romantic', category: 'mood', labelZh: '浪漫唯美', labelEn: 'Romantic', promptToken: 'romantic dreamy atmosphere, soft ethereal glow', previewImage: '/presets/mood_romantic.svg' },
  { id: 'mood_melancholy', category: 'mood', labelZh: '忧郁伤感', labelEn: 'Melancholy', promptToken: 'melancholy somber mood, rain and grey tones', previewImage: '/presets/mood_melancholy.svg' },
  { id: 'mood_epic', category: 'mood', labelZh: '史诗宏大', labelEn: 'Epic', promptToken: 'epic grandiose scale, majestic awe-inspiring', previewImage: '/presets/mood_epic.svg' },
  { id: 'mood_whimsical', category: 'mood', labelZh: '奇幻童趣', labelEn: 'Whimsical', promptToken: 'whimsical playful mood, magical fairy tale', previewImage: '/presets/mood_whimsical.svg' },
  { id: 'mood_horror', category: 'mood', labelZh: '恐怖惊悚', labelEn: 'Horror', promptToken: 'horror eerie atmosphere, unsettling dread', previewImage: '/presets/mood_horror.svg' },

  // 8. 绘画技法 (Technique - 8)
  { id: 'tech_impasto', category: 'technique', labelZh: '厚涂堆叠', labelEn: 'Impasto', promptToken: 'thick impasto brushstrokes, heavy paint texture', previewImage: '/presets/tech_impasto.svg' },
  { id: 'tech_glazing', category: 'technique', labelZh: '透明罩染', labelEn: 'Glazing', promptToken: 'transparent glazing layers, luminous depth', previewImage: '/presets/tech_glazing.svg' },
  { id: 'tech_stippling', category: 'technique', labelZh: '点彩技法', labelEn: 'Stippling', promptToken: 'pointillism stippling technique, tiny colored dots', previewImage: '/presets/tech_stippling.svg' },
  { id: 'tech_wet', category: 'technique', labelZh: '湿画法', labelEn: 'Wet-on-Wet', promptToken: 'wet-on-wet watercolor technique, soft bleeding edges', previewImage: '/presets/tech_wet.svg' },
  { id: 'tech_dry', category: 'technique', labelZh: '干笔皴擦', labelEn: 'Dry Brush', promptToken: 'dry brush technique, scratchy textured strokes', previewImage: '/presets/tech_dry.svg' },
  { id: 'tech_sgraffito', category: 'technique', labelZh: '刮刻技法', labelEn: 'Sgraffito', promptToken: 'sgraffito scratching technique, carved lines', previewImage: '/presets/tech_sgraffito.svg' },
  { id: 'tech_blending', category: 'technique', labelZh: '晕染渐变', labelEn: 'Blending', promptToken: 'smooth color blending, seamless gradients', previewImage: '/presets/tech_blending.svg' },
  { id: 'tech_palette', category: 'technique', labelZh: '调色刀', labelEn: 'Palette Knife', promptToken: 'palette knife application, bold textured marks', previewImage: '/presets/tech_palette.svg' },

  // 9. 透视 (Perspective - 8)
  { id: 'persp_1point', category: 'perspective', labelZh: '一点透视', labelEn: '1-Point Perspective', promptToken: 'one-point perspective, single vanishing point', previewImage: '/presets/persp_1point.svg' },
  { id: 'persp_2point', category: 'perspective', labelZh: '两点透视', labelEn: '2-Point Perspective', promptToken: 'two-point perspective, corner view depth', previewImage: '/presets/persp_2point.svg' },
  { id: 'persp_3point', category: 'perspective', labelZh: '三点透视', labelEn: '3-Point Perspective', promptToken: 'three-point perspective, dramatic height', previewImage: '/presets/persp_3point.svg' },
  { id: 'persp_fisheye', category: 'perspective', labelZh: '鱼眼透视', labelEn: 'Fisheye', promptToken: 'fisheye lens distortion, curved spherical view', previewImage: '/presets/persp_fisheye.svg' },
  { id: 'persp_orthographic', category: 'perspective', labelZh: '正交投影', labelEn: 'Orthographic', promptToken: 'orthographic projection, no perspective distortion', previewImage: '/presets/persp_orthographic.svg' },
  { id: 'persp_forced', category: 'perspective', labelZh: '强迫透视', labelEn: 'Forced Perspective', promptToken: 'forced perspective illusion, size manipulation', previewImage: '/presets/persp_forced.svg' },
  { id: 'persp_atmospheric', category: 'perspective', labelZh: '空气透视', labelEn: 'Atmospheric', promptToken: 'atmospheric perspective, depth through haze', previewImage: '/presets/persp_atmospheric.svg' },
  { id: 'persp_reverse', category: 'perspective', labelZh: '反向透视', labelEn: 'Reverse Perspective', promptToken: 'reverse perspective, Byzantine style divergence', previewImage: '/presets/persp_reverse.svg' },

  // 10. 材质纹理 (Texture - 8)
  { id: 'tex_metal', category: 'texture', labelZh: '金属质感', labelEn: 'Metallic', promptToken: 'polished metallic surface, chrome reflections', previewImage: '/presets/tex_metal.svg' },
  { id: 'tex_wood', category: 'texture', labelZh: '木质纹理', labelEn: 'Wood Grain', promptToken: 'natural wood grain texture, organic warmth', previewImage: '/presets/tex_wood.svg' },
  { id: 'tex_stone', category: 'texture', labelZh: '石材肌理', labelEn: 'Stone', promptToken: 'rough stone texture, weathered surface', previewImage: '/presets/tex_stone.svg' },
  { id: 'tex_fabric', category: 'texture', labelZh: '织物纤维', labelEn: 'Fabric', promptToken: 'woven fabric texture, thread detail', previewImage: '/presets/tex_fabric.svg' },
  { id: 'tex_glass', category: 'texture', labelZh: '玻璃透明', labelEn: 'Glass', promptToken: 'transparent glass material, refraction and reflection', previewImage: '/presets/tex_glass.svg' },
  { id: 'tex_organic', category: 'texture', labelZh: '有机生物', labelEn: 'Organic', promptToken: 'organic biological texture, living surface', previewImage: '/presets/tex_organic.svg' },
  { id: 'tex_crystal', category: 'texture', labelZh: '水晶折射', labelEn: 'Crystal', promptToken: 'crystalline structure, prismatic light refraction', previewImage: '/presets/tex_crystal.svg' },
  { id: 'tex_rust', category: 'texture', labelZh: '锈蚀斑驳', labelEn: 'Rusted', promptToken: 'rusted corroded metal, aged patina', previewImage: '/presets/tex_rust.svg' },

  // 11. 主体类型 (Subject - 8)
  { id: 'subj_portrait', category: 'subject', labelZh: '人物肖像', labelEn: 'Portrait', promptToken: 'human portrait, detailed facial features', previewImage: '/presets/subj_portrait.svg' },
  { id: 'subj_landscape', category: 'subject', labelZh: '自然风光', labelEn: 'Landscape', promptToken: 'natural landscape scenery, mountains and sky', previewImage: '/presets/subj_landscape.svg' },
  { id: 'subj_architecture', category: 'subject', labelZh: '建筑空间', labelEn: 'Architecture', promptToken: 'architectural structure, building design', previewImage: '/presets/subj_architecture.svg' },
  { id: 'subj_creature', category: 'subject', labelZh: '生物怪兽', labelEn: 'Creature', promptToken: 'fantasy creature, mythical beast design', previewImage: '/presets/subj_creature.svg' },
  { id: 'subj_vehicle', category: 'subject', labelZh: '载具机械', labelEn: 'Vehicle', promptToken: 'mechanical vehicle, futuristic transportation', previewImage: '/presets/subj_vehicle.svg' },
  { id: 'subj_food', category: 'subject', labelZh: '美食静物', labelEn: 'Food Still Life', promptToken: 'food still life, culinary presentation', previewImage: '/presets/subj_food.svg' },
  { id: 'subj_abstract', category: 'subject', labelZh: '抽象概念', labelEn: 'Abstract', promptToken: 'abstract conceptual art, non-representational', previewImage: '/presets/subj_abstract.svg' },
  { id: 'subj_surreal', category: 'subject', labelZh: '超现实', labelEn: 'Surreal', promptToken: 'surreal dreamlike imagery, impossible scenes', previewImage: '/presets/subj_surreal.svg' },

  // 12. 环境场景 (Environment - 8)
  { id: 'env_urban', category: 'environment', labelZh: '都市街景', labelEn: 'Urban City', promptToken: 'urban cityscape, bustling metropolitan street', previewImage: '/presets/env_urban.svg' },
  { id: 'env_nature', category: 'environment', labelZh: '自然野外', labelEn: 'Wilderness', promptToken: 'wilderness nature scene, forest and mountains', previewImage: '/presets/env_nature.svg' },
  { id: 'env_interior', category: 'environment', labelZh: '室内空间', labelEn: 'Interior', promptToken: 'interior room design, architectural space', previewImage: '/presets/env_interior.svg' },
  { id: 'env_space', category: 'environment', labelZh: '太空宇宙', labelEn: 'Space', promptToken: 'outer space cosmos, stars and nebulae', previewImage: '/presets/env_space.svg' },
  { id: 'env_underwater', category: 'environment', labelZh: '水下世界', labelEn: 'Underwater', promptToken: 'underwater ocean scene, aquatic environment', previewImage: '/presets/env_underwater.svg' },
  { id: 'env_desert', category: 'environment', labelZh: '沙漠荒原', labelEn: 'Desert', promptToken: 'arid desert landscape, sand dunes', previewImage: '/presets/env_desert.svg' },
  { id: 'env_snow', category: 'environment', labelZh: '冰雪极地', labelEn: 'Snow Polar', promptToken: 'snowy polar landscape, ice and frost', previewImage: '/presets/env_snow.svg' },
  { id: 'env_fantasy', category: 'environment', labelZh: '奇幻世界', labelEn: 'Fantasy Realm', promptToken: 'fantasy magical realm, otherworldly landscape', previewImage: '/presets/env_fantasy.svg' },
];

export function getOptionsByCategory(category: DimensionCategory): PresetOption[] {
  return PRESET_OPTIONS.filter(opt => opt.category === category);
}

export function getOptionById(id: string): PresetOption | undefined {
  return PRESET_OPTIONS.find(opt => opt.id === id);
}

export function getAllCategories(): DimensionCategory[] {
  return Object.keys(DIMENSION_META) as DimensionCategory[];
}
