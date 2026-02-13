import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const home = () => {
  return (
    <SafeAreaView className="flex-1 pb-24">
      <View>
        <Text>home</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
