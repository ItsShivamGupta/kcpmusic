import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { spacing } from '../../theme/spacing';

interface BarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      color?: (opacity: number) => string;
    }>;
  };
  title?: string;
}

const screenWidth = Dimensions.get('window').width;

export const BarChart: React.FC<BarChartProps> = ({ data, title = 'Expense Trends' }) => {
  const { colors } = useTheme();

  if (!data || !data.datasets || data.datasets.length === 0) {
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

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.border,
      strokeWidth: 1,
    },
  };

  return (
    <Card>
      <Text variant="h4" style={{ marginBottom: spacing.md }}>
        {title}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <RNBarChart
          data={data}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          showValuesOnTopOfBars
          fromZero
        />
      </View>
    </Card>
  );
};