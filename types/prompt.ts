// 维度类别枚举
export type DimensionCategory =
  | 'shot_type'
  | 'art_style'
  | 'lighting'
  | 'color_mood'
  | 'composition'
  | 'clothing'
  | 'mood'
  | 'technique'
  | 'perspective'
  | 'texture'
  | 'subject'
  | 'environment';

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
  selectedOptions: Record<DimensionCategory, PresetOption | null>;
  customSubject: string;
  assembledPrompt: string;
  referenceImageUrl?: string;
  isGeneratingImage?: boolean;
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
