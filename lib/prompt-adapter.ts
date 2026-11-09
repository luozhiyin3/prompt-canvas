import { GenerationCanvasState, PresetOption, DimensionCategory } from '@/types/prompt';

const TOOL_PREFIX: Record<string, string> = {
  stablediffusion: 'masterpiece, best quality, ultra-detailed, ',
  midjourney: '',
  flux: '',
};

const TOOL_SUFFIX: Record<string, string> = {
  stablediffusion: '',
  midjourney: ' --v 6.1 --style raw',
  flux: '',
};

function extractTokens(selectedOptions: Record<DimensionCategory, PresetOption | null>): string[] {
  return Object.values(selectedOptions)
    .filter((opt): opt is PresetOption => opt !== null)
    .map(opt => opt.promptToken);
}

export function buildFinalPrompt(state: GenerationCanvasState): string {
  const tokens = extractTokens(state.selectedOptions);
  const parts = [state.customSubject, ...tokens].filter(Boolean);
  const baseDescription = parts.join(', ');

  const prefix = TOOL_PREFIX[state.targetTool] || '';
  const suffix = TOOL_SUFFIX[state.targetTool] || '';

  return `${prefix}${baseDescription}${suffix}`;
}
