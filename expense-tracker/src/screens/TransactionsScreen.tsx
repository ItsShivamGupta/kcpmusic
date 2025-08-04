import React, { useState, useMemo } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../hooks/useExpenses';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Expense } from '../types';
import { spacing, borderRadius } from '../theme/spacing';

interface TransactionItemProps {
  expense: Expense;
  category: { name: string; icon: string; color: string };
  onPress: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ expense, category, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
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
          <Text variant="bodyMedium" numberOfLines={1}>
            {expense.description}
          </Text>
          <Text variant="caption" color="secondary">
            {category.name} • {expense.date.toLocaleDateString()}
          </Text>
        </View>
        
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            variant="bodyMedium"
            color={expense.type === 'expense' ? 'expense' : 'income'}
            style={{ fontWeight: '600' }}
          >
            {expense.type === 'expense' ? '-' : '+'}${expense.amount.toFixed(2)}
          </Text>
          <Text variant="small" color="tertiary">
            {expense.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TransactionsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { expenses, categories } = useExpenses();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categories.find(cat => cat.id === expense.category)?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(expense => expense.type === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

    return filtered;
  }, [expenses, categories, searchQuery, filterType, sortBy]);

  const groupedExpenses = useMemo(() => {
    const groups: { [key: string]: Expense[] } = {};
    
    filteredAndSortedExpenses.forEach(expense => {
      const dateKey = expense.date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(expense);
    });

    return Object.entries(groups).map(([date, expenses]) => ({
      date: new Date(date),
      expenses,
      total: expenses.reduce((sum, exp) => sum + (exp.type === 'expense' ? -exp.amount : exp.amount), 0),
    }));
  }, [filteredAndSortedExpenses]);

  const renderTransactionGroup = ({ item }: { item: typeof groupedExpenses[0] }) => (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.xs,
      }}>
        <Text variant="bodyMedium">
          {item.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Text>
        <Text
          variant="bodyMedium"
          color={item.total >= 0 ? 'income' : 'expense'}
          style={{ fontWeight: '600' }}
        >
          {item.total >= 0 ? '+' : ''}${item.total.toFixed(2)}
        </Text>
      </View>
      
      {item.expenses.map(expense => {
        const category = categories.find(cat => cat.id === expense.category) || {
          name: 'Unknown',
          icon: 'help',
          color: '#94A3B8',
        };
        
        return (
          <TransactionItem
            key={expense.id}
            expense={expense}
            category={category}
            onPress={() => {}}
          />
        );
      })}
    </View>
  );

  const filterButtons = [
    { key: 'all' as const, label: 'All', icon: 'list' },
    { key: 'expense' as const, label: 'Expenses', icon: 'remove-circle' },
    { key: 'income' as const, label: 'Income', icon: 'add-circle' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: spacing.md }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
        }}>
          <View>
            <Text variant="h2">Transactions</Text>
            <Text variant="caption" color="secondary">
              {filteredAndSortedExpenses.length} transactions
            </Text>
          </View>
          <Button
            title=""
            onPress={() => setSortBy(sortBy === 'date' ? 'amount' : 'date')}
            variant="ghost"
            size="sm"
            icon={<Ionicons 
              name={sortBy === 'date' ? 'calendar' : 'cash'} 
              size={20} 
              color={colors.primary} 
            />}
          />
        </View>

        {/* Search */}
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon="search"
          containerStyle={{ marginBottom: spacing.md }}
        />

        {/* Filter Buttons */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 12,
          padding: spacing.xs,
          marginBottom: spacing.lg,
        }}>
          {filterButtons.map((button) => (
            <Button
              key={button.key}
              title={button.label}
              onPress={() => setFilterType(button.key)}
              variant={filterType === button.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1, marginHorizontal: spacing.xs }}
              icon={<Ionicons 
                name={button.icon as keyof typeof Ionicons.glyphMap} 
                size={16} 
                color={filterType === button.key ? colors.background : colors.textSecondary} 
              />}
            />
          ))}
        </View>

        {/* Transactions List */}
        {groupedExpenses.length > 0 ? (
          <FlatList
            data={groupedExpenses}
            renderItem={renderTransactionGroup}
            keyExtractor={(item) => item.date.toDateString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Card>
            <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
              <Ionicons name="receipt-outline" size={64} color={colors.textTertiary} />
              <Text variant="h4" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
                {searchQuery ? 'No Results Found' : 'No Transactions Yet'}
              </Text>
              <Text color="secondary" style={{ textAlign: 'center' }}>
                {searchQuery 
                  ? 'Try adjusting your search or filters'
                  : 'Start tracking your expenses and income'
                }
              </Text>
            </View>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
};