import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

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
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <View style={{backgroundColor: colorScheme !== "dark" ? "white" : "black",}}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <TabBarIcon name={focused ? 'trail-sign' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'notes',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <TabBarIcon name={focused ? 'trail-sign' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
  },

});
