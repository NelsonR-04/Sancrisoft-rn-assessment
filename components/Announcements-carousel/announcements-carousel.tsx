import React, { FC, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { announcementsCarouselStyles } from '@/components/Announcements-carousel/announcements-carousel.styles';
import { LeftArrow, RightArrow } from '@/components/ui/Arrows/arrows';
import { SCREEN_WIDTH } from '@/constants/device';
import { Announcement } from '@/graphql/client';
import { ANNOUNCEMENTS_QUERY } from '@/graphql/queries';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from 'urql';

const AnnouncementsCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);

  const [result] = useQuery({ query: ANNOUNCEMENTS_QUERY });

  const { data, fetching, error } = result;

  const announcements: Announcement[] = data?.announcementCollection?.items || [];

  const infiniteAnnouncements =
    announcements.length > 0
      ? [announcements[announcements.length - 1], ...announcements, announcements[0]]
      : [];

  const handlePress = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.log('Browser not available:', err);
    }
  };

  useEffect(() => {
    if (announcements.length > 0) {
      scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
    }
  }, [announcements.length]);

  const goToPrevious = () => {
    const newIndex = currentIndex - 1;
    scrollViewRef.current?.scrollTo({ x: newIndex * SCREEN_WIDTH, animated: true });
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex + 1;
    scrollViewRef.current?.scrollTo({ x: newIndex * SCREEN_WIDTH, animated: true });
    setCurrentIndex(newIndex);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleScrollEnd = () => {
    if (currentIndex === 0) {
      scrollViewRef.current?.scrollTo({ x: announcements.length * SCREEN_WIDTH, animated: false });
      setCurrentIndex(announcements.length);
    } else if (currentIndex === infiniteAnnouncements.length - 1) {
      scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
      setCurrentIndex(1);
    }
  };

  if (fetching) {
    return (
      <View style={announcementsCarouselStyles.container}>
        <Text style={announcementsCarouselStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={announcementsCarouselStyles.container}>
        <Text style={announcementsCarouselStyles.errorText}>Error loading announcements</Text>
      </View>
    );
  }

  return (
    <View style={announcementsCarouselStyles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {infiniteAnnouncements.map((announcement, index) => (
          <Pressable
            key={`${announcement.ctaLabel}-${index}`}
            style={[
              announcementsCarouselStyles.card,
              { backgroundColor: announcement.backgroundColor || '#007AFF' },
            ]}
            onPress={() => handlePress(announcement.ctaUrl)}
          >
            <Text style={announcementsCarouselStyles.message}>{announcement.message}</Text>
            <Text style={announcementsCarouselStyles.ctaLabel}>{announcement.ctaLabel}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable style={announcementsCarouselStyles.leftArrow} onPress={goToPrevious}>
        <LeftArrow color="white" width={17} height={31} />
      </Pressable>

      <Pressable style={announcementsCarouselStyles.rightArrow} onPress={goToNext}>
        <RightArrow color="white" width={17} height={31} />
      </Pressable>
    </View>
  );
};

export default AnnouncementsCarousel;
