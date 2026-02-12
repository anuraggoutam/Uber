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

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignUpPress = () => {
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
              Create Your Account
            </Text>
          </View>

          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter name"
              icon={icons.person}
              textContentType="name"
              value={form.name}
              onChangeText={(value) =>
                setForm({ ...form, name: value })
              }
            />

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
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6"
            /><OAuth />

            <Link href="/sign-in"   className="text-lg text-center text-general-200 mt-10">
              <Text >
                Already have an account? 
              </Text>
              <Text className='text-primary-500'>Sign-in</Text>
            </Link>

          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
