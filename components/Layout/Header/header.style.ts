import { StyleSheet } from 'react-native';
import { FONTS } from '@/theme/fonts';

export const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 160,
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamond: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  menuButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    width: 28,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  menuLineMiddle: {
    height: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuLineMiddleFirst: {
    width: 8,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  menuLineMiddleSecond: {
    width: 16,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
