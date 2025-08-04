export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'expense' | 'income';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
}

export interface ChartData {
  labels: string[];
  data: number[];
  colors: string[];
}

export interface Insight {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  value?: number;
}

export type Theme = 'light' | 'dark';

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';