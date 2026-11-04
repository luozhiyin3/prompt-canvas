// 维度类别枚举
export type DimensionCategory =
  | 'shot_type'      // 景别
  | 'art_style'      // 艺术风格
  | 'lighting'       // 光影
  | 'color_mood'     // 色彩氛围
  | 'composition'    // 构图视角
  | 'clothing';      // 服饰特征

// 预置选项实体
export interface PresetOption {
  id: string;
  category: DimensionCategory;
  labelZh: string;
  labelEn: string;
  promptToken: string;
  previewImage: string;
  description?: string;
}

// LLM 结构化解析输出
export interface AnalysisResult {
  identifiedSubject: string;
  existingAttributes: Record<string, string>;
  missingDimensions: DimensionCategory[];
  recommendedOptionIds: string[];
}

// 目标工具类型
export type TargetTool = 'midjourney' | 'stablediffusion' | 'flux';

// 画板全局状态
export interface GenerationCanvasState {
  rawInput: string;
  targetTool: TargetTool;
  selectedOptions: Partial<Record<DimensionCategory, PresetOption>>;
  customSubject: string;
  assembledPrompt: string;
  referenceImageUrl?: string;
  isGeneratingImage: boolean;
  analysisResult?: AnalysisResult;
}

// API 请求/响应类型
export interface AnalyzeRequest {
  input: string;
  language?: 'zh' | 'en';
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export interface GenerateRequest {
  prompt: string;
  tool?: TargetTool;
}

export interface GenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}
