export const typography = {
  fonts: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  lineHeights: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 56,
  },
  
  letterSpacing: {
    tight: -0.025,
    normal: 0,
    wide: 0.025,
  },
};

export const textStyles = {
  h1: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.lineHeights['4xl'],
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.lineHeights['3xl'],
    letterSpacing: typography.letterSpacing.tight,
  },
  h3: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.semiBold,
    lineHeight: typography.lineHeights['2xl'],
  },
  h4: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semiBold,
    lineHeight: typography.lineHeights.xl,
  },
  body: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.lineHeights.base,
  },
  bodyMedium: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.lineHeights.base,
  },
  caption: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.lineHeights.sm,
  },
  small: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.lineHeights.xs,
  },
};