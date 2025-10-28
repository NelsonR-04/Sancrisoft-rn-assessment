import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { heroSliderStyles } from '@/components/Hero-slider/hero-slider.styles';
import { useRevealOverlayAnimation } from '@/hooks/useRevealOverlayAnimation';

const RevealOverlay: FC = () => {
  const { overlayAnimatedStyle } = useRevealOverlayAnimation();

  return <Animated.View style={[heroSliderStyles.revealOverlay, overlayAnimatedStyle]} />;
};

export default RevealOverlay;
