import { Image, ImageSourcePropType } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  source: ImageSourcePropType;
  focused: boolean;
};

export default function TabIcon({ source, focused }: Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(focused ? 1.12 : 1, {
          damping: 15,
          stiffness: 180,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`w-11 h-11 rounded-full items-center justify-center ${
        focused ? 'bg-green-500' : ''
      }`}
    >
      <Image
        source={source}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={focused ? '#ffffff' : '#bdbdbd'}
      />
    </Animated.View>
  );
}
