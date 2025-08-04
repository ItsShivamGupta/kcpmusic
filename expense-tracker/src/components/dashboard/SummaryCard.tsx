import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  icon: keyof typeof Ionicons.glyphMap;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  type,
  icon,
  trend,
}) => {
  const { colors } = useTheme();

  const getAmountColor = () => {
    switch (type) {
      case 'income':
        return colors.income;
      case 'expense':
        return colors.expense;
      case 'balance':
        return amount >= 0 ? colors.income : colors.expense;
      default:
        return colors.text;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'income':
        return colors.income;
      case 'expense':
        return colors.expense;
      case 'balance':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const cardStyle: ViewStyle = {
    flex: 1,
    marginHorizontal: spacing.xs,
  };

  return (
    <Card style={cardStyle} padding="md">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
        <View
          style={{
            backgroundColor: getIconColor() + '20',
            borderRadius: 8,
            padding: spacing.sm,
            marginRight: spacing.sm,
          }}
        >
          <Ionicons name={icon} size={20} color={getIconColor()} />
        </View>
        <Text variant="caption" color="secondary" style={{ flex: 1 }}>
          {title}
        </Text>
      </View>

      <Text variant="h3" style={{ color: getAmountColor(), marginBottom: spacing.xs }}>
        {type === 'balance' && amount < 0 ? '-' : ''}
        {formatAmount(amount)}
      </Text>

      {trend && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={trend.isPositive ? 'trending-up' : 'trending-down'}
            size={16}
            color={trend.isPositive ? colors.success : colors.error}
          />
          <Text
            variant="small"
            style={{
              color: trend.isPositive ? colors.success : colors.error,
              marginLeft: spacing.xs,
            }}
          >
            {Math.abs(trend.value).toFixed(1)}%
          </Text>
        </View>
      )}
    </Card>
  );
};