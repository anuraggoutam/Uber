import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = () => {
    // signup logic
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-white"
          keyboardShouldPersistTaps="handled"
        >
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signUpCar}
              className="w-full h-[250px]"
            />
            <Text className="absolute bottom-5 left-5 text-2xl font-JakartaSemiBold text-black">
              Welcome 👋
            </Text>
          </View>

          <View className="p-5">

            <InputField
              label="Email"
              placeholder="Enter email"
              icon={icons.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) =>
                setForm({ ...form, email: value })
              }
            />

            <InputField
              label="Password"
              placeholder="Enter password"
              icon={icons.lock}
              secureTextEntry
              textContentType="newPassword"
              value={form.password}
              onChangeText={(value) =>
                setForm({ ...form, password: value })
              }
            />

            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className="mt-6"
            />
            <OAuth />

            <Link href="/sign-up"   className="text-lg text-center text-general-200 mt-10">
              <Text >
                Don&apos;t have an account? 
              </Text>
              <Text className='text-primary-500'>Sign-up</Text>
            </Link>

          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
