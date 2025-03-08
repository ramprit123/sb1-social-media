import { Tabs } from 'expo-router';
import { Chrome as Home, Search, Bell, Bookmark, User } from 'lucide-react-native';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            android: {
              borderTopColor: '#ddd',
              backgroundColor: '#fff',
              height: 60,
              paddingBottom: 8,
            },
            default: {
              borderTopColor: '#ddd',
              backgroundColor: '#fff',
              height: 60,
              paddingBottom: 8,
            },
          }),
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#999',
          tabBarShowLabel: true,
          tabBarItemStyle: Platform.select({
            android: {
              padding: 0,
            },
          }),
          // Disable press effect on Android
          tabBarPressColor: 'transparent',
          // Remove opacity animation on press
          tabBarPressOpacity: 1,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: 'Bookmarks',
            tabBarIcon: ({ color, size }) => <Bookmark size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}