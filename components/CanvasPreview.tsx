'use client';

import { useState } from 'react';
import { PresetOption, DimensionCategory } from '@/types/prompt';

interface CanvasPreviewProps {
  selectedOptions: Record<DimensionCategory, PresetOption | null>;
  prompt: string;
  targetTool: string;
}

export default function CanvasPreview({
  selectedOptions,
  prompt,
  targetTool,
}: CanvasPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 获取所有选中的选项
  const selectedList = Object.values(selectedOptions).filter((opt): opt is PresetOption => opt !== null);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 预览视窗 - 显示选中维度的预置图 */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
        {selectedList.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 p-4 w-full h-full overflow-y-auto">
            {selectedList.map((opt) => (
              <div key={opt.id} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700">
                <img
                  src={opt.previewImage}
                  alt={opt.labelZh}
                  onError={(e) => {
                    const target = e.currentTarget;
                    const label = encodeURIComponent(opt.labelZh);
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%230f172a"><rect x="8" y="8" width="240" height="240" rx="12" fill="%231e293b" stroke="%23334155" stroke-width="2"/><text x="50%" y="50%" fill="%2338bdf8" text-anchor="middle" font-size="14" font-family="sans-serif">${label}</text></svg>`;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="text-xs text-white font-medium truncate">{opt.labelZh}</div>
                  <div className="text-[10px] text-slate-300 truncate">{opt.labelEn}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 space-y-2 text-slate-500">
            <div className="text-4xl">🎨</div>
            <p className="text-xs">选择维度标签后，预置参考图将展示在此处</p>
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
    </div>
  );
}
