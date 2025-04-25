import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-purple-600', 
  height = 8,
  showLabel = true
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs font-medium text-gray-700">{normalizedProgress}%</span>
          </div>
        )}
      </div>
      
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden" 
        style={{ height: `${height}px` }}
      >
        <div 
          className={`${color} rounded-full transition-all duration-500 ease-out`}
          style={{ 
            width: `${normalizedProgress}%`,
            height: `${height}px`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;