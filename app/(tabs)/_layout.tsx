import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
interface TabLayoutProps {
  // Define any props for TabLayout here
}

export default function TabLayout(props: TabLayoutProps) {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelPosition: "beside-icon",
        tabBarShowLabel: false,
        
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons name={focused ? "football" : "football-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons name={focused ? "footsteps" : "footsteps-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: '',
          headerShown: false,
          tabBarIconStyle:styles.icons_styling,
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <FontAwesome name={focused ? "sticky-note" : "sticky-note-o"} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          headerShown: false,
          tabBarIconStyle:styles.icons_styling,
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          headerShown: false,
          tabBarIconStyle:styles.icons_styling,
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <FontAwesome5 name="exclamation-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  icons_styling: {
    padding: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
