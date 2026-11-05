'use client';

import { useState } from 'react';

interface CanvasPreviewProps {
  imageUrl: string | null;
  isGenerating: boolean;
  prompt: string;
  targetTool: string;
  onRegenerate: () => void;
}

export default function CanvasPreview({
  imageUrl,
  isGenerating,
  prompt,
  targetTool,
  onRegenerate,
}: CanvasPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 预览视窗 */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="AI Generation Preview" className="w-full h-full object-contain" />
        ) : (
          <div className="text-center p-6 space-y-2 text-slate-500">
            <div className="text-4xl">🎨</div>
            <p className="text-xs">选择维度或点击下方"生成参考图"查看效果</p>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center space-y-2">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-mono text-cyan-300">Flux.1-schnell 生成中 (~1.5s)...</span>
          </div>
        )}
      </div>

      {/* 拼装后的提示词文本框 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            最终生成提示词 ({targetTool.toUpperCase()})
          </label>
          <button
            onClick={handleCopy}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            {copied ? '已复制到剪贴板 ✓' : '复制提示词'}
          </button>
        </div>
        <textarea
          readOnly
          rows={3}
          value={prompt}
          placeholder="构建出的最终英文 Prompt 将展示在此处..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 resize-none focus:outline-none"
        />
      </div>

      {/* 触发操作按钮 */}
      <button
        onClick={onRegenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-medium rounded-lg text-sm shadow-lg shadow-cyan-950 transition-all"
      >
        {imageUrl ? '重新生成参考图' : '生成参考图 (1-2s)'}
      </button>
    </div>
  );
}
