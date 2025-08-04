import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-chart-kit';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { spacing } from '../../theme/spacing';

interface PieChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface PieChartProps {
  data: Array<{
    categoryName: string;
    amount: number;
    categoryColor: string;
  }>;
  title?: string;
}

const screenWidth = Dimensions.get('window').width;

export const PieChart: React.FC<PieChartProps> = ({ data, title = 'Expenses by Category' }) => {
  const { colors } = useTheme();

  if (!data || data.length === 0) {
    return (
      <Card>
        <Text variant="h4" style={{ marginBottom: spacing.md }}>
          {title}
        </Text>
        <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
          <Text color="secondary">No data available</Text>
        </View>
      </Card>
    );
  }

  const chartData: PieChartData[] = data.map(item => ({
    name: item.categoryName,
    amount: item.amount,
    color: item.categoryColor,
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => colors.text,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
    },
  };

  return (
    <Card>
      <Text variant="h4" style={{ marginBottom: spacing.md }}>
        {title}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <RNPieChart
          data={chartData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
        />
      </View>
    </Card>
  );
};