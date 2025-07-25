import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ReadingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#4A90E2', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L13.09 8.26L22 9L17 14L18.18 23L12 19.77L5.82 23L7 14L2 9L10.91 8.26L12 2Z" 
      fill="none"
    />
    <path 
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M12 4V20" 
      stroke={color} 
      strokeWidth="2"
    />
    <path 
      d="M8 8H11" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M8 12H11" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M13 8H16" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M13 12H16" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const WritingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#F39C12', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect 
      x="3" 
      y="4" 
      width="18" 
      height="16" 
      rx="2" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M14.2 6.2L17.8 9.8L11.6 16H8V12.4L14.2 6.2Z" 
      stroke={color} 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M16.8 7.2L16.2 6.6" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M5 18H7" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const GrammarIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#2E86AB', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect 
      x="3" 
      y="3" 
      width="18" 
      height="18" 
      rx="2" 
      fill={color}
    />
    <text 
      x="12" 
      y="16" 
      textAnchor="middle" 
      fontSize="14" 
      fontWeight="bold" 
      fill="white" 
      fontFamily="Arial, sans-serif"
    >
      G
    </text>
  </svg>
);

export const ListeningIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#8E44AD', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M19 10V12C19 16.4183 15.4183 20 11 20H10C5.58172 20 2 16.4183 2 12V10" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M1 8C1 8 2 9 3 9" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M1 11C1 11 2.5 12 4 12" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M1 14C1 14 3 15 5 15" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const SpeakingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#3498DB', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <circle 
      cx="8" 
      cy="9" 
      r="1" 
      fill={color}
    />
    <circle 
      cx="12" 
      cy="9" 
      r="1" 
      fill={color}
    />
    <circle 
      cx="16" 
      cy="9" 
      r="1" 
      fill={color}
    />
  </svg>
);

export const InterpersonalIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#27AE60', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 12H13C15.2091 12 17 13.7909 17 16V20H15V16C15 14.8954 14.1046 14 13 14H12" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M12 12H11C8.79086 12 7 13.7909 7 16V20H9V16C9 14.8954 9.89543 14 11 14H12" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M11 10C11 11.1046 11.8954 12 13 12C14.1046 12 15 11.1046 15 10C15 8.89543 14.1046 8 13 8" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M13 10C13 11.1046 12.1046 12 11 12C9.89543 12 9 11.1046 9 10C9 8.89543 9.89543 8 11 8" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    <ellipse 
      cx="12" 
      cy="10" 
      rx="1" 
      ry="2" 
      fill={color}
    />
  </svg>
);

// Export all icons as a collection
export const EducationalIcons = {
  Reading: ReadingIcon,
  Writing: WritingIcon,
  Grammar: GrammarIcon,
  Listening: ListeningIcon,
  Speaking: SpeakingIcon,
  Interpersonal: InterpersonalIcon,
};