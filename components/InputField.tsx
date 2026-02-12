import { InputFieldProps } from '@/types/type';
import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle = '',
  containerStyle = '',
  inputStyle = '',
  iconStyle = '',
  className = '',
  ...props
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View className={`my-2 w-full ${className}`}>
      {label && (
        <Text className={`mb-3 text-lg font-JakartaSemiBold ${labelStyle}`}>
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center rounded-full bg-neutral-100 border ${
          focused ? 'border-primary-500' : 'border-neutral-200'
        } ${containerStyle}`}
      >
        {icon && (
          <Image
            source={icon}
            className={`ml-4 h-6 w-6 ${iconStyle}`}
          />
        )}

        <TextInput
          className={`flex-1 rounded-full p-4 text-[15px] font-JakartaSemiBold ${inputStyle}`}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

export default InputField;
