import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Category, Budget, TimeRange } from '../types';
import { defaultCategories, incomeCategories } from '../data/categories';

const EXPENSES_KEY = 'expenses';
const CATEGORIES_KEY = 'categories';
const BUDGETS_KEY = 'budgets';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load expenses
      const expensesData = await AsyncStorage.getItem(EXPENSES_KEY);
      if (expensesData) {
        const parsedExpenses = JSON.parse(expensesData).map((expense: any) => ({
          ...expense,
          date: new Date(expense.date),
        }));
        setExpenses(parsedExpenses);
      }

      // Load categories
      const categoriesData = await AsyncStorage.getItem(CATEGORIES_KEY);
      if (categoriesData) {
        setCategories(JSON.parse(categoriesData));
      } else {
        const allCategories = [...defaultCategories, ...incomeCategories];
        setCategories(allCategories);
        await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(allCategories));
      }

      // Load budgets
      const budgetsData = await AsyncStorage.getItem(BUDGETS_KEY);
      if (budgetsData) {
        const parsedBudgets = JSON.parse(budgetsData).map((budget: any) => ({
          ...budget,
          startDate: new Date(budget.startDate),
          endDate: new Date(budget.endDate),
        }));
        setBudgets(parsedBudgets);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense: Expense = {
        ...expense,
        id: Date.now().toString(),
      };
      
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
      
      return newExpense;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const updateExpense = async (id: string, updatedExpense: Partial<Expense>) => {
    try {
      const updatedExpenses = expenses.map(expense =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      );
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'spent'>) => {
    try {
      const newBudget: Budget = {
        ...budget,
        id: Date.now().toString(),
        spent: 0,
      };
      
      const updatedBudgets = [...budgets, newBudget];
      setBudgets(updatedBudgets);
      await AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(updatedBudgets));
      
      return newBudget;
    } catch (error) {
      console.error('Error adding budget:', error);
      throw error;
    }
  };

  const getExpensesByTimeRange = (timeRange: TimeRange) => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    return expenses.filter(expense => expense.date >= startDate);
  };

  const getTotalByType = (type: 'expense' | 'income', timeRange?: TimeRange) => {
    const filteredExpenses = timeRange ? getExpensesByTimeRange(timeRange) : expenses;
    return filteredExpenses
      .filter(expense => expense.type === type)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = (timeRange?: TimeRange) => {
    const filteredExpenses = timeRange ? getExpensesByTimeRange(timeRange) : expenses;
    const expensesByCategory = filteredExpenses
      .filter(expense => expense.type === 'expense')
      .reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(expensesByCategory).map(([categoryId, amount]) => {
      const category = categories.find(cat => cat.id === categoryId);
      return {
        categoryId,
        categoryName: category?.name || 'Unknown',
        categoryColor: category?.color || '#94A3B8',
        amount,
      };
    });
  };

  return {
    expenses,
    categories,
    budgets,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    addBudget,
    getExpensesByTimeRange,
    getTotalByType,
    getExpensesByCategory,
  };
};