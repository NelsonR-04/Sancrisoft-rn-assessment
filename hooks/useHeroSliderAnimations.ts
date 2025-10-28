import { useEffect, useRef, useState } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { HeroSlide } from '@/graphql/client';
import type { VideoPlayer } from 'expo-video';

type UseHeroSliderAnimationsParams = {
  slides: HeroSlide[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: VideoPlayer;
};

const VIDEO_DURATION = 10000;

export const useHeroSliderAnimations = ({
  slides,
  currentIndex,
  setCurrentIndex,
  currentPlayer,
}: UseHeroSliderAnimationsParams) => {
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideAdvanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioning = useRef(false);

  const overlayOpacity = useSharedValue(1);
  const currentOpacity = useSharedValue(0);

  useEffect(() => {
    if (slides.length === 0) return;

    const slide = slides[currentIndex];
    if (!slide) return;

    const videoUrl = slide.mobileImageOrVideo?.url;

    const loadSlideMedia = async () => {
      overlayOpacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });

      currentOpacity.value = 0;
      currentOpacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });

      setTimeout(() => {
        overlayOpacity.value = withTiming(0, {
          duration: 2000,
          easing: Easing.in(Easing.ease),
        });
      }, 0);

      currentPlayer.replaceAsync(videoUrl).then(() => {
        currentPlayer.play();
        setProgress(0);
      });
    };

    loadSlideMedia();
  }, [currentIndex, slides, currentPlayer, overlayOpacity, currentOpacity]);

  useEffect(() => {
    if (slides.length === 0) return;

    const handleProgress = () => {
      setProgress((prev) => {
        if (isTransitioning.current) {
          return prev;
        }

        if (prev >= 100) {
          isTransitioning.current = true;
          setTimeout(() => {
            overlayOpacity.value = withTiming(1, {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            });
          }, 0);
          slideAdvanceTimeout.current = setTimeout(() => {
            setCurrentIndex((current) => (current + 1) % slides.length);
            isTransitioning.current = false;
          }, 300);
          return 0;
        }
        return prev + 100 / (VIDEO_DURATION / 100);
      });
    };

    progressInterval.current = setInterval(handleProgress, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      if (slideAdvanceTimeout.current) {
        clearTimeout(slideAdvanceTimeout.current);
        slideAdvanceTimeout.current = null;
      }
      isTransitioning.current = false;
    };
  }, [slides.length, overlayOpacity, setCurrentIndex]);

  const currentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: currentOpacity.value,
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return {
    progress,
    currentAnimatedStyle,
    overlayAnimatedStyle,
  };
};
