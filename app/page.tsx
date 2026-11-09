'use client';

import { useState } from 'react';
import { PRESET_OPTIONS } from '@/config/presets';
import { DimensionCategory, PresetOption, AnalysisResult } from '@/types/prompt';
import { buildFinalPrompt } from '@/lib/prompt-adapter';
import DimensionPanel from '@/components/DimensionPanel';
import CanvasPreview from '@/components/CanvasPreview';

export default function Home() {
  const [rawInput, setRawInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetTool, setTargetTool] = useState<'midjourney' | 'stablediffusion' | 'flux'>('flux');
  const [customSubject, setCustomSubject] = useState('');
  const [missingCategories, setMissingCategories] = useState<DimensionCategory[]>([]);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<DimensionCategory, PresetOption | null>>({
    shot_type: null,
    art_style: null,
    lighting: null,
    color_mood: null,
    composition: null,
    clothing: null,
    mood: null,
    technique: null,
    perspective: null,
    texture: null,
    subject: null,
    environment: null,
  });

  const [apiError, setApiError] = useState('');

  // 1. 调用 LLM 分析输入缺失维度
  const handleAnalyze = async () => {
    if (!rawInput.trim()) return;
    setIsAnalyzing(true);
    setApiError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: rawInput }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setApiError(errData.error || `API 请求失败 (${res.status})`);
        setCustomSubject(rawInput);
        return;
      }
      const data: AnalysisResult = await res.json();
      console.log('分析结果:', data);

      setCustomSubject(data.identifiedSubject || rawInput);
      setMissingCategories(data.missingDimensions || []);
      setRecommendedIds(data.recommendedOptionIds || []);
    } catch (err) {
      console.error('Analysis failed', err);
      setApiError('网络错误，请检查连接');
      setCustomSubject(rawInput);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. 选中/切换某个维度的预设
  const handleSelectOption = (option: PresetOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option.category]: prev[option.category]?.id === option.id ? null : option,
    }));
  };

  // 3. 计算当前拼装后的 Prompt
  const currentPrompt = buildFinalPrompt({
    rawInput,
    targetTool,
    selectedOptions,
    customSubject: customSubject || rawInput,
    assembledPrompt: '',
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 顶部状态栏 */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          Prompt Dimensions Studio
        </h1>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {(['flux', 'midjourney', 'stablediffusion'] as const).map((tool) => (
            <button
              key={tool}
              onClick={() => setTargetTool(tool)}
              className={`px-3 py-1.5 rounded-md uppercase font-medium transition-all ${
                targetTool === tool ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tool === 'stablediffusion' ? 'SD WebUI' : tool}
            </button>
          ))}
        </div>
      </header>

      {/* 工作区栅格 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* 左侧控制区：输入框 + 维度面板 */}
        <section className="lg:col-span-7 p-6 overflow-y-auto space-y-6 border-r border-slate-800">
          <div className="space-y-3">
            <label className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              1. 初始描述词 (自然语言)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="例如：雨夜霓虹街头奔跑的机械少女..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !rawInput.trim()}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-medium rounded-lg text-sm transition-all flex items-center gap-2"
              >
                {isAnalyzing ? '分析中...' : '智能拆解'}
              </button>
            </div>
            {customSubject && (
              <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                <span className="text-cyan-400">已提取主体:</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">
                  {customSubject}
                </span>
              </div>
            )}
            {apiError && (
              <div className="text-xs text-red-400 pt-1">{apiError}</div>
            )}
          </div>

          {/* 维度分类网格 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                2. 维度标签选择
              </label>
              <span className="text-xs text-slate-500">
                {missingCategories.length > 0 ? `AI 建议补充 ${missingCategories.length} 个维度` : '点击卡片切换'}
              </span>
            </div>

            <DimensionPanel
              options={PRESET_OPTIONS}
              selectedOptions={selectedOptions}
              missingCategories={missingCategories}
              recommendedIds={recommendedIds}
              onSelect={handleSelectOption}
            />
          </div>
        </section>

        {/* 右侧输出区：预置参考图 + 组装提示词 */}
        <section className="lg:col-span-5 p-6 bg-slate-950 flex flex-col justify-between">
          <CanvasPreview
            selectedOptions={selectedOptions}
            prompt={currentPrompt}
            targetTool={targetTool}
          />
        </section>
      </div>
    </main>
  );
}
