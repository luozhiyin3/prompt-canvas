'use client';

import { useState } from 'react';
import { DimensionCategory, PresetOption } from '@/types/prompt';

const CATEGORY_META: Record<DimensionCategory, { labelZh: string; labelEn: string }> = {
  shot_type: { labelZh: '景别视角', labelEn: 'Shot Type' },
  art_style: { labelZh: '艺术风格', labelEn: 'Art Style' },
  lighting: { labelZh: '光影渲染', labelEn: 'Lighting' },
  color_mood: { labelZh: '色彩色调', labelEn: 'Color Mood' },
  composition: { labelZh: '构图法则', labelEn: 'Composition' },
  clothing: { labelZh: '服饰装扮', labelEn: 'Clothing' },
};

interface DimensionPanelProps {
  options: PresetOption[];
  selectedOptions: Record<DimensionCategory, PresetOption | null>;
  missingCategories: DimensionCategory[];
  recommendedIds: string[];
  onSelect: (option: PresetOption) => void;
}

export default function DimensionPanel({
  options,
  selectedOptions,
  missingCategories,
  recommendedIds,
  onSelect,
}: DimensionPanelProps) {
  const categories = Object.keys(CATEGORY_META) as DimensionCategory[];
  const [activeTab, setActiveTab] = useState<DimensionCategory>('art_style');

  const filteredOptions = options.filter((opt) => opt.category === activeTab);

  return (
    <div className="space-y-4">
      {/* 类别 Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        {categories.map((cat) => {
          const isMissing = missingCategories.includes(cat);
          const isSelected = !!selectedOptions[cat];

          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === cat
                  ? 'bg-slate-900 border-t border-x border-slate-700 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{CATEGORY_META[cat].labelZh}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
              {isMissing && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* 选项网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[520px] overflow-y-auto pr-1">
        {filteredOptions.map((opt) => {
          const isSelected = selectedOptions[opt.category]?.id === opt.id;
          const isRecommended = recommendedIds.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => onSelect(opt)}
              className={`group relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-cyan-400 ring-2 ring-cyan-400/20 bg-cyan-950/20'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              {/* 缩略图容器 (WebP 静态预设) */}
              <div className="aspect-square relative w-full bg-slate-950 overflow-hidden">
                <img
                  src={opt.previewImage}
                  alt={opt.labelZh}
                  onError={(e) => {
                    const target = e.currentTarget;
                    const label = encodeURIComponent(opt.labelZh);
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%230f172a"><rect x="8" y="8" width="240" height="240" rx="12" fill="%231e293b" stroke="%23334155" stroke-width="2"/><text x="50%" y="50%" fill="%2338bdf8" text-anchor="middle" font-size="14" font-family="sans-serif">${label}</text></svg>`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isRecommended && (
                  <span className="absolute top-1.5 left-1.5 bg-amber-500/90 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                    AI 推荐
                  </span>
                )}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-black text-[10px] font-bold">
                    ✓
                  </div>
                )}
              </div>

              {/* 标签标题 */}
              <div className="p-2">
                <div className="text-xs font-medium text-slate-200 truncate">{opt.labelZh}</div>
                <div className="text-[10px] text-slate-500 truncate">{opt.labelEn}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
