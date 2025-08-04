import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { textStyles } from '../../theme/typography';

interface TextProps extends RNTextProps {
  variant?: keyof typeof textStyles;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'expense' | 'income';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const getTextColor = () => {
    switch (color) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.textSecondary;
      case 'tertiary':
        return colors.textTertiary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'expense':
        return colors.expense;
      case 'income':
        return colors.income;
      default:
        return colors.text;
    }
  };

  const textStyle: TextStyle = {
    ...textStyles[variant],
    color: getTextColor(),
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};