// Centralized theme colors for components
// This file exports colors that can be used in both Tailwind classes and component logic

export const themeColors = {
  primary: '#2563EB',      // Blue from YOUR ONLINE EMBA logo - Brand color for CTAs, headers, icons
  secondary: '#FFFFFF',     // White from logo - Footer, headings, bold text
  accent: '#1E40AF',       // Darker blue for highlights, "Apply Now" buttons, star icons
  background: '#F8FAFC',   // Main page sections (light blue-tinted white)
  text: '#1E293B',         // Body paragraphs for high readability
  dark: '#0F172A',         // Dark blue background for footer/navbar
  white: '#FFFFFF',        // Pure white
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  }
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Export commonly used color combinations
export const colorCombos = {
  primaryText: themeColors.primary,
  primaryHover: '#1D4ED8', // Darker shade of blue
  accentText: themeColors.accent,
  accentHover: '#1E3A8A', // Darker shade of accent blue
  textMuted: getColorWithOpacity(themeColors.text, 0.8),
  textLight: getColorWithOpacity(themeColors.text, 0.6),
  borderLight: getColorWithOpacity(themeColors.text, 0.2),
  borderMedium: getColorWithOpacity(themeColors.text, 0.3),
  borderPrimary: getColorWithOpacity(themeColors.primary, 0.1),
  borderAccent: getColorWithOpacity(themeColors.accent, 0.2),
  shadowPrimary: getColorWithOpacity(themeColors.primary, 0.2),
  shadowAccent: getColorWithOpacity(themeColors.accent, 0.2),
};

// Tailwind CSS custom colors configuration
export const tailwindColors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  accent: {
    50: '#E0F2FE',
    100: '#BAE6FD',
    200: '#7DD3FC',
    300: '#38BDF8',
    400: '#0EA5E9',
    500: '#0284C7',
    600: '#0369A1',
    700: '#075985',
    800: '#0C4A6E',
    900: '#082F49',
    950: '#082F49',
  }
};

// Common CSS classes for consistent styling
export const themeClasses = {
  // Button styles
  buttons: {
    primary: 'bg-primary hover:bg-primaryHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary',
    accent: 'bg-accent hover:bg-accentHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-accent',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10 font-bold transition-all',
  },
  
  // Text styles
  text: {
    primary: 'text-primary',
    accent: 'text-accent',
    muted: 'text-gray-600',
    light: 'text-gray-500',
  },
  
  // Border styles
  borders: {
    primary: 'border border-primary',
    accent: 'border border-accent',
    light: 'border border-gray-200',
  },
  
  // Background styles
  backgrounds: {
    primary: 'bg-primary',
    accent: 'bg-accent',
    muted: 'bg-gray-50',
    card: 'bg-white',
  },
  
  // Shadow styles
  shadows: {
    primary: 'shadow-lg shadow-primary',
    accent: 'shadow-lg shadow-accent',
    card: 'shadow-md',
  }
};

// Gradient combinations
export const gradients = {
  primary: 'from-primary to-primaryHover',
  accent: 'from-accent to-accentHover',
  hero: 'from-primary via-primaryHover to-dark',
  card: 'from-white via-white to-background',
};
