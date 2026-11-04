'use client';

import { useState } from 'react';
import { DimensionCategory, PresetOption } from '@/types/prompt';
import { DIMENSION_META, getOptionsByCategory } from '@/config/presets';
import OptionCard from './OptionCard';

interface DimensionPanelProps {
  selectedOptions: Partial<Record<DimensionCategory, PresetOption>>;
  onSelectOption: (option: PresetOption) => void;
  missingDimensions?: DimensionCategory[];
}

export default function DimensionPanel({
  selectedOptions,
  onSelectOption,
  missingDimensions,
}: DimensionPanelProps) {
  const [activeCategory, setActiveCategory] = useState<DimensionCategory>('shot_type');

  const categories = Object.keys(DIMENSION_META) as DimensionCategory[];
  const options = getOptionsByCategory(activeCategory);

  // 排序：缺失维度排在前面
  const sortedCategories = [...categories].sort((a, b) => {
    const aMissing = missingDimensions?.includes(a) ? 0 : 1;
    const bMissing = missingDimensions?.includes(b) ? 0 : 1;
    return aMissing - bMissing;
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 分类标签导航 */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {sortedCategories.map((category) => {
          const meta = DIMENSION_META[category];
          const isMissing = missingDimensions?.includes(category);
          const hasSelection = selectedOptions[category] !== undefined;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="mr-1">{meta.icon}</span>
              {meta.labelZh}
              {/* 状态指示器 */}
              {hasSelection && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
              {isMissing && !hasSelection && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* 当前分类的选项网格 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {DIMENSION_META[activeCategory].icon} {DIMENSION_META[activeCategory].labelZh}
            <span className="ml-2 text-sm font-normal text-gray-500">
              {DIMENSION_META[activeCategory].labelEn}
            </span>
          </h3>
          {selectedOptions[activeCategory] && (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              已选择: {selectedOptions[activeCategory]?.labelZh}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selectedOptions[activeCategory]?.id === option.id}
              onSelect={onSelectOption}
            />
          ))}
        </div>
      </div>

      {/* 缺失维度提示 */}
      {missingDimensions && missingDimensions.length > 0 && (
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <span className="font-medium">建议补充：</span>
            {missingDimensions.map((dim) => DIMENSION_META[dim].labelZh).join('、')}
          </p>
        </div>
      )}
    </div>
  );
}
