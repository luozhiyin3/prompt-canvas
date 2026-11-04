import { PresetOption, DimensionCategory } from '@/types/prompt';

// 维度元数据
export const DIMENSION_META: Record<DimensionCategory, { labelZh: string; labelEn: string; icon: string }> = {
  shot_type: { labelZh: '景别', labelEn: 'Shot Type', icon: '📐' },
  art_style: { labelZh: '艺术风格', labelEn: 'Art Style', icon: '🎨' },
  lighting: { labelZh: '光影', labelEn: 'Lighting', icon: '💡' },
  color_mood: { labelZh: '色彩氛围', labelEn: 'Color Mood', icon: '🌈' },
  composition: { labelZh: '构图视角', labelEn: 'Composition', icon: '📐' },
  clothing: { labelZh: '服饰', labelEn: 'Clothing', icon: '👔' },
};

// 预置选项数据
export const PRESET_OPTIONS: PresetOption[] = [
  // ==================== 景别 (Shot Type) ====================
  {
    id: 'shot_extreme_wide',
    category: 'shot_type',
    labelZh: '大远景',
    labelEn: 'Extreme Wide Shot',
    promptToken: 'extreme wide shot, vast landscape',
    previewImage: '/presets/shot_extreme_wide.webp',
  },
  {
    id: 'shot_wide',
    category: 'shot_type',
    labelZh: '远景/全景',
    labelEn: 'Wide Shot',
    promptToken: 'wide shot, full environment',
    previewImage: '/presets/shot_wide.webp',
  },
  {
    id: 'shot_full',
    category: 'shot_type',
    labelZh: '全身',
    labelEn: 'Full Body Shot',
    promptToken: 'full body shot',
    previewImage: '/presets/shot_full.webp',
  },
  {
    id: 'shot_medium',
    category: 'shot_type',
    labelZh: '中景',
    labelEn: 'Medium Shot',
    promptToken: 'medium shot, waist up',
    previewImage: '/presets/shot_medium.webp',
  },
  {
    id: 'shot_close_up',
    category: 'shot_type',
    labelZh: '近景/特写',
    labelEn: 'Close-up',
    promptToken: 'close-up shot, detailed face',
    previewImage: '/presets/shot_close_up.webp',
  },
  {
    id: 'shot_extreme_close',
    category: 'shot_type',
    labelZh: '大特写',
    labelEn: 'Extreme Close-up',
    promptToken: 'extreme close-up, macro detail',
    previewImage: '/presets/shot_extreme_close.webp',
  },

  // ==================== 艺术风格 (Art Style) ====================
  {
    id: 'style_photorealistic',
    category: 'art_style',
    labelZh: '写实摄影',
    labelEn: 'Photorealistic',
    promptToken: 'photorealistic, hyperrealistic, photograph',
    previewImage: '/presets/style_photorealistic.webp',
  },
  {
    id: 'style_anime',
    category: 'art_style',
    labelZh: '动漫',
    labelEn: 'Anime',
    promptToken: 'anime style, manga art',
    previewImage: '/presets/style_anime.webp',
  },
  {
    id: 'style_oil_painting',
    category: 'art_style',
    labelZh: '油画',
    labelEn: 'Oil Painting',
    promptToken: 'oil painting, classical art style',
    previewImage: '/presets/style_oil_painting.webp',
  },
  {
    id: 'style_watercolor',
    category: 'art_style',
    labelZh: '水彩',
    labelEn: 'Watercolor',
    promptToken: 'watercolor painting, soft wash',
    previewImage: '/presets/style_watercolor.webp',
  },
  {
    id: 'style_cyberpunk',
    category: 'art_style',
    labelZh: '赛博朋克',
    labelEn: 'Cyberpunk',
    promptToken: 'cyberpunk style, futuristic',
    previewImage: '/presets/style_cyberpunk.webp',
  },
  {
    id: 'style_fantasy',
    category: 'art_style',
    labelZh: '奇幻',
    labelEn: 'Fantasy',
    promptToken: 'fantasy art, magical atmosphere',
    previewImage: '/presets/style_fantasy.webp',
  },
  {
    id: 'style_minimalist',
    category: 'art_style',
    labelZh: '极简主义',
    labelEn: 'Minimalist',
    promptToken: 'minimalist style, clean simple',
    previewImage: '/presets/style_minimalist.webp',
  },
  {
    id: 'style_pop_art',
    category: 'art_style',
    labelZh: '波普艺术',
    labelEn: 'Pop Art',
    promptToken: 'pop art style, bold colors',
    previewImage: '/presets/style_pop_art.webp',
  },

  // ==================== 光影 (Lighting) ====================
  {
    id: 'light_natural',
    category: 'lighting',
    labelZh: '自然光',
    labelEn: 'Natural Light',
    promptToken: 'natural lighting, soft daylight',
    previewImage: '/presets/light_natural.webp',
  },
  {
    id: 'light_golden_hour',
    category: 'lighting',
    labelZh: '黄金时刻',
    labelEn: 'Golden Hour',
    promptToken: 'golden hour lighting, warm sunset',
    previewImage: '/presets/light_golden_hour.webp',
  },
  {
    id: 'light_blue_hour',
    category: 'lighting',
    labelZh: '蓝调时刻',
    labelEn: 'Blue Hour',
    promptToken: 'blue hour, twilight ambiance',
    previewImage: '/presets/light_blue_hour.webp',
  },
  {
    id: 'light_studio',
    category: 'lighting',
    labelZh: '棚拍光',
    labelEn: 'Studio Lighting',
    promptToken: 'professional studio lighting',
    previewImage: '/presets/light_studio.webp',
  },
  {
    id: 'light_rim',
    category: 'lighting',
    labelZh: '轮廓光',
    labelEn: 'Rim Light',
    promptToken: 'rim lighting, backlit silhouette',
    previewImage: '/presets/light_rim.webp',
  },
  {
    id: 'light_dramatic',
    category: 'lighting',
    labelZh: '戏剧光',
    labelEn: 'Dramatic Lighting',
    promptToken: 'dramatic chiaroscuro lighting',
    previewImage: '/presets/light_dramatic.webp',
  },
  {
    id: 'light_neon',
    category: 'lighting',
    labelZh: '霓虹光',
    labelEn: 'Neon Light',
    promptToken: 'neon lighting, colorful glow',
    previewImage: '/presets/light_neon.webp',
  },
  {
    id: 'light_rembrandt',
    category: 'lighting',
    labelZh: '伦勃朗光',
    labelEn: 'Rembrandt Lighting',
    promptToken: 'Rembrandt lighting, classical portrait',
    previewImage: '/presets/light_rembrandt.webp',
  },

  // ==================== 色彩氛围 (Color Mood) ====================
  {
    id: 'color_vibrant',
    category: 'color_mood',
    labelZh: '鲜艳',
    labelEn: 'Vibrant',
    promptToken: 'vibrant colors, saturated palette',
    previewImage: '/presets/color_vibrant.webp',
  },
  {
    id: 'color_muted',
    category: 'color_mood',
    labelZh: '柔和',
    labelEn: 'Muted',
    promptToken: 'muted tones, soft pastel colors',
    previewImage: '/presets/color_muted.webp',
  },
  {
    id: 'color_monochrome',
    category: 'color_mood',
    labelZh: '黑白',
    labelEn: 'Monochrome',
    promptToken: 'monochrome, black and white',
    previewImage: '/presets/color_monochrome.webp',
  },
  {
    id: 'color_warm',
    category: 'color_mood',
    labelZh: '暖色调',
    labelEn: 'Warm Tones',
    promptToken: 'warm color palette, orange red tones',
    previewImage: '/presets/color_warm.webp',
  },
  {
    id: 'color_cool',
    category: 'color_mood',
    labelZh: '冷色调',
    labelEn: 'Cool Tones',
    promptToken: 'cool color palette, blue cyan tones',
    previewImage: '/presets/color_cool.webp',
  },
  {
    id: 'color_cyberpunk',
    category: 'color_mood',
    labelZh: '赛博配色',
    labelEn: 'Cyberpunk Colors',
    promptToken: 'cyberpunk color scheme, neon pink and cyan',
    previewImage: '/presets/color_cyberpunk.webp',
  },
  {
    id: 'color_earth',
    category: 'color_mood',
    labelZh: '大地色',
    labelEn: 'Earth Tones',
    promptToken: 'earth tones, natural brown green',
    previewImage: '/presets/color_earth.webp',
  },
  {
    id: 'color_high_contrast',
    category: 'color_mood',
    labelZh: '高对比',
    labelEn: 'High Contrast',
    promptToken: 'high contrast, bold color differences',
    previewImage: '/presets/color_high_contrast.webp',
  },

  // ==================== 构图视角 (Composition) ====================
  {
    id: 'comp_rule_thirds',
    category: 'composition',
    labelZh: '三分法',
    labelEn: 'Rule of Thirds',
    promptToken: 'rule of thirds composition',
    previewImage: '/presets/comp_rule_thirds.webp',
  },
  {
    id: 'comp_centered',
    category: 'composition',
    labelZh: '居中对称',
    labelEn: 'Centered Symmetry',
    promptToken: 'centered composition, symmetrical',
    previewImage: '/presets/comp_centered.webp',
  },
  {
    id: 'comp_top_down',
    category: 'composition',
    labelZh: '俯拍/鸟瞰',
    labelEn: 'Top-down / Bird\'s Eye',
    promptToken: 'top-down view, bird\'s eye view',
    previewImage: '/presets/comp_top_down.webp',
  },
  {
    id: 'comp_low_angle',
    category: 'composition',
    labelZh: '仰拍',
    labelEn: 'Low Angle',
    promptToken: 'low angle shot, looking up',
    previewImage: '/presets/comp_low_angle.webp',
  },
  {
    id: 'comp_dutch_angle',
    category: 'composition',
    labelZh: '倾斜构图',
    labelEn: 'Dutch Angle',
    promptToken: 'dutch angle, tilted frame',
    previewImage: '/presets/comp_dutch_angle.webp',
  },
  {
    id: 'comp_over_shoulder',
    category: 'composition',
    labelZh: '过肩视角',
    labelEn: 'Over the Shoulder',
    promptToken: 'over the shoulder perspective',
    previewImage: '/presets/comp_over_shoulder.webp',
  },
  {
    id: 'comp_pov',
    category: 'composition',
    labelZh: '第一人称',
    labelEn: 'POV / First Person',
    promptToken: 'POV, first person perspective',
    previewImage: '/presets/comp_pov.webp',
  },
  {
    id: 'comp_diagonal',
    category: 'composition',
    labelZh: '对角线',
    labelEn: 'Diagonal',
    promptToken: 'diagonal composition, dynamic lines',
    previewImage: '/presets/comp_diagonal.webp',
  },

  // ==================== 服饰 (Clothing) ====================
  {
    id: 'cloth_jacket',
    category: 'clothing',
    labelZh: '夹克',
    labelEn: 'Jacket',
    promptToken: 'wearing jacket',
    previewImage: '/presets/cloth_jacket.webp',
  },
  {
    id: 'cloth_hoodie',
    category: 'clothing',
    labelZh: '卫衣',
    labelEn: 'Hoodie',
    promptToken: 'wearing hoodie',
    previewImage: '/presets/cloth_hoodie.webp',
  },
  {
    id: 'cloth_suit',
    category: 'clothing',
    labelZh: '西装',
    labelEn: 'Suit',
    promptToken: 'wearing formal suit',
    previewImage: '/presets/cloth_suit.webp',
  },
  {
    id: 'cloth_dress',
    category: 'clothing',
    labelZh: '连衣裙',
    labelEn: 'Dress',
    promptToken: 'wearing dress',
    previewImage: '/presets/cloth_dress.webp',
  },
  {
    id: 'cloth_tshirt',
    category: 'clothing',
    labelZh: 'T恤',
    labelEn: 'T-shirt',
    promptToken: 'wearing t-shirt',
    previewImage: '/presets/cloth_tshirt.webp',
  },
  {
    id: 'cloth_coat',
    category: 'clothing',
    labelZh: '大衣',
    labelEn: 'Coat',
    promptToken: 'wearing long coat',
    previewImage: '/presets/cloth_coat.webp',
  },
  {
    id: 'cloth_armor',
    category: 'clothing',
    labelZh: '盔甲',
    labelEn: 'Armor',
    promptToken: 'wearing armor, medieval',
    previewImage: '/presets/cloth_armor.webp',
  },
  {
    id: 'cloth_traditional',
    category: 'clothing',
    labelZh: '传统服饰',
    labelEn: 'Traditional',
    promptToken: 'wearing traditional costume',
    previewImage: '/presets/cloth_traditional.webp',
  },
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
