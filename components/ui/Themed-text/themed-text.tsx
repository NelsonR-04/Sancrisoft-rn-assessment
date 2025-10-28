import { FC } from 'react';
import { Text } from 'react-native';
import { themedTextStyles } from '@/components/ui/Themed-text/themed-text.styles';
import { ThemedTextProps } from '@/components/ui/Themed-text/themed-text.types';
import { useThemeColor } from '@/theme/use-theme-color';

const ThemedText: FC<ThemedTextProps> = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? themedTextStyles.default : undefined,
        type === 'title' ? themedTextStyles.title : undefined,
        type === 'defaultSemiBold' ? themedTextStyles.defaultSemiBold : undefined,
        type === 'subtitle' ? themedTextStyles.subtitle : undefined,
        type === 'link' ? themedTextStyles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedText;
