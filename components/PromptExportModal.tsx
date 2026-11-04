'use client';

import { useState } from 'react';
import { GenerationCanvasState, TargetTool } from '@/types/prompt';
import { formatPromptForTool } from '@/lib/prompt-adapter';

interface PromptExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: GenerationCanvasState;
}

const TOOLS: { value: TargetTool; label: string; icon: string }[] = [
  { value: 'midjourney', label: 'Midjourney', icon: '🎨' },
  { value: 'stablediffusion', label: 'Stable Diffusion', icon: '🖼️' },
  { value: 'flux', label: 'Flux', icon: '⚡' },
];

export default function PromptExportModal({ isOpen, onClose, state }: PromptExportModalProps) {
  const [selectedTool, setSelectedTool] = useState<TargetTool>(state.targetTool);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedState: GenerationCanvasState = { ...state, targetTool: selectedTool };
  const { prompt, negativePrompt, parameters } = formatPromptForTool(formattedState);

  const handleCopy = async () => {
    let textToCopy = prompt;
    if (negativePrompt) {
      textToCopy += `\n\nNegative Prompt: ${negativePrompt}`;
    }
    if (parameters) {
      textToCopy += '\n\nParameters:\n' + Object.entries(parameters).map(([k, v]) => `  ${k}: ${v}`).join('\n');
    }

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* 头部 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">导出提示词</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 工具选择 */}
        <div className="p-6 border-b border-gray-100">
          <label className="text-sm font-medium text-gray-700 mb-3 block">选择目标工具</label>
          <div className="flex gap-3">
            {TOOLS.map((tool) => (
              <button
                key={tool.value}
                onClick={() => setSelectedTool(tool.value)}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedTool === tool.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* 提示词预览 */}
        <div className="p-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">生成的提示词</label>
          <div className="relative">
            <pre className="p-4 bg-gray-900 rounded-xl text-green-400 text-sm overflow-x-auto whitespace-pre-wrap break-words">
              {prompt}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
            >
              {copied ? '已复制!' : '复制'}
            </button>
          </div>

          {/* Negative Prompt (仅 SD) */}
          {negativePrompt && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Negative Prompt</label>
              <pre className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {negativePrompt}
              </pre>
            </div>
          )}

          {/* 参数 (仅 MJ) */}
          {parameters && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">参数</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(parameters).map(([key, value]) => (
                  <span key={key} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 参考图 */}
        {state.referenceImageUrl && (
          <div className="px-6 pb-6">
            <label className="text-sm font-medium text-gray-700 mb-3 block">参考图</label>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img
                src={state.referenceImageUrl}
                alt="Reference"
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        )}

        {/* 底部按钮 */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            {copied ? '已复制到剪贴板!' : '复制全部'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-100 transition-all"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
