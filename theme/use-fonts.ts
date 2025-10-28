import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [loaded] = useFonts({
    NimbusSans_Regular: require('../assets/fonts/nimbus-sans-l.regular.otf'),
    NimbusSans_RegularItalic: require('../assets/fonts/nimbus-sans-l.regular-italic.otf'),
    NimbusSans_Bold: require('../assets/fonts/nimbus-sans-l.bold.otf'),
    NimbusSans_BoldItalic: require('../assets/fonts/nimbus-sans-l.bold-italic.otf'),
  });

  return loaded;
};
