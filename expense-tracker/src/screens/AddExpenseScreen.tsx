import React, { useState } from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../hooks/useExpenses';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { CategorySelector } from '../components/expense/CategorySelector';
import { Category, Expense } from '../types';
import { spacing } from '../theme/spacing';

interface AddExpenseScreenProps {
  navigation: any;
}

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { categories, addExpense } = useExpenses();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    description?: string;
    category?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setLoading(true);
      
      const expenseData: Omit<Expense, 'id'> = {
        amount: parseFloat(amount),
        description: description.trim(),
        category: selectedCategory!.id,
        date: new Date(),
        type,
      };

      await addExpense(expenseData);
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      Alert.alert(
        'Success!',
        `${type === 'expense' ? 'Expense' : 'Income'} added successfully`,
        [
          {
            text: 'Add Another',
            onPress: () => {
              setAmount('');
              setDescription('');
              setSelectedCategory(null);
              setErrors({});
            },
          },
          {
            text: 'Go to Dashboard',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Error', 'Failed to add expense. Please try again.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    return cleaned;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
          }}>
            <View>
              <Text variant="h2">Add Transaction</Text>
              <Text variant="caption" color="secondary">
                Track your {type === 'expense' ? 'expenses' : 'income'}
              </Text>
            </View>
            <Button
              title=""
              onPress={() => navigation.goBack()}
              variant="ghost"
              size="sm"
              icon={<Ionicons name="close" size={24} color={colors.textSecondary} />}
            />
          </View>

          {/* Type Selector */}
          <Card style={{ marginBottom: spacing.lg }}>
            <Text variant="h4" style={{ marginBottom: spacing.md }}>
              Transaction Type
            </Text>
            <View style={{
              flexDirection: 'row',
              backgroundColor: colors.backgroundSecondary,
              borderRadius: 12,
              padding: spacing.xs,
            }}>
              <Button
                title="Expense"
                onPress={() => {
                  setType('expense');
                  setSelectedCategory(null);
                }}
                variant={type === 'expense' ? 'primary' : 'ghost'}
                size="sm"
                style={{ flex: 1, marginHorizontal: spacing.xs }}
                icon={<Ionicons name="remove-circle" size={20} color={
                  type === 'expense' ? colors.background : colors.expense
                } />}
              />
              <Button
                title="Income"
                onPress={() => {
                  setType('income');
                  setSelectedCategory(null);
                }}
                variant={type === 'income' ? 'secondary' : 'ghost'}
                size="sm"
                style={{ flex: 1, marginHorizontal: spacing.xs }}
                icon={<Ionicons name="add-circle" size={20} color={
                  type === 'income' ? colors.background : colors.income
                } />}
              />
            </View>
          </Card>

          {/* Amount Input */}
          <Card style={{ marginBottom: spacing.lg }}>
            <Input
              label="Amount"
              value={amount}
              onChangeText={(text) => setAmount(formatAmount(text))}
              placeholder="0.00"
              keyboardType="decimal-pad"
              icon="cash"
              error={errors.amount}
              style={{ fontSize: 24, fontWeight: '600' }}
            />
          </Card>

          {/* Description Input */}
          <Card style={{ marginBottom: spacing.lg }}>
            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="What did you spend on?"
              icon="document-text"
              error={errors.description}
              maxLength={100}
            />
          </Card>

          {/* Category Selector */}
          <Card style={{ marginBottom: spacing.lg }}>
            <CategorySelector
              categories={categories}
              selectedCategoryId={selectedCategory?.id}
              onSelectCategory={setSelectedCategory}
              type={type}
            />
            {errors.category && (
              <Text variant="caption" color="error" style={{ marginTop: spacing.sm }}>
                {errors.category}
              </Text>
            )}
          </Card>

          {/* Selected Category Display */}
          {selectedCategory && (
            <Card style={{ marginBottom: spacing.lg }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: spacing.sm,
              }}>
                <View style={{
                  backgroundColor: selectedCategory.color + '20',
                  borderRadius: 8,
                  padding: spacing.sm,
                  marginRight: spacing.md,
                }}>
                  <Ionicons
                    name={selectedCategory.icon as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color={selectedCategory.color}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyMedium">{selectedCategory.name}</Text>
                  <Text variant="caption" color="secondary">
                    Selected category
                  </Text>
                </View>
                <Text variant="h3" color={type === 'expense' ? 'expense' : 'income'}>
                  {type === 'expense' ? '-' : '+'}${amount || '0.00'}
                </Text>
              </View>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            title={`Add ${type === 'expense' ? 'Expense' : 'Income'}`}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            size="lg"
            style={{ marginBottom: spacing.xl }}
            icon={<Ionicons 
              name={type === 'expense' ? 'remove-circle' : 'add-circle'} 
              size={24} 
              color={colors.background} 
            />}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};