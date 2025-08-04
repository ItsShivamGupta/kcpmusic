import React from 'react';
import { View, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../ui/Text';
import { Category } from '../../types';
import { spacing, borderRadius } from '../../theme/spacing';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (category: Category) => void;
  type: 'expense' | 'income';
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  type,
}) => {
  const { colors } = useTheme();

  const filteredCategories = categories.filter(category => {
    if (type === 'income') {
      return category.id.startsWith('income-');
    }
    return !category.id.startsWith('income-');
  });

  const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
    const scale = useSharedValue(1);
    const isSelected = selectedCategoryId === category.id;

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    const itemStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      borderRadius: borderRadius.lg,
      marginHorizontal: spacing.sm,
      marginVertical: spacing.xs,
      backgroundColor: isSelected ? category.color + '20' : colors.surface,
      borderWidth: isSelected ? 2 : 1,
      borderColor: isSelected ? category.color : colors.border,
    };

    return (
      <AnimatedTouchableOpacity
        style={[animatedStyle, itemStyle]}
        onPress={() => onSelectCategory(category)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: isSelected ? category.color : category.color + '20',
            borderRadius: borderRadius.md,
            padding: spacing.sm,
            marginBottom: spacing.xs,
          }}
        >
          <Ionicons
            name={category.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={isSelected ? colors.background : category.color}
          />
        </View>
        <Text
          variant="small"
          style={{
            textAlign: 'center',
            color: isSelected ? category.color : colors.textSecondary,
            fontWeight: isSelected ? '600' : '400',
          }}
          numberOfLines={2}
        >
          {category.name}
        </Text>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View>
      <Text variant="h4" style={{ marginBottom: spacing.md }}>
        Select Category
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 320 }}>
          {filteredCategories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};