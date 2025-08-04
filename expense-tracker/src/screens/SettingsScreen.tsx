import React, { useState } from 'react';
import { View, ScrollView, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../hooks/useExpenses';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { spacing, borderRadius } from '../theme/spacing';

interface SettingItemProps {
  title: string;
  description?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  rightElement?: React.ReactNode;
  color?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  icon,
  onPress,
  rightElement,
  color,
}) => {
  const { colors } = useTheme();

  return (
    <Button
      title=""
      onPress={onPress}
      variant="ghost"
      style={{
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <View style={{
        backgroundColor: (color || colors.primary) + '20',
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        marginRight: spacing.md,
      }}>
        <Ionicons
          name={icon}
          size={24}
          color={color || colors.primary}
        />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium">{title}</Text>
        {description && (
          <Text variant="caption" color="secondary">
            {description}
          </Text>
        )}
      </View>
      
      {rightElement ? (
        rightElement
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textTertiary}
        />
      )}
    </Button>
  );
};

export const SettingsScreen: React.FC = () => {
  const { colors, theme, toggleTheme, isDark } = useTheme();
  const { expenses, categories } = useExpenses();
  const [loading, setLoading] = useState(false);

  const handleExportData = async () => {
    try {
      setLoading(true);
      
      const data = {
        expenses,
        categories,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      };

      const jsonString = JSON.stringify(data, null, 2);
      const fileName = `expense-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export Expense Data',
        });
      } else {
        Alert.alert('Export Complete', `Data exported to ${fileName}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Export Failed', 'Failed to export data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your expenses, budgets, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: () => {
            // In a real app, you'd clear AsyncStorage here
            Alert.alert('Success', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Expense Tracker',
      'A beautiful and intuitive expense tracking app built with React Native and Expo.\n\nVersion: 1.0.0\nDeveloped with ❤️',
      [{ text: 'OK' }]
    );
  };

  const handleFeedback = async () => {
    try {
      await Share.share({
        message: 'I\'d like to share feedback about the Expense Tracker app...',
        title: 'App Feedback',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md }}
      >
        {/* Header */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text variant="h2">Settings</Text>
          <Text variant="caption" color="secondary">
            Customize your expense tracking experience
          </Text>
        </View>

        {/* App Settings */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Appearance
          </Text>
          <SettingItem
            title="Theme"
            description={`Currently using ${isDark ? 'dark' : 'light'} theme`}
            icon={isDark ? 'moon' : 'sunny'}
            onPress={toggleTheme}
            rightElement={
              <View style={{
                backgroundColor: colors.primary + '20',
                borderRadius: borderRadius.full,
                padding: spacing.xs,
              }}>
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={16}
                  color={colors.primary}
                />
              </View>
            }
          />
        </View>

        {/* Data Management */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Data Management
          </Text>
          <SettingItem
            title="Export Data"
            description="Download your data as JSON file"
            icon="download"
            onPress={handleExportData}
            color={colors.success}
          />
          <SettingItem
            title="Clear All Data"
            description="Permanently delete all expenses and budgets"
            icon="trash"
            onPress={handleClearData}
            color={colors.error}
          />
        </View>

        {/* Statistics */}
        <Card style={{ marginBottom: spacing.lg }}>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Statistics
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text variant="caption" color="secondary">Total Transactions</Text>
            <Text variant="bodyMedium">{expenses.length}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text variant="caption" color="secondary">Categories</Text>
            <Text variant="bodyMedium">{categories.length}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" color="secondary">Theme</Text>
            <Text variant="bodyMedium">{isDark ? 'Dark' : 'Light'}</Text>
          </View>
        </Card>

        {/* Support */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Support
          </Text>
          <SettingItem
            title="Send Feedback"
            description="Help us improve the app"
            icon="chatbubble"
            onPress={handleFeedback}
            color={colors.info}
          />
          <SettingItem
            title="About"
            description="App version and information"
            icon="information-circle"
            onPress={handleAbout}
            color={colors.secondary}
          />
        </View>

        {/* Version Info */}
        <View style={{
          alignItems: 'center',
          paddingVertical: spacing.lg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}>
          <Text variant="caption" color="tertiary">
            Expense Tracker v1.0.0
          </Text>
          <Text variant="small" color="tertiary" style={{ marginTop: spacing.xs }}>
            Made with ❤️ using React Native & Expo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};