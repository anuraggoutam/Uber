import { icons } from '@/constants';
import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const OAuth = () => {
    const handleGoogleSignIn = () => {
      // Google sign-in logic
    }
  return (

    <View>
    <View className="flex-row items-center mt-4">
      <View className="flex-1 h-[1px] bg-general-100" />
      
      <Text className="mx-4 text-sm text-gray-500 font-JakartaMedium">
        OR
      </Text>
      <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton title='Log in with Google' className='mt-4 w-full shadow-none' IconLeft={()=>(
        <Image source={icons.google} className='w-5 h-5 mx-2'
         />
      )}
      bgVariant='outline'
      textVariant='primary'
      onPress={handleGoogleSignIn}

      />
    </View>
  );
};

export default OAuth;
