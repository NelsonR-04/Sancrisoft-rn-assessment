import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useRevealOverlayAnimation = () => {
  const overlayScale = useSharedValue(1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      overlayScale.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setTimeout(() => {
        overlayScale.value = 1;
      }, 0);
    };
  }, [overlayScale]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: overlayScale.value }],
  }));

  return { overlayAnimatedStyle };
};
