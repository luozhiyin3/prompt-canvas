'use client';

import { GenerationCanvasState } from '@/types/prompt';

interface CanvasPreviewProps {
  state: GenerationCanvasState;
  onGenerate: () => void;
  onReset: () => void;
}

export default function CanvasPreview({ state, onGenerate, onReset }: CanvasPreviewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* 预览区域 */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {state.referenceImageUrl ? (
            <img
              src={state.referenceImageUrl}
              alt="Generated preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : state.isGeneratingImage ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🎨</span>
              </div>
              <p className="text-gray-600 font-medium">正在生成参考图...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">选择维度后生成参考图</p>
            </div>
          )}
        </div>

        {/* 当前提示词预览 */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-500 shrink-0">Prompt:</span>
            <p className="text-sm text-gray-700 line-clamp-2 flex-1">
              {state.assembledPrompt || '尚未组装提示词'}
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onGenerate}
            disabled={state.isGeneratingImage || !state.assembledPrompt}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {state.isGeneratingImage ? '生成中...' : '生成参考图'}
          </button>
          <button
            onClick={onReset}
            className="px-4 py-3 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-100 transition-all"
          >
            重置
          </button>
        </div>
      </div>

      {/* 已选维度摘要 */}
      <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">已选维度</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(state.selectedOptions).map(([category, option]) => (
            option && (
              <span
                key={category}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
              >
                {option.labelZh}
              </span>
            )
          ))}
          {Object.keys(state.selectedOptions).length === 0 && (
            <span className="text-sm text-gray-400">尚未选择任何维度</span>
          )}
        </div>
      </div>
    </div>
  );
}
