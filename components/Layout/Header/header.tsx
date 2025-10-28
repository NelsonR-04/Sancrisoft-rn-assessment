import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { headerStyles } from '@/components/Layout/Header/header.style';
import Logo from '@/components/ui/Logo/Logo';

const Header: FC = () => {
  const handleLogoPress = () => console.log('Logo pressed');

  const handleMenuPress = () => console.log('Menu pressed');

  return (
    <View style={headerStyles.container}>
      <Pressable onPress={handleLogoPress} style={headerStyles.logoContainer}>
        <Logo />
      </Pressable>

      <Pressable onPress={handleMenuPress} style={headerStyles.menuButton}>
        <View style={headerStyles.menuLine} />
        <View style={headerStyles.menuLineMiddle}>
          <View style={headerStyles.menuLineMiddleFirst} />
          <View style={headerStyles.menuLineMiddleSecond} />
        </View>
        <View style={headerStyles.menuLine} />
      </Pressable>
    </View>
  );
};

export default Header;
