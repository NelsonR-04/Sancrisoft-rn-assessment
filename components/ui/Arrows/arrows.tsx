import { ArrowsProps } from '@/components/ui/Arrows/arrows.types';
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';


export const LeftArrow: FC<ArrowsProps> = ({ color, width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 17 31" fill="none">
    <Path d="M16.0078 30.0234L1.00106 15.4169L16.0078 0.810296" stroke={color} />
  </Svg>
);

export const RightArrow: FC<ArrowsProps> = ({ color, width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 17 31" fill="none">
    <Path d="M1 0.804688L16.0068 15.4113L1 30.0178" stroke={color} />
  </Svg>
);
