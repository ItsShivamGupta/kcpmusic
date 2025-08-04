import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { BudgetScreen } from '../screens/BudgetScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { spacing, borderRadius } from '../theme/spacing';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
      case 'Dashboard':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'AddExpense':
        iconName = focused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Budget':
        iconName = focused ? 'pie-chart' : 'pie-chart-outline';
        break;
      case 'Transactions':
        iconName = focused ? 'list' : 'list-outline';
        break;
      case 'Settings':
        iconName = focused ? 'settings' : 'settings-outline';
        break;
      default:
        iconName = 'home-outline';
    }

    if (routeName === 'AddExpense') {
      return (
        <View style={{
          backgroundColor: focused ? colors.primary : colors.primary,
          borderRadius: borderRadius.full,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -spacing.md,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}>
          <Ionicons 
            name={iconName} 
            size={28} 
            color={colors.background} 
          />
        </View>
      );
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
          height: 80,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: spacing.xs,
        },
        tabBarItemStyle: {
          paddingVertical: spacing.xs,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen 
        name="AddExpense" 
        component={AddExpenseScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetScreen}
        options={{ tabBarLabel: 'Budget' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};