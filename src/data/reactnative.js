export default {
  id: "reactnative",
  tier: 5,
  name: "React Native",
  description: "Master cross-platform mobile development with React Native. Build native iOS and Android applications using JavaScript and React, with comprehensive coverage of navigation, state management, native modules, and performance optimization for mobile platforms.",
  difficulty: "advanced",
  estimatedHours: 35,
  prerequisites: ["react", "javascript", "nodejs"],
  learningObjectives: [
    "Master React Native fundamentals and component architecture",
    "Implement cross-platform navigation with React Navigation",
    "Manage application state with Redux, Context API, and Zustand",
    "Create and integrate native modules for platform-specific functionality",
    "Optimize React Native applications for performance and user experience",
    "Handle platform differences and write platform-specific code",
    "Implement proper error handling and crash reporting",
    "Use React Native testing frameworks and best practices",
    "Integrate with device features (camera, location, sensors)",
    "Implement push notifications and background processing",
    "Manage app store deployment and over-the-air updates",
    "Use React Native with TypeScript for type safety",
    "Implement proper security practices for mobile applications",
    "Handle offline functionality and data synchronization",
    "Optimize bundle size and app startup time",
    "Use React Native with popular backend services"
  ],
  sections: [
    {
      title: "React Native Fundamentals",
      content: "React Native is a framework for building native mobile applications using JavaScript and React. It allows developers to create truly native apps for iOS and Android using a single codebase, with platform-specific optimizations handled automatically.\n\n**Core Concepts**: React Native uses the same fundamental UI building blocks as regular React, but instead of rendering to the DOM, it renders native mobile components. This provides better performance and a more authentic user experience.\n\n**Bridge Communication**: React Native communicates between JavaScript and native threads through a bridge. Understanding this architecture is crucial for performance optimization and debugging.\n\n**Component Lifecycle**: React Native components follow React's lifecycle patterns, but with additional considerations for mobile-specific events like app state changes and memory management.\n\n**Platform Detection**: React Native provides Platform module to detect the current platform and implement platform-specific behavior.\n\n**Styling**: Uses a subset of CSS with Flexbox for layout, but with some differences from web CSS. Styles are converted to native platform styles at runtime.",
      keyTopics: [
        "React Native vs React Web differences",
        "Native component architecture",
        "Bridge communication and threading",
        "Platform-specific code implementation",
        "React Native styling system"
      ],
      practicalExercises: [
        "Set up a new React Native project with Expo CLI",
        "Create basic UI components using React Native primitives",
        "Implement platform-specific styling and behavior",
        "Build a simple multi-screen application",
        "Debug React Native applications using developer tools",
        "Handle different screen sizes and orientations"
      ],
      codeExamples: [
        {
          title: "React Native App Setup and Basic Components",
          language: "javascript",
          code: `import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'android' ? '#007AFF' : undefined}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome to React Native</Text>
        <Text style={styles.subtitle}>
          Running on {Platform.OS} {Platform.Version}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Platform Information</Text>
          <Text style={styles.cardText}>
            Screen: {width.toFixed(0)} x {height.toFixed(0)}
          </Text>
          <Text style={styles.cardText}>
            Platform: {Platform.OS}
          </Text>
          <Text style={styles.cardText}>
            Version: {Platform.Version}
          </Text>
          {Platform.OS === 'ios' && (
            <Text style={styles.cardText}>
              iOS Version: {Platform.Version}
            </Text>
          )}
          {Platform.OS === 'android' && (
            <Text style={styles.cardText}>
              API Level: {Platform.Version}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default App;`
        },
        {
          title: "Platform-Specific Code Implementation",
          language: "javascript",
          code: `import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';

// Platform-specific file extensions
// Component.android.js / Component.ios.js
// Component.native.js / Component.web.js

const PlatformSpecificComponent = () => {
  const handlePlatformAction = () => {
    if (Platform.OS === 'ios') {
      // iOS specific action
      Alert.alert(
        'iOS Action',
        'This is an iOS-specific feature',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
    } else if (Platform.OS === 'android') {
      // Android specific action
      Alert.alert(
        'Android Action',
        'This is an Android-specific feature',
        [
          { text: 'OK' }
        ]
      );
    }
  };

  const getPlatformStyles = () => {
    return Platform.select({
      ios: {
        button: {
          backgroundColor: '#007AFF',
          borderRadius: 8,
        },
        text: {
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
        }
      },
      android: {
        button: {
          backgroundColor: '#3F51B5',
          borderRadius: 4,
          elevation: 2,
        },
        text: {
          color: 'white',
          fontSize: 16,
          fontWeight: '500',
        }
      },
      default: {
        button: {
          backgroundColor: '#666',
          borderRadius: 4,
        },
        text: {
          color: 'white',
          fontSize: 16,
        }
      }
    });
  };

  const styles = getPlatformStyles();

  return (
    <View style={containerStyles.container}>
      <Text style={containerStyles.title}>
        Platform: {Platform.OS.toUpperCase()}
      </Text>

      <Text style={containerStyles.info}>
        Version: {Platform.Version}
      </Text>

      <Text style={containerStyles.info}>
        isPad: {Platform.isPad ? 'Yes' : 'No'}
      </Text>

      <Text style={containerStyles.info}>
        isTV: {Platform.isTV ? 'Yes' : 'No'}
      </Text>

      <TouchableOpacity
        style={[buttonStyles.button, styles.button]}
        onPress={handlePlatformAction}
      >
        <Text style={[buttonStyles.text, styles.text]}>
          Platform Action
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Separate style objects for better organization
const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

// Platform-specific component using file extensions
// File: PlatformButton.ios.js
/*
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PlatformButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlatformButton;
*/

// File: PlatformButton.android.js
/*
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PlatformButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3F51B5',
    borderRadius: 4,
    padding: 12,
    elevation: 2,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PlatformButton;
*/

// Usage in main component
/*
import PlatformButton from './PlatformButton'; // Automatically picks platform-specific file

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <PlatformButton
      title="Click Me"
      onPress={() => console.log('Button pressed')}
    />
  </View>
);
*/

export default PlatformSpecificComponent;`
        }
      ]
    },
    {
      title: "Navigation in React Native",
      content: "Navigation is a crucial aspect of mobile applications. React Native provides several navigation solutions, with React Navigation being the most popular and feature-rich library for handling navigation between screens.\n\n**Navigation Types**: Stack navigation for hierarchical navigation, tab navigation for bottom tabs, drawer navigation for side menus, and nested navigation for complex app structures.\n\n**Navigation Container**: The root component that manages the navigation state and provides the navigation context to child components.\n\n**Screen Options**: Configure screen-specific options like headers, tab bars, and transition animations.\n\n**Navigation Props**: Each screen component receives navigation and route props for programmatic navigation and accessing route parameters.\n\n**Deep Linking**: Handle deep links from external sources to navigate to specific screens within the app.\n\n**Navigation State**: Persist and restore navigation state for better user experience across app restarts.",
      keyTopics: [
        "React Navigation library and architecture",
        "Stack, tab, and drawer navigation patterns",
        "Screen options and customization",
        "Programmatic navigation and route parameters",
        "Deep linking and URL handling",
        "Navigation state persistence"
      ],
      practicalExercises: [
        "Implement stack navigation for a multi-screen app",
        "Create tab-based navigation with custom icons",
        "Build a drawer navigation menu",
        "Handle deep links from external sources",
        "Implement authentication flow navigation",
        "Create nested navigation structures"
      ],
      codeExamples: [
        {
          title: "React Navigation Setup and Stack Navigation",
          language: "javascript",
          code: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

// Create stack navigator
const Stack = createStackNavigator();

// Home Screen
const HomeScreen = ({ navigation }) => {
  const menuItems = [
    { id: '1', title: 'Profile', screen: 'Profile' },
    { id: '2', title: 'Settings', screen: 'Settings' },
    { id: '3', title: 'About', screen: 'About' },
  ];

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigateToScreen(item.screen)}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        style={styles.menuList}
      />
    </View>
  );
};

// Profile Screen with parameters
const ProfileScreen = ({ navigation, route }) => {
  const { userId, userName } = route.params || {};

  React.useEffect(() => {
    // Set header title dynamically
    navigation.setOptions({
      title: userName ? \`\${userName}'s Profile\` : 'Profile',
    });
  }, [navigation, userName]);

  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {
      userId,
      userName,
      onProfileUpdate: (updatedData) => {
        console.log('Profile updated:', updatedData);
        // Handle profile update
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {userId && (
        <Text style={styles.info}>User ID: {userId}</Text>
      )}
      {userName && (
        <Text style={styles.info}>Name: {userName}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={goToEditProfile}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Settings Screen
const SettingsScreen = ({ navigation }) => {
  const settings = [
    { id: '1', title: 'Notifications', action: 'Notifications' },
    { id: '2', title: 'Privacy', action: 'Privacy' },
    { id: '3', title: 'Account', action: 'Account' },
  ];

  const handleSettingPress = (action) => {
    // Navigate to specific settings screen
    navigation.navigate(action);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {settings.map((setting) => (
        <TouchableOpacity
          key={setting.id}
          style={styles.settingItem}
          onPress={() => handleSettingPress(setting.action)}
        >
          <Text style={styles.settingText}>{setting.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'My App',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log('Menu pressed')}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>☰</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{
            userId: '123',
            userName: 'John Doe'
          }}
          options={({ route }) => ({
            title: route.params?.userName
              ? \`\${route.params.userName}'s Profile\`
              : 'Profile',
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={ProfileScreen} // Reusing component
          options={{
            title: 'Edit Profile',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#007AFF',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  settingItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppNavigator;`
        },
        {
          title: "Tab Navigation and Drawer Navigation",
          language: "javascript",
          code: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// Create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab Screens
const HomeTab = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home Tab</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Profile')}
    >
      <Text style={styles.buttonText}>Go to Profile</Text>
    </TouchableOpacity>
  </View>
);

const SearchTab = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Search Tab</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Notifications')}
    >
      <Text style={styles.buttonText}>Go to Notifications</Text>
    </TouchableOpacity>
  </View>
);

const ProfileTab = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Profile Tab</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.openDrawer()}
    >
      <Text style={styles.buttonText}>Open Drawer</Text>
    </TouchableOpacity>
  </View>
);

// Drawer Screens
const NotificationsScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

const SettingsScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Settings</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={tabStyles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabStyles.tabItem}
          >
            <Text style={{
              color: isFocused ? '#007AFF' : '#666',
              fontSize: 12,
              fontWeight: isFocused ? '600' : '400'
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: 20 }}>
              {focused ? '🏠' : '🏡'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: 20 }}>
              {focused ? '🔍' : '🔎'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: 20 }}>
              {focused ? '👤' : '👥'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => {
  const menuItems = [
    { name: 'Home', label: 'Home', icon: '🏠' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
    { name: 'Settings', label: 'Settings', icon: '⚙️' },
    { name: 'Notifications', label: 'Notifications', icon: '🔔' },
  ];

  return (
    <ScrollView style={drawerStyles.container}>
      <View style={drawerStyles.header}>
        <Text style={drawerStyles.headerTitle}>My App</Text>
        <Text style={drawerStyles.headerSubtitle}>Navigation Menu</Text>
      </View>

      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={drawerStyles.menuItem}
          onPress={() => navigation.navigate(item.name)}
        >
          <Text style={drawerStyles.menuIcon}>{item.icon}</Text>
          <Text style={drawerStyles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <View style={drawerStyles.footer}>
        <TouchableOpacity
          style={drawerStyles.logoutButton}
          onPress={() => {
            // Handle logout
            navigation.closeDrawer();
          }}
        >
          <Text style={drawerStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Main App with Drawer Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <Text style={{ fontSize: 20 }}>🏠</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
            drawerIcon: ({ focused, size }) => (
              <Text style={{ fontSize: 20 }}>🔔</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            drawerIcon: ({ focused, size }) => (
              <Text style={{ fontSize: 20 }}>⚙️</Text>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 5, // For iPhone home indicator
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;`
        }
      ]
    },
    {
      title: "State Management in React Native",
      content: "State management is crucial for React Native applications, especially as they grow in complexity. React Native supports multiple state management solutions, from built-in React hooks to external libraries like Redux and Zustand.\n\n**Local State**: UseState and useReducer for component-level state management.\n\n**Context API**: React's built-in solution for sharing state across component trees without prop drilling.\n\n**Redux**: Predictable state container with actions, reducers, and middleware support.\n\n**Zustand**: Lightweight state management library with a simple API and TypeScript support.\n\n**Async Storage**: Persistent storage for user preferences and app data.\n\n**State Persistence**: Strategies for persisting and rehydrating application state.\n\n**Performance Optimization**: Techniques to prevent unnecessary re-renders and optimize state updates.",
      keyTopics: [
        "React hooks for state management (useState, useReducer)",
        "Context API for global state",
        "Redux architecture and implementation",
        "Zustand for lightweight state management",
        "AsyncStorage for data persistence",
        "State persistence and rehydration"
      ],
      practicalExercises: [
        "Implement local state management with hooks",
        "Create a global state store with Context API",
        "Set up Redux with actions and reducers",
        "Build a Zustand store for state management",
        "Implement data persistence with AsyncStorage",
        "Optimize state updates for performance"
      ],
      codeExamples: [
        {
          title: "Local State Management with Hooks",
          language: "javascript",
          code: `import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';

// Counter component with useState
const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Counter with useState</Text>
      <Text style={styles.count}>Count: {count}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Step:</Text>
        <TextInput
          style={styles.input}
          value={step.toString()}
          onChangeText={(text) => setStep(parseInt(text) || 1)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.decrement]} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.reset]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.increment]} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Todo reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now().toString(),
        text: action.payload,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

// Todo list component with useReducer
const TodoList = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputText.trim() });
      setInputText('');
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoCheckbox}
        onPress={() => toggleTodo(item.id)}
      >
        <Text style={styles.checkbox}>
          {item.completed ? '☑' : '☐'}
        </Text>
      </TouchableOpacity>

      <Text style={[
        styles.todoText,
        item.completed && styles.completedText
      ]}>
        {item.text}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Todo List with useReducer</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add a new todo..."
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        }
      />

      {todos.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCompleted}
        >
          <Text style={styles.clearButtonText}>
            Clear Completed ({todos.filter(t => t.completed).length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Form component with complex state
const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    interests: [] as string[]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || formData.age < 18) newErrors.age = 'Must be 18 or older';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = ['React', 'React Native', 'Node.js', 'Python', 'DevOps'];

  return (
    <View style={styles.section}>
      <Text style={styles.title}>User Form with Complex State</Text>

      <TextInput
        style={[styles.input, errors.firstName && styles.inputError]}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => updateField('firstName', value)}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        style={[styles.input, errors.lastName && styles.inputError]}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => updateField('lastName', value)}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => updateField('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.age && styles.inputError]}
        placeholder="Age"
        value={formData.age}
        onChangeText={(value) => updateField('age', value)}
        keyboardType="numeric"
      />
      {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

      <Text style={styles.label}>Interests:</Text>
      <View style={styles.interestsContainer}>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestChip,
              formData.interests.includes(interest) && styles.interestChipSelected
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={[
              styles.interestText,
              formData.interests.includes(interest) && styles.interestTextSelected
            ]}>
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Counter />
      <TodoList />
      <UserForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  increment: {
    backgroundColor: '#4CD964',
  },
  decrement: {
    backgroundColor: '#FF3B30',
  },
  reset: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  todoList: {
    maxHeight: 200,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  todoCheckbox: {
    marginRight: 10,
  },
  checkbox: {
    fontSize: 18,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  interestChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  interestChipSelected: {
    backgroundColor: '#007AFF',
  },
  interestText: {
    color: '#333',
    fontSize: 14,
  },
  interestTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;`
        },
        {
          title: "Global State Management with Context API",
          language: "javascript",
          code: `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
const ActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  cart: [],
  loading: false,
  error: null
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ActionTypes.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          // Restore cart items
          cartData.forEach(item => {
            dispatch({ type: ActionTypes.ADD_TO_CART, payload: item });
          });
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(state.cart));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    saveCart();
  }, [state.cart]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: ActionTypes.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => dispatch({ type: ActionTypes.CLEAR_CART }) }
      ]
    );
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Sample products
const products = [
  { id: 1, name: 'iPhone 13', price: 999, description: 'Latest iPhone model' },
  { id: 2, name: 'MacBook Pro', price: 1999, description: 'Powerful laptop for developers' },
  { id: 3, name: 'iPad Air', price: 599, description: 'Versatile tablet' },
  { id: 4, name: 'AirPods Pro', price: 249, description: 'Wireless earbuds with noise cancellation' }
];

// Product List Component
const ProductList = () => {
  const { addToCart } = useCart();

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>\${item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

// Cart Component
const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>\${item.price}</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <Text style={styles.title}>Cart ({getTotalItems()} items)</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.cartSummary}>
            <Text style={styles.totalText}>
              Total: \${getTotalPrice().toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// Main App Component
const App = () => {
  return (
    <CartProvider>
      <View style={styles.app}>
        <ProductList />
        <Cart />
      </View>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  clearText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cartSummary: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#4CD964',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Cross-Platform E-commerce App",
      description: "Build a complete e-commerce mobile application with React Native, featuring product catalog, shopping cart, user authentication, and payment integration",
      difficulty: "advanced",
      estimatedHours: 60,
      technologies: ["React Native", "Redux", "React Navigation", "AsyncStorage", "Stripe", "Firebase"],
      features: [
        "Cross-platform iOS and Android support",
        "Product catalog with search and filtering",
        "User authentication and profile management",
        "Shopping cart with persistent storage",
        "Payment integration with Stripe",
        "Order history and tracking",
        "Push notifications",
        "Offline data synchronization",
        "Image upload and management",
        "Real-time chat support",
        "App store deployment preparation"
      ]
    },
    {
      title: "Social Media Mobile App",
      description: "Create a social media application with React Native, including user profiles, posts, comments, likes, and real-time messaging",
      difficulty: "advanced",
      estimatedHours: 55,
      technologies: ["React Native", "Socket.io", "AsyncStorage", "Image Picker", "Camera", "Geolocation"],
      features: [
        "User registration and authentication",
        "Create and view posts with images",
        "Like, comment, and share functionality",
        "Real-time messaging and notifications",
        "User profiles with follower/following",
        "Location-based content discovery",
        "Push notifications for interactions",
        "Offline content caching",
        "Image and video upload",
        "Privacy settings and content moderation",
        "Dark mode support"
      ]
    },
    {
      title: "Fitness Tracking App",
      description: "Build a comprehensive fitness tracking application with workout logging, progress tracking, and social features",
      difficulty: "intermediate",
      estimatedHours: 40,
      technologies: ["React Native", "SQLite", "Health Kit", "Google Fit", "Charts", "Calendar"],
      features: [
        "Workout logging and tracking",
        "Exercise database with custom exercises",
        "Progress charts and analytics",
        "Integration with Health Kit/Google Fit",
        "Calendar view for workout planning",
        "Social features for sharing achievements",
        "Goal setting and progress tracking",
        "Rest timer and workout music integration",
        "Offline workout capability",
        "Data export and backup",
        "Custom workout plan creation"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the main difference between React and React Native?",
        options: [
          "React Native uses a different programming language",
          "React Native renders native mobile components instead of web DOM",
          "React Native is only for iOS development",
          "React Native doesn't use JSX"
        ],
        correctAnswer: 1,
        explanation: "React Native renders native mobile components instead of web DOM elements, allowing for truly native mobile applications."
      },
      {
        question: "Which library is most commonly used for navigation in React Native?",
        options: [
          "React Router",
          "React Navigation",
          "React Router Native",
          "Native Navigation"
        ],
        correctAnswer: 1,
        explanation: "React Navigation is the most popular and feature-rich navigation library for React Native applications."
      },
      {
        question: "What is the purpose of Platform.select() in React Native?",
        options: [
          "To select the best platform for deployment",
          "To conditionally render components based on platform",
          "To choose between different navigation patterns",
          "To select the appropriate state management library"
        ],
        correctAnswer: 1,
        explanation: "Platform.select() allows you to write platform-specific code by providing different values for iOS and Android."
      },
      {
        question: "Which hook is commonly used for local state management in React Native?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useNavigation"
        ],
        correctAnswer: 1,
        explanation: "useState is the primary hook for managing local component state in React Native."
      },
      {
        question: "What is AsyncStorage used for in React Native?",
        options: [
          "Storing temporary data in memory",
          "Persistent key-value storage",
          "Managing application state",
          "Caching network requests"
        ],
        correctAnswer: 1,
        explanation: "AsyncStorage provides persistent key-value storage for React Native applications, similar to localStorage in web browsers."
      }
    ],
    evaluation: [
      {
        scenario: "Your team is building a cross-platform mobile application for a client. The application needs to work on both iOS and Android with native performance and user experience.",
        questions: [
          "What factors would you consider when choosing between React Native and native development?",
          "How would you structure the project for cross-platform development?",
          "What strategies would you implement for handling platform-specific features?",
          "How would you ensure consistent user experience across platforms?"
        ]
      },
      {
        scenario: "You're developing a React Native application that requires complex state management, navigation between multiple screens, and integration with device features.",
        questions: [
          "What navigation solution would you choose and why?",
          "How would you implement state management for this application?",
          "What strategies would you use for integrating device features like camera and location?",
          "How would you handle offline functionality and data synchronization?"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I set up a new React Native project?",
    "What's the difference between React and React Native?",
    "How do I handle platform-specific code in React Native?",
    "How do I implement navigation in React Native?",
    "How do I manage state in React Native applications?",
    "How do I integrate native modules in React Native?",
    "How do I optimize React Native app performance?",
    "How do I handle push notifications in React Native?",
    "How do I implement offline functionality in React Native?",
    "How do I deploy React Native apps to app stores?",
    "How do I use TypeScript with React Native?",
    "How do I handle different screen sizes in React Native?",
    "How do I implement authentication in React Native?",
    "How do I use camera and image picker in React Native?",
    "How do I handle app state changes in React Native?"
  ],
  resources: [
    {
      title: "React Native Documentation",
      type: "documentation",
      url: "https://reactnative.dev/docs/getting-started",
      description: "Official React Native documentation with comprehensive guides and API reference"
    },
    {
      title: "React Navigation",
      type: "documentation",
      url: "https://reactnavigation.org/docs/getting-started",
      description: "Official documentation for React Navigation library"
    },
    {
      title: "Expo Documentation",
      type: "documentation",
      url: "https://docs.expo.dev/",
      description: "Expo documentation for easier React Native development"
    },
    {
      title: "React Native Elements",
      type: "library",
      url: "https://react-native-elements.github.io/react-native-elements/",
      description: "Cross-platform React Native UI toolkit"
    },
    {
      title: "React Native Directory",
      type: "directory",
      url: "https://reactnative.directory/",
      description: "Directory of React Native libraries and tools"
    }
  ],
  toolsRequired: [
    "Node.js (v14+)",
    "npm or yarn",
    "React Native CLI or Expo CLI",
    "Android Studio (for Android development)",
    "Xcode (for iOS development)",
    "Visual Studio Code with React Native extensions",
    "React Navigation",
    "Redux or Zustand (state management)",
    "AsyncStorage",
    "React Native Vector Icons",
    "React Native Gesture Handler",
    "React Native Reanimated",
    "Flipper (debugging tool)",
    "Fastlane (deployment automation)",
    "CodePush (over-the-air updates)",
    "Detox (end-to-end testing)",
    "Jest (unit testing)",
    "ESLint (code linting)",
    "Prettier (code formatting)",
    "TypeScript (optional, for type safety)"
  ],
  bestPractices: [
    "Use Expo for rapid prototyping and simpler development",
    "Implement proper error boundaries for crash prevention",
    "Use platform-specific file extensions for platform code",
    "Optimize images and assets for mobile devices",
    "Implement proper loading states and error handling",
    "Use FlatList for large lists with proper optimization",
    "Implement proper keyboard handling for forms",
    "Use React.memo for component optimization",
    "Implement proper navigation with deep linking support",
    "Use AsyncStorage wisely with proper error handling",
    "Implement offline support for better user experience",
    "Use proper TypeScript types for better development experience",
    "Implement proper security measures for sensitive data",
    "Use React Navigation hooks for navigation logic",
    "Implement proper state management patterns",
    "Use React Native's built-in performance monitoring",
    "Implement proper app state handling (active, background, inactive)",
    "Use proper image optimization and caching",
    "Implement proper push notification handling",
    "Use React Native's accessibility features",
    "Implement proper internationalization support",
    "Use proper error reporting and crash analytics",
    "Implement proper app versioning and update mechanisms",
    "Use React Native's built-in gesture system",
    "Implement proper memory management",
    "Use proper network request handling with timeouts",
    "Implement proper data validation and sanitization",
    "Use React Native's built-in animation system",
    "Implement proper offline data synchronization",
    "Use proper code splitting for better performance"
  ],
  commonPitfalls: [
    "Not handling platform differences properly",
    "Using web-specific CSS properties in React Native",
    "Not optimizing images and assets for mobile",
    "Implementing complex navigation without proper planning",
    "Not handling app state changes properly",
    "Using too many bridge communications",
    "Not implementing proper error handling",
    "Using deprecated React Native APIs",
    "Not testing on real devices during development",
    "Implementing heavy computations on JavaScript thread",
    "Not handling keyboard appearance properly",
    "Using large bundle sizes without code splitting",
    "Not implementing proper offline support",
    "Using insecure data storage methods",
    "Not handling different screen sizes properly",
    "Implementing complex animations without optimization",
    "Not using proper TypeScript types",
    "Using outdated React Native versions",
    "Not implementing proper security measures",
    "Using too many third-party libraries",
    "Not optimizing list rendering performance",
    "Implementing complex state management unnecessarily",
    "Not handling network connectivity properly",
    "Using deprecated lifecycle methods",
    "Not implementing proper accessibility",
    "Using large images without optimization",
    "Not handling app permissions properly",
    "Implementing complex business logic in components",
    "Not using proper error boundaries",
    "Using synchronous storage operations",
    "Not implementing proper loading states",
    "Using deprecated navigation patterns",
    "Not handling deep linking properly",
    "Implementing complex gesture handling without optimization",
    "Not using proper memory management techniques",
    "Using outdated third-party libraries",
    "Not implementing proper testing strategies",
    "Using complex styling without optimization",
    "Not handling different device orientations",
    "Implementing heavy database operations on main thread"
  ],
  careerRelevance: [
    "React Native is one of the most popular cross-platform mobile frameworks",
    "High demand for React Native developers in mobile app development",
    "Cross-platform skills reduce development time and costs",
    "React Native knowledge is valuable for startups and enterprises",
    "Mobile development skills are essential in modern software development",
    "React Native enables faster time-to-market for mobile applications",
    "Cross-platform expertise is crucial for app development agencies",
    "React Native skills complement React web development expertise",
    "Mobile app development is a growing market with high demand",
    "React Native enables building for multiple platforms with single codebase",
    "Native performance with JavaScript development is highly valued",
    "React Native community and ecosystem are rapidly growing",
    "Cross-platform development skills are future-proof",
    "Mobile app monetization opportunities are significant",
    "React Native enables rapid prototyping and MVPs",
    "Native module development skills are advanced and valuable",
    "Performance optimization in React Native is a specialized skill",
    "App store deployment knowledge is essential for mobile developers",
    "Offline-first application development is increasingly important",
    "Push notification and real-time features are in high demand",
    "Integration with native device features is a key skill",
    "State management in mobile applications is complex and valuable",
    "Navigation patterns in mobile apps require specialized knowledge",
    "Accessibility in mobile applications is increasingly important",
    "Security in mobile applications is critical and specialized",
    "Testing mobile applications requires specific knowledge",
    "Performance monitoring and optimization are advanced skills",
    "App architecture for mobile applications is specialized knowledge",
    "User experience design for mobile is a valuable skill",
    "Integration with backend services is essential for mobile apps",
    "Deployment and distribution knowledge is crucial for mobile developers",
    "Version management and updates are important mobile skills",
    "Cross-platform compatibility testing is a specialized skill",
    "Device-specific optimization is an advanced mobile skill",
    "Battery and resource optimization is valuable knowledge",
    "Offline data synchronization is a complex and valuable skill",
    "Push notification management is specialized knowledge",
    "In-app purchase implementation is advanced mobile development",
    "App store optimization and marketing knowledge is valuable",
    "User retention and engagement metrics are important skills",
    "A/B testing in mobile applications is specialized knowledge",
    "Crash reporting and analytics are essential mobile skills",
    "Performance profiling and bottleneck identification are advanced",
    "Memory management in mobile applications is critical knowledge",
    "Network optimization for mobile is specialized skill",
    "Background processing in mobile apps is advanced knowledge",
    "Local storage and data persistence are important mobile skills",
    "Biometric authentication integration is valuable knowledge",
    "Geolocation and mapping integration are specialized skills",
    "Camera and media handling in mobile is advanced knowledge",
    "Audio and video processing in mobile apps is specialized",
    "Sensor integration (accelerometer, gyroscope) is advanced",
    "NFC and Bluetooth integration are specialized mobile skills",
    "Widget development for mobile platforms is valuable knowledge",
    "Wearable device integration is emerging and valuable",
    "AR/VR integration in mobile apps is cutting-edge knowledge",
    "Machine learning integration in mobile is advanced skill",
    "IoT device integration with mobile apps is specialized",
    "Blockchain integration in mobile applications is emerging",
    "5G and edge computing integration is future-oriented",
    "Quantum computing integration is cutting-edge knowledge"
  ]
};