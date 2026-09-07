import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative">
      <div className="w-full h-48 rounded-xl bg-gray-200 skeleton-shimmer mb-4" />
      
      <div className="space-y-2.5">
        <div className="flex gap-2">
          <div className="w-16 h-5 rounded-full bg-gray-200 skeleton-shimmer" />
          <div className="w-20 h-5 rounded-full bg-gray-200 skeleton-shimmer" />
        </div>
        
        <div className="w-3/4 h-5 rounded-md bg-gray-200 skeleton-shimmer" />
        <div className="w-1/2 h-3.5 rounded-md bg-gray-200 skeleton-shimmer" />
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="w-16 h-3 bg-gray-200 rounded skeleton-shimmer" />
            <div className="w-24 h-6 bg-gray-200 rounded skeleton-shimmer" />
          </div>
          <div className="w-20 h-7 bg-gray-200 rounded-lg skeleton-shimmer" />
        </div>
        <div className="w-full h-10 rounded-xl bg-gray-200 skeleton-shimmer" />
      </div>
    </div>
  );
};
