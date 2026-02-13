import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { View } from 'react-native';

const Page = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to be ready so we don't redirect to welcome with stale state
  if (!isLoaded) return <View />;

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
