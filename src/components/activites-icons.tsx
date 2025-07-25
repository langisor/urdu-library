import React from "react";

// Base component to handle size
const IconWrapper = ({
  children,
  size = 48,
}: {
  children: React.ReactNode;
  size?: number | string;
}) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    display: "inline-block", // Or 'block' depending on desired layout
    // Add any other common styling here
  };
  return <div style={style}>{children}</div>;
};

const ReadingIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Reading icon */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for a book */}
        <path
          d="M4 19V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 5V20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 7H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 11H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

const WritingIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Writing icon */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for a pen on paper */}
        <path
          d="M12 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5V13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 2.5L21.5 5.5L13 14L10 11L18.5 2.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 6L18 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

const GrammarIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Grammar icon (the 'G' in a square) */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for a square with a 'G' */}
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 8C8.5 8 7 9.5 7 11.5C7 13.5 8.5 15 10.5 15C11.5 15 12.5 14.5 13 13.5C13.5 14.5 14.5 15 15.5 15C17.5 15 19 13.5 19 11.5C19 9.5 17.5 8 15.5 8C14.5 8 13.5 8.5 13 9.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 11.5H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

const ListeningIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Listening icon (the ear) */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for an ear */}
        <path
          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12C9 10.5 10 9.5 11 9.5C12 9.5 13 10.5 13 12C13 13.5 12 14.5 11 14.5C10 14.5 9 13.5 9 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9C12 7.5 13 6.5 14 6.5C15 6.5 16 7.5 16 9C16 10.5 15 11.5 14 11.5C13 11.5 12 10.5 12 9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

const SpeakingIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Speaking icon (the speech bubble) */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for a speech bubble */}
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C14.2801 22 16.3768 21.2227 18.0622 19.919L20 21L19.0886 17.447C20.6276 15.6881 21.5 13.9189 21.5 12C21.5 6.47715 17.0228 2 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

const InterpersonalIcon = ({ size }: { size?: number | string }) => {
  return (
    <IconWrapper size={size as number}>
      {/* Replace this with the actual SVG for the Interpersonal icon (the handshake) */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Example placeholder SVG for a handshake */}
        <path
          d="M17 14L12 9L7 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 18L10 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 18L19 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21V3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

export {
  ReadingIcon,
  WritingIcon,
  GrammarIcon,
  ListeningIcon,
  SpeakingIcon,
  InterpersonalIcon,
};
