import React, { useState, useMemo } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../hooks/useExpenses';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { PieChart } from '../components/charts/PieChart';
import { BarChart } from '../components/charts/BarChart';
import { TimeRange } from '../types';
import { spacing } from '../theme/spacing';

export const DashboardScreen: React.FC = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const { 
    expenses, 
    loading, 
    getTotalByType, 
    getExpensesByCategory,
    getExpensesByTimeRange 
  } = useExpenses();
  
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - in real app, you'd reload data
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const summaryData = useMemo(() => {
    const income = getTotalByType('income', timeRange);
    const expense = getTotalByType('expense', timeRange);
    const balance = income - expense;

    return { income, expense, balance };
  }, [expenses, timeRange, getTotalByType]);

  const pieChartData = useMemo(() => {
    return getExpensesByCategory(timeRange);
  }, [expenses, timeRange, getExpensesByCategory]);

  const barChartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const labels = last7Days.map(date => 
      date.toLocaleDateString('en-US', { weekday: 'short' })
    );

    const data = last7Days.map(date => {
      const dayExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === date.toDateString() && 
               expense.type === 'expense';
      });
      return dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    });

    return {
      labels,
      datasets: [{
        data,
        color: (opacity = 1) => colors.primary,
      }],
    };
  }, [expenses, colors.primary]);

  const timeRangeButtons = [
    { key: 'daily' as TimeRange, label: 'Day' },
    { key: 'weekly' as TimeRange, label: 'Week' },
    { key: 'monthly' as TimeRange, label: 'Month' },
    { key: 'yearly' as TimeRange, label: 'Year' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: spacing.lg 
        }}>
          <View>
            <Text variant="h2">Dashboard</Text>
            <Text variant="caption" color="secondary">
              Track your financial journey
            </Text>
          </View>
          <Button
            title=""
            onPress={toggleTheme}
            variant="ghost"
            size="sm"
            icon={
              <Ionicons 
                name={isDark ? 'sunny' : 'moon'} 
                size={24} 
                color={colors.primary} 
              />
            }
          />
        </View>

        {/* Time Range Selector */}
        <View style={{ 
          flexDirection: 'row', 
          marginBottom: spacing.lg,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 12,
          padding: spacing.xs,
        }}>
          {timeRangeButtons.map((button) => (
            <Button
              key={button.key}
              title={button.label}
              onPress={() => setTimeRange(button.key)}
              variant={timeRange === button.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1, marginHorizontal: spacing.xs }}
            />
          ))}
        </View>

        {/* Summary Cards */}
        <View style={{ 
          flexDirection: 'row', 
          marginBottom: spacing.lg 
        }}>
          <SummaryCard
            title="Income"
            amount={summaryData.income}
            type="income"
            icon="trending-up"
          />
          <SummaryCard
            title="Expenses"
            amount={summaryData.expense}
            type="expense"
            icon="trending-down"
          />
          <SummaryCard
            title="Balance"
            amount={summaryData.balance}
            type="balance"
            icon="wallet"
          />
        </View>

        {/* Charts */}
        <View style={{ marginBottom: spacing.lg }}>
          <PieChart 
            data={pieChartData}
            title="Expenses by Category"
          />
        </View>

        <View style={{ marginBottom: spacing.lg }}>
          <BarChart 
            data={barChartData}
            title="Daily Expense Trend"
          />
        </View>

        {/* Recent Transactions Preview */}
        <View style={{ 
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: spacing.md,
          marginBottom: spacing.lg 
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: spacing.md 
          }}>
            <Text variant="h4">Recent Transactions</Text>
            <Button
              title="View All"
              onPress={() => {}}
              variant="ghost"
              size="sm"
            />
          </View>
          
          {expenses.slice(0, 3).map((expense) => (
            <View 
              key={expense.id}
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View>
                <Text variant="bodyMedium">{expense.description}</Text>
                <Text variant="caption" color="secondary">
                  {expense.date.toLocaleDateString()}
                </Text>
              </View>
              <Text 
                variant="bodyMedium" 
                color={expense.type === 'expense' ? 'expense' : 'income'}
              >
                {expense.type === 'expense' ? '-' : '+'}
                ${expense.amount.toFixed(2)}
              </Text>
            </View>
          ))}
          
          {expenses.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
              <Ionicons name="receipt-outline" size={48} color={colors.textTertiary} />
              <Text color="secondary" style={{ marginTop: spacing.sm }}>
                No transactions yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};