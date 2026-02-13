import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';

// Types for our custom Icon component

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`w-12 h-12 rounded-full items-center justify-center ${
        focused ? 'bg-general-400' : ''
      }`}
    >
      <Image
        source={source}
        resizeMode="contain"
        className="w-7 h-7"
        tintColor="white"
      />
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 60,
          paddingTop: 12,
          height: 65,
          position: 'absolute',
          borderTopWidth: 0,
        },
        // Ensures the TabIcon container is centered within the 78px height
        tabBarItemStyle: {
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
