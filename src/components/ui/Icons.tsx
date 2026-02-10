
export const IconProps = {
  className: '',
  size: 24,
};

type IconComponentProps = {
  className?: string;
  size?: number;
};

export const Icons = {
  Logo: ({ className, size = 32 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 2L4 8L16 14L28 8L16 2Z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M4 24L16 30L28 24V14L16 20L4 14V24Z" fill="currentColor"/>
      <path d="M16 14V20L28 14L16 8V14Z" fill="currentColor" fillOpacity="0.6"/>
      <path d="M16 14V20L4 14L16 8V14Z" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  ),

  Home: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 12L12 3L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  User: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21V19C4 16.7909 5.79086 15 8 15H16C18.2091 15 20 16.7909 20 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Blog: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Project: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 19V9C22 7.89543 21.1046 7 20 7H14L12 5H4C2.89543 5 2 5.89543 2 7V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),

  Lab: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 13L8.5 5H15.5L18 13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 13L21 20C21.5523 21.288 20.5 22 19 22H5C3.5 22 2.44772 21.288 3 20L6 13H18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Github: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.98 6.14 17.98C5.68 16.82 5.03 16.5 5.03 16.5C4.13 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.43C7.97 16.17 5.65 15.31 5.65 11.5C5.65 10.42 6.03 9.54 6.65 8.87C6.55 8.62 6.2 7.6 6.75 6.26C6.75 6.26 7.59 6 9.5 7.31C10.29 7.08 11.15 6.97 12 6.97C12.85 6.97 13.71 7.08 14.5 7.31C16.41 6 17.25 6.26 17.25 6.26C17.8 7.6 17.45 8.62 17.35 8.87C17.98 9.54 18.35 10.42 18.35 11.5C18.35 15.31 16.03 16.17 13.81 16.43C14.17 16.74 14.49 17.34 14.49 18.28C14.49 19.61 14.48 20.68 14.48 21C14.48 21.28 14.64 21.59 15.15 21.5C19.12 20.17 22 16.42 22 12C22 6.477 17.522 2 12 2Z" fill="currentColor"/>
    </svg>
  ),

  Storage: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 14H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Menu: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  ChevronLeft: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  ChevronRight: ({ className, size = 20 }: IconComponentProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};
