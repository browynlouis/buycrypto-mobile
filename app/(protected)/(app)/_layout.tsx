import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Link, Tabs, useSegments } from 'expo-router';
import React from 'react';

import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';
import { Avatar } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { Text } from '@/components/shared/ui/text';

export type TabBarElement = {
  name: string;
  title: string;
  icon: (color: string) => React.ReactElement;
  header?: (props: BottomTabHeaderProps) => React.ReactElement;
};

const tabs: TabBarElement[] = [
  {
    name: 'home/index',
    title: 'Home',
    icon: (color) => <Icon name="Home" size={20} variant="Bold" color={color} />,
    header: () => (
      <Header
        showBackButton={false}
        leftElement={
          <Link href={'/(protected)/(user-center)'} asChild>
            <Button variant="text">
              <Avatar size={32} />
            </Button>
          </Link>
        }
      />
    ),
  },
  //   {
  //     name: 'menu/index',
  //     title: 'Menu',
  //     icon: (color) => <Icon name="Menu" size={20} variant="Bold" color={color} />,
  //   },
  //   {
  //     name: 'markets/index',
  //     title: 'Markets',
  //     icon: (color) => <Icon name="Chart2" size={20} variant="Bold" color={color} />,
  //   },
  //   {
  //     name: 'trade/index',
  //     title: 'Trade',
  //     icon: (color) => <Icon name="I3DRotate" size={20} variant="Bold" color={color} />,
  //   },
  {
    name: 'assets/index',
    title: 'Assets',
    icon: (color) => <Icon name="Wallet2" size={20} variant="Bold" color={color} />,
    header: (props) => <Header title={props.options.title} />,
  },
];

export default function AppTabsLayout() {
  const theme = useAppTheme();

  const segments = useSegments();
  const isChildRoute = segments.length > 3;

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={({ route }) => ({
        animation: 'none',
        tabBarIcon: ({ focused }) => {
          const tab = tabs.find((t) => t.name === route.name);
          const color = focused ? theme.colors.Primary[500] : theme.colors.Neutral[200];

          return tab?.icon(color);
        },
        sceneStyle: {
          backgroundColor: theme.colors.Neutral[900],
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            borderTopWidth: 0,
            height: 56,
            backgroundColor: theme.colors.Neutral[800],
            alignItems: 'center',
            justifyContent: 'center',
          },
          // 👇 Hide tab bar on child routes
          isChildRoute && { display: 'none' },
        ],
        tabBarLabel: ({ focused, children }) => (
          <Text size="text-xs" style={focused ? { color: theme.colors.Primary[500] } : undefined}>
            {children}
          </Text>
        ),
      })}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarHideOnKeyboard: true,
            header: tab.header ? (props) => tab.header!(props) : undefined,
            headerShown: isChildRoute ? false : true, // Only show header on index screen of tab
          }}
        />
      ))}
    </Tabs>
  );
}
