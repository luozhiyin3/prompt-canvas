'use client';

import { useState, useCallback } from 'react';
import { GenerationCanvasState, DimensionCategory, PresetOption, AnalysisResult } from '@/types/prompt';
import { buildFinalPrompt } from '@/lib/prompt-adapter';
import InputSection from '@/components/InputSection';
import DimensionPanel from '@/components/DimensionPanel';
import CanvasPreview from '@/components/CanvasPreview';
import PromptExportModal from '@/components/PromptExportModal';

const initialState: GenerationCanvasState = {
  rawInput: '',
  targetTool: 'flux',
  selectedOptions: {},
  customSubject: '',
  assembledPrompt: '',
  isGeneratingImage: false,
};

export default function Home() {
  const [state, setState] = useState<GenerationCanvasState>(initialState);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [step, setStep] = useState<'input' | 'select' | 'preview'>('input');

  // 处理输入提交
  const handleInputSubmit = useCallback(async (input: string) => {
    setIsAnalyzing(true);
    setState(prev => ({ ...prev, rawInput: input }));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setAnalysisResult(data.data);
        setState(prev => ({
          ...prev,
          customSubject: data.data.identifiedSubject,
          analysisResult: data.data,
        }));
        setStep('select');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // 处理选项选择
  const handleSelectOption = useCallback((option: PresetOption) => {
    setState(prev => {
      const newSelectedOptions = { ...prev.selectedOptions };

      // 如果已选择同一选项，则取消选择
      if (newSelectedOptions[option.category]?.id === option.id) {
        delete newSelectedOptions[option.category];
      } else {
        newSelectedOptions[option.category] = option;
      }

      const newState = { ...prev, selectedOptions: newSelectedOptions };
      newState.assembledPrompt = buildFinalPrompt(newState);

      return newState;
    });
  }, []);

  // 生成参考图
  const handleGenerateImage = useCallback(async () => {
    if (!state.assembledPrompt) return;

    setState(prev => ({ ...prev, isGeneratingImage: true }));

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: state.assembledPrompt,
          tool: state.targetTool,
        }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setState(prev => ({ ...prev, referenceImageUrl: data.imageUrl }));
        setStep('preview');
      }
    } catch (error) {
      console.error('Image generation failed:', error);
    } finally {
      setState(prev => ({ ...prev, isGeneratingImage: false }));
    }
  }, [state.assembledPrompt, state.targetTool]);

  // 重置
  const handleReset = useCallback(() => {
    setState(initialState);
    setAnalysisResult(null);
    setStep('input');
  }, []);

  return (
    <main className="min-h-screen py-8 px-4">
      {/* 头部 */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Prompt Canvas
        </h1>
        <p className="mt-2 text-gray-600">AI绘画提示词助手 - 智能补全 · 可视化选择 · 一键生成</p>
      </header>

      {/* 步骤指示器 */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2">
          {(['input', 'select', 'preview'] as const).map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step === s
                    ? 'bg-blue-500 text-white'
                    : i < ['input', 'select', 'preview'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  i < ['input', 'select', 'preview'].indexOf(step) ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mt-2 text-sm text-gray-500">
          <span>输入描述</span>
          <span>选择维度</span>
          <span>生成预览</span>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 步骤1: 输入 */}
        {step === 'input' && (
          <InputSection onSubmit={handleInputSubmit} isLoading={isAnalyzing} />
        )}

        {/* 步骤2: 选择维度 */}
        {step === 'select' && (
          <>
            {/* 显示已识别的主体 */}
            {analysisResult && (
              <div className="max-w-3xl mx-auto p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">识别主体：</span>
                  {analysisResult.identifiedSubject}
                </p>
              </div>
            )}

            <DimensionPanel
              selectedOptions={state.selectedOptions}
              onSelectOption={handleSelectOption}
              missingDimensions={analysisResult?.missingDimensions}
            />

            {/* 预览和导出按钮 */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => setStep('input')}
                className="px-6 py-3 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-100 transition-all"
              >
                返回修改
              </button>
              <button
                onClick={handleGenerateImage}
                disabled={state.isGeneratingImage || Object.keys(state.selectedOptions).length === 0}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {state.isGeneratingImage ? '生成中...' : '生成参考图'}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                disabled={!state.assembledPrompt}
                className="px-6 py-3 rounded-xl bg-white text-blue-600 font-medium border border-blue-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                导出提示词
              </button>
            </div>
          </>
        )}

        {/* 步骤3: 预览 */}
        {step === 'preview' && (
          <>
            <CanvasPreview
              state={state}
              onGenerate={handleGenerateImage}
              onReset={handleReset}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep('select')}
                className="px-6 py-3 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-100 transition-all"
              >
                继续调整
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                导出提示词
              </button>
            </div>
          </>
        )}
      </div>

      {/* 导出弹窗 */}
      <PromptExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        state={state}
      />
    </main>
  );
}
