// 绘画技法要素维度分类（扩展版）
export type DimensionCategory =
  | 'shot_type'      // 景别视角
  | 'art_style'      // 艺术风格
  | 'lighting'       // 光影渲染
  | 'color_mood'     // 色彩色调
  | 'composition'    // 构图法则
  | 'clothing'       // 服饰装扮
  | 'mood'           // 情绪氛围
  | 'technique'      // 笔触技法
  | 'perspective'    // 透视关系
  | 'texture'        // 材质质感
  | 'subject'        // 主体类型
  | 'environment';   // 环境场景

export interface PresetOption {
  id: string;
  category: DimensionCategory;
  labelZh: string;
  labelEn: string;
  promptToken: string;
  previewImage: string;
  description?: string;
}

export interface DatasetItem {
  id: number;
  prompt: string;
  promptEn: string;
  imageUrl: string;
  dimensions: Partial<Record<DimensionCategory, string>>;
  tags: string[];
}
