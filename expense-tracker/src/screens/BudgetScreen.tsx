import React, { useState, useMemo } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../hooks/useExpenses';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { CategorySelector } from '../components/expense/CategorySelector';
import { Budget, Category } from '../types';
import { spacing, borderRadius } from '../theme/spacing';

interface BudgetItemProps {
  budget: Budget;
  category: Category;
  spent: number;
  onEdit: () => void;
  onDelete: () => void;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget, category, spent, onEdit, onDelete }) => {
  const { colors } = useTheme();
  
  const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
  const isOverBudget = spent > budget.amount;
  const remainingAmount = budget.amount - spent;

  const getProgressColor = () => {
    if (isOverBudget) return colors.error;
    if (percentage > 80) return colors.warning;
    return colors.success;
  };

  return (
    <Card style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
        <View style={{
          backgroundColor: category.color + '20',
          borderRadius: borderRadius.md,
          padding: spacing.sm,
          marginRight: spacing.md,
        }}>
          <Ionicons
            name={category.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={category.color}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyMedium">{category.name}</Text>
          <Text variant="caption" color="secondary">
            {budget.period} budget
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title=""
            onPress={onEdit}
            variant="ghost"
            size="sm"
            icon={<Ionicons name="pencil" size={16} color={colors.textSecondary} />}
          />
          <Button
            title=""
            onPress={onDelete}
            variant="ghost"
            size="sm"
            icon={<Ionicons name="trash" size={16} color={colors.error} />}
          />
        </View>
      </View>

      <View style={{ marginBottom: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
          <Text variant="caption" color="secondary">
            ${spent.toFixed(2)} of ${budget.amount.toFixed(2)}
          </Text>
          <Text variant="caption" style={{ color: getProgressColor() }}>
            {percentage.toFixed(1)}%
          </Text>
        </View>
        
        <View style={{
          height: 8,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: borderRadius.sm,
          overflow: 'hidden',
        }}>
          <View style={{
            height: '100%',
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: getProgressColor(),
            borderRadius: borderRadius.sm,
          }} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text variant="caption" color={remainingAmount >= 0 ? 'secondary' : 'error'}>
          {remainingAmount >= 0 ? 'Remaining' : 'Over budget'}
        </Text>
        <Text variant="caption" color={remainingAmount >= 0 ? 'success' : 'error'}>
          ${Math.abs(remainingAmount).toFixed(2)}
        </Text>
      </View>
    </Card>
  );
};

export const BudgetScreen: React.FC = () => {
  const { colors } = useTheme();
  const { categories, budgets, addBudget, expenses, getExpensesByCategory } = useExpenses();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetPeriod, setBudgetPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [loading, setLoading] = useState(false);

  const budgetData = useMemo(() => {
    return budgets.map(budget => {
      const category = categories.find(cat => cat.id === budget.categoryId);
      const categoryExpenses = expenses.filter(expense => 
        expense.category === budget.categoryId && 
        expense.type === 'expense' &&
        expense.date >= budget.startDate &&
        expense.date <= budget.endDate
      );
      const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        budget,
        category: category || { id: '', name: 'Unknown', icon: 'help', color: '#94A3B8' },
        spent,
      };
    });
  }, [budgets, categories, expenses]);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);

  const handleAddBudget = async () => {
    if (!selectedCategory || !budgetAmount || parseFloat(budgetAmount) <= 0) {
      Alert.alert('Error', 'Please select a category and enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      
      const now = new Date();
      let startDate: Date;
      let endDate: Date;

      switch (budgetPeriod) {
        case 'daily':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);
          break;
        case 'weekly':
          const dayOfWeek = now.getDay();
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
          endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
          break;
        case 'monthly':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
          break;
      }

      await addBudget({
        categoryId: selectedCategory.id,
        amount: parseFloat(budgetAmount),
        period: budgetPeriod,
        startDate,
        endDate,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowAddForm(false);
      setSelectedCategory(null);
      setBudgetAmount('');
    } catch (error) {
      console.error('Error adding budget:', error);
      Alert.alert('Error', 'Failed to add budget. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const periodButtons = [
    { key: 'daily' as const, label: 'Daily' },
    { key: 'weekly' as const, label: 'Weekly' },
    { key: 'monthly' as const, label: 'Monthly' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md }}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
        }}>
          <View>
            <Text variant="h2">Budget</Text>
            <Text variant="caption" color="secondary">
              Manage your spending limits
            </Text>
          </View>
          <Button
            title=""
            onPress={() => setShowAddForm(!showAddForm)}
            variant="primary"
            size="sm"
            icon={<Ionicons name={showAddForm ? 'close' : 'add'} size={24} color={colors.background} />}
          />
        </View>

        {/* Summary Card */}
        <Card style={{ marginBottom: spacing.lg }}>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Budget Overview
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text variant="caption" color="secondary">Total Budget</Text>
            <Text variant="bodyMedium">${totalBudget.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text variant="caption" color="secondary">Total Spent</Text>
            <Text variant="bodyMedium" color="expense">${totalSpent.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" color="secondary">Remaining</Text>
            <Text variant="bodyMedium" color={totalBudget - totalSpent >= 0 ? 'success' : 'error'}>
              ${Math.abs(totalBudget - totalSpent).toFixed(2)}
            </Text>
          </View>
        </Card>

        {/* Add Budget Form */}
        {showAddForm && (
          <Card style={{ marginBottom: spacing.lg }}>
            <Text variant="h4" style={{ marginBottom: spacing.md }}>
              Add New Budget
            </Text>
            
            {/* Period Selector */}
            <View style={{ marginBottom: spacing.md }}>
              <Text variant="bodyMedium" style={{ marginBottom: spacing.sm }}>
                Budget Period
              </Text>
              <View style={{
                flexDirection: 'row',
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 12,
                padding: spacing.xs,
              }}>
                {periodButtons.map((button) => (
                  <Button
                    key={button.key}
                    title={button.label}
                    onPress={() => setBudgetPeriod(button.key)}
                    variant={budgetPeriod === button.key ? 'primary' : 'ghost'}
                    size="sm"
                    style={{ flex: 1, marginHorizontal: spacing.xs }}
                  />
                ))}
              </View>
            </View>

            {/* Amount Input */}
            <Input
              label="Budget Amount"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              icon="cash"
              containerStyle={{ marginBottom: spacing.md }}
            />

            {/* Category Selector */}
            <CategorySelector
              categories={categories}
              selectedCategoryId={selectedCategory?.id}
              onSelectCategory={setSelectedCategory}
              type="expense"
            />

            <Button
              title="Add Budget"
              onPress={handleAddBudget}
              loading={loading}
              disabled={loading || !selectedCategory || !budgetAmount}
              style={{ marginTop: spacing.md }}
            />
          </Card>
        )}

        {/* Budget List */}
        {budgetData.length > 0 ? (
          budgetData.map((item) => (
            <BudgetItem
              key={item.budget.id}
              budget={item.budget}
              category={item.category}
              spent={item.spent}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))
        ) : (
          <Card>
            <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
              <Ionicons name="pie-chart-outline" size={64} color={colors.textTertiary} />
              <Text variant="h4" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
                No Budgets Yet
              </Text>
              <Text color="secondary" style={{ textAlign: 'center', marginBottom: spacing.lg }}>
                Create your first budget to start tracking your spending limits
              </Text>
              <Button
                title="Add Budget"
                onPress={() => setShowAddForm(true)}
                icon={<Ionicons name="add" size={20} color={colors.background} />}
              />
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};