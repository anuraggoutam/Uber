import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

   // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user. Go to index first so it sees updated auth and redirects to home.
      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        })
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      if (err?.errors?.[0]?.code === 'session_exists') {
        router.replace('/(root)/(tabs)/home');
        return;
      }
      const message =
        err?.errors?.[0]?.longMessage ?? err?.message ?? 'Sign in failed';
      Alert.alert('Error', message);
    }
  }, [isLoaded, form]);

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
