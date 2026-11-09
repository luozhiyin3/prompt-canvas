/**
 * 生成 200 组 AI 绘画提示词数据集
 * 包含维度标注和 SVG 占位图
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 绘画技法要素维度分类（12 个维度）
const DIMENSIONS = {
  shot_type: {
    labelZh: '景别视角',
    labelEn: 'Shot Type',
    options: [
      { id: 'shot_extreme_close_up', labelZh: '特写/局部', labelEn: 'Extreme Close-Up', token: 'extreme close-up shot, intricate details' },
      { id: 'shot_close_up', labelZh: '近景肖像', labelEn: 'Close-Up', token: 'close-up portrait, shallow depth of field' },
      { id: 'shot_medium', labelZh: '半身/中景', labelEn: 'Medium Shot', token: 'medium shot, waist-up composition' },
      { id: 'shot_full_body', labelZh: '全身像', labelEn: 'Full Body', token: 'full body shot, complete figure view' },
      { id: 'shot_wide', labelZh: '广角全景', labelEn: 'Wide Shot', token: 'wide-angle panoramic view, expansive background' },
      { id: 'shot_low_angle', labelZh: '仰视视角', labelEn: 'Low Angle', token: 'dramatic low-angle shot, heroic perspective' },
      { id: 'shot_top_down', labelZh: '俯视/顶视', labelEn: 'Top-Down', token: 'overhead bird-eye view, top-down angle' },
      { id: 'shot_macro', labelZh: '微距细节', labelEn: 'Macro Shot', token: 'macro lens photography, hyper-focus texture' },
    ]
  },
  art_style: {
    labelZh: '艺术风格',
    labelEn: 'Art Style',
    options: [
      { id: 'style_cyberpunk', labelZh: '赛博朋克', labelEn: 'Cyberpunk', token: 'cyberpunk aesthetics, futuristic neon-lit city' },
      { id: 'style_oil_painting', labelZh: '古典油画', labelEn: 'Oil Painting', token: 'classical oil painting style, visible textured brushstrokes' },
      { id: 'style_anime', labelZh: '日系插画', labelEn: 'Anime', token: 'Japanese anime aesthetic, vibrant colors, crisp lineart' },
      { id: 'style_photorealism', labelZh: '写实摄影', labelEn: 'Photorealistic', token: 'hyperrealistic 35mm film photograph, RAW photo' },
      { id: 'style_watercolor', labelZh: '水彩手绘', labelEn: 'Watercolor', token: 'loose watercolor wash, bleeding pigment edges' },
      { id: 'style_ink_wash', labelZh: '新中式水墨', labelEn: 'Ink Wash', token: 'traditional Chinese ink wash style, sumi-e minimalist' },
      { id: 'style_synthwave', labelZh: '复古未来', labelEn: 'Synthwave', token: '80s retro synthwave, chrome grid, magenta and cyan' },
      { id: 'style_claymation', labelZh: '定格黏土', labelEn: 'Claymation', token: '3D claymation plasticine texture, stop-motion model' },
    ]
  },
  lighting: {
    labelZh: '光影渲染',
    labelEn: 'Lighting',
    options: [
      { id: 'light_rim', labelZh: '轮廓逆光', labelEn: 'Rim Lighting', token: 'crisp rim lighting, luminous silhouette glow' },
      { id: 'light_golden_hour', labelZh: '黄金时刻', labelEn: 'Golden Hour', token: 'golden hour sunset rays, warm haze' },
      { id: 'light_volumetric', labelZh: '丁达尔光', labelEn: 'Tyndall Rays', token: 'volumetric light rays breaking through clouds' },
      { id: 'light_rembrandt', labelZh: '伦勃朗光', labelEn: 'Rembrandt Light', token: 'classic Rembrandt lighting, triangle shadow on cheek' },
      { id: 'light_neon', labelZh: '霓虹暗调', labelEn: 'Neon Glow', token: 'bi-color neon reflections, blue and purple dark studio' },
      { id: 'light_soft', labelZh: '影视柔光', labelEn: 'Soft Diffused', token: 'softbox studio diffusion, smooth neutral shadows' },
      { id: 'light_hard', labelZh: '顶光硬影', labelEn: 'Harsh Midday', token: 'harsh direct sunlight, sharp distinct shadows' },
      { id: 'light_bio', labelZh: '生物荧光', labelEn: 'Bioluminescent', token: 'ambient bioluminescent blue and teal glow' },
    ]
  },
  color_mood: {
    labelZh: '色彩色调',
    labelEn: 'Color Mood',
    options: [
      { id: 'color_monochrome', labelZh: '黑白单色', labelEn: 'Monochrome', token: 'noir monochrome black and white, deep tonal contrast' },
      { id: 'color_vibrant', labelZh: '高饱和多色', labelEn: 'Vibrant Palette', token: 'vivid saturated color palette, dynamic joyful tones' },
      { id: 'color_morandi', labelZh: '莫兰迪低保和', labelEn: 'Muted Earthy', token: 'muted earthy tones, low contrast Morandi color scheme' },
      { id: 'color_teal_orange', labelZh: '青橙撞色', labelEn: 'Teal & Orange', token: 'cinematic teal and orange color grading' },
      { id: 'color_pastel', labelZh: '马卡龙粉彩', labelEn: 'Pastel Dream', token: 'soft pastel hues, powdery pink, mint, pale lavender' },
      { id: 'color_dark_fantasy', labelZh: '暗黑奇幻', labelEn: 'Dark Fantasy', token: 'dark gothic color palette, deep purples and blacks' },
      { id: 'color_golden', labelZh: '金色暖调', labelEn: 'Golden Warm', token: 'rich golden amber tones, warm candlelight glow' },
      { id: 'color_frost', labelZh: '极地冷调', labelEn: 'Polar Frost', token: 'icy blue and white frost tones, cold winter palette' },
    ]
  },
  composition: {
    labelZh: '构图法则',
    labelEn: 'Composition',
    options: [
      { id: 'comp_thirds', labelZh: '三分法则', labelEn: 'Rule of Thirds', token: 'rule of thirds composition, balanced asymmetry' },
      { id: 'comp_centered', labelZh: '中心对称', labelEn: 'Center Symmetry', token: 'centered symmetrical composition, mirror balance' },
      { id: 'comp_leading', labelZh: '引导线透视', labelEn: 'Leading Lines', token: 'strong leading lines converging toward the subject' },
      { id: 'comp_dutch', labelZh: '荷兰倾斜角', labelEn: 'Dutch Angle', token: 'dutch angle tilted composition, dynamic unease' },
      { id: 'comp_golden', labelZh: '黄金螺旋', labelEn: 'Golden Spiral', token: 'golden ratio spiral composition, fibonacci sequence' },
      { id: 'comp_framed', labelZh: '画中画框架', labelEn: 'Framed', token: 'natural frame within frame composition, depth layers' },
      { id: 'comp_minimal', labelZh: '留白极简', labelEn: 'Minimalist', token: 'minimalist negative space, clean simple composition' },
      { id: 'comp_iso', labelZh: '等轴测视角', labelEn: 'Isometric', token: 'isometric 3D perspective, equal axis angles' },
    ]
  },
  clothing: {
    labelZh: '服饰装扮',
    labelEn: 'Clothing',
    options: [
      { id: 'cloth_techwear', labelZh: '机能风', labelEn: 'Techwear', token: 'futuristic techwear clothing, utility straps and buckles' },
      { id: 'cloth_haute', labelZh: '高级定制', labelEn: 'Haute Couture', token: 'haute couture fashion, elegant flowing fabric' },
      { id: 'cloth_hanfu', labelZh: '汉服', labelEn: 'Hanfu', token: 'traditional Chinese hanfu, flowing silk robes' },
      { id: 'cloth_cyber', labelZh: '赛博装甲', labelEn: 'Cyber Armor', token: 'cyberpunk mechanical armor, glowing circuit patterns' },
      { id: 'cloth_vintage', labelZh: '复古粗花呢', labelEn: 'Vintage Tweed', token: 'vintage tweed suit, classic British style' },
      { id: 'cloth_street', labelZh: '街头潮流', labelEn: 'Streetwear', token: 'urban streetwear fashion, oversized hoodie and sneakers' },
      { id: 'cloth_space', labelZh: '宇航服', labelEn: 'Spacesuit', token: 'futuristic spacesuit, sleek white and silver design' },
      { id: 'cloth_boho', labelZh: '波西米亚', labelEn: 'Bohemian', token: 'bohemian flowing dress, ethnic patterns and fringe' },
    ]
  },
  mood: {
    labelZh: '情绪氛围',
    labelEn: 'Mood',
    options: [
      { id: 'mood_mysterious', labelZh: '神秘悬疑', labelEn: 'Mysterious', token: 'mysterious atmospheric mood, fog and shadows' },
      { id: 'mood_serene', labelZh: '宁静祥和', labelEn: 'Serene', token: 'serene peaceful atmosphere, calm tranquil mood' },
      { id: 'mood_dramatic', labelZh: '戏剧张力', labelEn: 'Dramatic', token: 'dramatic intense mood, high contrast tension' },
      { id: 'mood_romantic', labelZh: '浪漫唯美', labelEn: 'Romantic', token: 'romantic dreamy atmosphere, soft ethereal glow' },
      { id: 'mood_melancholy', labelZh: '忧郁伤感', labelEn: 'Melancholy', token: 'melancholy somber mood, rain and grey tones' },
      { id: 'mood_epic', labelZh: '史诗宏大', labelEn: 'Epic', token: 'epic grandiose scale, majestic awe-inspiring' },
      { id: 'mood_whimsical', labelZh: '奇幻童趣', labelEn: 'Whimsical', token: 'whimsical playful mood, magical fairy tale' },
      { id: 'mood_horror', labelZh: '恐怖惊悚', labelEn: 'Horror', token: 'horror eerie atmosphere, unsettling dread' },
    ]
  },
  technique: {
    labelZh: '笔触技法',
    labelEn: 'Technique',
    options: [
      { id: 'tech_impasto', labelZh: '厚涂堆叠', labelEn: 'Impasto', token: 'thick impasto brushstrokes, heavy paint texture' },
      { id: 'tech_glazing', labelZh: '透明罩染', labelEn: 'Glazing', token: 'transparent glazing layers, luminous depth' },
      { id: 'tech_stippling', labelZh: '点彩技法', labelEn: 'Stippling', token: 'pointillism stippling technique, tiny colored dots' },
      { id: 'tech_wet', labelZh: '湿画法', labelEn: 'Wet-on-Wet', token: 'wet-on-wet watercolor technique, soft bleeding edges' },
      { id: 'tech_dry', labelZh: '干笔皴擦', labelEn: 'Dry Brush', token: 'dry brush technique, scratchy textured strokes' },
      { id: 'tech_sgraffito', labelZh: '刮刻技法', labelEn: 'Sgraffito', token: 'sgraffito scratching technique, carved lines' },
      { id: 'tech_blending', labelZh: '晕染渐变', labelEn: 'Blending', token: 'smooth color blending, seamless gradients' },
      { id: 'tech_palette', labelZh: '调色刀', labelEn: 'Palette Knife', token: 'palette knife application, bold textured marks' },
    ]
  },
  perspective: {
    labelZh: '透视关系',
    labelEn: 'Perspective',
    options: [
      { id: 'persp_1point', labelZh: '一点透视', labelEn: '1-Point Perspective', token: 'one-point perspective, single vanishing point' },
      { id: 'persp_2point', labelZh: '两点透视', labelEn: '2-Point Perspective', token: 'two-point perspective, corner view depth' },
      { id: 'persp_3point', labelZh: '三点透视', labelEn: '3-Point Perspective', token: 'three-point perspective, dramatic height' },
      { id: 'persp_fisheye', labelZh: '鱼眼透视', labelEn: 'Fisheye', token: 'fisheye lens distortion, curved spherical view' },
      { id: 'persp_orthographic', labelZh: '正交投影', labelEn: 'Orthographic', token: 'orthographic projection, no perspective distortion' },
      { id: 'persp_forced', labelZh: '强迫透视', labelEn: 'Forced Perspective', token: 'forced perspective illusion, size manipulation' },
      { id: 'persp_atmospheric', labelZh: '空气透视', labelEn: 'Atmospheric', token: 'atmospheric perspective, depth through haze' },
      { id: 'persp_reverse', labelZh: '反向透视', labelEn: 'Reverse Perspective', token: 'reverse perspective, Byzantine style divergence' },
    ]
  },
  texture: {
    labelZh: '材质质感',
    labelEn: 'Texture',
    options: [
      { id: 'tex_metal', labelZh: '金属质感', labelEn: 'Metallic', token: 'polished metallic surface, chrome reflections' },
      { id: 'tex_wood', labelZh: '木质纹理', labelEn: 'Wood Grain', token: 'natural wood grain texture, organic warmth' },
      { id: 'tex_stone', labelZh: '石材肌理', labelEn: 'Stone', token: 'rough stone texture, weathered surface' },
      { id: 'tex_fabric', labelZh: '织物纤维', labelEn: 'Fabric', token: 'woven fabric texture, thread detail' },
      { id: 'tex_glass', labelZh: '玻璃透明', labelEn: 'Glass', token: 'transparent glass material, refraction and reflection' },
      { id: 'tex_organic', labelZh: '有机生物', labelEn: 'Organic', token: 'organic biological texture, living surface' },
      { id: 'tex_crystal', labelZh: '水晶折射', labelEn: 'Crystal', token: 'crystalline structure, prismatic light refraction' },
      { id: 'tex_rust', labelZh: '锈蚀斑驳', labelEn: 'Rusted', token: 'rusted corroded metal, aged patina' },
    ]
  },
  subject: {
    labelZh: '主体类型',
    labelEn: 'Subject',
    options: [
      { id: 'subj_portrait', labelZh: '人物肖像', labelEn: 'Portrait', token: 'human portrait, detailed facial features' },
      { id: 'subj_landscape', labelZh: '自然风光', labelEn: 'Landscape', token: 'natural landscape scenery, mountains and sky' },
      { id: 'subj_architecture', labelZh: '建筑空间', labelEn: 'Architecture', token: 'architectural structure, building design' },
      { id: 'subj_creature', labelZh: '生物怪兽', labelEn: 'Creature', token: 'fantasy creature, mythical beast design' },
      { id: 'subj_vehicle', labelZh: '载具机械', labelEn: 'Vehicle', token: 'mechanical vehicle, futuristic transportation' },
      { id: 'subj_food', labelZh: '美食静物', labelEn: 'Food Still Life', token: 'food still life, culinary presentation' },
      { id: 'subj_abstract', labelZh: '抽象概念', labelEn: 'Abstract', token: 'abstract conceptual art, non-representational' },
      { id: 'subj_surreal', labelZh: '超现实', labelEn: 'Surreal', token: 'surreal dreamlike imagery, impossible scenes' },
    ]
  },
  environment: {
    labelZh: '环境场景',
    labelEn: 'Environment',
    options: [
      { id: 'env_urban', labelZh: '都市街景', labelEn: 'Urban City', token: 'urban cityscape, bustling metropolitan street' },
      { id: 'env_nature', labelZh: '自然野外', labelEn: 'Wilderness', token: 'wilderness nature scene, forest and mountains' },
      { id: 'env_interior', labelZh: '室内空间', labelEn: 'Interior', token: 'interior room design, architectural space' },
      { id: 'env_space', labelZh: '太空宇宙', labelEn: 'Space', token: 'outer space cosmos, stars and nebulae' },
      { id: 'env_underwater', labelZh: '水下世界', labelEn: 'Underwater', token: 'underwater ocean scene, aquatic environment' },
      { id: 'env_desert', labelZh: '沙漠荒原', labelEn: 'Desert', token: 'arid desert landscape, sand dunes' },
      { id: 'env_snow', labelZh: '冰雪极地', labelEn: 'Snow Polar', token: 'snowy polar landscape, ice and frost' },
      { id: 'env_fantasy', labelZh: '奇幻世界', labelEn: 'Fantasy Realm', token: 'fantasy magical realm, otherworldly landscape' },
    ]
  }
};

// 200 组提示词数据集
const DATASET = [
  // 人物肖像类 (1-40)
  { id: 1, prompt: '雨夜霓虹街头奔跑的机械少女', promptEn: 'cyberpunk girl running in neon-lit rain street', dimensions: { shot_type: 'shot_medium', art_style: 'style_cyberpunk', lighting: 'light_neon', color_mood: 'color_teal_orange', mood: 'mood_dramatic', environment: 'env_urban' } },
  { id: 2, prompt: '晨光中阅读的老者', promptEn: 'elderly person reading in morning light', dimensions: { shot_type: 'shot_close_up', lighting: 'light_golden_hour', mood: 'mood_serene', subject: 'subj_portrait' } },
  { id: 3, prompt: '赛博格战士的机械手臂特写', promptEn: 'close-up of cyborg warrior mechanical arm', dimensions: { shot_type: 'shot_extreme_close_up', art_style: 'style_cyberpunk', texture: 'tex_metal', subject: 'subj_portrait' } },
  { id: 4, prompt: '水墨风格的山水间隐士', promptEn: 'hermit in ink wash mountain landscape', dimensions: { art_style: 'style_ink_wash', environment: 'env_nature', mood: 'mood_serene' } },
  { id: 5, prompt: '油画质感的维多利亚时代贵妇', promptEn: 'Victorian lady in oil painting texture', dimensions: { art_style: 'style_oil_painting', technique: 'tech_impasto', clothing: 'cloth_haute' } },
  { id: 6, prompt: '动漫风格的魔法少女变身瞬间', promptEn: 'anime magical girl transformation moment', dimensions: { art_style: 'style_anime', mood: 'mood_whimsical', lighting: 'light_volumetric' } },
  { id: 7, prompt: '写实摄影风格的街头摄影师', promptEn: 'street photographer in photorealistic style', dimensions: { art_style: 'style_photorealism', shot_type: 'shot_medium', environment: 'env_urban' } },
  { id: 8, prompt: '水彩手绘的雨中撑伞女子', promptEn: 'woman with umbrella in rain, watercolor style', dimensions: { art_style: 'style_watercolor', mood: 'mood_melancholy', lighting: 'light_soft' } },
  { id: 9, prompt: '黏土动画风格的厨师角色', promptEn: 'claymation style chef character', dimensions: { art_style: 'style_claymation', subject: 'subj_portrait', mood: 'mood_whimsical' } },
  { id: 10, prompt: '复古未来主义风格的太空飞行员', promptEn: 'retro-futuristic space pilot', dimensions: { art_style: 'style_synthwave', clothing: 'cloth_space', environment: 'env_space' } },
  { id: 11, prompt: '伦勃朗光下的思想家肖像', promptEn: 'thinker portrait with Rembrandt lighting', dimensions: { lighting: 'light_rembrandt', shot_type: 'shot_close_up', mood: 'mood_dramatic' } },
  { id: 12, prompt: '生物荧光森林中的精灵', promptEn: 'elf in bioluminescent forest', dimensions: { lighting: 'light_bio', environment: 'env_fantasy', mood: 'mood_mysterious' } },
  { id: 13, prompt: '莫兰迪色调的室内静坐女子', promptEn: 'woman sitting indoors in Morandi tones', dimensions: { color_mood: 'color_morandi', environment: 'env_interior', mood: 'mood_serene' } },
  { id: 14, prompt: '青橙撞色的电影感侦探', promptEn: 'cinematic detective in teal and orange', dimensions: { color_mood: 'color_teal_orange', mood: 'mood_mysterious', lighting: 'light_hard' } },
  { id: 15, prompt: '马卡龙粉彩的甜品师', promptEn: 'pastry chef in pastel colors', dimensions: { color_mood: 'color_pastel', mood: 'mood_whimsical', subject: 'subj_portrait' } },
  { id: 16, prompt: '暗黑奇幻风格的巫师', promptEn: 'dark fantasy wizard', dimensions: { color_mood: 'color_dark_fantasy', mood: 'mood_mysterious', art_style: 'style_oil_painting' } },
  { id: 17, prompt: '金色暖调的烛光晚餐情侣', promptEn: 'couple at candlelight dinner in golden tones', dimensions: { color_mood: 'color_golden', lighting: 'light_golden_hour', mood: 'mood_romantic' } },
  { id: 18, prompt: '极地冷调的探险家', promptEn: 'explorer in polar frost tones', dimensions: { color_mood: 'color_frost', environment: 'env_snow', mood: 'mood_dramatic' } },
  { id: 19, prompt: '三分法则构图的奔跑者', promptEn: 'runner with rule of thirds composition', dimensions: { composition: 'comp_thirds', shot_type: 'shot_full_body', mood: 'mood_epic' } },
  { id: 20, prompt: '中心对称的冥想者', promptEn: 'meditating person in centered symmetry', dimensions: { composition: 'comp_centered', mood: 'mood_serene', shot_type: 'shot_medium' } },
  { id: 21, prompt: '引导线透视的长廊行人', promptEn: 'pedestrian in corridor with leading lines', dimensions: { composition: 'comp_leading', perspective: 'persp_1point', environment: 'env_interior' } },
  { id: 22, prompt: '荷兰倾斜角的滑板少年', promptEn: 'skateboarder in Dutch angle', dimensions: { composition: 'comp_dutch', mood: 'mood_dramatic', shot_type: 'shot_medium' } },
  { id: 23, prompt: '黄金螺旋的舞者', promptEn: 'dancer in golden spiral composition', dimensions: { composition: 'comp_golden', shot_type: 'shot_full_body', mood: 'mood_romantic' } },
  { id: 24, prompt: '画中画框架的窗边女子', promptEn: 'woman by window in framed composition', dimensions: { composition: 'comp_framed', mood: 'mood_melancholy', lighting: 'light_soft' } },
  { id: 25, prompt: '留白极简的茶道师', promptEn: 'tea master in minimalist composition', dimensions: { composition: 'comp_minimal', art_style: 'style_ink_wash', mood: 'mood_serene' } },
  { id: 26, prompt: '等轴测视角的游戏角色', promptEn: 'game character in isometric view', dimensions: { composition: 'comp_iso', art_style: 'style_anime', perspective: 'persp_orthographic' } },
  { id: 27, prompt: '机能风装扮的都市忍者', promptEn: 'urban ninja in techwear', dimensions: { clothing: 'cloth_techwear', environment: 'env_urban', mood: 'mood_mysterious' } },
  { id: 28, prompt: '高级定制礼服的晚宴嘉宾', promptEn: 'banquet guest in haute couture', dimensions: { clothing: 'cloth_haute', mood: 'mood_romantic', lighting: 'light_soft' } },
  { id: 29, prompt: '汉服飘逸的古风侠客', promptEn: 'wandering swordsman in hanfu', dimensions: { clothing: 'cloth_hanfu', art_style: 'style_ink_wash', mood: 'mood_epic' } },
  { id: 30, prompt: '赛博装甲的未来战士', promptEn: 'future warrior in cyber armor', dimensions: { clothing: 'cloth_cyber', art_style: 'style_cyberpunk', texture: 'tex_metal' } },
  { id: 31, prompt: '复古粗花呢的英伦绅士', promptEn: 'British gentleman in vintage tweed', dimensions: { clothing: 'cloth_vintage', mood: 'mood_serene', lighting: 'light_golden_hour' } },
  { id: 32, prompt: '街头潮流的涂鸦艺术家', promptEn: 'graffiti artist in streetwear', dimensions: { clothing: 'cloth_street', environment: 'env_urban', mood: 'mood_dramatic' } },
  { id: 33, prompt: '宇航服太空行走的航天员', promptEn: 'astronaut spacewalking in spacesuit', dimensions: { clothing: 'cloth_space', environment: 'env_space', mood: 'mood_epic' } },
  { id: 34, prompt: '波西米亚长裙的流浪歌手', promptEn: 'wandering singer in bohemian dress', dimensions: { clothing: 'cloth_boho', mood: 'mood_romantic', lighting: 'light_golden_hour' } },
  { id: 35, prompt: '厚涂堆叠技法的肖像画', promptEn: 'portrait with impasto technique', dimensions: { technique: 'tech_impasto', art_style: 'style_oil_painting', shot_type: 'shot_close_up' } },
  { id: 36, prompt: '透明罩染的古典圣母像', promptEn: 'classical madonna with glazing technique', dimensions: { technique: 'tech_glazing', art_style: 'style_oil_painting', mood: 'mood_serene' } },
  { id: 37, prompt: '点彩技法的花园少女', promptEn: 'garden girl in pointillism style', dimensions: { technique: 'tech_stippling', art_style: 'style_oil_painting', environment: 'env_nature' } },
  { id: 38, prompt: '湿画法的雨中风景', promptEn: 'rainy landscape with wet-on-wet technique', dimensions: { technique: 'tech_wet', art_style: 'style_watercolor', mood: 'mood_melancholy' } },
  { id: 39, prompt: '干笔皴擦的沙漠旅人', promptEn: 'desert traveler with dry brush technique', dimensions: { technique: 'tech_dry', environment: 'env_desert', mood: 'mood_epic' } },
  { id: 40, prompt: '刮刻技法的版画风格肖像', promptEn: 'portrait in sgraffito print style', dimensions: { technique: 'tech_sgraffito', art_style: 'style_oil_painting', shot_type: 'shot_close_up' } },

  // 自然风光类 (41-80)
  { id: 41, prompt: '日出时分的雪山金顶', promptEn: 'golden sunrise on snow mountain peak', dimensions: { environment: 'env_snow', lighting: 'light_golden_hour', color_mood: 'color_golden', mood: 'mood_epic' } },
  { id: 42, prompt: '雾气弥漫的原始森林', promptEn: 'misty primeval forest', dimensions: { environment: 'env_nature', mood: 'mood_mysterious', lighting: 'light_volumetric' } },
  { id: 43, prompt: '暴风雨中的灯塔', promptEn: 'lighthouse in storm', dimensions: { environment: 'env_nature', mood: 'mood_dramatic', lighting: 'light_hard' } },
  { id: 44, prompt: '极光下的冰原', promptEn: 'ice field under aurora', dimensions: { environment: 'env_snow', color_mood: 'color_frost', mood: 'mood_mysterious' } },
  { id: 45, prompt: '热带雨林的瀑布', promptEn: 'tropical rainforest waterfall', dimensions: { environment: 'env_nature', mood: 'mood_serene', lighting: 'light_volumetric' } },
  { id: 46, prompt: '沙漠中的绿洲', promptEn: 'oasis in desert', dimensions: { environment: 'env_desert', mood: 'mood_serene', color_mood: 'color_golden' } },
  { id: 47, prompt: '火山喷发的壮观场景', promptEn: 'spectacular volcanic eruption', dimensions: { environment: 'env_nature', mood: 'mood_epic', color_mood: 'color_vibrant' } },
  { id: 48, prompt: '海底珊瑚礁生态系统', promptEn: 'underwater coral reef ecosystem', dimensions: { environment: 'env_underwater', color_mood: 'color_vibrant', mood: 'mood_serene' } },
  { id: 49, prompt: '星空下的草原', promptEn: 'grassland under starry sky', dimensions: { environment: 'env_nature', mood: 'mood_serene', lighting: 'light_bio' } },
  { id: 50, prompt: '峡谷中的河流', promptEn: 'river in canyon', dimensions: { environment: 'env_nature', perspective: 'persp_1point', mood: 'mood_epic' } },
  { id: 51, prompt: '樱花盛开的庭院', promptEn: 'cherry blossom courtyard', dimensions: { environment: 'env_nature', color_mood: 'color_pastel', mood: 'mood_romantic' } },
  { id: 52, prompt: '秋日红叶的山路', promptEn: 'mountain path in autumn foliage', dimensions: { environment: 'env_nature', color_mood: 'color_golden', mood: 'mood_melancholy' } },
  { id: 53, prompt: '冰川裂缝的蓝色深渊', promptEn: 'blue abyss of glacier crevasse', dimensions: { environment: 'env_snow', color_mood: 'color_frost', texture: 'tex_crystal' } },
  { id: 54, prompt: '热带海滩的日落', promptEn: 'tropical beach sunset', dimensions: { environment: 'env_nature', lighting: 'light_golden_hour', mood: 'mood_romantic' } },
  { id: 55, prompt: '雪山脚下的湖泊倒影', promptEn: 'lake reflection at mountain foot', dimensions: { environment: 'env_snow', composition: 'comp_centered', mood: 'mood_serene' } },
  { id: 56, prompt: '竹林深处的禅意小径', promptEn: 'zen path in bamboo forest', dimensions: { environment: 'env_nature', art_style: 'style_ink_wash', mood: 'mood_serene' } },
  { id: 57, prompt: '薰衣草花田的紫色海洋', promptEn: 'purple ocean of lavender field', dimensions: { environment: 'env_nature', color_mood: 'color_pastel', mood: 'mood_romantic' } },
  { id: 58, prompt: '极光舞动的夜空', promptEn: 'aurora dancing night sky', dimensions: { environment: 'env_space', color_mood: 'color_vibrant', mood: 'mood_mysterious' } },
  { id: 59, prompt: '雨林中的热带鸟类', promptEn: 'tropical birds in rainforest', dimensions: { environment: 'env_nature', color_mood: 'color_vibrant', subject: 'subj_creature' } },
  { id: 60, prompt: '冬季雾凇的树枝', promptEn: 'winter fog on tree branches', dimensions: { environment: 'env_snow', texture: 'tex_crystal', mood: 'mood_serene' } },
  { id: 61, prompt: '洞穴中的钟乳石', promptEn: 'stalactites in cave', dimensions: { environment: 'env_nature', lighting: 'light_volumetric', texture: 'tex_stone' } },
  { id: 62, prompt: '草原上的野生动物群', promptEn: 'wildlife herd on grassland', dimensions: { environment: 'env_nature', subject: 'subj_creature', mood: 'mood_epic' } },
  { id: 63, prompt: '海岸线的礁石与海浪', promptEn: 'coastal rocks and waves', dimensions: { environment: 'env_nature', mood: 'mood_dramatic', texture: 'tex_stone' } },
  { id: 64, prompt: '高山草甸的野花', promptEn: 'wildflowers in alpine meadow', dimensions: { environment: 'env_nature', color_mood: 'color_vibrant', mood: 'mood_serene' } },
  { id: 65, prompt: '峡谷日出的光影', promptEn: 'canyon sunrise light and shadow', dimensions: { environment: 'env_nature', lighting: 'light_golden_hour', mood: 'mood_epic' } },
  { id: 66, prompt: '热带岛屿的俯瞰', promptEn: 'aerial view of tropical island', dimensions: { environment: 'env_nature', shot_type: 'shot_top_down', mood: 'mood_serene' } },
  { id: 67, prompt: '冬季温泉的蒸汽', promptEn: 'steam from winter hot spring', dimensions: { environment: 'env_snow', mood: 'mood_serene', lighting: 'light_soft' } },
  { id: 68, prompt: '沙漠沙丘的曲线', promptEn: 'curves of desert sand dunes', dimensions: { environment: 'env_desert', composition: 'comp_golden', mood: 'mood_serene' } },
  { id: 69, prompt: '雨林树冠层的阳光', promptEn: 'sunlight through rainforest canopy', dimensions: { environment: 'env_nature', lighting: 'light_volumetric', mood: 'mood_mysterious' } },
  { id: 70, prompt: '冰川融化的溪流', promptEn: 'glacier melt stream', dimensions: { environment: 'env_snow', color_mood: 'color_frost', mood: 'mood_melancholy' } },
  { id: 71, prompt: '火山口湖的深蓝', promptEn: 'deep blue of volcanic crater lake', dimensions: { environment: 'env_nature', color_mood: 'color_frost', mood: 'mood_mysterious' } },
  { id: 72, prompt: '热带风暴的云层', promptEn: 'tropical storm clouds', dimensions: { environment: 'env_nature', mood: 'mood_dramatic', lighting: 'light_hard' } },
  { id: 73, prompt: '极地企鹅群', promptEn: 'penguin colony at pole', dimensions: { environment: 'env_snow', subject: 'subj_creature', mood: 'mood_whimsical' } },
  { id: 74, prompt: '沙漠中的仙人掌', promptEn: 'cacti in desert', dimensions: { environment: 'env_desert', subject: 'subj_landscape', mood: 'mood_serene' } },
  { id: 75, prompt: '海底沉船遗迹', promptEn: 'underwater shipwreck ruins', dimensions: { environment: 'env_underwater', mood: 'mood_mysterious', texture: 'tex_rust' } },
  { id: 76, prompt: '高山雪崩的瞬间', promptEn: 'avalanche moment on mountain', dimensions: { environment: 'env_snow', mood: 'mood_epic', shot_type: 'shot_wide' } },
  { id: 77, prompt: '热带雨林的夜间生物', promptEn: 'nocturnal creatures in rainforest', dimensions: { environment: 'env_nature', lighting: 'light_bio', subject: 'subj_creature' } },
  { id: 78, prompt: '海岸日出的渔船', promptEn: 'fishing boats at coastal sunrise', dimensions: { environment: 'env_nature', lighting: 'light_golden_hour', mood: 'mood_serene' } },
  { id: 79, prompt: '峡谷中的瀑布彩虹', promptEn: 'waterfall rainbow in canyon', dimensions: { environment: 'env_nature', color_mood: 'color_vibrant', mood: 'mood_whimsical' } },
  { id: 80, prompt: '冬季森林的雾凇', promptEn: 'rime ice in winter forest', dimensions: { environment: 'env_snow', texture: 'tex_crystal', mood: 'mood_serene' } },

  // 建筑空间类 (81-120)
  { id: 81, prompt: '哥特式教堂的彩色玻璃窗', promptEn: 'stained glass window of Gothic church', dimensions: { environment: 'env_interior', art_style: 'style_oil_painting', texture: 'tex_glass' } },
  { id: 82, prompt: '现代主义建筑的几何线条', promptEn: 'geometric lines of modernist architecture', dimensions: { environment: 'env_interior', composition: 'comp_leading', perspective: 'persp_2point' } },
  { id: 83, prompt: '赛博朋克风格的未来城市', promptEn: 'cyberpunk futuristic city', dimensions: { environment: 'env_urban', art_style: 'style_cyberpunk', lighting: 'light_neon' } },
  { id: 84, prompt: '日式庭院的枯山水', promptEn: 'Japanese zen garden dry landscape', dimensions: { environment: 'env_interior', art_style: 'style_ink_wash', mood: 'mood_serene' } },
  { id: 85, prompt: '巴洛克宫殿的华丽装饰', promptEn: 'ornate Baroque palace decoration', dimensions: { environment: 'env_interior', art_style: 'style_oil_painting', mood: 'mood_epic' } },
  { id: 86, prompt: '工业风改造的 loft 空间', promptEn: 'industrial loft space', dimensions: { environment: 'env_interior', texture: 'tex_metal', mood: 'mood_dramatic' } },
  { id: 87, prompt: '未来主义的太空站内部', promptEn: 'futuristic space station interior', dimensions: { environment: 'env_interior', art_style: 'style_synthwave', perspective: 'persp_orthographic' } },
  { id: 88, prompt: '古罗马废墟的拱门', promptEn: 'arch of ancient Roman ruins', dimensions: { environment: 'env_urban', texture: 'tex_stone', mood: 'mood_melancholy' } },
  { id: 89, prompt: '摩天大楼的仰视视角', promptEn: 'low angle view of skyscraper', dimensions: { environment: 'env_urban', shot_type: 'shot_low_angle', perspective: 'persp_3point' } },
  { id: 90, prompt: '传统四合院的庭院', promptEn: 'traditional courtyard house', dimensions: { environment: 'env_interior', composition: 'comp_centered', mood: 'mood_serene' } },
  { id: 91, prompt: '玻璃幕墙的反射', promptEn: 'glass curtain wall reflection', dimensions: { environment: 'env_urban', texture: 'tex_glass', composition: 'comp_minimal' } },
  { id: 92, prompt: '地下铁站的几何结构', promptEn: 'geometric structure of subway station', dimensions: { environment: 'env_interior', perspective: 'persp_1point', mood: 'mood_dramatic' } },
  { id: 93, prompt: '城堡的夜景', promptEn: 'castle at night', dimensions: { environment: 'env_urban', mood: 'mood_mysterious', lighting: 'light_hard' } },
  { id: 94, prompt: '图书馆的书架长廊', promptEn: 'library bookshelf corridor', dimensions: { environment: 'env_interior', composition: 'comp_leading', mood: 'mood_serene' } },
  { id: 95, prompt: '旋转楼梯的螺旋', promptEn: 'spiral of rotating staircase', dimensions: { environment: 'env_interior', composition: 'comp_golden', perspective: 'persp_2point' } },
  { id: 96, prompt: '温室花园的玻璃穹顶', promptEn: 'glass dome of greenhouse garden', dimensions: { environment: 'env_interior', texture: 'tex_glass', mood: 'mood_serene' } },
  { id: 97, prompt: '废弃工厂的锈迹', promptEn: 'rust of abandoned factory', dimensions: { environment: 'env_urban', texture: 'tex_rust', mood: 'mood_melancholy' } },
  { id: 98, prompt: '现代美术馆的白盒子空间', promptEn: 'white cube space of modern art museum', dimensions: { environment: 'env_interior', composition: 'comp_minimal', mood: 'mood_serene' } },
  { id: 99, prompt: '水乡古镇的石桥', promptEn: 'stone bridge of water town', dimensions: { environment: 'env_urban', art_style: 'style_ink_wash', mood: 'mood_serene' } },
  { id: 100, prompt: '未来城市的空中走廊', promptEn: 'sky corridor of future city', dimensions: { environment: 'env_urban', art_style: 'style_cyberpunk', perspective: 'persp_3point' } },
  { id: 101, prompt: '教堂的玫瑰花窗', promptEn: 'rose window of church', dimensions: { environment: 'env_interior', texture: 'tex_glass', composition: 'comp_centered' } },
  { id: 102, prompt: '摩天楼的天台泳池', promptEn: 'rooftop pool of skyscraper', dimensions: { environment: 'env_urban', shot_type: 'shot_top_down', mood: 'mood_romantic' } },
  { id: 103, prompt: '地下洞穴的钟乳石大厅', promptEn: 'stalactite hall of underground cave', dimensions: { environment: 'env_interior', lighting: 'light_volumetric', texture: 'tex_stone' } },
  { id: 104, prompt: '日式茶室的简约', promptEn: 'minimalist Japanese tea room', dimensions: { environment: 'env_interior', composition: 'comp_minimal', mood: 'mood_serene' } },
  { id: 105, prompt: '歌剧院的金色大厅', promptEn: 'golden hall of opera house', dimensions: { environment: 'env_interior', color_mood: 'color_golden', mood: 'mood_epic' } },
  { id: 106, prompt: '集装箱改造的创意空间', promptEn: 'creative space from shipping containers', dimensions: { environment: 'env_interior', texture: 'tex_metal', mood: 'mood_dramatic' } },
  { id: 107, prompt: '冰雪酒店的冰雕房间', promptEn: 'ice sculpture room of ice hotel', dimensions: { environment: 'env_interior', texture: 'tex_crystal', color_mood: 'color_frost' } },
  { id: 108, prompt: '树屋的森林视角', promptEn: 'forest view from treehouse', dimensions: { environment: 'env_nature', shot_type: 'shot_wide', mood: 'mood_whimsical' } },
  { id: 109, prompt: '沙漠中的现代别墅', promptEn: 'modern villa in desert', dimensions: { environment: 'env_desert', art_style: 'style_photorealism', composition: 'comp_minimal' } },
  { id: 110, prompt: '水下观景窗的海洋', promptEn: 'ocean view through underwater window', dimensions: { environment: 'env_underwater', shot_type: 'shot_medium', mood: 'mood_serene' } },
  { id: 111, prompt: '火车站的穹顶', promptEn: 'dome of train station', dimensions: { environment: 'env_interior', perspective: 'persp_1point', mood: 'mood_epic' } },
  { id: 112, prompt: '空中花园的垂直绿化', promptEn: 'vertical greening of sky garden', dimensions: { environment: 'env_urban', mood: 'mood_serene', color_mood: 'color_vibrant' } },
  { id: 113, prompt: '古堡的地牢', promptEn: 'dungeon of ancient castle', dimensions: { environment: 'env_interior', mood: 'mood_horror', lighting: 'light_hard' } },
  { id: 114, prompt: '现代教堂的光影', promptEn: 'light and shadow of modern church', dimensions: { environment: 'env_interior', lighting: 'light_volumetric', mood: 'mood_serene' } },
  { id: 115, prompt: '屋顶花园的城市天际线', promptEn: 'city skyline from rooftop garden', dimensions: { environment: 'env_urban', shot_type: 'shot_wide', mood: 'mood_romantic' } },
  { id: 116, prompt: '地下停车场的几何', promptEn: 'geometry of underground parking', dimensions: { environment: 'env_interior', perspective: 'persp_2point', mood: 'mood_dramatic' } },
  { id: 117, prompt: '温室中的热带植物', promptEn: 'tropical plants in greenhouse', dimensions: { environment: 'env_interior', color_mood: 'color_vibrant', mood: 'mood_serene' } },
  { id: 118, prompt: '废弃游乐园的旋转木马', promptEn: 'carousel of abandoned amusement park', dimensions: { environment: 'env_urban', mood: 'mood_melancholy', texture: 'tex_rust' } },
  { id: 119, prompt: '未来博物馆的互动装置', promptEn: 'interactive installation of future museum', dimensions: { environment: 'env_interior', art_style: 'style_synthwave', mood: 'mood_whimsical' } },
  { id: 120, prompt: '山顶观景台的云海', promptEn: 'sea of clouds from mountain observation deck', dimensions: { environment: 'env_urban', shot_type: 'shot_wide', mood: 'mood_epic' } },

  // 生物/怪兽类 (121-160)
  { id: 121, prompt: '机械龙的鳞片细节', promptEn: 'scale detail of mechanical dragon', dimensions: { subject: 'subj_creature', texture: 'tex_metal', shot_type: 'shot_extreme_close_up' } },
  { id: 122, prompt: '森林精灵的翅膀', promptEn: 'wings of forest elf', dimensions: { subject: 'subj_creature', mood: 'mood_whimsical', lighting: 'light_volumetric' } },
  { id: 123, prompt: '深海巨兽的剪影', promptEn: 'silhouette of deep sea monster', dimensions: { subject: 'subj_creature', environment: 'env_underwater', mood: 'mood_horror' } },
  { id: 124, prompt: '凤凰涅槃的火焰', promptEn: 'flames of phoenix rebirth', dimensions: { subject: 'subj_creature', color_mood: 'color_vibrant', mood: 'mood_epic' } },
  { id: 125, prompt: '机械昆虫的复眼', promptEn: 'compound eye of mechanical insect', dimensions: { subject: 'subj_creature', texture: 'tex_metal', shot_type: 'shot_macro' } },
  { id: 126, prompt: '独角兽的金色鬃毛', promptEn: 'golden mane of unicorn', dimensions: { subject: 'subj_creature', color_mood: 'color_golden', mood: 'mood_whimsical' } },
  { id: 127, prompt: '赛博格狼的机械肢体', promptEn: 'mechanical limbs of cyborg wolf', dimensions: { subject: 'subj_creature', art_style: 'style_cyberpunk', texture: 'tex_metal' } },
  { id: 128, prompt: '蝴蝶翅膀的微观结构', promptEn: 'microstructure of butterfly wing', dimensions: { subject: 'subj_creature', shot_type: 'shot_macro', texture: 'tex_organic' } },
  { id: 129, prompt: '巨树的根系', promptEn: 'root system of giant tree', dimensions: { subject: 'subj_creature', environment: 'env_nature', mood: 'mood_mysterious' } },
  { id: 130, prompt: '水晶蜘蛛的折射', promptEn: 'refraction of crystal spider', dimensions: { subject: 'subj_creature', texture: 'tex_crystal', lighting: 'light_volumetric' } },
  { id: 131, prompt: '机械鸟的羽毛', promptEn: 'feathers of mechanical bird', dimensions: { subject: 'subj_creature', texture: 'tex_metal', art_style: 'style_cyberpunk' } },
  { id: 132, prompt: '蘑菇森林的荧光', promptEn: 'bioluminescence of mushroom forest', dimensions: { subject: 'subj_creature', lighting: 'light_bio', mood: 'mood_mysterious' } },
  { id: 133, prompt: '石像鬼的纹理', promptEn: 'texture of gargoyle', dimensions: { subject: 'subj_creature', texture: 'tex_stone', mood: 'mood_horror' } },
  { id: 134, prompt: '水母的透明身体', promptEn: 'transparent body of jellyfish', dimensions: { subject: 'subj_creature', environment: 'env_underwater', texture: 'tex_glass' } },
  { id: 135, prompt: '机械马的肌肉结构', promptEn: 'muscle structure of mechanical horse', dimensions: { subject: 'subj_creature', texture: 'tex_metal', shot_type: 'shot_medium' } },
  { id: 136, prompt: '猫头鹰的夜视眼', promptEn: 'night vision eye of owl', dimensions: { subject: 'subj_creature', shot_type: 'shot_extreme_close_up', mood: 'mood_mysterious' } },
  { id: 137, prompt: '珊瑚虫的微观世界', promptEn: 'microscopic world of coral polyps', dimensions: { subject: 'subj_creature', shot_type: 'shot_macro', environment: 'env_underwater' } },
  { id: 138, prompt: '机械鲨鱼的流线型', promptEn: 'streamlined shape of mechanical shark', dimensions: { subject: 'subj_creature', texture: 'tex_metal', environment: 'env_underwater' } },
  { id: 139, prompt: '花朵的微观授粉', promptEn: 'microscopic pollination of flower', dimensions: { subject: 'subj_creature', shot_type: 'shot_macro', mood: 'mood_whimsical' } },
  { id: 140, prompt: '骨龙的化石纹理', promptEn: 'fossil texture of bone dragon', dimensions: { subject: 'subj_creature', texture: 'tex_stone', mood: 'mood_mysterious' } },
  { id: 141, prompt: '发光水母群', promptEn: 'glowing jellyfish swarm', dimensions: { subject: 'subj_creature', lighting: 'light_bio', environment: 'env_underwater' } },
  { id: 142, prompt: '机械鹰的翅膀展开', promptEn: 'wings spread of mechanical eagle', dimensions: { subject: 'subj_creature', texture: 'tex_metal', shot_type: 'shot_wide' } },
  { id: 143, prompt: '苔藓覆盖的石像', promptEn: 'moss-covered stone statue', dimensions: { subject: 'subj_creature', texture: 'tex_organic', mood: 'mood_melancholy' } },
  { id: 144, prompt: '赛博格猫的霓虹眼', promptEn: 'neon eyes of cyborg cat', dimensions: { subject: 'subj_creature', art_style: 'style_cyberpunk', lighting: 'light_neon' } },
  { id: 145, prompt: '鹿角的分形结构', promptEn: 'fractal structure of antlers', dimensions: { subject: 'subj_creature', composition: 'comp_golden', mood: 'mood_mysterious' } },
  { id: 146, prompt: '机械章鱼的触手', promptEn: 'tentacles of mechanical octopus', dimensions: { subject: 'subj_creature', texture: 'tex_metal', environment: 'env_underwater' } },
  { id: 147, prompt: '蝴蝶破茧的瞬间', promptEn: 'moment of butterfly emerging from cocoon', dimensions: { subject: 'subj_creature', mood: 'mood_whimsical', shot_type: 'shot_close_up' } },
  { id: 148, prompt: '水晶蝎子的甲壳', promptEn: 'carapace of crystal scorpion', dimensions: { subject: 'subj_creature', texture: 'tex_crystal', lighting: 'light_volumetric' } },
  { id: 149, prompt: '机械蝴蝶的翅膀', promptEn: 'wings of mechanical butterfly', dimensions: { subject: 'subj_creature', texture: 'tex_metal', mood: 'mood_whimsical' } },
  { id: 150, prompt: '树懒的缓慢动作', promptEn: 'slow motion of sloth', dimensions: { subject: 'subj_creature', mood: 'mood_serene', shot_type: 'shot_medium' } },
  { id: 151, prompt: '机械蜘蛛的网', promptEn: 'web of mechanical spider', dimensions: { subject: 'subj_creature', texture: 'tex_metal', composition: 'comp_golden' } },
  { id: 152, prompt: '海马的卷曲尾巴', promptEn: 'curled tail of seahorse', dimensions: { subject: 'subj_creature', environment: 'env_underwater', mood: 'mood_whimsical' } },
  { id: 153, prompt: '机械犀牛的装甲', promptEn: 'armor of mechanical rhinoceros', dimensions: { subject: 'subj_creature', texture: 'tex_metal', mood: 'mood_dramatic' } },
  { id: 154, prompt: '萤火虫的夜间舞蹈', promptEn: 'night dance of fireflies', dimensions: { subject: 'subj_creature', lighting: 'light_bio', mood: 'mood_whimsical' } },
  { id: 155, prompt: '机械鲸鱼的喷水', promptEn: 'spout of mechanical whale', dimensions: { subject: 'subj_creature', texture: 'tex_metal', environment: 'env_underwater' } },
  { id: 156, prompt: '孔雀开屏的色彩', promptEn: 'colors of peacock spreading tail', dimensions: { subject: 'subj_creature', color_mood: 'color_vibrant', mood: 'mood_whimsical' } },
  { id: 157, prompt: '机械狐狸的尾巴', promptEn: 'tail of mechanical fox', dimensions: { subject: 'subj_creature', texture: 'tex_metal', mood: 'mood_mysterious' } },
  { id: 158, prompt: '珊瑚的分支结构', promptEn: 'branching structure of coral', dimensions: { subject: 'subj_creature', environment: 'env_underwater', composition: 'comp_golden' } },
  { id: 159, prompt: '机械老虎的条纹', promptEn: 'stripes of mechanical tiger', dimensions: { subject: 'subj_creature', texture: 'tex_metal', mood: 'mood_dramatic' } },
  { id: 160, prompt: '蜗牛的螺旋壳', promptEn: 'spiral shell of snail', dimensions: { subject: 'subj_creature', composition: 'comp_golden', shot_type: 'shot_macro' } },

  // 抽象/超现实类 (161-200)
  { id: 161, prompt: '时间的流动可视化', promptEn: 'visualization of time flow', dimensions: { subject: 'subj_abstract', mood: 'mood_mysterious', art_style: 'style_synthwave' } },
  { id: 162, prompt: '梦境的碎片', promptEn: 'fragments of dreams', dimensions: { subject: 'subj_surreal', mood: 'mood_whimsical', color_mood: 'color_pastel' } },
  { id: 163, prompt: '音乐的视觉化', promptEn: 'visualisation of music', dimensions: { subject: 'subj_abstract', color_mood: 'color_vibrant', mood: 'mood_dramatic' } },
  { id: 164, prompt: '记忆的宫殿', promptEn: 'palace of memory', dimensions: { subject: 'subj_surreal', environment: 'env_interior', mood: 'mood_mysterious' } },
  { id: 165, prompt: '情感的几何', promptEn: 'geometry of emotions', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_dramatic' } },
  { id: 166, prompt: '重力的反转', promptEn: 'gravity inversion', dimensions: { subject: 'subj_surreal', perspective: 'persp_reverse', mood: 'mood_whimsical' } },
  { id: 167, prompt: '色彩的交响', promptEn: 'symphony of colors', dimensions: { subject: 'subj_abstract', color_mood: 'color_vibrant', mood: 'mood_epic' } },
  { id: 168, prompt: '空间的折叠', promptEn: 'space folding', dimensions: { subject: 'subj_surreal', perspective: 'persp_forced', mood: 'mood_mysterious' } },
  { id: 169, prompt: '意识的流', promptEn: 'stream of consciousness', dimensions: { subject: 'subj_abstract', technique: 'tech_blending', mood: 'mood_mysterious' } },
  { id: 170, prompt: '平行宇宙的交汇', promptEn: 'intersection of parallel universes', dimensions: { subject: 'subj_surreal', color_mood: 'color_vibrant', mood: 'mood_epic' } },
  { id: 171, prompt: '数字的舞蹈', promptEn: 'dance of numbers', dimensions: { subject: 'subj_abstract', art_style: 'style_synthwave', mood: 'mood_whimsical' } },
  { id: 172, prompt: '影子的实体化', promptEn: 'materialization of shadows', dimensions: { subject: 'subj_surreal', lighting: 'light_hard', mood: 'mood_horror' } },
  { id: 173, prompt: '语言的形状', promptEn: 'shape of language', dimensions: { subject: 'subj_abstract', technique: 'tech_glazing', mood: 'mood_mysterious' } },
  { id: 174, prompt: '镜像的无限', promptEn: 'infinity of mirrors', dimensions: { subject: 'subj_surreal', composition: 'comp_centered', mood: 'mood_mysterious' } },
  { id: 175, prompt: '风的轨迹', promptEn: 'trajectory of wind', dimensions: { subject: 'subj_abstract', technique: 'tech_wet', mood: 'mood_serene' } },
  { id: 176, prompt: '思想的火花', promptEn: 'sparks of thought', dimensions: { subject: 'subj_abstract', lighting: 'light_neon', mood: 'mood_dramatic' } },
  { id: 177, prompt: '维度的穿越', promptEn: 'dimension crossing', dimensions: { subject: 'subj_surreal', perspective: 'persp_3point', mood: 'mood_epic' } },
  { id: 178, prompt: '声音的波纹', promptEn: 'ripples of sound', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_serene' } },
  { id: 179, prompt: '光子的路径', promptEn: 'path of photons', dimensions: { subject: 'subj_abstract', lighting: 'light_volumetric', mood: 'mood_mysterious' } },
  { id: 180, prompt: '梦境的入口', promptEn: 'entrance to dreams', dimensions: { subject: 'subj_surreal', mood: 'mood_mysterious', lighting: 'light_soft' } },
  { id: 181, prompt: '数学的美', promptEn: 'beauty of mathematics', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_serene' } },
  { id: 182, prompt: '潜意识的深海', promptEn: 'deep sea of subconscious', dimensions: { subject: 'subj_surreal', environment: 'env_underwater', mood: 'mood_mysterious' } },
  { id: 183, prompt: '能量的爆发', promptEn: 'energy burst', dimensions: { subject: 'subj_abstract', color_mood: 'color_vibrant', mood: 'mood_epic' } },
  { id: 184, prompt: '现实的裂缝', promptEn: 'crack in reality', dimensions: { subject: 'subj_surreal', mood: 'mood_horror', lighting: 'light_hard' } },
  { id: 185, prompt: '信息的流动', promptEn: 'flow of information', dimensions: { subject: 'subj_abstract', art_style: 'style_cyberpunk', mood: 'mood_dramatic' } },
  { id: 186, prompt: '灵魂的重量', promptEn: 'weight of soul', dimensions: { subject: 'subj_surreal', mood: 'mood_melancholy', lighting: 'light_soft' } },
  { id: 187, prompt: '混沌的秩序', promptEn: 'order in chaos', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_mysterious' } },
  { id: 188, prompt: '时间的碎片', promptEn: 'fragments of time', dimensions: { subject: 'subj_surreal', mood: 'mood_melancholy', technique: 'tech_stippling' } },
  { id: 189, prompt: '量子纠缠', promptEn: 'quantum entanglement', dimensions: { subject: 'subj_abstract', color_mood: 'color_vibrant', mood: 'mood_mysterious' } },
  { id: 190, prompt: '记忆的褪色', promptEn: 'fading of memory', dimensions: { subject: 'subj_surreal', color_mood: 'color_morandi', mood: 'mood_melancholy' } },
  { id: 191, prompt: '引力的舞蹈', promptEn: 'dance of gravity', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_whimsical' } },
  { id: 192, prompt: '虚拟的边界', promptEn: 'boundary of virtual', dimensions: { subject: 'subj_surreal', art_style: 'style_cyberpunk', mood: 'mood_mysterious' } },
  { id: 193, prompt: '情感的色谱', promptEn: 'spectrum of emotions', dimensions: { subject: 'subj_abstract', color_mood: 'color_vibrant', mood: 'mood_dramatic' } },
  { id: 194, prompt: '空间的曲率', promptEn: 'curvature of space', dimensions: { subject: 'subj_surreal', perspective: 'persp_fisheye', mood: 'mood_mysterious' } },
  { id: 195, prompt: '数据的海洋', promptEn: 'ocean of data', dimensions: { subject: 'subj_abstract', art_style: 'style_cyberpunk', environment: 'env_underwater' } },
  { id: 196, prompt: '意识的边界', promptEn: 'boundary of consciousness', dimensions: { subject: 'subj_surreal', mood: 'mood_mysterious', lighting: 'light_volumetric' } },
  { id: 197, prompt: '生命的循环', promptEn: 'cycle of life', dimensions: { subject: 'subj_abstract', composition: 'comp_golden', mood: 'mood_serene' } },
  { id: 198, prompt: '现实的镜像', promptEn: 'mirror of reality', dimensions: { subject: 'subj_surreal', composition: 'comp_centered', mood: 'mood_mysterious' } },
  { id: 199, prompt: '宇宙的呼吸', promptEn: 'breath of universe', dimensions: { subject: 'subj_abstract', environment: 'env_space', mood: 'mood_epic' } },
  { id: 200, prompt: '永恒的瞬间', promptEn: 'eternal moment', dimensions: { subject: 'subj_surreal', mood: 'mood_serene', lighting: 'light_golden_hour' } },
];

// 生成 SVG 占位图
function generateSVG(item) {
  const label = item.prompt.substring(0, 20);
  const encodedLabel = encodeURIComponent(label);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="#0f172a">
    <rect x="0" y="0" width="512" height="512" rx="24" fill="#1e293b" stroke="#334155" stroke-width="4"/>
    <text x="50%" y="45%" fill="#38bdf8" text-anchor="middle" font-size="24" font-family="sans-serif" font-weight="bold">${encodedLabel}</text>
    <text x="50%" y="55%" fill="#64748b" text-anchor="middle" font-size="16" font-family="sans-serif">ID: ${item.id}</text>
    <text x="50%" y="65%" fill="#64748b" text-anchor="middle" font-size="12" font-family="sans-serif">${Object.keys(item.dimensions).length} dimensions</text>
  </svg>`;
}

// 主函数
async function main() {
  const presetsDir = path.join(__dirname, '..', 'public', 'presets');
  const datasetDir = path.join(__dirname, '..', 'data');

  // 创建目录
  if (!fs.existsSync(presetsDir)) fs.mkdirSync(presetsDir, { recursive: true });
  if (!fs.existsSync(datasetDir)) fs.mkdirSync(datasetDir, { recursive: true });

  // 生成预置选项数据
  const presetOptions = [];
  Object.entries(DIMENSIONS).forEach(([category, data]) => {
    data.options.forEach(opt => {
      presetOptions.push({
        id: opt.id,
        category,
        labelZh: opt.labelZh,
        labelEn: opt.labelEn,
        promptToken: opt.token,
        previewImage: `/presets/${opt.id}.svg`
      });
    });
  });

  // 生成数据集 JSON
  const datasetJSON = DATASET.map(item => ({
    ...item,
    dimensions: item.dimensions,
    tags: Object.values(item.dimensions)
  }));

  // 写入文件
  fs.writeFileSync(
    path.join(datasetDir, 'prompts-dataset.json'),
    JSON.stringify(datasetJSON, null, 2)
  );

  fs.writeFileSync(
    path.join(datasetDir, 'preset-options.json'),
    JSON.stringify(presetOptions, null, 2)
  );

  // 生成 SVG 占位图
  DATASET.forEach(item => {
    const svg = generateSVG(item);
    fs.writeFileSync(path.join(presetsDir, `dataset_${item.id}.svg`), svg);
  });

  // 生成维度选项的 SVG
  presetOptions.forEach(opt => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="#0f172a">
      <rect x="0" y="0" width="512" height="512" rx="24" fill="#1e293b" stroke="#334155" stroke-width="4"/>
      <text x="50%" y="45%" fill="#38bdf8" text-anchor="middle" font-size="32" font-family="sans-serif" font-weight="bold">${encodeURIComponent(opt.labelZh)}</text>
      <text x="50%" y="55%" fill="#64748b" text-anchor="middle" font-size="20" font-family="sans-serif">${encodeURIComponent(opt.labelEn)}</text>
      <text x="50%" y="65%" fill="#475569" text-anchor="middle" font-size="14" font-family="sans-serif">${encodeURIComponent(opt.category)}</text>
    </svg>`;
    fs.writeFileSync(path.join(presetsDir, `${opt.id}.svg`), svg);
  });

  console.log(`✅ 生成完成！`);
  console.log(`- 数据集：${datasetJSON.length} 条提示词`);
  console.log(`- 预置选项：${presetOptions.length} 个维度选项`);
  console.log(`- SVG 图片：${DATASET.length + presetOptions.length} 张`);
  console.log(`- 输出目录：${datasetDir}`);
  console.log(`- 图片目录：${presetsDir}`);
}

main().catch(console.error);
