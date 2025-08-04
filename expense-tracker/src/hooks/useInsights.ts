import { useMemo } from 'react';
import { Expense, Category, Insight } from '../types';

interface UseInsightsProps {
  expenses: Expense[];
  categories: Category[];
}

export const useInsights = ({ expenses, categories }: UseInsightsProps) => {
  const insights = useMemo(() => {
    const currentMonth = new Date();
    const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const thisMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    
    const thisMonthExpenses = expenses.filter(expense => 
      expense.type === 'expense' && expense.date >= thisMonthStart
    );
    
    const lastMonthExpenses = expenses.filter(expense => 
      expense.type === 'expense' && 
      expense.date >= lastMonth && 
      expense.date < thisMonthStart
    );

    const insights: Insight[] = [];

    // Monthly spending comparison
    const thisMonthTotal = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    if (lastMonthTotal > 0) {
      const percentageChange = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      
      if (percentageChange > 20) {
        insights.push({
          id: 'spending-increase',
          type: 'warning',
          title: 'Spending Increased',
          description: `Your spending is ${percentageChange.toFixed(1)}% higher than last month`,
          value: percentageChange,
        });
      } else if (percentageChange < -10) {
        insights.push({
          id: 'spending-decrease',
          type: 'success',
          title: 'Great Job!',
          description: `You've reduced spending by ${Math.abs(percentageChange).toFixed(1)}% this month`,
          value: Math.abs(percentageChange),
        });
      }
    }

    // Top spending category
    const categorySpending = thisMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categorySpending).reduce((max, [categoryId, amount]) => {
      return amount > max.amount ? { categoryId, amount } : max;
    }, { categoryId: '', amount: 0 });

    if (topCategory.amount > 0) {
      const category = categories.find(cat => cat.id === topCategory.categoryId);
      const percentage = (topCategory.amount / thisMonthTotal) * 100;
      
      if (percentage > 40) {
        insights.push({
          id: 'top-category',
          type: 'info',
          title: 'Top Spending Category',
          description: `${category?.name || 'Unknown'} accounts for ${percentage.toFixed(1)}% of your spending`,
          value: percentage,
        });
      }
    }

    // Frequent small transactions
    const smallTransactions = thisMonthExpenses.filter(exp => exp.amount < 10);
    if (smallTransactions.length > 20) {
      const totalSmall = smallTransactions.reduce((sum, exp) => sum + exp.amount, 0);
      insights.push({
        id: 'small-transactions',
        type: 'info',
        title: 'Small Purchases Add Up',
        description: `You've made ${smallTransactions.length} small purchases totaling $${totalSmall.toFixed(2)}`,
        value: totalSmall,
      });
    }

    // Weekend vs weekday spending
    const weekendExpenses = thisMonthExpenses.filter(exp => {
      const day = exp.date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    });
    
    const weekdayExpenses = thisMonthExpenses.filter(exp => {
      const day = exp.date.getDay();
      return day > 0 && day < 6; // Monday to Friday
    });

    const weekendTotal = weekendExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const weekdayTotal = weekdayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (weekendTotal > weekdayTotal * 0.4) { // Weekend spending is more than 40% of weekday spending
      const weekendPercentage = (weekendTotal / thisMonthTotal) * 100;
      insights.push({
        id: 'weekend-spending',
        type: 'info',
        title: 'Weekend Spending',
        description: `${weekendPercentage.toFixed(1)}% of your spending happens on weekends`,
        value: weekendPercentage,
      });
    }

    // Daily average
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const currentDay = currentMonth.getDate();
    const dailyAverage = thisMonthTotal / currentDay;
    
    if (dailyAverage > 50) {
      insights.push({
        id: 'daily-average',
        type: 'info',
        title: 'Daily Spending Average',
        description: `You're spending an average of $${dailyAverage.toFixed(2)} per day this month`,
        value: dailyAverage,
      });
    }

    return insights;
  }, [expenses, categories]);

  const monthlyTrend = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        year: date.getFullYear(),
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    }).reverse();

    return last6Months.map(period => {
      const monthExpenses = expenses.filter(expense => 
        expense.type === 'expense' &&
        expense.date >= period.startDate && 
        expense.date <= period.endDate
      );
      
      return {
        period: period.month,
        amount: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      };
    });
  }, [expenses]);

  const categoryTrends = useMemo(() => {
    const currentMonth = new Date();
    const thisMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    
    const thisMonthByCategory = expenses
      .filter(exp => exp.type === 'expense' && exp.date >= thisMonthStart)
      .reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {} as Record<string, number>);

    const lastMonthByCategory = expenses
      .filter(exp => 
        exp.type === 'expense' && 
        exp.date >= lastMonthStart && 
        exp.date < thisMonthStart
      )
      .reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.keys({ ...thisMonthByCategory, ...lastMonthByCategory }).map(categoryId => {
      const category = categories.find(cat => cat.id === categoryId);
      const thisMonth = thisMonthByCategory[categoryId] || 0;
      const lastMonth = lastMonthByCategory[categoryId] || 0;
      const change = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

      return {
        categoryId,
        categoryName: category?.name || 'Unknown',
        categoryColor: category?.color || '#94A3B8',
        thisMonth,
        lastMonth,
        change,
      };
    }).filter(item => item.thisMonth > 0 || item.lastMonth > 0);
  }, [expenses, categories]);

  return {
    insights,
    monthlyTrend,
    categoryTrends,
  };
};