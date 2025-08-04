# 💰 Expense Tracker - Modern Personal Finance App

A visually stunning, modern personal expense tracker app built with React Native and Expo. Features a clean, minimalist UI optimized for mobile (iOS/Android) with comprehensive financial tracking capabilities.

## ✨ Features

### 📊 Dashboard & Analytics
- **Interactive Charts**: Beautiful pie, bar, and line charts for expense visualization
- **Smart Insights**: AI-powered spending analysis and recommendations
- **Time Range Filtering**: Daily, weekly, monthly, and yearly tracking
- **Real-time Summary Cards**: Income, expenses, and balance overview

### 💳 Expense Management
- **Quick-Add Interface**: Intuitive expense entry with category selection
- **Category Icons**: 15+ predefined categories with custom icons and colors
- **Income Tracking**: Support for both expenses and income transactions
- **Transaction History**: Searchable and filterable transaction list

### 🎯 Budget System
- **Customizable Budgets**: Set daily, weekly, or monthly spending limits
- **Progress Tracking**: Visual progress bars with color-coded alerts
- **Budget Insights**: Overspending warnings and remaining balance tracking

### 🎨 Design & UX
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Modern UI**: Clean, minimalist design with elegant typography
- **Micro-interactions**: Smooth animations and haptic feedback
- **Responsive Layout**: Optimized for all screen sizes

### 📱 Additional Features
- **Data Export**: Export your financial data as JSON
- **Smart Notifications**: Budget alerts and spending reminders
- **Offline Support**: Works without internet connection
- **Secure Storage**: Local data storage with AsyncStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or run on simulator: `npm run ios` or `npm run android`

## 🏗️ Project Structure

```
expense-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components (Button, Card, Text, etc.)
│   │   ├── charts/         # Chart components (Pie, Bar, Line)
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── expense/        # Expense management components
│   ├── screens/            # App screens
│   │   ├── DashboardScreen.tsx
│   │   ├── AddExpenseScreen.tsx
│   │   ├── BudgetScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/         # Navigation configuration
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── theme/             # Design system (colors, typography, spacing)
│   ├── types/             # TypeScript type definitions
│   └── data/              # Static data and categories
├── assets/                # Images, icons, and other assets
└── App.tsx               # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary**: Modern indigo (#6366F1)
- **Secondary**: Emerald green (#10B981)
- **Accent**: Amber (#F59E0B)
- **Success/Income**: Green tones
- **Error/Expense**: Red tones
- **Neutral**: Carefully crafted grays

### Typography
- **Headings**: Bold, modern typeface
- **Body**: Clean, readable font
- **Captions**: Subtle, secondary text
- **Numbers**: Monospace for financial data

### Spacing & Layout
- **Consistent Spacing**: 4px base unit system
- **Cards**: Elevated surfaces with subtle shadows
- **Border Radius**: Rounded corners for modern feel
- **Responsive**: Adapts to different screen sizes

## 📊 Data Management

### Local Storage
- **AsyncStorage**: Secure local data persistence
- **Categories**: Predefined expense and income categories
- **Budgets**: User-defined spending limits
- **Transactions**: Complete expense/income history

### Data Export
- **JSON Format**: Export all data in structured format
- **Privacy**: All data stays on device
- **Backup**: Easy data backup and restoration

## 🔧 Technical Stack

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library

### UI & Animations
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch interactions
- **Expo Vector Icons**: Beautiful icon set
- **React Native Chart Kit**: Data visualization

### Storage & Utils
- **AsyncStorage**: Local data persistence
- **Expo File System**: File operations
- **Expo Sharing**: Data export functionality
- **Expo Haptics**: Tactile feedback

## 🎯 Key Features Implementation

### Smart Insights Engine
The app analyzes spending patterns and provides intelligent insights:
- Monthly spending comparisons
- Category-based analysis
- Weekend vs weekday spending patterns
- Small transaction accumulation alerts
- Daily spending averages

### Responsive Chart System
Interactive charts built with React Native Chart Kit:
- **Pie Charts**: Category distribution
- **Bar Charts**: Daily/weekly trends
- **Line Charts**: Long-term patterns
- **Progress Bars**: Budget tracking

### Theme System
Comprehensive dark/light mode support:
- System preference detection
- Smooth transitions between themes
- Consistent color application
- Persistent theme selection

## 📱 Screenshots

*Add screenshots of your app here*

## 🚀 Deployment

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Web
```bash
npm run web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the amazing development platform
- **React Native Community**: For the excellent ecosystem
- **Design Inspiration**: Modern fintech and expense tracking apps

## 📞 Support

If you have any questions or need help with the app:
- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Made with ❤️ using React Native & Expo**
