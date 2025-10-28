import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnnouncementsCarousel from '@/components/Announcements-carousel/announcements-carousel';
import HeroSlider from '@/components/Hero-slider/hero-slider';
import Header from '@/components/Layout/Header/header';
import { announcementsClient, heroSliderClient } from '@/graphql/client';
import { Provider } from 'urql';

const HomeScreen: FC = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Provider value={announcementsClient}>
          <AnnouncementsCarousel />
        </Provider>
        <Provider value={heroSliderClient}>
          <Header />
          <HeroSlider />
        </Provider>
      </ScrollView>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default HomeScreen;
