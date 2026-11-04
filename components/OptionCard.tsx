'use client';

import { PresetOption } from '@/types/prompt';

interface OptionCardProps {
  option: PresetOption;
  isSelected: boolean;
  onSelect: (option: PresetOption) => void;
}

export default function OptionCard({ option, isSelected, onSelect }: OptionCardProps) {
  return (
    <button
      onClick={() => onSelect(option)}
      className={`group relative flex flex-col rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* 预览图 */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* 使用渐变背景作为占位，实际项目中替换为真实图片 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
        >
          <span className="text-4xl opacity-30">
            {option.category === 'shot_type' && '📐'}
            {option.category === 'art_style' && '🎨'}
            {option.category === 'lighting' && '💡'}
            {option.category === 'color_mood' && '🌈'}
            {option.category === 'composition' && '📷'}
            {option.category === 'clothing' && '👔'}
          </span>
        </div>
        {/* 实际图片加载
        <img
          src={option.previewImage}
          alt={option.labelZh}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        */}
        {/* 选中状态覆盖层 */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 标签 */}
      <div className="p-2 bg-white">
        <p className="text-sm font-medium text-gray-800 truncate">{option.labelZh}</p>
        <p className="text-xs text-gray-500 truncate">{option.labelEn}</p>
      </div>
    </button>
  );
}
