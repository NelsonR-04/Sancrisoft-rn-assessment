import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@/constants/device';

export const announcementsCarouselStyles = StyleSheet.create({
  container: {
    height: 100,
    position: 'relative',
    zIndex: 100,
  },
  card: {
    width: SCREEN_WIDTH,
    padding: 16,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 60,
    marginBottom: 4,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  ctaLabel: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 40,
    letterSpacing: 0.3,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rightArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
  },
});
