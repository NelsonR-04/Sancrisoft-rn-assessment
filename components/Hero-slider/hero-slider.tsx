import React, { FC, useEffect, useMemo, useState } from 'react';
import { AppState, Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { heroSliderStyles } from '@/components/Hero-slider/hero-slider.styles';
import ProgressContainer from '@/components/Progress-container/progress-container';
import RevealOverlay from '@/components/Reveal-overlay/reveal-overlay';
import { config } from '@/config/config';
import { HeroSlide } from '@/graphql/client';
import { HERO_SLIDER_QUERY } from '@/graphql/queries';
import { useHeroSliderAnimations } from '@/hooks/useHeroSliderAnimations';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from 'urql';

const HeroSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayerInBackground, setIsPlayerInBackground] = useState(false);

  const [result] = useQuery({ query: HERO_SLIDER_QUERY });

  const { data, fetching, error } = result;

  const slides: HeroSlide[] = useMemo(() => {
    if (!data?.blockHomeHeroSlider) return [];

    const slider = data.blockHomeHeroSlider;
    const slidesList: HeroSlide[] = [];

    for (let i = 1; i <= 5; i++) {
      const title = slider[`slide${i}Title`];
      if (title) {
        slidesList.push({
          title,
          eyebrowImage: slider[`slide${i}EyebrowImage`],
          eyebrowText: slider[`slide${i}EyebrowText`],
          targetUrl: slider[`slide${i}TargetUrl`] || slider[`slide${i}TargetLink`],
          mobileImageOrVideo: slider[`slide${i}MobileImageOrVideo`],
          enableDarkBackdrop: slider[`slide${i}EnableDarkBackdrop`],
        });
      }
    }

    return slidesList;
  }, [data]);

  const currentPlayer = useVideoPlayer('', (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
  });

  const { progress, currentAnimatedStyle, overlayAnimatedStyle } = useHeroSliderAnimations({
    slides,
    currentIndex,
    setCurrentIndex,
    currentPlayer,
  });

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background') {
        setIsPlayerInBackground(true);
        currentPlayer.pause();
      } else if (nextAppState === 'active' && isPlayerInBackground) {
        currentPlayer.play();
        setIsPlayerInBackground(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [currentPlayer, isPlayerInBackground]);

  const handleSlidePress = async () => {
    const currentSlide = slides[currentIndex];
    if (currentSlide?.targetUrl) {
      try {
        const currentTime = Math.floor(currentPlayer.currentTime || 0);
        const urlWithTime = `${config.baseURL}${currentSlide.targetUrl.includes('?') ? '&' : '?'}t=${currentTime}`;

        await WebBrowser.openBrowserAsync(urlWithTime);
      } catch (err) {
        console.log('Browser not available:', err);
      }
    }
  };

  const handleNextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

  if (error || (slides.length === 0 && !fetching)) {
    return (
      <View style={[heroSliderStyles.container, heroSliderStyles.centerContent]}>
        <Text style={heroSliderStyles.errorText}>Error loading hero slider</Text>
      </View>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  return (
    <Pressable style={heroSliderStyles.container} onPress={handleSlidePress}>
      <RevealOverlay />

      <Animated.View
        style={[
          heroSliderStyles.background,
          heroSliderStyles.backgroundCurrent,
          currentAnimatedStyle,
        ]}
      >
        <VideoView
          player={currentPlayer}
          style={heroSliderStyles.background}
          contentFit="cover"
          nativeControls={false}
        />
        {currentSlide.enableDarkBackdrop && (
          <Animated.View style={[heroSliderStyles.darkOverlay, overlayAnimatedStyle]} />
        )}
      </Animated.View>

      {currentSlide.enableDarkBackdrop && <View style={heroSliderStyles.overlay} />}

      <View style={heroSliderStyles.content}>
        {currentSlide.eyebrowImage && (
          <Animated.View style={[heroSliderStyles.contentWrapper, currentAnimatedStyle]}>
            <Image
              source={{ uri: currentSlide.eyebrowImage.url }}
              style={heroSliderStyles.eyebrow}
              contentFit="contain"
            />
            <Text style={heroSliderStyles.title}>{currentSlide.title}</Text>
          </Animated.View>
        )}

        <View style={heroSliderStyles.titleContainer}>
          <Pressable style={heroSliderStyles.arrowButton} onPress={handleNextSlide}>
            <Svg width="26" height="42" viewBox="0 0 26 42" fill="none">
              <Path d="M3 3L21 21L3 39" stroke="#FFFFFF" strokeWidth="6" />
            </Svg>
          </Pressable>
        </View>
      </View>

      <ProgressContainer
        slidesCount={slides.length}
        currentIndex={currentIndex}
        progress={progress}
      />
    </Pressable>
  );
};

export default HeroSlider;
