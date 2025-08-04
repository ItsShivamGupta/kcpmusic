import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  elevation?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  margin,
  elevation = 'md',
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing[padding],
    marginVertical: margin ? spacing[margin] : 0,
    ...shadows[elevation],
    shadowColor: colors.shadow,
  };

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
};